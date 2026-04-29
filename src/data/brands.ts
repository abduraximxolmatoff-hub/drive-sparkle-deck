import bmwLogo from "@/assets/logo-bmw.png";
import chevLogo from "@/assets/logo-chevrolet.png";
import mbLogo from "@/assets/logo-mercedes.png";
import audiLogo from "@/assets/logo-audi.png";
import porscheLogo from "@/assets/logo-porsche.png";
import lamboLogo from "@/assets/logo-lamborghini.png";

import bmwM5 from "@/assets/bmw-m5.jpg";
import bmwX5 from "@/assets/bmw-x5.jpg";
import bmwI7 from "@/assets/bmw-i7.jpg";
import chevCobalt from "@/assets/chev-cobalt.jpg";
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

export interface CarModel {
  slug: string;
  name: string;
  image: string;
  tagline?: string;
}

export interface Brand {
  slug: string;
  name: string;
  logo: string;
  accent: string;
  tagline: string;
  models: CarModel[];
}

export const brands: Brand[] = [
  {
    slug: "bmw",
    name: "BMW",
    logo: bmwLogo,
    accent: "oklch(0.6 0.18 240)",
    tagline: "The Ultimate Driving Machine",
    models: [
      { slug: "m5", name: "BMW M5", image: bmwM5, tagline: "4.4L V8 Twin-Turbo" },
      { slug: "x5", name: "BMW X5", image: bmwX5, tagline: "Luxury SUV" },
      { slug: "i7", name: "BMW i7", image: bmwI7, tagline: "All-Electric Flagship" },
    ],
  },
  {
    slug: "chevrolet",
    name: "Chevrolet",
    logo: chevLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "Find New Roads",
    models: [
      { slug: "cobalt", name: "Chevrolet Cobalt 1.6L", image: chevCobalt, tagline: "Compact Sedan" },
      { slug: "gentra", name: "Chevrolet Gentra 1.5L", image: chevGentra, tagline: "City Sedan" },
      { slug: "tracker", name: "Chevrolet Tracker", image: chevTracker, tagline: "Compact SUV" },
    ],
  },
  {
    slug: "mercedes-benz",
    name: "Mercedes-Benz",
    logo: mbLogo,
    accent: "oklch(0.85 0.005 250)",
    tagline: "The Best or Nothing",
    models: [
      { slug: "c-class", name: "Mercedes C-Class", image: mbC, tagline: "Compact Executive" },
      { slug: "e-class", name: "Mercedes E-Class", image: mbE, tagline: "Business Sedan" },
      { slug: "g63", name: "Mercedes G63 AMG", image: mbG63, tagline: "Iconic 4x4" },
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    logo: audiLogo,
    accent: "oklch(0.6 0.22 25)",
    tagline: "Vorsprung durch Technik",
    models: [
      { slug: "a6", name: "Audi A6", image: audiA6, tagline: "Executive Sedan" },
      { slug: "q7", name: "Audi Q7", image: audiQ7, tagline: "7-Seat SUV" },
      { slug: "rs7", name: "Audi RS7", image: audiRs7, tagline: "600HP Sportback" },
    ],
  },
  {
    slug: "porsche",
    name: "Porsche",
    logo: porscheLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "There Is No Substitute",
    models: [
      { slug: "cayenne", name: "Porsche Cayenne", image: porscheCayenne, tagline: "Performance SUV" },
      { slug: "panamera", name: "Porsche Panamera", image: porschePanamera, tagline: "Luxury Sport Sedan" },
      { slug: "911", name: "Porsche 911", image: porsche911, tagline: "Iconic Sports Car" },
    ],
  },
  {
    slug: "lamborghini",
    name: "Lamborghini",
    logo: lamboLogo,
    accent: "oklch(0.82 0.16 85)",
    tagline: "Expect the Unexpected",
    models: [
      { slug: "huracan", name: "Lamborghini Huracán", image: lamboHuracan, tagline: "5.2L V10 Supercar" },
      { slug: "aventador", name: "Lamborghini Aventador", image: lamboAventador, tagline: "6.5L V12 Flagship" },
    ],
  },
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
