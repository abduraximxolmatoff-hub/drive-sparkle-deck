import type { Lang } from "@/i18n/translations";

export type BodyType =
  | "compact-sedan"
  | "midsize-sedan"
  | "compact-suv"
  | "midsize-suv"
  | "fullsize-suv"
  | "performance-sedan"
  | "performance-suv"
  | "sports-car"
  | "supercar";

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
 * Per-model specs, covering every brand in the catalogue (name kept for
 * backwards compatibility — this map is no longer Chevrolet-only).
 * Non-Cobalt models are labelled "General recommendation" and use
 * body-type-appropriate defaults for pressures / intervals, based on
 * publicly documented specs for each vehicle.
 */
export const CHEV_MODEL_SPECS: Record<string, ChevModelSpec> = {
  "cobalt-15l": {
    slug: "cobalt-15l",
    bodyType: "compact-sedan",
    bodyColor: "white",
    tire: {
      frontPsi: "32–33 PSI",
      rearPsi: "30–32 PSI",
      loadedPsi: "34–35 PSI",
      replacementKm: "40,000–50,000 km",
    },
    regulationBased: true,
  },
  "gentra-15l": {
    slug: "gentra-15l",
    bodyType: "compact-sedan",
    bodyColor: "silver",
    accent: "oklch(0.78 0.02 250)",
    tire: {
      frontPsi: "32 PSI",
      rearPsi: "30 PSI",
      loadedPsi: "34 PSI",
      replacementKm: "40,000–50,000 km",
    },
    regulationBased: false,
  },
  tracker: {
    slug: "tracker",
    bodyType: "compact-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "33 PSI",
      loadedPsi: "35 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },
  trailblazer: {
    slug: "trailblazer",
    bodyType: "midsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "33 PSI",
      loadedPsi: "36 PSI",
      replacementKm: "50,000–60,000 km",
    },
    regulationBased: false,
  },
  tahoe: {
    slug: "tahoe",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "35 PSI",
      rearPsi: "35 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "55,000–70,000 km",
    },
    regulationBased: false,
  },
  traverse: {
    slug: "traverse",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "35 PSI",
      rearPsi: "35 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "55,000–65,000 km",
    },
    regulationBased: false,
  },
  equinox: {
    slug: "equinox",
    bodyType: "compact-suv",
    bodyColor: "white",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "33 PSI",
      loadedPsi: "35 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },
  malibu: {
    slug: "malibu",
    bodyType: "midsize-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "31 PSI",
      loadedPsi: "35 PSI",
      replacementKm: "50,000–60,000 km",
    },
    regulationBased: false,
  },

  // ---- BMW ----
  m5: {
    slug: "m5",
    bodyType: "performance-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "32 PSI",
      rearPsi: "35 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "25,000–35,000 km",
    },
    regulationBased: false,
  },
  x5: {
    slug: "x5",
    bodyType: "midsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "36 PSI",
      rearPsi: "36 PSI",
      loadedPsi: "41 PSI",
      replacementKm: "50,000–60,000 km",
    },
    regulationBased: false,
  },
  "7-series-sedan": {
    slug: "7-series-sedan",
    bodyType: "midsize-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "34 PSI",
      rearPsi: "34 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },

  // ---- Mercedes-Benz ----
  "c-class": {
    slug: "c-class",
    bodyType: "compact-sedan",
    bodyColor: "silver",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "33 PSI",
      loadedPsi: "37 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },
  "e-class": {
    slug: "e-class",
    bodyType: "midsize-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "34 PSI",
      rearPsi: "34 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },
  "g-class": {
    slug: "g-class",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "29 PSI",
      rearPsi: "36 PSI",
      loadedPsi: "40 PSI",
      replacementKm: "40,000–50,000 km",
    },
    regulationBased: false,
  },

  // ---- Audi ----
  a6: {
    slug: "a6",
    bodyType: "midsize-sedan",
    bodyColor: "silver",
    tire: {
      frontPsi: "33 PSI",
      rearPsi: "33 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "45,000–55,000 km",
    },
    regulationBased: false,
  },
  q7: {
    slug: "q7",
    bodyType: "fullsize-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "35 PSI",
      rearPsi: "38 PSI",
      loadedPsi: "42 PSI",
      replacementKm: "50,000–60,000 km",
    },
    regulationBased: false,
  },
  rs7: {
    slug: "rs7",
    bodyType: "performance-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "32 PSI",
      rearPsi: "35 PSI",
      loadedPsi: "38 PSI",
      replacementKm: "25,000–35,000 km",
    },
    regulationBased: false,
  },

  // ---- Porsche ----
  cayenne: {
    slug: "cayenne",
    bodyType: "performance-suv",
    bodyColor: "white",
    tire: {
      frontPsi: "34 PSI",
      rearPsi: "41 PSI",
      loadedPsi: "44 PSI",
      replacementKm: "30,000–45,000 km",
    },
    regulationBased: false,
  },
  panamera: {
    slug: "panamera",
    bodyType: "performance-sedan",
    bodyColor: "black",
    tire: {
      frontPsi: "32 PSI",
      rearPsi: "38 PSI",
      loadedPsi: "41 PSI",
      replacementKm: "25,000–40,000 km",
    },
    regulationBased: false,
  },
  "911": {
    slug: "911",
    bodyType: "sports-car",
    bodyColor: "white",
    tire: {
      frontPsi: "32 PSI",
      rearPsi: "38 PSI",
      loadedPsi: "—",
      replacementKm: "20,000–35,000 km",
    },
    regulationBased: false,
  },

  // ---- Lamborghini ----
  huracan: {
    slug: "huracan",
    bodyType: "supercar",
    bodyColor: "white",
    tire: {
      frontPsi: "30 PSI",
      rearPsi: "29 PSI",
      loadedPsi: "—",
      replacementKm: "10,000–20,000 km",
    },
    regulationBased: false,
  },
  aventador: {
    slug: "aventador",
    bodyType: "supercar",
    bodyColor: "black",
    tire: {
      frontPsi: "30 PSI",
      rearPsi: "29 PSI",
      loadedPsi: "—",
      replacementKm: "10,000–20,000 km",
    },
    regulationBased: false,
  },
  urus: {
    slug: "urus",
    bodyType: "performance-suv",
    bodyColor: "black",
    tire: {
      frontPsi: "35 PSI",
      rearPsi: "40 PSI",
      loadedPsi: "44 PSI",
      replacementKm: "25,000–35,000 km",
    },
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
    "midsize-sedan": {
      uz: "O‘rta o‘lchamli sedan",
      ru: "Среднеразмерный седан",
      en: "Midsize sedan",
    },
    "compact-suv": { uz: "Kompakt SUV", ru: "Компактный SUV", en: "Compact SUV" },
    "midsize-suv": { uz: "O‘rta o‘lchamli SUV", ru: "Среднеразмерный SUV", en: "Midsize SUV" },
    "fullsize-suv": { uz: "Katta o‘lchamli SUV", ru: "Полноразмерный SUV", en: "Full-size SUV" },
    "performance-sedan": {
      uz: "Sport sedan",
      ru: "Спортивный седан",
      en: "Performance sedan",
    },
    "performance-suv": {
      uz: "Sport SUV",
      ru: "Спортивный SUV",
      en: "Performance SUV",
    },
    "sports-car": { uz: "Sport avtomobil", ru: "Спорткар", en: "Sports car" },
    supercar: { uz: "Superkar", ru: "Суперкар", en: "Supercar" },
  };
  return map[type][lang];
}
