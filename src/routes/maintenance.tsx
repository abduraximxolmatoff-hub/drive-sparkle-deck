import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Disc3,
  Droplet,
  BatteryCharging,
  CircleStop,
  Wind,
  Thermometer,
  Lightbulb,
  Wrench,
  Activity,
} from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance — AutoINFO" },
      { name: "description", content: "Service intervals and care guidance for your car." },
    ],
  }),
  component: MaintenancePage,
});

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

function MaintenancePage() {
  const { t, lang } = useLanguage();
  return (
    <main key={lang} className="relative min-h-screen pb-28">
      <AnimatedBackground />
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6 sm:pt-8">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>
      <section className="relative z-10 mx-auto max-w-5xl px-4 pt-6 sm:px-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t("nav.service")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("service.subtitle")}</p>
      </section>
      <section className="relative z-10 mx-auto mt-6 grid max-w-5xl gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.article
              key={it.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
              className="rounded-2xl border border-border bg-card-gradient p-5 backdrop-blur-md shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-lg font-semibold">{it.title[lang]}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/85">{it.text[lang]}</p>
            </motion.article>
          );
        })}
      </section>
      <BottomNav />
    </main>
  );
}
