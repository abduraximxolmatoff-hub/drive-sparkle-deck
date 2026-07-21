import type { Lang } from "@/i18n/translations";

export type BodyType = "compact-sedan" | "midsize-sedan" | "compact-suv" | "midsize-suv" | "fullsize-suv";

export interface ChevModelSpec {
  slug: string;
  bodyType: BodyType;
  /** Body colour label for badges / theming hints. Marker zoom always uses the actual model image. */
  bodyColor: "white" | "silver" | "black";
  /** Model-specific accent for panels; falls back to the Chevrolet brand accent when omitted. */
  accent?: string;
  /** Tire pressures shown in the tire panel — model-specific. */
  tire: {
    frontPsi: string;
    rearPsi: string;
    loadedPsi: string;
    /** Average replacement mileage window. */
    replacementKm: string;
  };
  /** Whether this model uses the official regulation-based content set (Cobalt only for now). */
  regulationBased: boolean;
}

/**
 * Per-model specs. Non-Cobalt models are labelled "General recommendation"
 * and use body-type-appropriate defaults for pressures / intervals.
 */
export const CHEV_MODEL_SPECS: Record<string, ChevModelSpec> = {
  "cobalt-15l": {
    slug: "cobalt-15l",
    bodyType: "compact-sedan",
    bodyColor: "white",
    tire: { frontPsi: "32–33 PSI", rearPsi: "30–32 PSI", loadedPsi: "34–35 PSI", replacementKm: "40,000–50,000 km" },
    regulationBased: true,
  },
  "gentra-15l": {
    slug: "gentra-15l",
    bodyType: "compact-sedan",
    bodyColor: "silver",
    accent: "oklch(0.78 0.02 250)",
    tire: { frontPsi: "32 PSI", rearPsi: "30 PSI", loadedPsi: "34 PSI", replacementKm: "40,000–50,000 km" },
    regulationBased: false,
  },
  tracker: {
    slug: "tracker",
    bodyType: "compact-suv",
    bodyColor: "black",
    tire: { frontPsi: "33 PSI", rearPsi: "33 PSI", loadedPsi: "35 PSI", replacementKm: "45,000–55,000 km" },
    regulationBased: false,
  },
  trailblazer: {
    slug: "trailblazer",
    bodyType: "midsize-suv",
    bodyColor: "black",
    tire: { frontPsi: "33 PSI", rearPsi: "33 PSI", loadedPsi: "36 PSI", replacementKm: "50,000–60,000 km" },
    regulationBased: false,
  },
  tahoe: {
    slug: "tahoe",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: { frontPsi: "35 PSI", rearPsi: "35 PSI", loadedPsi: "38 PSI", replacementKm: "55,000–70,000 km" },
    regulationBased: false,
  },
  traverse: {
    slug: "traverse",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: { frontPsi: "35 PSI", rearPsi: "35 PSI", loadedPsi: "38 PSI", replacementKm: "55,000–65,000 km" },
    regulationBased: false,
  },
  equinox: {
    slug: "equinox",
    bodyType: "compact-suv",
    bodyColor: "white",
    tire: { frontPsi: "33 PSI", rearPsi: "33 PSI", loadedPsi: "35 PSI", replacementKm: "45,000–55,000 km" },
    regulationBased: false,
  },
  malibu: {
    slug: "malibu",
    bodyType: "midsize-sedan",
    bodyColor: "black",
    tire: { frontPsi: "33 PSI", rearPsi: "31 PSI", loadedPsi: "35 PSI", replacementKm: "50,000–60,000 km" },
    regulationBased: false,
  },
};

export const getChevModelSpec = (slug: string): ChevModelSpec | undefined => CHEV_MODEL_SPECS[slug];

/**
 * Generic tire-content overrides per body type so non-Cobalt models still get
 * sensible technical text (pressures, intervals). Anything not returned here
 * falls back to the Cobalt content structure with the same L/RU/EN copy.
 */
export function getBodyTypeLabel(type: BodyType, lang: Lang): string {
  const map: Record<BodyType, Record<Lang, string>> = {
    "compact-sedan": { uz: "Kompakt sedan", ru: "Компактный седан", en: "Compact sedan" },
    "midsize-sedan": { uz: "O‘rta o‘lchamli sedan", ru: "Среднеразмерный седан", en: "Midsize sedan" },
    "compact-suv": { uz: "Kompakt SUV", ru: "Компактный SUV", en: "Compact SUV" },
    "midsize-suv": { uz: "O‘rta o‘lchamli SUV", ru: "Среднеразмерный SUV", en: "Midsize SUV" },
    "fullsize-suv": { uz: "Katta o‘lchamli SUV", ru: "Полноразмерный SUV", en: "Full-size SUV" },
  };
  return map[type][lang];
}
