import { useLanguage } from "@/i18n/LanguageContext";
import { LANGS, type Lang } from "@/i18n/translations";

const LABELS: Record<Lang, string> = { uz: "UZ", ru: "RU", en: "EN" };

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-card-gradient/60 p-1 backdrop-blur-md"
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`relative rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 sm:text-xs ${
              active
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            {LABELS[l]}
          </button>
        );
      })}
    </div>
  );
}
