import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { InteractiveCarViewer } from "@/components/InteractiveCarViewer";
import { ServiceSchedule } from "@/components/ServiceSchedule";
import { MaintenanceSchedulePlaceholder } from "@/components/MaintenanceSchedulePlaceholder";
import { CobaltPartInfoPanel } from "@/components/CobaltPartInfoPanel";
import { CobaltRegulationSummary } from "@/components/CobaltRegulationSummary";
import { COBALT_PART_INFO } from "@/data/cobaltPartInfo";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBrandModel } from "@/data/brands";
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
  errorComponent: ({ error, reset }) => {
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
  },
  notFoundComponent: () => {
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
  },
});

function ModelDetailPage() {
  const { brand, model } = Route.useLoaderData();
  const [activePart, setActivePart] = useState<CarPart | null>(null);
  const { t, lang } = useLanguage();

  return (
    <main key={lang} className="relative min-h-screen overflow-hidden animate-in fade-in duration-300">
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
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="hidden h-14 w-14 object-contain sm:block"
          />
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-8">
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
                  transition={{ delay: 0.35 + index * 0.06, duration: 0.45 }}
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
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg transition-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${brand.accent}33, transparent)`,
                      }}
                      aria-hidden
                    >
                      {part.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold">{part.name[lang]}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{part.subtitle[lang]}</p>
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
              model.slug === "cobalt-15l" && COBALT_PART_INFO[activePart.id] ? (
                <CobaltPartInfoPanel
                  key={activePart.id}
                  part={activePart}
                  brandAccent={brand.accent}
                />
              ) : (
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 overflow-hidden rounded-2xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md sm:p-6"
                  style={{ borderColor: `${brand.accent}40` }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
                      style={{
                        background: `linear-gradient(135deg, ${brand.accent}44, transparent)`,
                      }}
                    >
                      {activePart.icon}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold sm:text-2xl">
                        {activePart.title[lang]}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {activePart.name[lang]}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
                    {activePart.bullets[lang].map((bullet, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="flex gap-2"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: brand.accent }}
                        />
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {activePart.seasonal && (
                    <div className="mt-5 grid gap-2 sm:grid-cols-3">
                      {activePart.seasonal.map((season) => (
                        <div
                          key={season.labelKey}
                          className="rounded-lg border border-border/60 bg-background/40 p-3"
                        >
                          <p
                            className="text-[10px] font-semibold uppercase tracking-wider"
                            style={{ color: brand.accent }}
                          >
                            {t(season.labelKey)}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{season.text[lang]}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-5 rounded-2xl border border-dashed border-border bg-card-gradient/50 p-5 text-center text-sm text-muted-foreground backdrop-blur-md"
              >
                {t("model.hint")}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Premium official service schedule (currently authored for Cobalt) */}
          {model.slug === "cobalt-15l" ? (
            <CobaltRegulationSummary brandAccent={brand.accent} />
          ) : (
            <MaintenanceSchedulePlaceholder brandAccent={brand.accent} />
          )}
        </div>
      </section>
    </main>
  );
}
