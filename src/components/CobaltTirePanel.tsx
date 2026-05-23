import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  brandAccent: string;
}

type Lang = "uz" | "ru" | "en";
type Tri = Record<Lang, string>;

const T = {
  regulationBased: { uz: "Reglament asosida", ru: "По регламенту", en: "Regulation-based" } as Tri,
  // Function card
  funcTitle: { uz: "Shina vazifasi", ru: "Назначение шин", en: "Tire Function" } as Tri,
  funcItems: {
    uz: ["Yo'l ushlash", "Avtomobil barqarorligi", "Tormoz samaradorligi", "Boshqaruv aniqligi", "Yurish qulayligi", "Harakat xavfsizligi"],
    ru: ["Сцепление с дорогой", "Стабильность автомобиля", "Эффективность торможения", "Точность управления", "Комфорт движения", "Безопасность"],
    en: ["Road grip", "Vehicle stability", "Braking performance", "Steering control", "Driving comfort", "Safety during movement"],
  } as Record<Lang, string[]>,
  // Pressure
  pressureTitle: { uz: "Tavsiya etilgan bosim", ru: "Рекомендуемое давление", en: "Recommended Pressure" } as Tri,
  front: { uz: "Old shinalar", ru: "Передние шины", en: "Front Tires" } as Tri,
  rear: { uz: "Orqa shinalar", ru: "Задние шины", en: "Rear Tires" } as Tri,
  loaded: { uz: "Yuklangan holatda", ru: "С полной загрузкой", en: "Loaded Vehicle" } as Tri,
  coldNote: {
    uz: "Bosimni har doim shinalar sovuq paytida tekshiring.",
    ru: "Всегда проверяйте давление на холодных шинах.",
    en: "Always check tire pressure when tires are cold.",
  } as Tri,
  // Inspection
  inspectTitle: { uz: "Tekshirish oralig'i", ru: "Интервалы проверки", en: "Inspection Interval" } as Tri,
  inspectItems: {
    uz: [
      "Shina bosimi → har oyda tekshirish",
      "Shina holati → har 10 000 km",
      "G'ildirak balanslash → har 10–15 000 km",
      "Tekislash (alignment) → har 20 000 km yoki rul o'zgarsa",
      "Uzoq safardan oldin albatta tekshiring",
    ],
    ru: [
      "Давление шин → проверять каждый месяц",
      "Состояние шин → каждые 10 000 км",
      "Балансировка колёс → каждые 10–15 000 км",
      "Развал-схождение → каждые 20 000 км или при изменении управляемости",
      "Проверка перед дальней поездкой",
    ],
    en: [
      "Tire pressure → check every month",
      "Tire condition → inspect every 10,000 km",
      "Wheel balancing → every 10,000–15,000 km",
      "Wheel alignment → every 20,000 km or if steering changes",
      "Inspect before long-distance trips",
    ],
  } as Record<Lang, string[]>,
  // Replacement
  replaceTitle: { uz: "Almashtirish tavsiyasi", ru: "Рекомендация по замене", en: "Replacement Recommendation" } as Tri,
  lifespan: { uz: "O'rtacha xizmat muddati", ru: "Средний срок службы", en: "Average lifespan" } as Tri,
  replaceIf: { uz: "Darhol almashtiring agar:", ru: "Немедленно заменить если:", en: "Replace immediately if:" } as Tri,
  replaceItems: {
    uz: ["Protektor chuqurligi past", "Yoriqlar paydo bo'lsa", "Yon devor shikastlangan", "Notekis yeyilish", "Shina silkinishi", "Bosim tez-tez tushadi"],
    ru: ["Малая глубина протектора", "Появились трещины", "Повреждение боковины", "Неравномерный износ", "Вибрация шины", "Частая потеря давления"],
    en: ["Tread depth becomes low", "Cracks appear", "Sidewall damage exists", "Uneven wear appears", "Tire vibration occurs", "Frequent pressure loss"],
  } as Record<Lang, string[]>,
  // Tread
  treadTitle: { uz: "Minimal protektor chuqurligi", ru: "Минимальная глубина протектора", en: "Minimum Safe Tread Depth" } as Tri,
  treadGood: { uz: "Yaxshi", ru: "Хорошо", en: "Good" } as Tri,
  treadWarn: { uz: "Diqqat", ru: "Внимание", en: "Warning" } as Tri,
  treadCrit: { uz: "Kritik", ru: "Критично", en: "Critical" } as Tri,
  treadGoodDesc: { uz: "6–8 mm — yaxshi holat", ru: "6–8 мм — хорошее состояние", en: "6–8 mm — good condition" } as Tri,
  treadWarnDesc: { uz: "3–4 mm — ushlash kamayadi", ru: "3–4 мм — снижено сцепление", en: "3–4 mm — reduced grip" } as Tri,
  treadCritDesc: { uz: "1.6 mm dan past — zudlik bilan almashtirish", ru: "Ниже 1.6 мм — немедленная замена", en: "Below 1.6 mm — immediate replacement" } as Tri,
  // Timeline
  timelineTitle: { uz: "Xizmat ko'rsatish vaqt jadvali", ru: "График обслуживания", en: "Service Timeline" } as Tri,
  // Tips
  tipsTitle: { uz: "Tezkor xavfsizlik maslahatlari", ru: "Краткие советы по безопасности", en: "Quick Safety Tips" } as Tri,
  tips: {
    uz: [
      "Past bosim yoqilg'i sarfini oshiradi",
      "Noto'g'ri bosim tormozni susaytiradi",
      "Issiq havoda bosim oshadi",
      "Sovuq havoda bosim pasayadi",
      "Har 10 000 km da shinalarni almashtirib chiqing",
    ],
    ru: [
      "Низкое давление увеличивает расход топлива",
      "Неверное давление снижает эффективность торможения",
      "В жару давление растёт",
      "В холод давление падает",
      "Меняйте шины местами каждые 10 000 км",
    ],
    en: [
      "Low tire pressure increases fuel consumption",
      "Incorrect pressure reduces braking efficiency",
      "Hot weather increases tire pressure",
      "Cold weather lowers tire pressure",
      "Rotate tires every 10,000 km for even wear",
    ],
  } as Record<Lang, string[]>,
  // Warnings
  warnTitle: { uz: "Ogohlantirish belgilari", ru: "Предупреждающие признаки", en: "Warning Signs" } as Tri,
  warns: {
    uz: ["Rulning silkinishi", "Avtomobil bir tomonga tortadi", "Notekis protektor yeyilishi", "Yoriq yoki shishlar", "Bosimning tez-tez tushishi", "Kuchli yo'l shovqini"],
    ru: ["Вибрация руля", "Авто уводит в сторону", "Неравномерный износ", "Трещины или вздутия", "Частая потеря давления", "Громкий дорожный шум"],
    en: ["Steering vibration", "Vehicle pulls to one side", "Uneven tread wear", "Cracks or bulges", "Frequent pressure loss", "Loud road noise"],
  } as Record<Lang, string[]>,
};

