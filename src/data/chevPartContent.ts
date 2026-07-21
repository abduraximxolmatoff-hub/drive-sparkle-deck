import type { Lang } from "@/i18n/translations";
import { COBALT_PART_INFO, type CobaltPartInfo } from "@/data/cobaltPartInfo";
import { CHEV_MODEL_SPECS, type ChevModelSpec } from "@/data/chevModelSpecs";

type L = Record<Lang, string>;
type LL = Record<Lang, string[]>;

const T = (uz: string, ru: string, en: string): L => ({ uz, ru, en });
const TL = (uz: string[], ru: string[], en: string[]): LL => ({ uz, ru, en });

/**
 * Returns CobaltPartInfo-shaped content for any (model, part) combination.
 *
 * - Cobalt → uses the regulation-based COBALT_PART_INFO entries.
 * - Other Chevrolet models → returns generic-recommendation content built on
 *   the same schema so the panel renders identically, with model-specific
 *   tire pressures / intervals injected from CHEV_MODEL_SPECS.
 *
 * Returns undefined only when the part has no content anywhere (safe skip).
 */
export function getChevPartInfo(modelSlug: string, partId: string): CobaltPartInfo | undefined {
  const spec = CHEV_MODEL_SPECS[modelSlug];

  // Cobalt keeps its authored regulation content.
  if (spec?.regulationBased) {
    return COBALT_PART_INFO[partId];
  }

  const generic = buildGenericPartInfo(partId, spec);
  if (generic) return generic;

  // Fall back to Cobalt's authored copy structure (still generic-labelled at render time)
  // so parts that lack a per-model template still show useful content.
  return COBALT_PART_INFO[partId];
}

