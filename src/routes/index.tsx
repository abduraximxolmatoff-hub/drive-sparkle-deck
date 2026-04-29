import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { brands } from "@/data/brands";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoINFO — Explore Premium Car Brands & Models" },
      {
        name: "description",
        content:
          "Browse luxury and performance cars from BMW, Mercedes-Benz, Audi, Porsche, Lamborghini, and Chevrolet. A premium automotive exploration experience.",
      },
      { property: "og:title", content: "AutoINFO — Premium Car Explorer" },
      {
        property: "og:description",
        content: "Discover models from the world's most iconic car brands.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  const [clickedSlug, setClickedSlug] = useState<string | null>(null);

  const handleClick = (slug: string) => {
    if (clickedSlug) return;
    setClickedSlug(slug);
    setTimeout(() => navigate({ to: "/brand/$slug", params: { slug } }), 850);
  };

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-8">
        <AutoInfoLogo size="sm" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Premium Car Explorer
        </span>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-3 text-xs uppercase tracking-[0.4em] text-primary/80"
        >
          Choose your brand
        </motion.p>
        <AutoInfoLogo />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mx-auto mt-4 max-w-xl text-base text-muted-foreground"
        >
          Explore iconic models from the world's most legendary automakers.
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-5 px-6 pb-24 sm:gap-6 md:grid-cols-3">
        {brands.map((brand, i) => {
          const isClicked = clickedSlug === brand.slug;
          const isOther = clickedSlug && clickedSlug !== brand.slug;
          return (
            <motion.button
              key={brand.slug}
              onClick={() => handleClick(brand.slug)}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isOther ? 0 : 1,
                y: 0,
                scale: isClicked ? 1.4 : 1,
              }}
              transition={{
                delay: clickedSlug ? 0 : 0.4 + i * 0.08,
                duration: clickedSlug ? 0.6 : 0.5,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-card-gradient p-6 shadow-card backdrop-blur-md transition-colors hover:border-primary/40"
              style={{
                ["--brand-accent" as string]: brand.accent,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at center, ${brand.accent}33, transparent 70%)`,
                }}
              />
              <div className="relative flex flex-1 items-center justify-center">
                <motion.img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  width={512}
                  height={512}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="h-24 w-24 object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110 sm:h-28 sm:w-28 md:h-32 md:w-32"
                />
              </div>
              <div className="relative mt-4 text-center">
                <h2 className="font-display text-lg font-semibold tracking-wide md:text-xl">
                  {brand.name}
                </h2>
                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {brand.models.length} Models
                </p>
              </div>
            </motion.button>
          );
        })}
      </section>

      <footer className="relative z-10 pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AutoINFO. Drive the future.
      </footer>
    </main>
  );
}
