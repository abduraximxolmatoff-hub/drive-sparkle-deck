import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { getBodyTypeLabel, type BodyType } from "@/data/chevModelSpecs";
import type { Lang } from "@/i18n/translations";

interface Props {
  brandAccent: string;
  bodyType: BodyType;
  regulationBased: boolean;
}

type Tri = Record<Lang, string>;
const T = (uz: string, ru: string, en: string): Tri => ({ uz, ru, en });

interface Row {
  labelKey: Tri;
  interval: Tri;
  tone: "default" | "accent" | "warn";
}

/**
 * Realistic "at a glance" service interval sets by vehicle class. These are
 * general manufacturer-typical guidelines (not a substitute for the owner's
 * manual), scaled for how hard each class of vehicle is normally driven.
 */
function getScheduleForClass(bodyType: BodyType): Row[] {
  const base = (
    oil: string,
    brakeFluid: string,
    coolant: string,
    filters: string,
    major: string,
  ): Row[] => [
    {
      labelKey: T("Motor moyi", "Моторное масло", "Engine oil"),
      interval: T(oil, oil, oil),
      tone: "accent",
    },
    {
      labelKey: T("Tormoz suyuqligi", "Тормозная жидкость", "Brake fluid"),
      interval: T(brakeFluid, brakeFluid, brakeFluid),
      tone: "default",
    },
    {
      labelKey: T("Antifriz", "Антифриз", "Coolant"),
      interval: T(coolant, coolant, coolant),
      tone: "default",
    },
    {
      labelKey: T("Filtrlar (havo/salon)", "Фильтры (воздух/салон)", "Air/cabin filters"),
      interval: T(filters, filters, filters),
      tone: "default",
    },
    {
      labelKey: T("Katta texnik xizmat", "Большое ТО", "Major service"),
      interval: T(major, major, major),
      tone: "warn",
    },
  ];

  switch (bodyType) {
    case "compact-sedan":
    case "midsize-sedan":
    case "compact-suv":
      return base(
        "10,000 km / 12 oy",
        "40,000 km / 2 yil",
        "60,000 km / 3 yil",
        "15,000 km",
        "60,000 km",
      );
    case "midsize-suv":
    case "fullsize-suv":
      return base(
        "10,000 km / 12 oy",
        "40,000 km / 2 yil",
        "60,000 km / 3 yil",
        "15,000–20,000 km",
        "60,000–80,000 km",
      );
    case "performance-sedan":
    case "sports-car":
      return base(
        "8,000–10,000 km / 12 oy",
        "30,000 km / 2 yil",
        "50,000 km / 3 yil",
        "15,000 km",
        "50,000–60,000 km",
      );
    case "performance-suv":
      return base(
        "10,000 km / 12 oy",
        "30,000 km / 2 yil",
        "50,000 km / 3 yil",
        "15,000 km",
        "50,000–60,000 km",
      );
    case "supercar":
      return base(
        "8,000 km / 12 oy",
        "24,000 km / 2 yil",
        "40,000 km / 3 yil",
        "10,000–15,000 km",
        "40,000–50,000 km",
      );
    default:
      return base(
        "10,000 km / 12 oy",
        "40,000 km / 2 yil",
        "60,000 km / 3 yil",
        "15,000 km",
        "60,000 km",
      );
  }
}

const toneStyles = (
  accent: string,
): Record<Row["tone"], { bg: string; fg: string; border: string }> => ({
  default: {
    bg: "rgba(255,255,255,0.04)",
    fg: "rgb(229,229,229)",
    border: "rgba(255,255,255,0.1)",
  },
  accent: { bg: `${accent}1f`, fg: accent, border: `${accent}55` },
  warn: {
    bg: "rgba(239,68,68,0.1)",
    fg: "rgb(248,113,113)",
    border: "rgba(239,68,68,0.35)",
  },
});

export function VehicleMaintenanceOverview({ brandAccent, bodyType, regulationBased }: Props) {
  const { t, lang } = useLanguage();
  const rows = getScheduleForClass(bodyType);
  const styles = toneStyles(brandAccent);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 rounded-2xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md sm:p-6"
      style={{ borderColor: `${brandAccent}40` }}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2
            className="font-display text-xl font-semibold sm:text-2xl"
            style={{ color: brandAccent }}
          >
            {t("maint.title")}
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {getBodyTypeLabel(bodyType, lang)}
          </p>
        </div>
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
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {rows.map((row, i) => {
          const s = styles[row.tone];
          return (
            <motion.div
              key={row.labelKey.en}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="rounded-xl border p-4 backdrop-blur-sm"
              style={{ borderColor: s.border, background: s.bg }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: s.fg }}
              >
                {row.labelKey[lang]}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/90">
                {row.interval[lang]}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
