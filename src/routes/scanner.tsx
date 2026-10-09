import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, Image as ImageIcon, Loader2, RotateCcw, Sparkles, History, AlertTriangle, Star } from "lucide-react";
import { toast } from "sonner";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { brands } from "@/data/brands";
import { scanCar, type ScanResult, type ScanGuess } from "@/lib/scan.functions";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "Skaner — mashinani rasmdan aniqlash | AutoINFO" },
      { name: "description", content: "Mashinani rasmga oling — AutoINFO uning brendi, modeli va yillarini aniqlaydi." },
      { property: "og:title", content: "Skaner — AutoINFO" },
      { property: "og:description", content: "Mashinani rasmdan aniqlang." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ScannerPage,
});

const RECENT_KEY = "autoinfo.recentScans";
type Recent = { brand: string; model: string; year_range: string; confidence: number; b: string | null; m: string | null; at: number };

async function compress(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = url;
    });
    const scale = Math.min(1, 1024 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.round(img.width * scale);
    c.height = Math.round(img.height * scale);
    c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function ScannerPage() {
  const { t, lang } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const camRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [recent, setRecent] = useState<Recent[]>([]);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  const addRecent = (r: ScanResult) => {
    const item: Recent = { brand: r.brand, model: r.model, year_range: r.year_range, confidence: r.confidence, b: r.app_brand_slug, m: r.app_model_slug, at: Date.now() };
    const next = [item, ...recent].slice(0, 10);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const onFile = async (file?: File) => {
    if (!file) return;
    setError(null);
    setResult(null);
    if (!navigator.onLine) return setError(t("scan.err.offline"));
    setBusy(true);
    try {
      const image = await compress(file);
      setPreview(image);
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) return setError(t("scan.err.auth"));
      const r = await scanCar({ data: { token, image, lang } });
      if (!r.ok) return setError(t(`scan.err.${r.error}`));
      setResult(r.result);
      if (r.result.brand !== "unknown") addRecent(r.result);
    } catch {
      setError(navigator.onLine ? t("scan.err.ai") : t("scan.err.offline"));
    } finally {
      setBusy(false);
      if (camRef.current) camRef.current.value = "";
      if (galRef.current) galRef.current.value = "";
    }
  };

  const openCamera = () => {
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((s) => {
          s.getTracks().forEach((tr) => tr.stop());
          camRef.current?.click();
        })
        .catch((e) => {
          if (e?.name === "NotAllowedError") setError(t("scan.err.camera"));
          else camRef.current?.click();
        });
    } else camRef.current?.click();
  };

  const saveMain = async (b: string, m: string, yearRange: string) => {
    if (!user) return navigate({ to: "/auth" });
    const year = Number(yearRange.match(/(19|20)\d{2}/g)?.pop()) || new Date().getFullYear();
    const { error } = await supabase.from("user_cars").upsert({ user_id: user.id, brand_slug: b, model_slug: m, year: Math.min(year, new Date().getFullYear()) });
    if (error) toast.error(t("scan.err.save"));
    else toast.success(t("scan.saved"));
  };

  const pickGuess = (g: ScanGuess) => {
    if (g.app_brand_slug && g.app_model_slug) navigate({ to: "/$brand/$model", params: { brand: g.app_brand_slug, model: g.app_model_slug } });
    else toast.info(`${g.brand} ${g.model} — ${t("scan.notInApp")}`);
  };

  const brand = result?.app_brand_slug ? brands.find((b) => b.slug === result.app_brand_slug) : undefined;
  const model = brand?.models.find((m) => m.slug === result?.app_model_slug);
  const confident = result && result.confidence >= 70 && result.brand !== "unknown";

  return (
    <main key={lang} className="relative min-h-screen pb-28">
      <AnimatedBackground />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>

      <section className="relative z-10 mx-auto max-w-3xl space-y-5 px-4 pt-6 sm:px-6">
        <input ref={camRef} type="file" accept="image/*" capture="environment" hidden onChange={(e) => onFile(e.target.files?.[0])} />
        <input ref={galRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />

        <div className="rounded-3xl border border-border bg-card-gradient p-6 text-center shadow-card backdrop-blur-md">
          {preview ? (
            <div className="relative mx-auto overflow-hidden rounded-2xl">
              <img src={preview} alt="" className="mx-auto max-h-80 w-full object-contain" />
              {busy && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/70 backdrop-blur-sm">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="font-semibold">{t("scan.loading")}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Camera className="h-10 w-10" />
              </div>
              <h1 className="font-display text-2xl font-bold">{t("scan.title")}</h1>
            </div>
          )}

          {!loading && !user ? (
            <div className="mt-5">
              <p className="mb-3 text-sm text-muted-foreground">{t("scan.loginNeeded")}</p>
              <Link to="/auth" className="inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground">
                {t("scan.login")}
              </Link>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button disabled={busy} onClick={openCamera} className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground disabled:opacity-50">
                <Camera className="h-5 w-5" /> {t("scan.take")}
              </button>
              <button disabled={busy} onClick={() => galRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background/40 px-5 py-4 font-semibold disabled:opacity-50">
                <ImageIcon className="h-5 w-5" /> {t("scan.gallery")}
              </button>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">{t("scan.tips")}</p>
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
            <AlertTriangle className="h-5 w-5 shrink-0 text-destructive" />
            <span>{error}</span>
          </div>
        )}

        {result && !busy && (
          <div className="space-y-4 rounded-3xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md">
            {confident ? (
              <>
                <div className="flex items-center gap-4">
                  {brand && <img src={brand.logo} alt={brand.name} className="h-12 w-12 object-contain" />}
                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-bold">{model ? model.name : `${result.brand} ${result.model}`}</h2>
                    <p className="text-sm text-muted-foreground">
                      {[result.generation, result.year_range, result.body_type, result.color].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">{result.confidence}%</span>
                </div>
                {brand && model ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Link to="/$brand/$model" params={{ brand: brand.slug, model: model.slug }} className="rounded-xl bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">
                      {t("scan.full")}
                    </Link>
                    <button onClick={() => saveMain(brand.slug, model.slug, result.year_range)} className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 font-semibold">
                      <Star className="h-4 w-4" /> {t("scan.saveMain")}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      <Sparkles className="h-3 w-3" /> {t("scan.aiLabel")}
                    </span>
                    <p><b>{t("scan.engines")}:</b> {result.overview.engine_options}</p>
                    <p><b>{t("scan.fuel")}:</b> {result.overview.fuel_type}</p>
                    <p><b>{t("scan.consumption")}:</b> {result.overview.avg_consumption}</p>
                    <div><b>{t("scan.problems")}:</b><ul className="ml-5 list-disc">{result.overview.common_problems.map((p) => <li key={p}>{p}</li>)}</ul></div>
                    <div><b>{t("scan.maint")}:</b><ul className="ml-5 list-disc">{result.overview.maintenance_tips.map((p) => <li key={p}>{p}</li>)}</ul></div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="font-display text-xl font-bold">{t("scan.unsure")}</h2>
                {result.brand !== "unknown" && (
                  <div className="grid gap-2">
                    {[result, ...result.alternatives].slice(0, 3).map((g, i) => (
                      <button key={i} onClick={() => pickGuess(g)} className="flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3 text-left hover:border-primary/60">
                        <span className="font-semibold">{g.brand} {g.model}</span>
                        <span className="text-sm text-muted-foreground">{g.confidence}%</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
            <button onClick={openCamera} className="flex w-full items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold">
              <RotateCcw className="h-4 w-4" /> {t("scan.retake")}
            </button>
          </div>
        )}

        {recent.length > 0 && (
          <div className="rounded-3xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md">
            <div className="mb-3 flex items-center gap-2">
              <History className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">{t("scan.recent")}</h2>
            </div>
            <ul className="grid gap-2">
              {recent.map((r) => (
                <li key={r.at}>
                  {r.b && r.m ? (
                    <Link to="/$brand/$model" params={{ brand: r.b, model: r.m }} className="flex justify-between rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm hover:border-primary/50">
                      <span className="font-semibold">{r.brand} {r.model}</span>
                      <span className="text-muted-foreground">{r.year_range} · {r.confidence}%</span>
                    </Link>
                  ) : (
                    <div className="flex justify-between rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-sm">
                      <span className="font-semibold">{r.brand} {r.model}</span>
                      <span className="text-muted-foreground">{r.year_range} · {r.confidence}%</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <BottomNav />
    </main>
  );
}
