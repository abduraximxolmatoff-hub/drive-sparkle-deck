import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InteractiveCarViewer } from "@/components/InteractiveCarViewer";
import { VehicleMaintenanceOverview } from "@/components/VehicleMaintenanceOverview";
import { CobaltPartInfoPanel } from "@/components/CobaltPartInfoPanel";
import { CobaltTirePanel } from "@/components/CobaltTirePanel";
import { useLanguage } from "@/i18n/LanguageContext";
import { useFavorites } from "@/hooks/use-favorites";
import { getBrandModel } from "@/data/brands";
import { getChevModelSpec, getBodyTypeLabel, type BodyType } from "@/data/chevModelSpecs";
import { getPartIcon } from "@/data/partIcons";
import { CAR_PARTS, type CarPart } from "@/data/carParts";

export const Route = createFileRoute("/$brand/$model")({
  loader: ({ params }) => {
    const match = getBrandModel(params.brand, params.model);

    if (!match) {
      throw notFound();
    }

    return match;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.model.name ?? "Model"} — AutoINFO`,
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.model.name} uchun premium model sahifasi, katta avtomobil ko‘rinishi va foydali texnik ma’lumotlar.`
          : "Premium car model detail page",
      },
      {
        property: "og:title",
        content: `${loaderData?.model.name ?? "Model"} — AutoINFO`,
      },
      {
        property: "og:description",
        content: loaderData?.brand.tagline ?? "Premium automotive model details",
      },
      {
        property: "og:image",
        content: loaderData?.model.image ?? "",
      },
    ],
  }),
  component: ModelDetailPage,
  errorComponent: ModelDetailErrorComponent,
  notFoundComponent: ModelDetailNotFoundComponent,
});

function ModelDetailErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <p className="text-destructive">{error.message}</p>
        <button
          className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

function ModelDetailNotFoundComponent() {
  const { brand } = Route.useParams();

  return (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Model not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Information for the selected model is not available yet.
        </p>
        <Link
          to="/brand/$slug"
          params={{ slug: brand }}
          className="mt-4 inline-block text-primary underline"
        >
          Back to models
        </Link>
      </div>
    </div>
  );
}

