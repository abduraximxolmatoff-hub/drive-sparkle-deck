import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { User, Heart, Plus, Trash2 } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/i18n/LanguageContext";
import { brands } from "@/data/brands";
import { useFavorites } from "@/hooks/use-favorites";
import { MaintenanceReminders } from "@/components/MaintenanceReminders";
import { ProfileHeader } from "@/components/ProfileHeader";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — AutoINFO" },
      { name: "description", content: "Asosiy mashinangiz va servis eslatmalari — AutoINFO." },
      { property: "og:title", content: "Profil — AutoINFO" },
      { property: "og:description", content: "Asosiy mashinangiz va servis eslatmalari." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { t, lang } = useLanguage();
  const { favorites, toggleFavorite: toggleFav } = useFavorites();

  const allModels = useMemo(
    () =>
      brands.flatMap((b) =>
        b.models.map((m) => ({
          key: `${b.slug}/${m.slug}`,
          brand: b,
          model: m,
        })),
      ),
    [],
  );

  const favs = allModels.filter((m) => favorites.includes(m.key));


  return (
    <main key={lang} className="relative min-h-screen pb-28">
      <AnimatedBackground />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>

      <section className="relative z-10 mx-auto max-w-3xl space-y-5 px-4 pt-6 sm:px-6">
        <ProfileHeader />

        {/* App goal */}
        <div
          className="rounded-3xl border border-primary/30 p-5 backdrop-blur-md"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 18%, transparent), transparent)",
          }}
        >
          <p className="text-sm leading-relaxed text-foreground/90">{t("profile.goal")}</p>
        </div>

        <MaintenanceReminders />

        {/* Favorites */}
        <div className="rounded-3xl border border-border bg-card-gradient p-5 backdrop-blur-md shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">{t("profile.myCars")}</h2>
          </div>

          {favs.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("profile.noFavorites")}</p>
          ) : (
            <ul className="grid gap-2">
              {favs.map(({ key, brand, model }) => (
                <li
                  key={key}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-2"
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    className="h-12 w-20 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/$brand/$model"
                      params={{ brand: brand.slug, model: model.slug }}
                      className="block truncate text-sm font-semibold hover:text-primary"
                    >
                      {model.name}
                    </Link>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {brand.name}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFav(key)}
                    className="rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <details className="mt-4 group">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Plus className="h-4 w-4" /> {t("profile.addCar")}
            </summary>
            <ul className="mt-3 grid max-h-64 gap-1 overflow-y-auto pr-1">
              {allModels.map(({ key, brand, model }) => {
                const active = favorites.includes(key);
                return (
                  <li key={key}>
                    <button
                      onClick={() => toggleFav(key)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
                        active
                          ? "border-primary/60 bg-primary/10 text-primary"
                          : "border-border/60 bg-background/40 hover:border-primary/40"
                      }`}
                    >
                      <span className="truncate">{model.name}</span>
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {brand.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between rounded-3xl border border-border bg-card-gradient p-5 backdrop-blur-md shadow-card">
          <div>
            <h2 className="font-display text-lg font-semibold">{t("profile.language")}</h2>
            <p className="text-xs text-muted-foreground">UZ · RU · EN</p>
          </div>
          <LanguageSwitcher />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
