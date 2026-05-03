import { createFileRoute } from "@tanstack/react-router";
import { brands } from "@/data/brands";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { BrandShowcaseCard } from "@/components/BrandShowcaseCard";
import { useLanguage } from "@/i18n/LanguageContext";

export const Route = createFileRoute("/brands")({
  head: () => ({
    meta: [
      { title: "Brands — AutoINFO" },
      { name: "description", content: "All car brands available in AutoINFO." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const { t, lang } = useLanguage();
  return (
    <main key={lang} className="relative min-h-screen pb-28">
      <AnimatedBackground />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>
      <section className="relative z-10 mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t("nav.brands")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("brands.subtitle")}</p>
      </section>
      <section className="relative z-10 mx-auto mt-6 grid max-w-3xl gap-4 px-4 sm:px-6">
        {brands.map((b, i) => (
          <BrandShowcaseCard key={b.slug} brand={b} index={i} />
        ))}
      </section>
      <BottomNav />
    </main>
  );
}