function ModelDetailPage() {
  const { brand, model } = Route.useLoaderData();
  const [activePart, setActivePart] = useState<CarPart | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "service">("overview");
  const { t, lang } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favoriteKey = `${brand.slug}/${model.slug}`;
  const favorited = isFavorite(favoriteKey);
  const spec = getChevModelSpec(model.slug);

  const shareText = {
    uz: "Havola nusxalandi",
    ru: "Ссылка скопирована",
    en: "Link copied",
  }[lang];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success(shareText);
    } catch {
      toast.error(
        { uz: "Nusxalab bo'lmadi", ru: "Не удалось скопировать", en: "Could not copy" }[lang],
      );
    }
  };

  // Reset selected part whenever the model changes so state from a previous
  // model (zoom, marker, part content) never leaks across pages.
  useEffect(() => {
    setActivePart(null);
  }, [model.slug]);

  return (
    <main
      key={lang}
      className="relative min-h-screen overflow-hidden animate-in fade-in duration-300"
    >
      <AnimatedBackground />

      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 sm:pt-8">
        <Link
          to="/brand/$slug"
          params={{ slug: brand.slug }}
          className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {t("model.backToModels")}
        </Link>
        <div className="flex items-center gap-3">
          <AutoInfoLogo size="sm" />
          <LanguageSwitcher />
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          {brand.name}
        </motion.p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            >
              {model.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base"
            >
              {model.taglineKey ? t(model.taglineKey) : brand.tagline}
            </motion.p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => toggleFavorite(favoriteKey)}
              aria-pressed={favorited}
              aria-label="Favorite"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-gradient backdrop-blur-md transition-transform hover:scale-105"
              style={favorited ? { borderColor: `${brand.accent}aa` } : undefined}
            >
              <Heart
                className="h-4 w-4 transition-colors"
                style={{ color: favorited ? brand.accent : undefined }}
                fill={favorited ? brand.accent : "none"}
              />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.34 }}
              onClick={handleShare}
              aria-label="Share"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card-gradient backdrop-blur-md transition-transform hover:scale-105"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="hidden h-14 w-14 object-contain sm:block"
            />
          </div>
        </div>
      </section>

      {/* Tab bar: Umumiy / Texnik / Servis */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="inline-flex rounded-full border border-border bg-card-gradient p-1 backdrop-blur-md">
          {(
            [
              { id: "overview", label: t("model.tab.overview") },
              { id: "technical", label: t("model.tab.technical") },
              { id: "service", label: t("model.tab.service") },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors sm:text-sm ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="model-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: brand.accent }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "technical" ? (
        <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 pt-6 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-8">
          <aside className="order-2 lg:order-1">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {t("model.parts")}
              </h2>
              {activePart && (
                <button
                  onClick={() => setActivePart(null)}
                  className="text-[10px] uppercase tracking-wider text-primary hover:underline"
                >
                  {t("model.resetView")}
                </button>
              )}
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {CAR_PARTS.map((part, index) => {
                const isActive = activePart?.id === part.id;

                return (
                  <motion.li
                    key={part.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.4 }}
                  >
                    <button
                      onClick={() => setActivePart(isActive ? null : part)}
                      aria-pressed={isActive}
                      className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left backdrop-blur-md transition-all duration-300 ${
                        isActive
                          ? "border-primary/60 bg-card-gradient shadow-glow"
                          : "border-border bg-card-gradient hover:scale-[1.01] hover:border-primary/40"
                      }`}
                      style={
                        isActive
                          ? {
                              boxShadow: `0 0 40px -10px ${brand.accent}80`,
                              borderColor: `${brand.accent}aa`,
                            }
                          : undefined
                      }
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${brand.accent}33, transparent)`,
                          color: brand.accent,
                        }}
                        aria-hidden
                      >
                        {(() => {
                          const PartIcon = getPartIcon(part.id);
                          return <PartIcon className="h-5 w-5" strokeWidth={2} />;
                        })()}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-sm font-semibold">
                          {part.name[lang]}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">
                          {part.subtitle[lang]}
                        </p>
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </aside>

          <div className="order-1 lg:order-2">
            <InteractiveCarViewer
              model={model}
              brandAccent={brand.accent}
              selectedPartId={activePart?.id ?? null}
              onResetView={() => setActivePart(null)}
            />

            <AnimatePresence mode="wait">
              {activePart ? (
                activePart.id === "tires" ? (
                  <CobaltTirePanel
                    key={`tires-${model.slug}`}
                    brandAccent={brand.accent}
                    modelName={model.name}
                    modelSlug={model.slug}
                  />
                ) : (
                  <CobaltPartInfoPanel
                    key={`${model.slug}-${activePart.id}`}
                    part={activePart}
                    brandAccent={brand.accent}
                    modelName={model.name}
                    modelSlug={model.slug}
                  />
                )
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card-gradient/50 p-8 text-center backdrop-blur-md"
                >
                  <motion.span
                    animate={{ x: [0, -6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-12 w-12 items-center justify-center rounded-full text-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${brand.accent}33, transparent)`,
                      color: brand.accent,
                    }}
                    aria-hidden
                  >
                    ←
                  </motion.span>
                  <p className="max-w-xs text-sm text-muted-foreground">{t("model.hint")}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      ) : (
        <section className="relative z-10 mx-auto max-w-4xl px-4 pb-32 pt-6 sm:px-6">
          <InteractiveCarViewer
            model={model}
            brandAccent={brand.accent}
            selectedPartId={null}
            onResetView={() => {}}
          />

          <AnimatePresence mode="wait">
            {activeTab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <ModelQuickFacts
                  brandAccent={brand.accent}
                  bodyType={spec?.bodyType ?? "midsize-sedan"}
                  regulationBased={Boolean(spec?.regulationBased)}
                  tire={spec?.tire}
                  onExploreParts={() => setActiveTab("technical")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="service"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <VehicleMaintenanceOverview
                  brandAccent={brand.accent}
                  bodyType={spec?.bodyType ?? "midsize-sedan"}
                  regulationBased={Boolean(spec?.regulationBased)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}
    </main>
  );
}

function ModelQuickFacts({
  brandAccent,
  bodyType,
  regulationBased,
  tire,
  onExploreParts,
}: {
  brandAccent: string;
  bodyType: BodyType;
  regulationBased: boolean;
  tire?: { frontPsi: string; rearPsi: string; replacementKm: string };
  onExploreParts: () => void;
}) {
  const { t, lang } = useLanguage();

  const facts = [
    { label: t("model.facts.bodyType"), value: getBodyTypeLabel(bodyType, lang) },
    {
      label: t("model.facts.tirePressure"),
      value: tire ? `${tire.frontPsi} / ${tire.rearPsi}` : "—",
    },
    { label: t("model.facts.tireLife"), value: tire?.replacementKm ?? "—" },
    { label: t("model.facts.partsTracked"), value: `${CAR_PARTS.length}` },
  ];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold sm:text-2xl">{t("model.facts.title")}</h2>
        <span
          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: `${brandAccent}1a`,
            color: brandAccent,
            borderColor: `${brandAccent}55`,
          }}
        >
          {regulationBased ? t("cobalt.regulationBased") : t("chev.generalRecommendation")}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, i) => (
          <motion.div
            key={fact.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="rounded-xl border border-border/70 bg-card-gradient p-4 backdrop-blur-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {fact.label}
            </p>
            <p
              className="mt-1.5 font-display text-base font-semibold"
              style={{ color: brandAccent }}
            >
              {fact.value}
            </p>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onExploreParts}
        className="mt-2 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition hover:scale-[1.02]"
        style={{ borderColor: `${brandAccent}66`, color: brandAccent }}
      >
        {t("model.facts.explorePartsCta")} →
      </button>
    </div>
  );
}
