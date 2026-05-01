import bmwLogo from "@/assets/logo-bmw.png";
import chevLogo from "@/assets/logo-chevrolet.png";
import mbLogo from "@/assets/logo-mercedes.png";
import audiLogo from "@/assets/logo-audi.png";
import porscheLogo from "@/assets/logo-porsche.png";
import lamboLogo from "@/assets/logo-lamborghini.png";

import bmwM5 from "@/assets/bmw-m5.jpg";
import bmwX5 from "@/assets/bmw-x5.jpg";
import bmwI7 from "@/assets/bmw-i7.jpg";
import cobalt15l from "@/assets/cobalt-15l-main.jpg";
import chevGentra from "@/assets/chev-gentra.jpg";
import chevTracker from "@/assets/chev-tracker.jpg";
import mbC from "@/assets/mb-c.jpg";
import mbE from "@/assets/mb-e.jpg";
import mbG63 from "@/assets/mb-g63.jpg";
import audiA6 from "@/assets/audi-a6.jpg";
import audiQ7 from "@/assets/audi-q7.jpg";
import audiRs7 from "@/assets/audi-rs7.jpg";
import porscheCayenne from "@/assets/porsche-cayenne.jpg";
import porschePanamera from "@/assets/porsche-panamera.jpg";
import porsche911 from "@/assets/porsche-911.jpg";
import lamboHuracan from "@/assets/lambo-huracan.jpg";
import lamboAventador from "@/assets/lambo-aventador.jpg";
import lamboUrus from "@/assets/lambo-urus.jpg";

// Cobalt high-quality part images
import cobaltTires from "@/assets/parts/cobalt/tires.jpg";
import cobaltEngineOil from "@/assets/parts/cobalt/engine-oil.jpg";
import cobaltEngine from "@/assets/parts/cobalt/engine.jpg";
import cobaltBattery from "@/assets/parts/cobalt/battery.jpg";
import cobaltWindows from "@/assets/parts/cobalt/windows.jpg";
import cobaltHeadlights from "@/assets/parts/cobalt/headlights.jpg";
import cobaltBrakes from "@/assets/parts/cobalt/brakes.jpg";
import cobaltCooling from "@/assets/parts/cobalt/cooling.jpg";
import cobaltSuspension from "@/assets/parts/cobalt/suspension.jpg";

/** Per-part high-resolution image keyed by CarPart.id */
export type PartImageMap = Partial<Record<string, string>>;

/** Marker overlay coordinates per part id (percentages of viewer area). */
export interface PartMarker {
  /** 0-100 horizontal percentage */
  x: number;
  /** 0-100 vertical percentage */
  y: number;
  /** marker diameter as a percentage of viewer width */
  size: number;
}

export type PartMarkerMap = Partial<Record<string, PartMarker>>;

export interface CarModel {
  slug: string;
  name: string;
  image: string;
  /** Translation key for tagline, e.g. "tagline.compactSedan" */
  taglineKey?: string;
  legacySlugs?: string[];
  /** Optional high-res image per part id (tires, engine, ...). */
  partImages?: PartImageMap;
  /** Optional marker positions per part id when shown on the main image. */
  markers?: PartMarkerMap;
  /** Optional ordered list of real 360° spin frames. When empty, simulated CSS 360 is used. */
  images360?: string[];
  /** Force simulated CSS 360 even if frames are present. Defaults to true when images360 is empty. */
  useSimulated360?: boolean;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
  accent: string;
  tagline: string;
  models: CarModel[];
}

/** Default marker positions used when a model doesn't override them. */
export const DEFAULT_MARKERS: PartMarkerMap = {
  tires: { x: 22, y: 78, size: 18 },
  windows: { x: 48, y: 32, size: 26 },
  oil: { x: 22, y: 42, size: 18 },
  engine: { x: 22, y: 44, size: 22 },
  battery: { x: 26, y: 44, size: 16 },
  brakes: { x: 22, y: 76, size: 18 },
  headlights: { x: 12, y: 56, size: 16 },
  cooling: { x: 18, y: 50, size: 18 },
  airfilter: { x: 30, y: 44, size: 16 },
  suspension: { x: 24, y: 80, size: 20 },
};

const cobaltPartImages: PartImageMap = {
  tires: cobaltTires,
  oil: cobaltEngineOil,
  engine: cobaltEngine,
  battery: cobaltBattery,
  windows: cobaltWindows,
  headlights: cobaltHeadlights,
  brakes: cobaltBrakes,
  cooling: cobaltCooling,
  // airfilter image generation failed — fall back to engine bay
  airfilter: cobaltEngine,
  suspension: cobaltSuspension,
};