function buildGenericPartInfo(
  partId: string,
  spec: ChevModelSpec | undefined,
): CobaltPartInfo | undefined {
  switch (partId) {
    case "tires":
      return {
        partId,
        title: T("Shina holati va bosimi", "Состояние и давление шин", "Tire condition and pressure"),
        function: T(
          "Shinalar yo'l bilan aloqani, tormozlashni, boshqaruvni va xavfsizlikni ta'minlaydi.",
          "Шины обеспечивают сцепление с дорогой, торможение, управляемость и безопасность.",
          "Tires provide grip, braking, steering control and driving safety.",
        ),
        intervals: [
          {
            label: T("Bosim", "Давление", "Pressure"),
            value: T(
              `Old ${spec?.tire.frontPsi ?? "32 PSI"} · Orqa ${spec?.tire.rearPsi ?? "30 PSI"}`,
              `Перед ${spec?.tire.frontPsi ?? "32 PSI"} · Зад ${spec?.tire.rearPsi ?? "30 PSI"}`,
              `F ${spec?.tire.frontPsi ?? "32 PSI"} · R ${spec?.tire.rearPsi ?? "30 PSI"}`,
            ),
            tone: "accent",
          },
          { label: T("Tekshirish", "Проверка", "Inspection"), value: T("Oyiga 1 marta", "Раз в месяц", "Once a month") },
          {
            label: T("Almashtirish", "Замена", "Replacement"),
            value: T(spec?.tire.replacementKm ?? "40,000–50,000 km", spec?.tire.replacementKm ?? "40 000–50 000 км", spec?.tire.replacementKm ?? "40,000–50,000 km"),
            tone: "accent",
          },
        ],
        inspection: TL(
          ["Bosimni oyiga 1 marta va uzoq safardan oldin tekshiring.", "Shina holatini har 10 000 km da ko'zdan kechiring.", "Balanslash — har 10 000–15 000 km.", "Tekislash — har 20 000 km yoki rul o'zgarsa.", "Bosimni doim sovuq shinada o'lchang."],
          ["Проверяйте давление раз в месяц и перед дальней поездкой.", "Осматривайте шины каждые 10 000 км.", "Балансировка — каждые 10 000–15 000 км.", "Развал-схождение — каждые 20 000 км или при уводе руля.", "Меряйте давление на холодных шинах."],
          ["Check pressure monthly and before long trips.", "Inspect tires every 10,000 km.", "Balance wheels every 10,000–15,000 km.", "Align every 20,000 km or if steering pulls.", "Measure pressure on cold tires."],
        ),
        replacement: TL(
          [`O'rtacha tavsiya — ${spec?.tire.replacementKm ?? "40 000–50 000 km"}.`, "Protektor 1,6 mm dan past bo'lsa darhol almashtiring.", "Yon devor yorig'i yoki shishishida almashtiring."],
          [`Средняя рекомендация — ${spec?.tire.replacementKm ?? "40 000–50 000 км"}.`, "Ниже 1,6 мм — заменить немедленно.", "Меняйте при трещинах или вздутиях боковины."],
          [`Average replacement — ${spec?.tire.replacementKm ?? "40,000–50,000 km"}.`, "Below 1.6 mm — replace immediately.", "Replace on sidewall cracks or bulges."],
        ),
        heavyUsage: TL(
          ["Yomon yo'l, og'ir yuk, issiq/sovuq — tez-tez tekshiring.", "Har 10 000 km da shinalarni almashtirib qo'ying."],
          ["Плохие дороги, груз, жара/холод — чаще проверка.", "Ротация каждые 10 000 км."],
          ["Rough roads, heavy loads, hot/cold — inspect more often.", "Rotate tires every 10,000 km."],
        ),
        warnings: TL(
          ["Bir tomonga tortish.", "Rul titrashi.", "Notekis yeyilish.", "Bosim tez pasayadi.", "Yon devorda yoriq/shishish.", "Yo'l shovqini oshgan."],
          ["Уводит в сторону.", "Вибрация руля.", "Неравномерный износ.", "Давление быстро падает.", "Трещины/вздутия боковины.", "Громкий шум."],
          ["Pulls to one side.", "Steering vibration.", "Uneven wear.", "Pressure drops fast.", "Sidewall cracks/bulges.", "Loud road noise."],
        ),
        usefulTips: TL(
          ["Past bosim yoqilg'i sarfini oshiradi.", "Sovuq havoda bosim pasayadi.", "Protektor: 6–8 mm yaxshi · 3–4 mm ehtiyot · <1,6 mm xavfli."],
          ["Низкое давление увеличивает расход.", "На холоде давление падает.", "Протектор: 6–8 мм отлично · 3–4 мм внимание · <1,6 мм опасно."],
          ["Low pressure raises fuel use.", "Cold weather lowers pressure.", "Tread: 6–8 mm good · 3–4 mm caution · <1.6 mm critical."],
        ),
        summaryInspection: T("Oyiga 1 marta + har 10 000 km.", "Раз в месяц + каждые 10 000 км.", "Monthly + every 10,000 km."),
        summaryReplacement: T(spec?.tire.replacementKm ?? "40 000–50 000 km yoki shikastlanganda.", spec?.tire.replacementKm ?? "40 000–50 000 км или при повреждении.", spec?.tire.replacementKm ?? "40,000–50,000 km or if damaged."),
        badges: ["inspect", "replace", "safety"],
      };

    case "oil":
      return {
        partId,
        title: T("Motor moyi va moy filtri", "Моторное масло и фильтр", "Engine oil and filter"),
        function: T(
          "Motor moyi harakatlanuvchi qismlarni moylaydi, sovutadi va yeyilishdan himoya qiladi.",
          "Масло смазывает, охлаждает и защищает от износа детали двигателя.",
          "Engine oil lubricates, cools and protects moving engine parts.",
        ),
        intervals: [
          { label: T("Almashtirish", "Замена", "Replacement"), value: T("10 000 km yoki 12 oy", "10 000 км или 12 мес.", "10,000 km or 12 mo"), tone: "accent" },
          { label: T("Og'ir sharoit", "Тяжёлые условия", "Heavy usage"), value: T("5 000–7 000 km", "5 000–7 000 км", "5,000–7,000 km"), tone: "warn" },
          { label: T("Daraja", "Уровень", "Level check"), value: T("Oyiga 1 marta", "Раз в месяц", "Monthly") },
        ],
        inspection: TL(
          ["Moy darajasini oyiga 1 marta tekshiring.", "Har servisda rang va hidini baholang.", "Sizib chiqishlarni tekshiring."],
          ["Уровень масла — раз в месяц.", "На каждом ТО оценивайте цвет и запах.", "Проверяйте утечки."],
          ["Check oil level monthly.", "Assess color and smell at every service.", "Check for leaks."],
        ),
        replacement: TL(
          ["Normal — har 10 000 km.", "Og'ir sharoitda — 5 000–7 000 km.", "Filtrni doim moy bilan birga almashtiring."],
          ["Обычно — каждые 10 000 км.", "В тяжёлых условиях — 5 000–7 000 км.", "Фильтр меняйте вместе с маслом."],
          ["Normal — every 10,000 km.", "Heavy usage — 5,000–7,000 km.", "Always replace filter with oil."],
        ),
        heavyUsage: TL(
          ["Qisqa masofalar, tirbandlik, uzoq salt ishlash, chang, issiq va tog' yo'llari."],
          ["Короткие поездки, пробки, долгий холостой ход, пыль, жара и горы."],
          ["Short trips, traffic, long idling, dust, heat and mountain roads."],
        ),
        warnings: TL(
          ["Moy chirog'i.", "Past daraja.", "Qora yoki kuygan hid.", "Dvigatel ovozi oshgan.", "Moy izi.", "Qizib ketish."],
          ["Индикатор давления масла.", "Низкий уровень.", "Тёмное или горелое масло.", "Усиленный звук двигателя.", "Лужа масла.", "Перегрев."],
          ["Oil warning light.", "Low level.", "Dark or burnt oil.", "Louder engine noise.", "Oil puddle.", "Overheating."],
        ),
        usefulTips: TL(
          ["Faqat tavsiya qilingan qovushqoqlikdan foydalaning.", "Turli moylarni aralashtirmang.", "Kech almashtirish dvigatel umrini qisqartiradi."],
          ["Используйте только рекомендованную вязкость.", "Не смешивайте типы масла без нужды.", "Опоздание сокращает ресурс двигателя."],
          ["Use only recommended viscosity.", "Do not mix oil types unnecessarily.", "Late replacement shortens engine life."],
        ),
        summaryInspection: T("Oyiga 1 marta + har servisda.", "Раз в месяц + на каждом ТО.", "Monthly + every service."),
        summaryReplacement: T("10 000 km · og'ir sharoitda 5–7 000 km.", "10 000 км · в тяжёлых условиях 5–7 000 км.", "10,000 km · 5–7,000 km in heavy usage."),
        badges: ["inspect", "replace", "heavy"],
      };

    // For remaining parts, fall back to Cobalt's authored content structure —
    // it is technically accurate for the same-brand platform and the panel
    // label will make clear that this is a general recommendation, not
    // regulation-based data.
    default:
      return undefined;
  }
}
