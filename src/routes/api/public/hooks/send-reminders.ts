import { createFileRoute } from "@tanstack/react-router";
import { REMINDER_PARTS, computeStatus, VAPID_PUBLIC_KEY } from "@/lib/reminders";

/** Daily job: pushes reminders 3 days before and on each part's due date. */
export const Route = createFileRoute("/api/public/hooks/send-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["REMINDER_CRON_SECRET"];
        const token = /^Bearer (\S+)$/.exec(request.headers.get("authorization") ?? "")?.[1];
        if (!secret || !token) return new Response("Unauthorized", { status: 401 });
        const { createHash, timingSafeEqual } = await import("node:crypto");
        const h = (v: string) => createHash("sha256").update(v).digest();
        if (!timingSafeEqual(h(token), h(secret))) return new Response("Unauthorized", { status: 401 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { buildPushPayload } = await import("@block65/webcrypto-web-push");
        const vapid = {
          subject: "mailto:support@autoinfo.app",
          publicKey: VAPID_PUBLIC_KEY,
          privateKey: process.env["VAPID_PRIVATE_KEY"],
        };

        const [{ data: reminders }, { data: cars }, { data: subs }] = await Promise.all([
          supabaseAdmin.from("part_reminders").select("*").eq("enabled", true),
          supabaseAdmin.from("user_cars").select("user_id,current_km"),
          supabaseAdmin.from("push_subscriptions").select("*"),
        ]);
        const kmByUser = new Map((cars ?? []).map((c) => [c.user_id, c.current_km]));
        const today = new Date().toISOString().slice(0, 10);
        let sent = 0;

        for (const r of reminders ?? []) {
          const part = REMINDER_PARTS.find((p) => p.id === r.part_id);
          if (!part) continue;
          const s = computeStatus(r, kmByUser.get(r.user_id) ?? null);
          let kind: string | null = null;
          let body = "";
          if (s.daysLeft === 3 || (s.kmLeft != null && s.kmLeft <= 300 && s.kmLeft > 0)) {
            kind = "pre";
            body = `${part.noun} almashtirishga oz qoldi — 3 kun ichida.`;
            if (s.daysLeft !== 3) body = `${part.noun} almashtirishga ${s.kmLeft} km qoldi.`;
          } else if (s.daysLeft === 0 || (s.kmLeft != null && s.kmLeft <= 0 && s.daysLeft == null)) {
            kind = "due";
            body = `${part.noun} almashtirish vaqti keldi!`;
          }
          if (!kind) continue;
          const dueKey = `${s.dueDate?.toISOString().slice(0, 10) ?? s.dueKm}:${kind}`;
          if (r.last_notified === dueKey) continue;

          for (const sub of (subs ?? []).filter((x) => x.user_id === r.user_id)) {
            const payload = await buildPushPayload(
              {
                data: { title: "AutoINFO eslatma", body, url: "/profile#eslatmalar", tag: r.part_id },
                options: { ttl: 86400 },
              },
              { endpoint: sub.endpoint, expirationTime: null, keys: { p256dh: sub.p256dh, auth: sub.auth } },
              vapid,
            );
            const res = await fetch(sub.endpoint, payload);
            if (res.status === 404 || res.status === 410) {
              await supabaseAdmin.from("push_subscriptions").delete().eq("id", sub.id);
            } else if (!res.ok) {
              console.error(`Push failed [${res.status}]: ${await res.text()}`);
            } else sent++;
          }
          await supabaseAdmin.from("part_reminders").update({ last_notified: dueKey }).eq("id", r.id);
        }
        return Response.json({ ok: true, sent, date: today });
      },
    },
  },
});
