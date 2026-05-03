import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import type { Brand } from "@/data/brands";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  brand: Brand;
  index: number;
}

export function BrandShowcaseCard({ brand, index }: Props) {
  const { t } = useLanguage();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (brand.models.length <= 1) return;
    const id = setInterval(
      () => setImgIndex((i) => (i + 1) % brand.models.length),
      2800 + index * 300,
    );
    return () => clearInterval(id);
  }, [brand.models.length, index]);

  const current = brand.models[imgIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -3 }}
      className="group"
      style={{ ["--brand-accent" as string]: brand.accent }}
    >
      <Link
        to="/brand/$slug"
        params={{ slug: brand.slug }}
        className="relative flex h-36 w-full items-center overflow-hidden rounded-3xl border border-border/70 bg-card-gradient px-5 shadow-card backdrop-blur-xl transition-all duration-500 hover:border-primary/50 sm:h-40"
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 80% 50%, ${brand.accent}33, transparent 70%)`,
          }}
        />

        {/* Faded big brand text */}
        <span
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-6xl font-black uppercase tracking-tight text-foreground/[0.06] sm:text-7xl"
          aria-hidden
        >
          {brand.name}
        </span>

        {/* Logo */}
        <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-background/40 p-2 backdrop-blur-sm sm:h-24 sm:w-24">
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            className="h-full w-full object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Brand title */}
        <div className="relative z-10 ml-4 min-w-0 flex-1">
          <h2 className="truncate font-display text-lg font-bold tracking-tight sm:text-xl">
            {brand.name}
          </h2>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {brand.models.length} {t("home.modelsCount")}
          </p>
        </div>

        {/* Cycling car image */}
        <div className="relative z-10 ml-2 h-full w-1/2 shrink-0 sm:w-[55%]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current.slug}
              src={current.image}
              alt={current.name}
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-contain object-right drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
}