const ts = (v: Tri, lang: Lang): string => v[lang];
const tl = (v: Record<Lang, string[]>, lang: Lang): string[] => v[lang];

function Card({
  accent,
  icon,
  title,
  badge,
  children,
  glow = false,
}: {
  accent: string;
  icon: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card-gradient p-5 shadow-card backdrop-blur-md"
      style={{
        borderColor: `${accent}33`,
        boxShadow: glow ? `0 20px 60px -30px ${accent}99` : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
        style={{ background: `${accent}26` }}
      />
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
            style={{ background: `linear-gradient(135deg, ${accent}44, transparent)` }}
          >
            {icon}
          </span>
          <h4 className="font-display text-sm font-semibold sm:text-base">{title}</h4>
        </div>
        {badge && (
          <span
            className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
            style={{ background: `${accent}1a`, color: accent, borderColor: `${accent}55` }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function Bullets({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-1.5 text-xs leading-relaxed text-foreground/90">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function PressureRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/40 px-3 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className="rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums"
        style={{ background: accent, color: "oklch(0.13 0.01 250)" }}
      >
        {value}
      </span>
    </div>
  );
}

function TreadBar({
  label,
  desc,
  pct,
  color,
}: {
  label: string;
  desc: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-semibold" style={{ color }}>
          {label}
        </span>
        <span className="text-muted-foreground">{desc}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-background/60">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}99` }}
        />
      </div>
    </div>
  );
}

export function CobaltTirePanel({ brandAccent }: Props) {
  const { lang } = useLanguage();
  const L = lang as Lang;

  const timeline = [
    { km: "0", label: { uz: "Yangi shina", ru: "Новая шина", en: "New tire" }[L] },
    { km: "10K", label: { uz: "Tekshir + balans", ru: "Проверка + баланс", en: "Inspection + balancing" }[L] },
    { km: "20K", label: { uz: "Tekislash", ru: "Развал-схождение", en: "Alignment check" }[L] },
    { km: "40–50K", label: { uz: "Almashtirish", ru: "Замена", en: "Replacement" }[L] },
  ];

  return (
    <motion.div
      key="cobalt-tire"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="mt-5 space-y-4"
    >
      {/* Header banner */}
      <div
        className="overflow-hidden rounded-2xl border p-5 backdrop-blur-md sm:p-6"
        style={{
          borderColor: `${brandAccent}55`,
          background: `linear-gradient(135deg, ${brandAccent}22, transparent 60%), var(--gradient-card)`,
          boxShadow: `0 20px 60px -30px ${brandAccent}aa`,
        }}
      >
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.3em]"
          style={{ color: brandAccent }}
        >
          Chevrolet Cobalt 1.5L · {ts(T.regulationBased, L)}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
          🛞 {ts(T.funcTitle, L)}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {tl(T.funcItems, L).map((it) => (
            <li
              key={it}
              className="rounded-full border px-2.5 py-1 text-[11px] text-foreground/85"
              style={{ borderColor: `${brandAccent}44`, background: `${brandAccent}10` }}
            >
              {it}
            </li>
          ))}
        </ul>
      </div>

      {/* Top grid: pressure + inspection */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card accent={brandAccent} icon="🎛️" title={ts(T.pressureTitle, L)} glow>
          <div className="space-y-2">
            <PressureRow label={ts(T.front, L)} value="32–33 PSI" accent={brandAccent} />
            <PressureRow label={ts(T.rear, L)} value="30–32 PSI" accent={brandAccent} />
            <PressureRow label={ts(T.loaded, L)} value="34–35 PSI" accent={brandAccent} />
          </div>
          <p className="mt-3 text-[11px] italic text-muted-foreground">❄ {ts(T.coldNote, L)}</p>
        </Card>

        <Card accent={brandAccent} icon="📅" title={ts(T.inspectTitle, L)} badge={ts(T.regulationBased, L)}>
          <Bullets items={tl(T.inspectItems, L)} accent={brandAccent} />
        </Card>
      </div>

      {/* Replacement + Tread */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card accent={brandAccent} icon="♻️" title={ts(T.replaceTitle, L)}>
          <div
            className="mb-3 flex items-center justify-between rounded-lg border px-3 py-2"
            style={{
              borderColor: "rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.08)",
            }}
          >
            <span className="text-xs text-muted-foreground">{ts(T.lifespan, L)}</span>
            <span className="text-sm font-bold tabular-nums text-foreground">40,000–50,000 km</span>
          </div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-destructive/90">
            {ts(T.replaceIf, L)}
          </p>
          <Bullets items={tl(T.replaceItems, L)} accent="rgb(248,113,113)" />
        </Card>

        <Card accent={brandAccent} icon="📏" title={ts(T.treadTitle, L)}>
          <div className="space-y-3">
            <TreadBar
              label={ts(T.treadGood, L)}
              desc={ts(T.treadGoodDesc, L)}
              pct={95}
              color="rgb(74,222,128)"
            />
            <TreadBar
              label={ts(T.treadWarn, L)}
              desc={ts(T.treadWarnDesc, L)}
              pct={50}
              color="rgb(250,204,21)"
            />
            <TreadBar
              label={ts(T.treadCrit, L)}
              desc={ts(T.treadCritDesc, L)}
              pct={18}
              color="rgb(248,113,113)"
            />
          </div>
        </Card>
      </div>

      {/* Service Timeline */}
      <Card accent={brandAccent} icon="🛣️" title={ts(T.timelineTitle, L)}>
        <div className="relative pt-6">
          <div
            className="absolute left-2 right-2 top-9 h-[2px] rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${brandAccent}, transparent)`,
            }}
          />
          <div className="relative grid grid-cols-4 gap-2">
            {timeline.map((node, i) => (
              <motion.div
                key={node.km}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="flex flex-col items-center text-center"
              >
                <span
                  className="mb-2 flex h-6 w-6 items-center justify-center rounded-full border-2"
                  style={{
                    background: "var(--background)",
                    borderColor: brandAccent,
                    boxShadow: `0 0 18px ${brandAccent}cc, inset 0 0 8px ${brandAccent}55`,
                  }}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: brandAccent }} />
                </span>
                <span className="font-display text-xs font-bold" style={{ color: brandAccent }}>
                  {node.km}
                </span>
                <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                  {node.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Tips + Warnings */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card accent={brandAccent} icon="💡" title={ts(T.tipsTitle, L)}>
          <ul className="grid gap-1.5">
            {tl(T.tips, L).map((tip, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-start gap-2 rounded-lg border border-border/50 bg-background/30 px-2.5 py-1.5 text-[11px] leading-snug text-foreground/90"
              >
                <span>💡</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card accent="rgb(248,113,113)" icon="⚠️" title={ts(T.warnTitle, L)}>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {tl(T.warns, L).map((w, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                className="flex items-start gap-2 rounded-lg border px-2.5 py-1.5 text-[11px] leading-snug"
                style={{
                  borderColor: "rgba(248,113,113,0.35)",
                  background: "rgba(248,113,113,0.08)",
                  color: "rgb(254,202,202)",
                }}
              >
                <span>⚠️</span>
                <span>{w}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}
