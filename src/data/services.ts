import { text, type ServiceText } from "@/i18n/service-translations";
import workshop from "@/assets/services/workshop.jpg";
import recovery from "@/assets/services/recovery.jpg";
export type ServiceCategory = {
  id: string;
  icon: string;
  name: ServiceText;
  description: ServiceText;
  keywords: ServiceText;
};
export const serviceCategories: ServiceCategory[] = [
  {
    id: "tires",
    icon: "tire",
    name: text("Shinomontaj", "Шиномонтаж", "Tire service"),
    description: text(
      "Shina almashtirish, balansirovka va ta’mirlash",
      "Замена, балансировка и ремонт шин",
      "Tire replacement, balancing and repairs",
    ),
    keywords: text(
      "shina ta’miri balansirovka g‘ildirak",
      "шина ремонт балансировка колесо",
      "tire wheel puncture balancing",
    ),
  },
  {
    id: "electrical",
    icon: "electric",
    name: text("Avtoelektrik", "Автоэлектрик", "Auto electrician"),
    description: text(
      "Elektr tizimi va elektronika diagnostikasi",
      "Диагностика электрики и электроники",
      "Electrical systems and electronics diagnostics",
    ),
    keywords: text("elektr chiroq faralar", "электрика фары свет", "electric lights wiring"),
  },
  {
    id: "diagnostics",
    icon: "diagnostic",
    name: text("Avtodiagnostika", "Автодиагностика", "Diagnostics"),
    description: text(
      "Kompyuter diagnostikasi va xatoliklarni aniqlash",
      "Компьютерная диагностика и поиск ошибок",
      "Computer diagnostics and fault detection",
    ),
    keywords: text("kompyuter xato skaner", "компьютер ошибки сканер", "computer faults scan"),
  },
  {
    id: "mechanic",
    icon: "mechanic",
    name: text("Avtomekanik", "Автомеханик", "Auto mechanic"),
    description: text(
      "Dvigatel, transmissiya va mexanik ta’mir",
      "Ремонт двигателя, трансмиссии и механики",
      "Engine, transmission and mechanical repairs",
    ),
    keywords: text(
      "mexanik motor dvigatel ta’mir",
      "механик двигатель ремонт",
      "mechanic engine repair",
    ),
  },
  {
    id: "oil",
    icon: "oil",
    name: text("Moy almashtirish", "Замена масла", "Oil change"),
    description: text(
      "Motor moyi, filtrlar va texnik xizmat",
      "Моторное масло, фильтры и обслуживание",
      "Engine oil, filters and maintenance",
    ),
    keywords: text("moy motor filtr almashtirish", "масло фильтр замена", "oil filter replacement"),
  },
  {
    id: "ac",
    icon: "ac",
    name: text("Konditsioner", "Кондиционер", "Air conditioning"),
    description: text(
      "Konditsioner diagnostikasi va to‘ldirish",
      "Диагностика и заправка кондиционера",
      "Air conditioning diagnosis and recharge",
    ),
    keywords: text("freon sovutish", "фреон охлаждение", "freon cooling recharge"),
  },
  {
    id: "wash",
    icon: "wash",
    name: text("Avtomobil yuvish", "Автомойка", "Car wash"),
    description: text(
      "Moyka, salon tozalash va detailing",
      "Мойка, чистка салона и детейлинг",
      "Car wash, interior cleaning and detailing",
    ),
    keywords: text("moyka tozalash detailing", "мойка чистка детейлинг", "wash clean detailing"),
  },
  {
    id: "towing",
    icon: "tow",
    name: text("Evakuator", "Эвакуатор", "Towing"),
    description: text(
      "24/7 avtomobil evakuatsiyasi",
      "Эвакуация автомобилей 24/7",
      "24/7 vehicle recovery",
    ),
    keywords: text("evakuatsiya yordam", "эвакуация помощь", "tow recovery emergency"),
  },
  {
    id: "battery",
    icon: "battery",
    name: text("Akkumulyator", "Аккумулятор", "Battery"),
    description: text(
      "Akkumulyator tekshiruvi, almashtirish va ishga tushirish",
      "Проверка, замена аккумулятора и запуск",
      "Battery testing, replacement and jump-start",
    ),
    keywords: text("batareya ishga tushirish", "батарея запуск прикурить", "battery jump start"),
  },
  {
    id: "body",
    icon: "body",
    name: text("Kuzov va bo‘yoq", "Кузов и покраска", "Bodywork & paint"),
    description: text(
      "Kuzov ta’miri, bo‘yash va polirovka",
      "Кузовной ремонт, покраска и полировка",
      "Body repairs, painting and polishing",
    ),
    keywords: text("bo‘yoq polirovka", "краска полировка", "paint polish body"),
  },
  {
    id: "lock",
    icon: "lock",
    name: text("Qulf ochish", "Вскрытие замков", "Vehicle unlocking"),
    description: text(
      "Avtomobil eshigi va kalit bilan bog‘liq xizmatlar",
      "Помощь с дверями и ключами автомобиля",
      "Car door unlocking and key services",
    ),
    keywords: text("kalit eshik qulf", "ключ дверь замок", "key door lock"),
  },
  {
    id: "accident",
    icon: "accident",
    name: text("YTH bo‘yicha yordam", "Помощь при ДТП", "Accident assistance"),
    description: text(
      "YTH holatida maslahat va amaliy yordam",
      "Консультация и помощь при ДТП",
      "Advice and practical accident support",
    ),
    keywords: text("avariya yordam", "авария помощь дтп", "crash accident help"),
  },
];
export const emergencyServices = ["towing", "battery", "tires", "mechanic"];
export const serviceFilters = {
  distances: [3, 5, 10],
  ratings: [4, 4.5, 4.8],
  prices: [100000, 200000, 500000],
};
export type ServiceProvider = {
  id: string;
  name: string;
  category: string[];
  logo: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  distance: number;
  address: ServiceText;
  phone: string | null;
  workingHours: string;
  isOpen: boolean;
  is24_7: boolean;
  services: string[];
  priceRange: { min: number; max: number };
  latitude: number;
  longitude: number;
  photos: string[];
  isDemo: boolean;
};
const provider = (
  id: string,
  name: string,
  category: string[],
  distance: number,
  rating: number,
  reviewCount: number,
  min: number,
  isOpen = true,
  is24_7 = false,
): ServiceProvider => ({
  id,
  name,
  category,
  logo: name
    .split(/\s/)
    .map((x) => x[0])
    .join("")
    .slice(0, 2),
  coverImage: category.includes("towing") ? recovery : workshop,
  rating,
  reviewCount,
  distance,
  address: text(
    "Toshkent, " +
      (id === "automaster" ? "Amir Temur shoh ko‘chasi, 42" : "Shota Rustaveli ko‘chasi, 18"),
    "Ташкент, " + (id === "automaster" ? "проспект Амира Темура, 42" : "улица Шота Руставели, 18"),
    "Tashkent, " + (id === "automaster" ? "42 Amir Temur Avenue" : "18 Shota Rustaveli Street"),
  ),
  phone: null,
  workingHours: is24_7 ? "24/7" : "09:00 – 20:00",
  isOpen,
  is24_7,
  services: category,
  priceRange: { min, max: min * 4 },
  latitude: 41.3111,
  longitude: 69.2797,
  photos: [workshop, recovery],
  isDemo: true,
});
export const serviceProviders: ServiceProvider[] = [
  provider(
    "automaster",
    "AutoMaster",
    ["mechanic", "diagnostics", "oil", "ac"],
    1.8,
    4.8,
    126,
    120000,
  ),
  provider("tirelab", "Tire Lab", ["tires", "battery"], 1.2, 4.9, 84, 50000),
  provider(
    "volt",
    "Volt Auto",
    ["electrical", "diagnostics", "battery", "lock"],
    2.4,
    4.7,
    63,
    80000,
  ),
  provider(
    "recovery",
    "Road Assist 24",
    ["towing", "battery", "tires", "mechanic", "accident", "lock"],
    3.6,
    4.8,
    208,
    150000,
    true,
    true,
  ),
  provider("detail", "Detail Studio", ["wash", "body"], 4.2, 4.9, 92, 100000, false),
  provider("pitstop", "Pit Stop", ["tires", "oil", "ac", "wash"], 5.8, 4.6, 51, 60000),
];
export const findCategory = (id: string) => serviceCategories.find((c) => c.id === id);
export type ProviderFilters = {
  query: string;
  category?: string;
  distance?: number;
  rating?: number;
  price?: number;
  openNow?: boolean;
  alwaysOpen?: boolean;
  sort?: string;
};
function normalize(s: string) {
  return s.toLocaleLowerCase().replace(/[‘’'`]/g, "");
}
export function matchingCategories(query: string) {
  const q = normalize(query.trim());
  return serviceCategories.filter((c) =>
    normalize(
      Object.values(c.name).join(" ") +
        " " +
        Object.values(c.keywords).join(" ") +
        " " +
        Object.values(c.description).join(" "),
    ).includes(q),
  );
}
export function filterProviders(f: ProviderFilters) {
  const ids = matchingCategories(f.query).map((c) => c.id);
  const q = normalize(f.query.trim());
  return serviceProviders
    .filter(
      (p) =>
        (!f.category || p.category.includes(f.category)) &&
        (!q || normalize(p.name).includes(q) || p.category.some((id) => ids.includes(id))) &&
        (!f.distance || p.distance <= f.distance) &&
        (!f.rating || p.rating >= f.rating) &&
        (!f.price || p.priceRange.min <= f.price) &&
        (!f.openNow || p.isOpen) &&
        (!f.alwaysOpen || p.is24_7),
    )
    .sort((a, b) =>
      f.sort === "rating"
        ? b.rating - a.rating
        : f.sort === "reviews"
          ? b.reviewCount - a.reviewCount
          : a.distance - b.distance,
    );
}