export const brands: Brand[] = [
  {
    slug: "bmw",
    name: "BMW",
    logo: bmwLogo,
    accent: "oklch(0.6 0.18 240)",
    tagline: "The Ultimate Driving Machine",
    models: [
      { slug: "m5", name: "BMW M5", image: bmwM5, taglineKey: "tagline.v8TwinTurbo", images360: [], useSimulated360: true },
      { slug: "x5", name: "BMW X5", image: bmwX5, taglineKey: "tagline.luxurySUV", images360: [], useSimulated360: true },
      {
        slug: "7-series-sedan",
        name: "BMW 7 Series Sedan",
        image: bmwI7,
        taglineKey: "tagline.flagshipLuxurySedan",
        legacySlugs: ["i7"],
        images360: [],
        useSimulated360: true,
      },
    ],
  },
  {
    slug: "chevrolet",
    name: "Chevrolet",
    logo: chevLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "Find New Roads",
    models: [
      {
        slug: "cobalt-15l",
        name: "Chevrolet Cobalt 1.5L",
        image: cobalt15l,
        taglineKey: "tagline.compactSedan",
        legacySlugs: ["cobalt", "cobalt-16l"],
        partImages: cobaltPartImages,
        images360: [],
        useSimulated360: true,
      },
      {
        slug: "gentra-15l",
        name: "Chevrolet Gentra 1.5L",
        image: chevGentra,
        taglineKey: "tagline.citySedan",
        legacySlugs: ["gentra"],
        images360: [],
        useSimulated360: true,
      },
      { slug: "tracker", name: "Chevrolet Tracker", image: chevTracker, taglineKey: "tagline.compactSUV", images360: [], useSimulated360: true },
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    logo: mbLogo,
    accent: "oklch(0.85 0.005 250)",
    tagline: "The Best or Nothing",
    models: [
      { slug: "c-class", name: "Mercedes-Benz C-Class", image: mbC, taglineKey: "tagline.compactExecutive", images360: [], useSimulated360: true },
      { slug: "e-class", name: "Mercedes-Benz E-Class", image: mbE, taglineKey: "tagline.businessSedan", images360: [], useSimulated360: true },
      {
        slug: "g-class",
        name: "Mercedes-Benz G-Class",
        image: mbG63,
        taglineKey: "tagline.iconic4x4",
        legacySlugs: ["g63"],
        images360: [],
        useSimulated360: true,
      },
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    logo: audiLogo,
    accent: "oklch(0.6 0.22 25)",
    tagline: "Vorsprung durch Technik",
    models: [
      { slug: "a6", name: "Audi A6", image: audiA6, taglineKey: "tagline.executiveSedan", images360: [], useSimulated360: true },
      { slug: "q7", name: "Audi Q7", image: audiQ7, taglineKey: "tagline.sevenSeatSUV", images360: [], useSimulated360: true },
      { slug: "rs7", name: "Audi RS7", image: audiRs7, taglineKey: "tagline.sportback600", images360: [], useSimulated360: true },
    ],
  },
  {
    slug: "porsche",
    name: "Porsche",
    logo: porscheLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "There Is No Substitute",
    models: [
      { slug: "cayenne", name: "Porsche Cayenne", image: porscheCayenne, taglineKey: "tagline.performanceSUV", images360: [], useSimulated360: true },
      { slug: "panamera", name: "Porsche Panamera", image: porschePanamera, taglineKey: "tagline.luxurySportSedan", images360: [], useSimulated360: true },
      { slug: "911", name: "Porsche 911", image: porsche911, taglineKey: "tagline.iconicSportsCar", images360: [], useSimulated360: true },
    ],
  },
  {
    slug: "lamborghini",
    name: "Lamborghini",
    logo: lamboLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "Expect the Unexpected",
    models: [
      { slug: "huracan", name: "Lamborghini Huracán", image: lamboHuracan, taglineKey: "tagline.v10Supercar" },
      { slug: "aventador", name: "Lamborghini Aventador", image: lamboAventador, taglineKey: "tagline.v12Flagship" },
      { slug: "urus", name: "Lamborghini Urus", image: lamboUrus, taglineKey: "tagline.superSUV" },
    ],
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);

export const getBrandModel = (brandSlug: string, modelSlug: string) => {
  const brand = getBrand(brandSlug);

  if (!brand) {
    return null;
  }

  const model = brand.models.find(
    (entry) => entry.slug === modelSlug || entry.legacySlugs?.includes(modelSlug),
  );

  if (!model) {
    return null;
  }

  return { brand, model };
};
