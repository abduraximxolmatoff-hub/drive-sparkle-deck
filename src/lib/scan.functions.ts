import { createServerFn } from "@tanstack/react-start";
import { brands } from "@/data/brands";

const DAILY_LIMIT = 20;

export interface ScanGuess {
  brand: string;
  model: string;
  confidence: number;
  app_brand_slug: string | null;
  app_model_slug: string | null;
}
export interface ScanResult extends ScanGuess {
  generation: string;
  year_range: string;
  body_type: string;
  color: string;
  alternatives: ScanGuess[];
  overview: {
    engine_options: string;
    fuel_type: string;
    avg_consumption: string;
    common_problems: string[];
    maintenance_tips: string[];
  };
}

const guessProps = {
  brand: { type: "string" },
  model: { type: "string" },
  confidence: { type: "integer" },
  app_brand_slug: { type: ["string", "null"] },
  app_model_slug: { type: ["string", "null"] },
};
const schema = {
  type: "object",
  additionalProperties: false,
  required: [...Object.keys(guessProps), "generation", "year_range", "body_type", "color", "alternatives", "overview"],
  properties: {
    ...guessProps,
    generation: { type: "string" },
    year_range: { type: "string" },
    body_type: { type: "string" },
    color: { type: "string" },
    alternatives: {
      type: "array",
      items: { type: "object", additionalProperties: false, required: Object.keys(guessProps), properties: guessProps },
    },
    overview: {
      type: "object",
      additionalProperties: false,
      required: ["engine_options", "fuel_type", "avg_consumption", "common_problems", "maintenance_tips"],
      properties: {
        engine_options: { type: "string" },
        fuel_type: { type: "string" },
        avg_consumption: { type: "string" },
        common_problems: { type: "array", items: { type: "string" } },
        maintenance_tips: { type: "array", items: { type: "string" } },
      },
    },
  },
};

type Input = { token: string; image: string; lang: "uz" | "ru" | "en" };

export const scanCar = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => {
    if (!d?.token || typeof d.image !== "string" || !d.image.startsWith("data:image/")) throw new Error("bad_input");
    if (d.image.length > 3_000_000) throw new Error("too_large");
    return { token: d.token, image: d.image, lang: (["uz", "ru", "en"].includes(d.lang) ? d.lang : "uz") as Input["lang"] };
  })
  .handler(async ({ data }): Promise<{ ok: true; result: ScanResult } | { ok: false; error: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: u, error: ue } = await supabaseAdmin.auth.getUser(data.token);
    if (ue || !u.user) return { ok: false, error: "auth" };
    const userId = u.user.id;
    const day = new Date().toISOString().slice(0, 10);
    const { data: usage } = await supabaseAdmin.from("scan_usage").select("count").eq("user_id", userId).eq("day", day).maybeSingle();
    const used = usage?.count ?? 0;
    if (used >= DAILY_LIMIT) return { ok: false, error: "limit" };
    await supabaseAdmin.from("scan_usage").upsert({ user_id: userId, day, count: used + 1 });

    const catalog = brands
      .map((b) => `${b.slug}: ${b.models.map((m) => `${m.slug} (${m.name})`).join(", ")}`)
      .join("\n");
    const langName = { uz: "Uzbek (Latin)", ru: "Russian", en: "English" }[data.lang];
    const instructions = `You identify cars from photos. Return JSON only per schema.
Never read, return or mention license plate numbers or any information about people.
confidence is 0-100. alternatives: exactly 3 other likely guesses.
If the car matches one in this app catalog, set app_brand_slug/app_model_slug to the exact slugs, else null:
${catalog}
If no car is visible, set brand "unknown", confidence 0.
Write generation, body_type, color and all overview fields in ${langName}. overview: engine options, fuel type, average fuel consumption, 3-5 typical common problems, 3-5 main maintenance tips.`;

    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { ok: false, error: "ai" };
    let res: Response;
    try {
      res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "openai/gpt-6-astra",
          stream: true,
          store: false,
          reasoning: { effort: "low" },
          instructions,
          input: [
            {
              role: "user",
              content: [
                { type: "input_text", text: "Identify this car." },
                { type: "input_image", image_url: data.image },
              ],
            },
          ],
          text: { format: { type: "json_schema", name: "car_scan", strict: true, schema } },
        }),
      });
    } catch {
      return { ok: false, error: "ai" };
    }
    if (!res.ok || !res.body) {
      console.error("scan ai error", res.status, await res.text().catch(() => ""));
      return { ok: false, error: res.status === 429 ? "busy" : res.status === 402 ? "credits" : "ai" };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta") text += ev.delta;
          if (ev.type === "response.refusal.delta" || ev.type === "error" || ev.type === "response.failed") {
            return { ok: false, error: "ai" };
          }
        } catch {
          /* partial */
        }
      }
    }
    try {
      const result = JSON.parse(text) as ScanResult;
      // validate slugs against catalog
      const fix = (g: ScanGuess) => {
        const b = brands.find((x) => x.slug === g.app_brand_slug);
        const m = b?.models.find((x) => x.slug === g.app_model_slug);
        if (!b || !m) {
          g.app_brand_slug = null;
          g.app_model_slug = null;
        }
        g.confidence = Math.max(0, Math.min(100, Math.round(g.confidence)));
      };
      fix(result);
      result.alternatives = (result.alternatives ?? []).slice(0, 3);
      result.alternatives.forEach(fix);
      return { ok: true, result };
    } catch {
      return { ok: false, error: "ai" };
    }
  });
