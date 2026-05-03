import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { brands } from "@/data/brands";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { BrandShowcaseCard } from "@/components/BrandShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoINFO — Understand Your Car. Drive Smarter." },
      {
        name: "description",
        content:
          "AutoINFO helps you understand your car: which parts to maintain, when to check them, and how to drive smarter.",
      },
      { property: "og:title", content: "AutoINFO" },
      { property: "og:description", content: "Understand your car. Drive smarter." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, lang } = useLanguage();

  return (
    <main key={lang} className="relative min-h-screen pb-28 animate-in fade-in duration-300">
      <AnimatedBackground />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>

      <section className="relative z-10 mx-auto max-w-3xl px-4 pb-6 pt-6 text-center sm:px-6 sm:pt-10">
        <AutoInfoLogo />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
        >
          {t("home.subtitle")}
        </motion.p>
      </section>

      <section className="relative z-10 mx-auto grid max-w-3xl gap-4 px-4 pb-6 sm:px-6">
        {brands.map((brand, i) => (
          <BrandShowcaseCard key={brand.slug} brand={brand} index={i} />
        ))}
      </section>

      <footer className="relative z-10 pb-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("home.footer")}
      </footer>

      <BottomNav />
    </main>
  );
}
