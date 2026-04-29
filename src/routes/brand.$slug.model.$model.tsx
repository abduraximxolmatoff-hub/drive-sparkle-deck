import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getBrand, type Brand, type CarModel } from "@/data/brands";
import { CAR_PARTS, type CarPart } from "@/data/carParts";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";

export const Route = createFileRoute("/brand/$slug/model/$model")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    const model = brand.models.find((m) => m.slug === params.model);
    if (!model) throw notFound();
    return { brand, model };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.model.name ?? "Model"} — Interactive Guide | AutoINFO`,
      },
      {
        name: "description",
        content: loaderData
          ? `Explore ${loaderData.model.name} parts and maintenance tips. ${loaderData.brand.tagline}.`
          : "Interactive car model guide",
      },
      {
        property: "og:title",
        content: `${loaderData?.model.name ?? "Model"} — AutoINFO`,
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
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Model not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to brands
        </Link>
      </div>
    </div>
  ),
});

function ModelDetailPage() {
  const { brand, model } = Route.useLoaderData() as {
    brand: Brand;
    model: CarModel;
  };
  const [activePart, setActivePart] = useState<CarPart | null>(null);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      {/* Header */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 pt-6 sm:px-6 sm:pt-8">
        <Link
          to="/brand/$slug"
          params={{ slug: brand.slug }}
          className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          {brand.name}
        </Link>
        <AutoInfoLogo size="sm" />
        <span
          className="hidden text-[10px] uppercase tracking-[0.3em] sm:inline"
          style={{ color: brand.accent }}
        >
          {model.tagline ?? "Premium model"}
        </span>
      </header>

      {/* Title */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-6 text-center sm:px-6 sm:pb-6 sm:pt-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          {brand.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          {model.name}
        </motion.h1>
      </section>

      {/* Main grid */}
      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-4 pb-32 sm:px-6 lg:grid-cols-[320px_1fr] lg:gap-8">
        {/* LEFT: parts list */}
        <aside className="order-2 lg:order-1">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Car Parts
            </h2>
            {activePart && (
              <button
                onClick={() => setActivePart(null)}
                className="text-[10px] uppercase tracking-wider text-primary hover:underline"
              >
                Reset view
              </button>
            )}
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {CAR_PARTS.map((part, i) => {
              const isActive = activePart?.id === part.id;
              return (
                <motion.li
                  key={part.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                >
                  <button
                    onClick={() => setActivePart(isActive ? null : part)}
                    className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border px-3 py-3 text-left backdrop-blur-md transition-all ${
                      isActive
                        ? "border-primary/60 bg-card-gradient shadow-glow"
                        : "border-border bg-card-gradient hover:border-primary/40"
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
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition-transform group-hover:scale-110"
                      style={{
                        background: `linear-gradient(135deg, ${brand.accent}33, transparent)`,
                      }}
                      aria-hidden
                    >
                      {part.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-semibold">
                        {part.name}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {part.uz}
                      </p>
                    </div>
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </aside>

        {/* RIGHT: car image + zoom */}
        <div className="order-1 lg:order-2">
          <div
            className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card-gradient shadow-card backdrop-blur-md"
            style={{
              background: `radial-gradient(ellipse at center, ${brand.accent}1a, transparent 70%), var(--gradient-card)`,
            }}
          >
            {/* Brand glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(ellipse at 70% 50%, ${brand.accent}22, transparent 60%)`,
              }}
            />

            {/* Car image with zoom transform */}
            <motion.div
              key={`${model.slug}-zoom`}
              className="absolute inset-0"
              initial={{ x: 400, opacity: 0, scale: 1 }}
              animate={
                activePart
                  ? {
                      x: 0,
                      opacity: 1,
                      scale: activePart.focus.scale,
                      // pan so the focus point centers in the viewport
                      originX: activePart.focus.x / 100,
                      originY: activePart.focus.y / 100,
                    }
                  : { x: 0, opacity: 1, scale: 1 }
              }
              transition={{
                x: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.8 },
                scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                transformOrigin: activePart
                  ? `${activePart.focus.x}% ${activePart.focus.y}%`
                  : "center",
              }}
            >
              <img
                src={model.image}
                alt={model.name}
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* Highlight marker */}
            <AnimatePresence>
              {activePart && (
                <motion.div
                  key={activePart.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="pointer-events-none absolute"
                  style={{
                    left: `50%`,
                    top: `50%`,
                    transform: "translate(-50%, -50%)",
                    width: `${activePart.focus.size * 1.8}%`,
                    aspectRatio: "1",
                  }}
                >
                  <div
                    className="absolute inset-0 animate-ping rounded-full opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${brand.accent}88, transparent 60%)`,
                    }}
                  />
                  <div
                    className="absolute inset-[20%] rounded-full border-2"
                    style={{
                      borderColor: brand.accent,
                      boxShadow: `0 0 30px ${brand.accent}, inset 0 0 20px ${brand.accent}66`,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline overlay */}
            {!activePart && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Tap a part to explore
                </p>
                <p className="font-display text-lg sm:text-xl">
                  {model.tagline ?? brand.tagline}
                </p>
              </motion.div>
            )}
          </div>

          {/* Info panel */}
          <AnimatePresence mode="wait">
            {activePart ? (
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
                      {activePart.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {activePart.name} · {activePart.uz}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 text-sm leading-relaxed text-foreground/90">
                  {activePart.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex gap-2"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: brand.accent }}
                      />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                {activePart.seasonal && (
                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    {activePart.seasonal.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-lg border border-border/60 bg-background/40 p-3"
                      >
                        <p
                          className="text-[10px] font-semibold uppercase tracking-wider"
                          style={{ color: brand.accent }}
                        >
                          {s.label}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {s.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="mt-5 border-t border-border/60 pt-3 text-[11px] italic text-muted-foreground">
                  Exact values may differ by model. Always check the owner's
                  manual or driver-side door sticker.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-5 rounded-2xl border border-dashed border-border bg-card-gradient/50 p-5 text-center text-sm text-muted-foreground backdrop-blur-md"
              >
                Chap paneldan biror qismni tanlang — mashina shu joyga yaqinlashtiriladi va batafsil ma'lumot ochiladi.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom note */}
      <footer className="relative z-10 mx-auto max-w-4xl px-6 pb-10 text-center text-[11px] leading-relaxed text-muted-foreground">
        Ma'lumotlar umumiy servis tavsiyalariga asoslangan. Aniq qiymatlar
        avtomobil modeli, ishlab chiqarilgan yili va ishlab chiqaruvchi
        manualiga qarab farq qiladi.
      </footer>
    </main>
  );
}
