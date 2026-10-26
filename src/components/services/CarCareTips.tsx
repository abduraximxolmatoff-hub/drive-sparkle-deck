import { Disc3, Droplet, BatteryCharging, CircleStop, Wind, Thermometer, Lightbulb, Wrench, Activity } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";
type Item = {
  id: string;
  icon: typeof Disc3;
  title: Record<Lang, string>;
  text: Record<Lang, string>;
};

const ITEMS: Item[] = [
  {
    id: "tires",
    icon: Disc3,
    title: { uz: "G‘ildiraklar", ru: "Шины", en: "Tires" },
    text: {
      uz: "Bosimni oyiga 1 marta tekshiring. Protektor yeyilishini nazorat qiling.",
      ru: "Проверяйте давление раз в месяц. Следите за износом протектора.",
      en: "Check pressure monthly. Monitor tread wear.",
    },
  },
  {
    id: "oil",
    icon: Droplet,
    title: { uz: "Motor moyi", ru: "Моторное масло", en: "Engine Oil" },
    text: {
      uz: "Modelga qarab odatda 5 000–10 000 km oralig‘ida almashtirish kerak.",
      ru: "Меняйте каждые 5 000–10 000 км в зависимости от модели.",
      en: "Change every 5,000–10,000 km depending on the model.",
    },
  },
  {
    id: "battery",
    icon: BatteryCharging,
    title: { uz: "Akkumulyator", ru: "Аккумулятор", en: "Battery" },
    text: {
      uz: "3 yildan keyin akkumulyatorni muntazam test qilish tavsiya etiladi.",
      ru: "После 3 лет рекомендуется регулярно проверять аккумулятор.",
      en: "After 3 years, regular battery testing is recommended.",
    },
  },
  {
    id: "brakes",
    icon: CircleStop,
    title: { uz: "Tormozlar", ru: "Тормоза", en: "Brakes" },
    text: {
      uz: "G‘ichirlash, titrash yoki uzoq to‘xtash sezilsa, servisga boring.",
      ru: "Если есть скрип, вибрация или длинный тормозной путь — в сервис.",
      en: "If there is squeaking, vibration, or longer stopping distance, visit service.",
    },
  },
  {
    id: "airfilter",
    icon: Wind,
    title: { uz: "Havo filtri", ru: "Воздушный фильтр", en: "Air Filter" },
    text: {
      uz: "Changli sharoitda tezroq ifloslanadi, har servisda tekshiring.",
      ru: "В пыльных условиях загрязняется быстрее, проверяйте при каждом сервисе.",
      en: "It gets dirty faster in dusty conditions; check at every service.",
    },
  },
  {
    id: "cooling",
    icon: Thermometer,
    title: { uz: "Sovutish tizimi", ru: "Система охлаждения", en: "Cooling System" },
    text: {
      uz: "Antifriz darajasi va radiator holatini nazorat qiling.",
      ru: "Контролируйте уровень антифриза и состояние радиатора.",
      en: "Monitor coolant level and radiator condition.",
    },
  },
  {
    id: "headlights",
    icon: Lightbulb,
    title: { uz: "Faralar", ru: "Фары", en: "Headlights" },
    text: {
      uz: "Yoritish darajasi va yo‘nalishini muntazam tekshiring.",
      ru: "Регулярно проверяйте яркость и направление света.",
      en: "Regularly check brightness and beam alignment.",
    },
  },
  {
    id: "wipers",
    icon: Wrench,
    title: { uz: "Sterneklar", ru: "Дворники", en: "Wipers" },
    text: {
      uz: "Yiliga 1–2 marta almashtiring, oynani tirnamasligi kerak.",
      ru: "Меняйте 1–2 раза в год, не должны царапать стекло.",
      en: "Replace 1–2 times per year, must not scratch glass.",
    },
  },
  {
    id: "suspension",
    icon: Activity,
    title: { uz: "Podveska", ru: "Подвеска", en: "Suspension" },
    text: {
      uz: "Tovush yoki tebranishlarda diagnostika qiling.",
      ru: "При стуках или вибрации — провести диагностику.",
      en: "Diagnose if you hear knocks or feel vibration.",
    },
  },
];

export function CarCareTips(){ const {lang,t}=useLanguage(); return <details className="mt-10 border-t border-border pt-6"><summary className="cursor-pointer font-display text-lg text-muted-foreground">{t("svc.care")}</summary><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{ITEMS.map(it=><article key={it.id} className="rounded-lg border border-border bg-card p-4"><h3 className="flex items-center gap-2 font-semibold"><it.icon className="h-4 w-4 text-primary"/>{it.title[lang]}</h3><p className="mt-2 text-sm text-muted-foreground">{it.text[lang]}</p></article>)}</div></details>;}
