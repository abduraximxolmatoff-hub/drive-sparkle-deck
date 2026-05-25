import type { Lang } from "@/i18n/translations";

type L = Record<Lang, string>;
type LL = Record<Lang, string[]>;

export interface CobaltIntervalChip {
  /** Localized small label (e.g. "Tekshirish", "Almashtirish", "Bosim") */
  label: L;
  /** Localized value (e.g. "10 000 km", "40–50 000 km", "32–33 PSI") */
  value: L;
  /** Optional tone: default | accent | warn | safe */
  tone?: "default" | "accent" | "warn" | "safe";
}

export interface CobaltPartInfo {
  /** Maps to CarPart.id */
  partId: string;
  title: L;
  function: L;
  /** Quick interval chips shown at top (km, months, PSI etc.) */
  intervals?: CobaltIntervalChip[];
  inspection: LL;
  replacement: LL;
  heavyUsage: LL;
  warnings: LL;
  /** Useful, driver-friendly tips */
  usefulTips?: LL;
  summaryInspection: L;
  summaryReplacement: L;
  /** Badges to highlight */
  badges: Array<"inspect" | "replace" | "heavy" | "safety">;
}

const T = (uz: string, ru: string, en: string): L => ({ uz, ru, en });
const TL = (uz: string[], ru: string[], en: string[]): LL => ({ uz, ru, en });

export const COBALT_PART_INFO: Record<string, CobaltPartInfo> = {
  tires: {
    partId: "tires",
    title: T("Shina holati va bosimi", "Состояние и давление шин", "Tire condition and pressure"),
    function: T(
      "Shinalar yo'l bilan aloqani, tormozlash barqarorligini, rul boshqaruvini va xavfsizlikni ta'minlaydi.",
      "Шины обеспечивают сцепление с дорогой, устойчивость при торможении, управляемость и безопасность.",
      "Tires provide road grip, braking stability, steering control and overall driving safety.",
    ),
    intervals: [
      {
        label: T("Bosim", "Давление", "Pressure"),
        value: T("Old 32–33 · Orqa 30–32 PSI", "Перед 32–33 · Зад 30–32 PSI", "F 32–33 · R 30–32 PSI"),
        tone: "accent",
      },
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Oyiga 1 marta", "Раз в месяц", "Once a month"),
      },
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("40–50 000 km", "40–50 000 км", "40–50,000 km"),
        tone: "accent",
      },
    ],
    inspection: TL(
      [
        "Shina bosimini kamida oyiga 1 marta tekshiring.",
        "Har uzoq safardan oldin bosimni tekshiring.",
        "Shina holatini har 10 000 km da ko'zdan kechiring.",
        "G'ildiraklarni balanslash — har 10 000–15 000 km.",
        "G'ildirak burchaklarini har 20 000 km da yoki rul bir tomonga tortsa tekshiring.",
        "Bosimni doim sovuq shinada o'lchang.",
      ],
      [
        "Давление в шинах проверяйте минимум раз в месяц.",
        "Перед каждой длительной поездкой проверяйте давление.",
        "Состояние шин осматривайте каждые 10 000 км.",
        "Балансировка колёс — каждые 10 000–15 000 км.",
        "Развал-схождение — каждые 20 000 км или при уводе руля.",
        "Давление измеряйте только на холодных шинах.",
      ],
      [
        "Check tire pressure at least once a month.",
        "Check pressure before every long trip.",
        "Visually inspect tire condition every 10,000 km.",
        "Wheel balancing every 10,000–15,000 km.",
        "Wheel alignment every 20,000 km or when steering pulls to one side.",
        "Always measure pressure when tires are cold.",
      ],
    ),
    replacement: TL(
      [
        "O'rtacha tavsiya — 40 000–50 000 km.",
        "Protektor 1,6 mm dan past bo'lsa darhol almashtiring.",
        "Yon devor yorig'i, shishish yoki notekis yeyilishda almashtiring.",
        "Shina bosimni ushlay olmasa almashtiring.",
      ],
      [
        "Средняя рекомендация — 40 000–50 000 км.",
        "Если протектор ниже 1,6 мм — заменить немедленно.",
        "Меняйте при трещинах боковины, вздутиях или неравномерном износе.",
        "Меняйте, если шина не держит давление.",
      ],
      [
        "Average replacement: 40,000–50,000 km.",
        "If tread drops below 1.6 mm — replace immediately.",
        "Replace on sidewall cracks, swelling or uneven wear.",
        "Replace if the tire cannot hold pressure.",
      ],
    ),
    heavyUsage: TL(
      ["Yomon yo'l, og'ir yuk, issiq va sovuq ob-havoda shinalarni tez-tez tekshiring.", "Har 10 000 km da g'ildiraklarni almashtirib qo'yish bir tekis yeyilishga yordam beradi."],
      ["В тяжёлых условиях (плохие дороги, груз, жара/холод) проверяйте чаще.", "Ротация колёс каждые 10 000 км — для равномерного износа."],
      ["Rough roads, heavy loads, hot/cold weather — inspect more often.", "Rotate tires every 10,000 km for even wear."],
    ),
    warnings: TL(
      ["Avtomobil bir tomonga tortadi.", "Rul titraydi.", "Notekis protektor yeyilishi.", "Bosim tez-tez pasayadi.", "Yon devorda yoriq yoki shishish.", "Yo'l shovqini oshib ketgan."],
      ["Машину уводит в сторону.", "Вибрация руля.", "Неравномерный износ протектора.", "Давление часто падает.", "Трещины или вздутия боковины.", "Громкий шум от дороги."],
      ["Vehicle pulls to one side.", "Steering wheel vibration.", "Uneven tread wear.", "Pressure drops often.", "Cracks or bulges on sidewall.", "Loud road noise."],
    ),
    usefulTips: TL(
      ["Past bosim yoqilg'i sarfini oshiradi.", "Noto'g'ri bosim tormoz samarasini pasaytiradi.", "Sovuq havoda bosim pasayadi.", "Issiqda bosim biroz oshadi.", "Protektor: 6–8 mm yaxshi · 3–4 mm ehtiyot bo'l · <1,6 mm xavfli."],
      ["Низкое давление повышает расход топлива.", "Неверное давление снижает эффективность тормозов.", "На холоде давление падает.", "В жару давление слегка растёт.", "Протектор: 6–8 мм — отлично · 3–4 мм — внимание · <1,6 мм — опасно."],
      ["Low pressure increases fuel consumption.", "Wrong pressure reduces braking efficiency.", "Cold weather lowers pressure.", "Hot weather slightly raises pressure.", "Tread: 6–8 mm good · 3–4 mm caution · <1.6 mm critical."],
    ),
    summaryInspection: T("Oyiga 1 marta + har 10 000 km.", "Раз в месяц + каждые 10 000 км.", "Monthly + every 10,000 km."),
    summaryReplacement: T("40 000–50 000 km yoki shikastlanganda.", "40 000–50 000 км или при повреждении.", "40,000–50,000 km or if damaged."),
    badges: ["inspect", "replace", "safety"],
  },

  windows: {
    partId: "windows",
    title: T("Oyna va tozalagichlar", "Стёкла и стеклоочистители", "Windows and wipers"),
    function: T(
      "Oyna, old shisha, tozalagichlar va yuvish tizimi yomg'ir, qor, chang va tunda aniq ko'rinishni ta'minlaydi.",
      "Стёкла, лобовое, дворники и омыватель обеспечивают чёткую видимость в дождь, снег, пыль и ночью.",
      "Windows, windshield, wipers and washer system provide clear visibility in rain, snow, dust and at night.",
    ),
    intervals: [
      {
        label: T("Tozalagich", "Дворники", "Wipers"),
        value: T("10–15 000 km · 6–12 oy", "10–15 000 км · 6–12 мес.", "10–15,000 km · 6–12 mo"),
        tone: "accent",
      },
      {
        label: T("Yuvish suyuqligi", "Омывайка", "Washer fluid"),
        value: T("Oyiga 1 marta", "Раз в месяц", "Monthly check"),
      },
    ],
    inspection: TL(
      ["Old va yon oynalarni muntazam tekshiring.", "Har servisda tozalagich va yuvish tizimini tekshiring.", "Yuvish suyuqligi darajasini oyiga 1 marta tekshiring.", "Qish va yomg'ir mavsumidan oldin cho'tkalarni alohida tekshiring."],
      ["Регулярно проверяйте лобовое и боковые стёкла.", "На каждом ТО проверяйте дворники и омыватель.", "Уровень омывайки — раз в месяц.", "Перед зимой и сезоном дождей — отдельная проверка щёток."],
      ["Inspect windshield and side windows regularly.", "Check wipers and washer system every service.", "Check washer fluid level monthly.", "Before winter and rainy season — inspect wiper blades carefully."],
    ),
    replacement: TL(
      ["Cho'tkalar — har 10 000–15 000 km yoki 6–12 oyda.", "Iz qoldirsa yoki shovqin chiqarsa darhol almashtiring.", "Yoriq ko'rinishga to'sqinlik qilsa shishani ta'mirlang yoki almashtiring."],
      ["Дворники — каждые 10 000–15 000 км или 6–12 мес.", "Если оставляют полосы или шумят — заменить сразу.", "Трещина, мешающая обзору — ремонт или замена стекла."],
      ["Wiper blades — every 10,000–15,000 km or 6–12 months.", "Replace immediately if they leave streaks or make noise.", "Repair or replace glass if cracks affect visibility."],
    ),
    heavyUsage: TL(
      ["Yomg'ir, qor, chang va loy sharoitida cho'tkalarni tez-tez tekshiring.", "Qishda muzlagan cho'tkani kuch bilan ko'tarmang."],
      ["В дождь, снег, пыль и грязь — чаще проверка.", "Зимой не отрывайте примёрзшие дворники силой."],
      ["Rain, snow, dust and mud — check more often.", "In winter do not force frozen wiper blades."],
    ),
    warnings: TL(
      ["Tozalagich iz qoldiradi.", "Yuvish suyuqligi purkamaydi.", "Shishada yoriq yoki chip.", "Tunda yoki yomg'irda ko'rinish yomon.", "Tozalagich shovqini.", "Cho'tka shishaga sakraydi."],
      ["Дворник оставляет полосы.", "Омыватель не льёт.", "Скол или трещина на стекле.", "Плохая видимость ночью/в дождь.", "Шум дворников.", "Дворник прыгает по стеклу."],
      ["Wipers leave marks.", "Washer fluid does not spray.", "Glass has cracks or chips.", "Poor visibility at night or in rain.", "Wiper blades make noise.", "Wipers jump on the glass."],
    ),
    usefulTips: TL(
      ["Quruq iflos shishada cho'tkani ishlatmang.", "Faslga mos yuvish suyuqligidan foydalaning.", "Qishda muzlagan cho'tkani majburlamang.", "Shishani ichi va tashqarisidan muntazam tozalang."],
      ["Не включайте дворники на сухом грязном стекле.", "Используйте сезонную омывайку.", "Не дёргайте примёрзшие дворники.", "Регулярно мойте стекло снаружи и изнутри."],
      ["Do not use wipers on dry, dirty glass.", "Use season-appropriate washer fluid.", "Do not force frozen wipers.", "Clean the windshield regularly inside and out."],
    ),
    summaryInspection: T("Har servisda + oyiga.", "На каждом ТО + ежемесячно.", "Every service + monthly."),
    summaryReplacement: T("Cho'tka — 10–15 000 km / 6–12 oy.", "Дворники — 10–15 000 км / 6–12 мес.", "Wipers — 10–15,000 km / 6–12 mo."),
    badges: ["inspect", "replace", "safety"],
  },

  oil: {
    partId: "oil",
    title: T("Motor moyi va moy filtri", "Моторное масло и масляный фильтр", "Engine oil and oil filter"),
    function: T(
      "Motor moyi harakatlanuvchi qismlarni moylaydi, ishqalanishni kamaytiradi, dvigatelni sovutadi va yeyilishdan himoya qiladi.",
      "Моторное масло смазывает подвижные детали, снижает трение, охлаждает двигатель и защищает от износа.",
      "Engine oil lubricates moving parts, reduces friction, cools the engine and protects it from wear.",
    ),
    intervals: [
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("10 000 km — normal", "10 000 км — норма", "10,000 km — normal"),
        tone: "accent",
      },
      {
        label: T("Og'ir foydalanish", "Тяжёлые условия", "Heavy usage"),
        value: T("5 000–7 000 km", "5 000–7 000 км", "5,000–7,000 km"),
        tone: "warn",
      },
      {
        label: T("Daraja tekshiruvi", "Уровень масла", "Level check"),
        value: T("Oyiga 1 marta", "Раз в месяц", "Monthly"),
      },
    ],
    inspection: TL(
      ["Moy darajasini oyiga 1 marta tekshiring.", "Har servisda moy holatini (rang, hid) baholang.", "Har servisda sizib chiqishlarni tekshiring.", "Moy ogohlantirish chirog'iga e'tibor bering."],
      ["Уровень масла — раз в месяц.", "На каждом ТО оценивайте состояние масла (цвет, запах).", "На каждом ТО проверяйте утечки.", "Следите за индикатором давления масла."],
      ["Check oil level once a month.", "Assess oil condition (color, smell) at every service.", "Check for leaks at every service.", "Watch the oil warning light."],
    ),
    replacement: TL(
      ["Normal sharoitda har 10 000 km da moy va moy filtri.", "Og'ir foydalanishda — har 5 000–7 000 km da.", "Moy qora, kuygan hidli yoki tez kamaysa oldinroq almashtiring.", "Moy filtrini doim moy bilan birga almashtiring."],
      ["В обычных условиях — масло и фильтр каждые 10 000 км.", "В тяжёлых условиях — каждые 5 000–7 000 км.", "Если масло тёмное, пахнет гарью или быстро уходит — раньше.", "Масляный фильтр меняйте вместе с маслом."],
      ["Normal conditions: oil and filter every 10,000 km.", "Heavy usage: every 5,000–7,000 km.", "Replace earlier if oil is dark, smells burnt or drops quickly.", "Always replace oil filter together with engine oil."],
    ),
    heavyUsage: TL(
      ["Tez-tez qisqa masofalarga yurish.", "Shahar tirbandligi.", "Uzoq salt ishlash.", "Changli yo'llar.", "Issiq ob-havo.", "Tog' yo'llari.", "Og'ir yuk bilan harakat."],
      ["Частые короткие поездки.", "Городские пробки.", "Длительная работа на холостом ходу.", "Пыльные дороги.", "Жара.", "Горные дороги.", "Езда с грузом."],
      ["Frequent short-distance trips.", "Heavy city traffic.", "Long idling.", "Dusty roads.", "Hot weather.", "Mountain roads.", "Carrying heavy load."],
    ),
    warnings: TL(
      ["Moy ogohlantirish chirog'i.", "Past moy darajasi.", "Qora yoki kuygan hidli moy.", "Dvigatel ovozi oshgan.", "Mashina ostida moy izi.", "Dvigatel qizib ketishi."],
      ["Индикатор давления масла.", "Низкий уровень масла.", "Тёмное или горелое масло.", "Усиленный звук двигателя.", "Лужа масла под машиной.", "Перегрев двигателя."],
      ["Oil warning light.", "Low oil level.", "Dark or burnt-smelling oil.", "Increased engine noise.", "Oil puddle under the vehicle.", "Engine overheating."],
    ),
    usefulTips: TL(
      ["Faqat ishlab chiqaruvchi tavsiya qilgan moy qovushqoqligidan foydalaning.", "Moy filtrini doim birga almashtiring.", "Turli xil moylarni shart bo'lmasa aralashtirmang.", "Kech almashtirish dvigatel umrini qisqartiradi."],
      ["Используйте только рекомендованную производителем вязкость масла.", "Фильтр меняйте всегда вместе с маслом.", "Не смешивайте разные типы масла без необходимости.", "Запоздалая замена сокращает ресурс двигателя."],
      ["Always use the manufacturer-recommended oil viscosity.", "Replace the oil filter together with engine oil.", "Do not mix oil types unnecessarily.", "Late replacement reduces engine life."],
    ),
    summaryInspection: T("Oyiga 1 marta + har servisda.", "Раз в месяц + на каждом ТО.", "Monthly + every service."),
    summaryReplacement: T("10 000 km · og'ir sharoitda 5–7 000 km.", "10 000 км · в тяжёлых условиях 5–7 000 км.", "10,000 km · 5–7,000 km in heavy usage."),
    badges: ["inspect", "replace", "heavy"],
  },

  engine: {
    partId: "engine",
    title: T("Dvigatel holati", "Состояние двигателя", "Engine condition"),
    function: T(
      "Dvigatel — avtomobilning asosiy quvvat manbai. Yoqilg'i energiyasini harakatga aylantiradi.",
      "Двигатель — главный источник мощности автомобиля, преобразует энергию топлива в движение.",
      "The engine is the main power source of the vehicle. It converts fuel energy into motion.",
    ),
    intervals: [
      {
        label: T("Svechalar", "Свечи зажигания", "Spark plugs"),
        value: T("40–50 000 km", "40–50 000 км", "40–50,000 km"),
        tone: "accent",
      },
      {
        label: T("Umumiy nazorat", "Общий контроль", "General check"),
        value: T("Har servisda", "На каждом ТО", "Every service"),
      },
    ],
    inspection: TL(
      ["Har servisda dvigatelning umumiy holatini tekshiring.", "Sovutish, yoqilg'i, moylash va konditsioner germetikligini muntazam tekshiring.", "Shlanglar va ulanishlarni har servisda ko'zdan kechiring.", "PCV tizimini muntazam tekshiring.", "EVAP tizimi va bug' shlanglarini tekshiring."],
      ["На каждом ТО проверяйте общее состояние двигателя.", "Регулярно проверяйте герметичность охлаждения, топлива, смазки и кондиционера.", "Шланги и соединения — на каждом ТО.", "Систему PCV — регулярно.", "Систему EVAP и паровые шланги — регулярно."],
      ["Check overall engine condition at every service.", "Regularly check tightness of cooling, fuel, lubrication and A/C systems.", "Inspect hoses and connections every service.", "Inspect the PCV system regularly.", "Inspect EVAP system and vapor hoses regularly."],
    ),
    replacement: TL(
      ["Svechalar — taxminan 40 000–50 000 km da, holat va reglament bo'yicha.", "Yordamchi (generator/AC) tasma — har servisda tekshirish, yeyilgan/yorilgan bo'lsa almashtirish.", "Yoqilg'i va havo komponentlari — reglament yoki holat bo'yicha."],
      ["Свечи — около 40 000–50 000 км по регламенту и состоянию.", "Ремень навесного оборудования — проверка на каждом ТО, замена при износе/трещинах.", "Топливные и воздушные компоненты — по регламенту/состоянию."],
      ["Spark plugs — around 40,000–50,000 km depending on condition and regulation.", "Drive/auxiliary belt — inspect every service, replace if worn, cracked or noisy.", "Fuel/air components — per regulation or condition."],
    ),
    heavyUsage: TL(
      ["Tirbandlik, chang, qisqa safarlar, yuqori harorat va uzoq salt ishlash — tez-tez tekshiring."],
      ["Пробки, пыль, короткие поездки, жара и длительный холостой ход — чаще проверка."],
      ["Heavy traffic, dust, short trips, high heat and long idling — check more often."],
    ),
    warnings: TL(
      ["Check Engine chirog'i.", "G'ayritabiiy ovoz.", "Titrash.", "Tutun.", "Quvvat yo'qolishi.", "Yoqilg'i sarfi oshishi.", "Qizib ketish.", "Beqaror salt yurish."],
      ["Индикатор Check Engine.", "Необычный звук.", "Вибрация.", "Дым.", "Потеря мощности.", "Рост расхода топлива.", "Перегрев.", "Неустойчивый холостой ход."],
      ["Check Engine light.", "Unusual engine noise.", "Vibration.", "Smoke.", "Power loss.", "Increased fuel consumption.", "Overheating.", "Unstable idle."],
    ),
    usefulTips: TL(
      ["Panel ogohlantirish chiroqlarini e'tiborsiz qoldirmang.", "Sovuq havoda dvigatelni yengilroq isiting.", "Qizib ketgan dvigatel bilan uzoq yurmang.", "Sifatli yoqilg'i va to'g'ri moydan foydalaning.", "G'ayritabiiy ovozni erta diagnostika qiling."],
      ["Не игнорируйте сигнальные лампы.", "В холод прогревайте двигатель мягко.", "Не ездите долго на перегретом двигателе.", "Используйте качественное топливо и правильное масло.", "Диагностируйте необычные звуки заранее."],
      ["Never ignore dashboard warning lights.", "Warm the engine up gently in cold weather.", "Do not drive long with an overheating engine.", "Use quality fuel and the correct engine oil.", "Diagnose unusual noises early."],
    ),
    summaryInspection: T("Har servisda + muntazam shlang/EVAP/PCV tekshiruvi.", "На каждом ТО + регулярно шланги/EVAP/PCV.", "Every service + regular hose/EVAP/PCV checks."),
    summaryReplacement: T("Svechalar 40–50 000 km · holat bo'yicha qismlar.", "Свечи 40–50 000 км · детали по состоянию.", "Plugs 40–50,000 km · other parts by condition."),
    badges: ["inspect", "replace", "safety"],
  },

  battery: {
    partId: "battery",
    title: T("Akkumulyator holati", "Состояние аккумулятора", "Battery condition"),
    function: T(
      "Akkumulyator dvigatelni ishga tushirish va elektr tizimlarni quvvatlash uchun energiya beradi.",
      "Аккумулятор обеспечивает энергией пуск двигателя и работу электросистем.",
      "The battery supplies power to start the engine and supports electrical systems.",
    ),
    intervals: [
      {
        label: T("Voltaj tekshiruvi", "Проверка напряжения", "Voltage check"),
        value: T("Har 3 oyda", "Каждые 3 месяца", "Every 3 months"),
        tone: "accent",
      },
      {
        label: T("Xizmat muddati", "Срок службы", "Lifespan"),
        value: T("2–4 yil", "2–4 года", "2–4 years"),
      },
    ],
    inspection: TL(
      ["Akkumulyator va elektr jihozlari har servisda tekshiriladi.", "Klemmalarda korroziya bor-yo'qligini tekshiring.", "Voltajni har 3 oyda tekshiring.", "Qishdan oldin akkumulyator holatini sinab ko'ring."],
      ["АКБ и электрооборудование — на каждом ТО.", "Проверяйте клеммы на коррозию.", "Напряжение — каждые 3 месяца.", "Перед зимой — тест состояния АКБ."],
      ["Battery and electrical equipment — checked every service.", "Inspect terminals for corrosion.", "Check voltage every 3 months.", "Before winter — test battery condition."],
    ),
    replacement: TL(
      ["O'rtacha xizmat muddati: 2–4 yil.", "Quvvatni ushlay olmasa yoki start ishonchsiz bo'lsa almashtiring.", "3 yildan keyin muntazam test tavsiya etiladi."],
      ["Средний срок: 2–4 года.", "Меняйте, если не держит заряд или ненадёжный пуск.", "После 3 лет — регулярный тест."],
      ["Average lifespan: 2–4 years.", "Replace if it cannot hold charge or starting is unreliable.", "After 3 years — regular testing recommended."],
    ),
    heavyUsage: TL(
      ["Sovuq ob-havo, qisqa safarlar va uzoq turish akkumulyatorni tez kuchsizlantiradi."],
      ["Холод, короткие поездки и долгая стоянка ослабляют АКБ быстрее."],
      ["Cold weather, short trips and long parking weaken the battery faster."],
    ),
    warnings: TL(
      ["Sekin start.", "Xira faralar.", "Akkumulyator ogohlantirish chirog'i.", "Klemmalarda korroziya.", "Elektronika kuchsiz ishlaydi.", "Turishdan keyin mashina o'tirib qoladi."],
      ["Медленный пуск.", "Тусклые фары.", "Индикатор АКБ.", "Коррозия на клеммах.", "Слабая работа электроники.", "После стоянки не заводится."],
      ["Slow engine start.", "Dim headlights.", "Battery warning light.", "Corrosion on terminals.", "Electrical systems work weakly.", "Vehicle does not start after parking."],
    ),
    usefulTips: TL(
      ["Klemmalarni toza va mahkam saqlang.", "Dvigatel o'chirilganda chiroqlarni qoldirmang.", "Qishda kuchsiz akkumulyator tez ishdan chiqadi.", "Qisqa safarlar akkumulyatorni to'liq quvvatlamasligi mumkin."],
      ["Держите клеммы чистыми и затянутыми.", "Не оставляйте свет при выключенном двигателе.", "Зимой слабые АКБ отказывают чаще.", "Короткие поездки не дают полному заряду."],
      ["Keep terminals clean and tight.", "Do not leave lights on with engine off.", "Weak batteries fail more often in winter.", "Short trips may not fully recharge the battery."],
    ),
    summaryInspection: T("Har servisda + 3 oyda voltaj.", "На каждом ТО + напряжение раз в 3 мес.", "Every service + voltage every 3 months."),
    summaryReplacement: T("2–4 yil yoki quvvat ushlay olmasa.", "2–4 года или при потере заряда.", "2–4 years or when it cannot hold charge."),
    badges: ["inspect", "replace"],
  },

  brakes: {
    partId: "brakes",
    title: T("Tormoz tizimi", "Тормозная система", "Brake system"),
    function: T(
      "Tormoz tizimi avtomobilni xavfsiz to'xtatadi. Bu eng muhim xavfsizlik tizimlaridan biridir.",
      "Тормозная система обеспечивает безопасную остановку — одна из самых важных систем безопасности.",
      "The brake system allows the vehicle to slow down and stop safely — one of the most critical safety systems.",
    ),
    intervals: [
      {
        label: T("Old kolodka", "Передние колодки", "Front pads"),
        value: T("25–40 000 km", "25–40 000 км", "25–40,000 km"),
        tone: "accent",
      },
      {
        label: T("Orqa kolodka", "Задние колодки", "Rear pads"),
        value: T("40–60 000 km", "40–60 000 км", "40–60,000 km"),
      },
      {
        label: T("Tormoz suyuqligi", "Тормозная жидкость", "Brake fluid"),
        value: T("Har 2 yilda", "Каждые 2 года", "Every 2 years"),
        tone: "warn",
      },
    ],
    inspection: TL(
      ["Tormoz tizimi har servisda tekshiriladi.", "Old kolodka va disklar — har servisda.", "Orqa kolodka, disk/baraban va qoplamalar — har servisda.", "Tormoz naylari va ulanishlari — muntazam.", "Pedalning bo'sh harakati — tekshirish.", "Qo'l (to'xtab turish) tormozini muntazam tekshiring."],
      ["Тормозная система — на каждом ТО.", "Передние колодки и диски — на каждом ТО.", "Задние колодки, диски/барабаны и накладки — на каждом ТО.", "Шланги и соединения — регулярно.", "Свободный ход педали — проверка.", "Стояночный тормоз — регулярно."],
      ["Brake system — every service.", "Front pads and discs — every service.", "Rear pads, discs/drums and linings — every service.", "Brake hoses and connections — regularly.", "Brake pedal free movement — check.", "Parking brake — check regularly."],
    ),
    replacement: TL(
      ["Old tormoz kolodkalari: odatda 25 000–40 000 km.", "Orqa kolodka/baraban: odatda 40 000–60 000 km.", "Tormoz suyuqligi: har 2 yilda yoki reglament bo'yicha.", "Yeyilgan, deformatsiyalangan disk va barabanlarni almashtiring."],
      ["Передние колодки: обычно 25 000–40 000 км.", "Задние колодки/барабаны: обычно 40 000–60 000 км.", "Тормозная жидкость: каждые 2 года или по регламенту.", "Изношенные/деформированные диски и барабаны — заменить."],
      ["Front brake pads: usually 25,000–40,000 km.", "Rear pads/drums: usually 40,000–60,000 km.", "Brake fluid: every 2 years or per regulation.", "Replace worn or warped discs and drums."],
    ),
    heavyUsage: TL(
      ["Shahar, tog' yo'li, og'ir yuk va tez-tez tormoz berishda tez-tez tekshiring."],
      ["В городе, в горах, с грузом и при частом торможении — чаще проверка."],
      ["City driving, mountain roads, heavy loads and frequent braking — check more often."],
    ),
    warnings: TL(
      ["G'ichirlash.", "Maydalanish ovozi.", "Tormozlashda titrash.", "To'xtash masofasi uzayishi.", "Yumshoq pedal.", "Tormoz suyuqligi sizishi.", "Tormoz ogohlantirish chirog'i."],
      ["Скрип.", "Скрежет.", "Вибрация при торможении.", "Удлинение тормозного пути.", "Мягкая педаль.", "Утечка жидкости.", "Индикатор тормозов."],
      ["Squeaking noise.", "Grinding sound.", "Vibration while braking.", "Longer stopping distance.", "Soft brake pedal.", "Brake fluid leak.", "Brake warning light."],
    ),
    usefulTips: TL(
      ["Tormoz servisini kechiktirmang.", "Iloji boricha tajovuzkor tormoz bermang.", "Tormoz holati o'zgarsa darhol tekshiring.", "Tormoz muammolari — bevosita xavfsizlik masalasi."],
      ["Не откладывайте обслуживание тормозов.", "По возможности избегайте резких торможений.", "Изменение поведения тормозов — сразу на проверку.", "Проблемы тормозов критичны для безопасности."],
      ["Do not delay brake service.", "Avoid aggressive braking when possible.", "If braking feels different — inspect immediately.", "Brake system issues are safety-critical."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Old 25–40k · Orqa 40–60k · Suyuqlik 2 yilda.", "Перед 25–40k · Зад 40–60k · Жидкость 2 года.", "Front 25–40k · Rear 40–60k · Fluid 2 yr."),
    badges: ["inspect", "replace", "safety"],
  },

  headlights: {
    partId: "headlights",
    title: T("Faralar va yoritish tizimi", "Фары и система освещения", "Headlights and lighting system"),
    function: T(
      "Faralar va yoritish tizimi yo'lda ko'rinishni, signalizatsiyani va boshqa haydovchilar bilan xavfsiz aloqani ta'minlaydi.",
      "Фары и система освещения обеспечивают видимость на дороге, сигнализацию и безопасное взаимодействие с другими водителями.",
      "Headlights and lighting provide road visibility, signaling and safe communication with other drivers.",
    ),
    intervals: [
      {
        label: T("Lampalar", "Лампы", "Bulbs"),
        value: T("1–2 yil", "1–2 года", "1–2 years"),
        tone: "accent",
      },
      {
        label: T("Tekshirish", "Проверка", "Check"),
        value: T("Oyiga + har servisda", "Ежемесячно + ТО", "Monthly + service"),
      },
    ],
    inspection: TL(
      ["Faralar, burilish signali, stop chiroqlar, orqaga yurish chirog'i va avariya chirog'i har servisda tekshiriladi.", "Yoritishni oyiga 1 marta ham tekshiring.", "Elektr jihozlari muntazam servis tekshiruviga kiradi."],
      ["Фары, поворотники, стоп-сигналы, фонари заднего хода и аварийка — на каждом ТО.", "Свет также проверяйте раз в месяц.", "Электрооборудование входит в регулярный осмотр."],
      ["Headlights, turn signals, brake lights, reverse and hazard lights — every service.", "Also check lights monthly.", "Electrical equipment is part of regular service inspection."],
    ),
    replacement: TL(
      ["Lampalar odatda 1–2 yilga chidaydi (turi va foydalanish bo'yicha).", "Lampa kuyganda yoki yoritish kuchsiz bo'lsa darhol almashtiring.", "Faralar xiralashsa polirovka qiling yoki tiklang."],
      ["Лампы обычно служат 1–2 года в зависимости от типа и эксплуатации.", "Перегорела или тускнеет — менять сразу.", "Помутневшие фары — полировка/восстановление."],
      ["Bulbs usually last 1–2 years depending on type and usage.", "Replace immediately if a bulb fails or light becomes weak.", "Polish or restore cloudy headlights."],
    ),
    heavyUsage: TL(
      ["Tunda haydash, yomg'ir, qor, chang va qish sharoitida tez-tez tekshiring."],
      ["Ночная езда, дождь, снег, пыль и зима — чаще проверка."],
      ["Night driving, rain, snow, dust and winter — check more often."],
    ),
    warnings: TL(
      ["Faralar kuchsiz.", "Lampa lipillaydi.", "Bitta fara ishlamaydi.", "Burilish signali tez lipillaydi.", "Tunda yomon ko'rinish.", "Fara plastigi xiralashgan."],
      ["Слабый свет.", "Мерцание.", "Не работает одна фара.", "Быстрое мигание поворотника.", "Плохая видимость ночью.", "Помутневший пластик."],
      ["Weak headlights.", "Flickering lights.", "One side not working.", "Turn signals blinking fast.", "Poor night visibility.", "Cloudy headlight lens."],
    ),
    usefulTips: TL(
      ["Faralarni toza saqlang.", "Tungi safardan oldin yoritishni tekshiring.", "To'g'ri lampa turini ishlating.", "Stop chiroqlari ishlamasa haydamang."],
      ["Держите фары в чистоте.", "Перед ночной поездкой проверяйте свет.", "Используйте правильный тип ламп.", "Не ездите со сломанными стоп-сигналами."],
      ["Keep headlights clean.", "Check lights before night trips.", "Use the correct bulb type.", "Do not drive with failed brake lights."],
    ),
    summaryInspection: T("Har servisda + oyiga 1 marta.", "На каждом ТО + ежемесячно.", "Every service + monthly."),
    summaryReplacement: T("Lampa kuyganda — darhol.", "Лампа перегорела — сразу.", "When a bulb fails — immediately."),
    badges: ["inspect", "replace", "safety"],
  },

  cooling: {
    partId: "cooling",
    title: T("Sovutish tizimi", "Система охлаждения", "Cooling system"),
    function: T(
      "Sovutish tizimi dvigatelni qizib ketishdan saqlaydi va to'g'ri ish haroratini ushlab turadi.",
      "Система охлаждения предотвращает перегрев двигателя и поддерживает рабочую температуру.",
      "The cooling system prevents engine overheating and keeps it at proper operating temperature.",
    ),
    intervals: [
      {
        label: T("Antifriz", "Антифриз", "Coolant"),
        value: T("40–50 000 km", "40–50 000 км", "40–50,000 km"),
        tone: "accent",
      },
      {
        label: T("Daraja", "Уровень", "Level"),
        value: T("Har servisda", "На каждом ТО", "Every service"),
      },
    ],
    inspection: TL(
      ["Antifriz darajasini har servisda tekshiring.", "Radiator, shlanglar va ulanishlarni har servisda ko'zdan kechiring.", "Sovutish tizimi germetikligini muntazam tekshiring.", "Yoz va qish oldidan antifriz holatini tekshiring."],
      ["Уровень антифриза — на каждом ТО.", "Радиатор, шланги и соединения — на каждом ТО.", "Герметичность системы — регулярно.", "Перед летом и зимой — проверка состояния антифриза."],
      ["Check coolant level at every service.", "Inspect radiator, hoses and connections at every service.", "Regularly check cooling system tightness.", "Check coolant condition before summer and winter."],
    ),
    replacement: TL(
      ["Antifriz / sovutgich: taxminan 40 000–50 000 km da yoki reglament bo'yicha.", "Antifriz ifloslangan yoki sifati pasaysa darhol almashtiring.", "Shikastlangan shlang yoki oqayotgan qismlarni darhol almashtiring."],
      ["Антифриз: около 40 000–50 000 км или по регламенту.", "При загрязнении или ухудшении свойств — сразу.", "Повреждённые шланги или протекающие части — немедленно."],
      ["Coolant / antifreeze: around 40,000–50,000 km or per regulation.", "Replace immediately if coolant is contaminated or loses quality.", "Replace damaged hoses or leaking parts immediately."],
    ),
    heavyUsage: TL(
      ["Issiq iqlim, tog' yo'llari, tirbandlik va og'ir yukda tez-tez tekshiring."],
      ["В жару, на горных дорогах, в пробках и с грузом — чаще проверка."],
      ["Hot climates, mountain roads, traffic jams or heavy loads — check more often."],
    ),
    warnings: TL(
      ["Harorat ko'rsatkichi ko'tariladi.", "Antifriz darajasi tez-tez pasayadi.", "Mashina ostida antifriz sizishi.", "Kapot ostidan bug'.", "Dvigatel yonida shirin hid.", "Dvigatel qizib ketadi."],
      ["Растёт температура.", "Часто падает уровень антифриза.", "Течь под машиной.", "Пар из-под капота.", "Сладкий запах.", "Перегрев."],
      ["Temperature gauge rises.", "Coolant level drops often.", "Coolant leak under the vehicle.", "Steam from engine bay.", "Sweet smell near engine.", "Engine overheating."],
    ),
    usefulTips: TL(
      ["Dvigatel issiqligida radiator qopqog'ini hech qachon ochmang.", "Faqat to'g'ri turdagi antifrizdan foydalaning.", "Qizib ketgan dvigatel bilan haydamang.", "Uzoq safardan oldin antifrizni tekshiring."],
      ["Никогда не открывайте крышку радиатора на горячем двигателе.", "Используйте только подходящий тип антифриза.", "Не ездите на перегретом двигателе.", "Перед длительной поездкой — проверка антифриза."],
      ["Never open the radiator cap when the engine is hot.", "Use only the correct antifreeze type.", "Do not drive with an overheating engine.", "Check coolant before long trips."],
    ),
    summaryInspection: T("Har servisda + mavsumdan oldin.", "На каждом ТО + перед сезоном.", "Every service + before each season."),
    summaryReplacement: T("Antifriz — 40–50 000 km.", "Антифриз — 40–50 000 км.", "Coolant — 40–50,000 km."),
    badges: ["inspect", "replace", "safety"],
  },

  airfilter: {
    partId: "airfilter",
    title: T("Havo filtri", "Воздушный фильтр", "Air filter"),
    function: T(
      "Havo filtri dvigatelga kirayotgan havodan chang va zarrachalarni tozalaydi, yonish jarayoniga va dvigatel himoyasiga yordam beradi.",
      "Воздушный фильтр очищает воздух от пыли и частиц перед двигателем, помогая сгоранию и защите.",
      "The air filter cleans dust and particles from the air before it enters the engine, helping combustion and protecting it.",
    ),
    intervals: [
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("10–15 000 km", "10–15 000 км", "10–15,000 km"),
        tone: "accent",
      },
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har servisda", "На каждом ТО", "Every service"),
      },
    ],
    inspection: TL(
      ["Har servisda havo filtrini tekshiring.", "Changli sharoitda tez-tez tekshiring.", "Reglament filtrini servis intervaliga ko'ra tekshirish va almashtirish elementi sifatida belgilaydi."],
      ["На каждом ТО — проверка фильтра.", "В пыльных условиях — чаще.", "По регламенту: и проверка, и замена согласно интервалу/состоянию."],
      ["Inspect the air filter at every service.", "Inspect more frequently in dusty conditions.", "Regulation marks it as both an inspection and replacement item depending on interval and condition."],
    ),
    replacement: TL(
      ["Odatda har 10 000–15 000 km da almashtiring.", "Changli yo'l yoki ko'rinishda iflos bo'lsa oldinroq almashtiring.", "Tiqilib qolgan, shikastlangan yoki moy bilan ifloslangan filtrni almashtiring."],
      ["Обычно — каждые 10 000–15 000 км.", "В пыли или при видимом загрязнении — раньше.", "Забитый, повреждённый или замасленный — заменить."],
      ["Usually every 10,000–15,000 km.", "Replace earlier on dusty roads or if visibly dirty.", "Replace if clogged, damaged or oil-contaminated."],
    ),
    heavyUsage: TL(
      ["Changli yo'llar filtr umrini qisqartiradi.", "Shahar tirbandligi va qurilish hududlarida tez-tez almashtiring."],
      ["Пыльные дороги сокращают срок службы.", "Пробки и стройка — меняйте чаще."],
      ["Dusty roads shorten filter life.", "Urban traffic and construction zones — replace more often."],
    ),
    warnings: TL(
      ["Yoqilg'i sarfining oshishi.", "Tezlanish susayishi.", "Dvigatel ovozining qo'pollashi.", "Iflos filtr elementi.", "Dvigatel javobi sustlashgan."],
      ["Повышенный расход топлива.", "Слабый разгон.", "Грубый звук двигателя.", "Грязный элемент.", "Замедленная реакция двигателя."],
      ["Higher fuel consumption.", "Weak acceleration.", "Rough engine sound.", "Dirty filter element.", "Reduced engine response."],
    ),
    usefulTips: TL(
      ["Changli yo'llar filtr umrini qisqartiradi.", "Iflos filtr dvigatel samaradorligini pasaytiradi.", "Qog'oz filtrlarni — ishlab chiqaruvchi ruxsat bermasa — yuvmang.", "Faqat to'g'ri turdagi filtr bilan almashtiring."],
      ["Пыль сокращает ресурс фильтра.", "Грязный фильтр снижает КПД двигателя.", "Бумажные фильтры не мойте без разрешения производителя.", "Меняйте только на фильтр правильного типа."],
      ["Dusty roads shorten air filter life.", "A dirty filter reduces engine efficiency.", "Do not wash paper filters unless the manufacturer allows it.", "Replace only with the correct filter type."],
    ),
    summaryInspection: T("Har servisda; changda tez-tez.", "На каждом ТО; в пыли — чаще.", "Every service; more often in dust."),
    summaryReplacement: T("10–15 000 km.", "10–15 000 км.", "10–15,000 km."),
    badges: ["inspect", "replace"],
  },

  suspension: {
    partId: "suspension",
    title: T("Podveska va yurish qismi", "Подвеска и ходовая часть", "Suspension and chassis"),
    function: T(
      "Podveska va shassi qismlari qulay yurish, barqarorlik, rul boshqaruvi va xavfsiz yo'l ushlashni ta'minlaydi.",
      "Подвеска и шасси обеспечивают комфорт, устойчивость, управляемость и безопасную езду.",
      "Suspension and chassis components provide ride comfort, stability, steering control and safe road handling.",
    ),
    intervals: [
      {
        label: T("Amortizatorlar", "Амортизаторы", "Shock absorbers"),
        value: T("60–80 000 km", "60–80 000 км", "60–80,000 km"),
        tone: "accent",
      },
      {
        label: T("Burchaklar", "Углы установки", "Alignment"),
        value: T("Har 20 000 km", "Каждые 20 000 км", "Every 20,000 km"),
      },
    ],
    inspection: TL(
      ["Podveska va shassi har servisda tekshiriladi.", "Rul g'ildiragi va mexanizmi — har servisda.", "Rul gidrokuchaytirgichi suyuqligi, naylari va ulanishlari — tekshirish.", "Shassi va kuzov rezbali ulanishlari — tekshirish va mahkamlash.", "Burchaklar normadan tashqarida bo'lsa yoki rul o'zgarsa — tekshirish."],
      ["Подвеска и шасси — на каждом ТО.", "Руль и рулевой механизм — на каждом ТО.", "ГУР: жидкость, шланги, соединения — проверка.", "Резьбовые соединения шасси/кузова — проверка и подтяжка.", "При отклонениях углов или изменении руля — проверка."],
      ["Suspension and chassis — every service.", "Steering wheel and mechanism — every service.", "Power steering fluid, hoses and connections — inspect.", "Chassis and body threaded connections — inspect and tighten if needed.", "Wheel alignment — if values deviate or steering changes."],
    ),
    replacement: TL(
      ["Yeyilgan bushinglar, sharli tayanchlar yoki amortizatorlarni almashtiring.", "Amortizatorlar — odatda 60 000–80 000 km da diqqat talab qiladi.", "Yomon yo'l shikastlasa qismlarni oldinroq almashtiring."],
      ["Меняйте изношенные сайлент-блоки, шаровые, амортизаторы.", "Амортизаторы — обычно требуют внимания к 60 000–80 000 км.", "При повреждениях от плохих дорог — раньше."],
      ["Replace worn bushings, ball joints or shock absorbers when needed.", "Shock absorbers often require attention around 60,000–80,000 km depending on roads.", "Replace parts earlier if damaged by rough roads."],
    ),
    heavyUsage: TL(
      ["Yomon yo'l, chuqurlar, og'ir yuk va notekis yo'llarda tez-tez tekshiring."],
      ["Плохие дороги, ямы, груз и неровности — чаще проверка."],
      ["Bad roads, potholes, heavy loads and uneven roads — check more often."],
    ),
    warnings: TL(
      ["Taqillash.", "Bir tomonga tortish.", "Notekis shina yeyilishi.", "Rul bo'sh his qilinadi.", "Ortiqcha titrash.", "Yomon barqarorlik.", "Mashina haddan tashqari sakraydi."],
      ["Стук.", "Увод в сторону.", "Неравномерный износ шин.", "Люфт руля.", "Чрезмерная вибрация.", "Плохая устойчивость.", "Машина сильно раскачивается."],
      ["Knocking noise.", "Vehicle pulls to one side.", "Uneven tire wear.", "Steering feels loose.", "Excessive vibration.", "Poor stability.", "Car bounces too much."],
    ),
    usefulTips: TL(
      ["Yomon yo'llar podveska umrini qisqartiradi.", "Tezlikda chuqurlardan o'tmang.", "Kuchli zarbadan keyin burchaklarni tekshiring.", "Notekis shina yeyilishi — podveska yoki burchaklar muammosi belgisi."],
      ["Плохие дороги сокращают срок службы подвески.", "Не пролетайте ямы на скорости.", "После сильного удара — проверка углов.", "Неравномерный износ шин — признак подвески/углов."],
      ["Bad roads shorten suspension life.", "Avoid hitting potholes at speed.", "Check alignment after a strong impact.", "Uneven tire wear may signal a suspension or alignment issue."],
    ),
    summaryInspection: T("Har servisda + kuchli zarbadan keyin.", "На каждом ТО + после сильных ударов.", "Every service + after strong impacts."),
    summaryReplacement: T("Amortizator 60–80 000 km · qismlar holat bo'yicha.", "Амортизаторы 60–80 000 км · детали по состоянию.", "Shocks 60–80,000 km · parts by condition."),
    badges: ["inspect", "safety"],
  },
};

/**
 * Future / hidden Cobalt service items prepared from the official regulation.
 * Not shown in the main sidebar yet — kept here as a structured data source
 * for future expansion (extra cards, tooltips, expanded schedule, etc.).
 */
export const COBALT_FUTURE_PART_INFO: Record<string, CobaltPartInfo> = {
  fuelFilter: {
    partId: "fuelFilter",
    title: T("Yoqilg'i filtri", "Топливный фильтр", "Fuel filter"),
    function: T(
      "Yoqilg'i filtri yoqilg'idan ifloslantiruvchi zarrachalarni tozalaydi va dvigatelni himoya qiladi.",
      "Топливный фильтр очищает топливо от загрязнений и защищает двигатель.",
      "The fuel filter removes contaminants from fuel and protects the engine.",
    ),
    inspection: TL(
      ["Reglament bo'yicha tekshiring.", "Yoqilg'i sifati filtrning xizmat muddatiga ta'sir qiladi."],
      ["Проверка по регламенту.", "Качество топлива влияет на срок службы фильтра."],
      ["Inspect per regulation.", "Fuel quality affects filter lifespan."],
    ),
    replacement: TL(
      ["Reglament bo'yicha almashtiring.", "Sifatsiz yoqilg'idan keyin oldinroq almashtirish kerak bo'lishi mumkin."],
      ["Замена по регламенту.", "После некачественного топлива возможна досрочная замена."],
      ["Replace per regulation.", "Poor fuel quality may require earlier replacement."],
    ),
    heavyUsage: TL(["Sifatsiz yoqilg'i quyilganda tez-tez tekshiring."], ["При плохом топливе — чаще проверка."], ["Inspect more often after poor-quality fuel."]),
    warnings: TL(["Quvvat yo'qolishi.", "Beqaror salt yurish.", "Yoqilg'i tizimida bosim pasayishi."], ["Потеря мощности.", "Неустойчивый холостой ход.", "Падение давления в топливной системе."], ["Power loss.", "Unstable idle.", "Fuel pressure drop."]),
    summaryInspection: T("Reglament bo'yicha.", "По регламенту.", "Per regulation."),
    summaryReplacement: T("Reglament bo'yicha.", "По регламенту.", "Per regulation."),
    badges: ["inspect", "replace"],
  },
  fuelHoses: {
    partId: "fuelHoses",
    title: T("Yoqilg'i shlang va ulanishlari", "Топливные шланги и соединения", "Fuel hoses and connections"),
    function: T(
      "Yoqilg'i shlanglari va ulanishlari yoqilg'ini xavfsiz uzatadi.",
      "Топливные шланги и соединения обеспечивают безопасную подачу топлива.",
      "Fuel hoses and connections safely deliver fuel.",
    ),
    inspection: TL(["Har servisda tekshiring."], ["Проверка на каждом ТО."], ["Inspect every service."]),
    replacement: TL(["Sizish yoki yoriq bo'lsa darhol almashtiring."], ["Меняйте при утечке или трещинах."], ["Replace immediately if leaking or cracked."]),
    heavyUsage: TL(["Issiq va vibratsiya shlanglarning eskirishini tezlashtiradi."], ["Жара и вибрация ускоряют износ."], ["Heat and vibration accelerate hose wear."]),
    warnings: TL(["Yoqilg'i hidi.", "Mashina ostida nam dog'.", "Bosim yo'qolishi."], ["Запах топлива.", "Влажные пятна под машиной.", "Падение давления."], ["Fuel smell.", "Wet spots under the vehicle.", "Pressure loss."]),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Sizish/yoriqlarda — darhol.", "При утечках/трещинах — сразу.", "On leaks/cracks — immediately."),
    badges: ["inspect", "replace", "safety"],
  },
  exhaust: {
    partId: "exhaust",
    title: T("Chiqaruv tizimi", "Выхлопная система", "Exhaust system"),
    function: T(
      "Chiqaruv tizimi yonish gazlarini xavfsiz chiqarib yuboradi va shovqinni kamaytiradi.",
      "Выхлопная система безопасно отводит газы сгорания и снижает шум.",
      "The exhaust system safely removes combustion gases and reduces noise.",
    ),
    inspection: TL(["Mahkamlashni tekshiring.", "Sizish va korroziyani tekshiring.", "Shovqin oshishini nazorat qiling."], ["Проверка креплений.", "Проверка утечек и коррозии.", "Контроль роста шума."], ["Inspect mounting.", "Check for leaks and corrosion.", "Watch for increasing noise."]),
    replacement: TL(["Korroziya, sizish yoki shikastlanganda almashtiring."], ["При коррозии, утечке или повреждении — замена."], ["Replace on corrosion, leaks or damage."]),
    heavyUsage: TL(["Tuzli yo'llar va namlik korroziyani tezlashtiradi."], ["Соль и влажность ускоряют коррозию."], ["Salt and humidity accelerate corrosion."]),
    warnings: TL(["Baland shovqin.", "Egzoz hidi salonda.", "Mashina ostidan tovush."], ["Громкий шум.", "Запах выхлопа в салоне.", "Звон под машиной."], ["Loud noise.", "Exhaust smell inside the cabin.", "Rattling under the vehicle."]),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Korroziya/sizishda.", "При коррозии/утечке.", "On corrosion/leaks."),
    badges: ["inspect", "safety"],
  },
  evap: {
    partId: "evap",
    title: T("EVAP tizimi", "Система EVAP", "EVAP system"),
    function: T(
      "EVAP tizimi yoqilg'i bug'larini ushlab turadi va atmosferaga chiqishini cheklaydi.",
      "Система EVAP улавливает топливные пары и ограничивает их выброс в атмосферу.",
      "The EVAP system captures fuel vapors and limits their release to the atmosphere.",
    ),
    inspection: TL(["Bug' shlanglari va kanistrni tekshiring.", "Yoqilg'i bug'i nazorat tizimini tekshiring."], ["Проверка паровых шлангов и канистры.", "Проверка системы контроля паров."], ["Inspect vapor hoses and canister.", "Check fuel vapor control system."]),
    replacement: TL(["Shikastlangan komponentlarni almashtiring."], ["Меняйте повреждённые компоненты."], ["Replace damaged components."]),
    heavyUsage: TL(["Yoqilg'i hidlari bo'lsa darhol diagnostika."], ["При запахе топлива — диагностика."], ["Diagnose immediately on fuel smell."]),
    warnings: TL(["Check Engine.", "Yoqilg'i hidi.", "Tank qopqog'i ogohlantirishi."], ["Check Engine.", "Запах топлива.", "Предупреждение о крышке бака."], ["Check Engine.", "Fuel smell.", "Fuel cap warning."]),
    summaryInspection: T("Reglament bo'yicha.", "По регламенту.", "Per regulation."),
    summaryReplacement: T("Holat bo'yicha.", "По состоянию.", "By condition."),
    badges: ["inspect"],
  },
  pcv: {
    partId: "pcv",
    title: T("PCV tizimi", "Система PCV", "PCV system"),
    function: T(
      "PCV (karter ventilyatsiyasi) tizimi karter gazlarini boshqaradi va dvigatel sof ishlashiga yordam beradi.",
      "Система PCV управляет картерными газами и помогает чистой работе двигателя.",
      "The PCV system manages crankcase gases and helps the engine run cleanly.",
    ),
    inspection: TL(["Karter ventilyatsiyasi tizimini tekshiring."], ["Проверка системы вентиляции картера."], ["Inspect the crankcase ventilation system."]),
    replacement: TL(["Tiqilgan bo'lsa tozalang yoki komponentlarni almashtiring."], ["При засорении — очистка или замена компонентов."], ["Clean or replace components if blocked."]),
    heavyUsage: TL(["Eski moy va qisqa safarlar PCV ifloslanishini tezlashtiradi."], ["Старое масло и короткие поездки засоряют PCV быстрее."], ["Old oil and short trips clog the PCV faster."]),
    warnings: TL(["Salt yurish beqaror.", "Moy iste'molining oshishi.", "Tiqilish belgilari."], ["Неустойчивый холостой ход.", "Рост расхода масла.", "Признаки засорения."], ["Unstable idle.", "Increased oil consumption.", "Signs of blockage."]),
    summaryInspection: T("Muntazam.", "Регулярно.", "Regularly."),
    summaryReplacement: T("Holat bo'yicha.", "По состоянию.", "By condition."),
    badges: ["inspect"],
  },
  transmissionOil: {
    partId: "transmissionOil",
    title: T("Transmissiya moyi", "Трансмиссионное масло", "Transmission oil"),
    function: T(
      "Transmissiya moyi uzatma qutisi qismlarini moylaydi va sovutadi.",
      "Трансмиссионное масло смазывает и охлаждает детали коробки передач.",
      "Transmission oil lubricates and cools gearbox components.",
    ),
    inspection: TL(
      ["Mexanik uzatma moyi: reglament bo'yicha tekshiring.", "Avtomat uzatma moyi: reglamentda taxminan 105 000 km belgilangan."],
      ["МКПП: проверка по регламенту.", "АКПП: в регламенте указано ~105 000 км."],
      ["MT oil: inspect per regulation.", "AT oil: regulation notes ~105,000 km."],
    ),
    replacement: TL(["Og'ir foydalanishda oldinroq xizmat ko'rsatish talab etilishi mumkin."], ["В тяжёлых условиях возможна досрочная замена."], ["Heavy usage may require earlier service."]),
    heavyUsage: TL(["Og'ir yuk, tirbandlik va tog' yo'llari moy yuklamasini oshiradi."], ["Груз, пробки и горы повышают нагрузку на масло."], ["Heavy loads, traffic and mountains increase oil stress."]),
    warnings: TL(["Uzatmalar tutilib qoladi.", "Shovqin.", "Sekin javob."], ["Толчки при переключении.", "Шум.", "Замедленный отклик."], ["Gear shifts hesitate.", "Noise.", "Slow response."]),
    summaryInspection: T("Reglament bo'yicha.", "По регламенту.", "Per regulation."),
    summaryReplacement: T("AKPP ~105 000 km · og'irda oldinroq.", "АКПП ~105 000 км · в тяжёлых раньше.", "AT ~105,000 km · earlier in heavy usage."),
    badges: ["inspect", "replace"],
  },
  seatBelts: {
    partId: "seatBelts",
    title: T("Xavfsizlik kamarlari va qulflari", "Ремни безопасности и замки", "Seat belts and locks"),
    function: T(
      "Xavfsizlik kamarlari va qulflari avariya paytida hayotni saqlovchi asosiy element hisoblanadi.",
      "Ремни безопасности и замки — ключевой элемент защиты при ДТП.",
      "Seat belts and locks are a key life-saving element during a crash.",
    ),
    inspection: TL(["Har servisda tekshiring.", "Lenta va qulflarning ishlashini sinab ko'ring."], ["Проверка на каждом ТО.", "Тестирование ленты и замков."], ["Inspect every service.", "Test webbing and locks function."]),
    replacement: TL(["Shikastlangan, kesilgan yoki noto'g'ri ishlayotgan kamarlarni almashtiring."], ["Меняйте повреждённые, рваные или неисправные ремни."], ["Replace damaged, cut or malfunctioning belts."]),
    heavyUsage: TL(["Quyosh va eskirish lentaga ta'sir qiladi."], ["Солнце и износ влияют на ленту."], ["Sun and wear affect the webbing."]),
    warnings: TL(["Kamar tortilmaydi.", "Qulf yopilmaydi.", "Lenta yirtilgan."], ["Ремень не втягивается.", "Замок не защёлкивается.", "Лента порвана."], ["Belt does not retract.", "Lock does not engage.", "Webbing torn."]),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Shikastlanganda darhol.", "При повреждении — сразу.", "On damage — immediately."),
    badges: ["inspect", "safety"],
  },
  fuelTank: {
    partId: "fuelTank",
    title: T("Yoqilg'i baki", "Топливный бак", "Fuel tank"),
    function: T(
      "Yoqilg'i baki yoqilg'ini xavfsiz saqlash uchun mo'ljallangan.",
      "Топливный бак предназначен для безопасного хранения топлива.",
      "The fuel tank stores fuel safely.",
    ),
    inspection: TL(["Reglament yoki ifloslanish belgilari bo'lganda tekshiring/tozalang."], ["Проверка/чистка по регламенту или при признаках загрязнения."], ["Inspect/clean per regulation or on contamination signs."]),
    replacement: TL(["Shikastlanganda yoki tuzatib bo'lmas korroziyada almashtiring."], ["При повреждении или неустранимой коррозии — замена."], ["Replace on damage or irreparable corrosion."]),
    heavyUsage: TL(["Sifatsiz yoqilg'i tank ichida cho'kma qoldiradi."], ["Некачественное топливо оставляет осадок в баке."], ["Poor fuel leaves sediment inside the tank."]),
    warnings: TL(["Yoqilg'i sizishi.", "Yoqilg'i hidi.", "Tankdagi cho'kma."], ["Утечка топлива.", "Запах топлива.", "Осадок в баке."], ["Fuel leak.", "Fuel smell.", "Sediment in the tank."]),
    summaryInspection: T("Talab bo'yicha.", "По требованию.", "When required."),
    summaryReplacement: T("Shikast yoki korroziyada.", "При повреждении/коррозии.", "On damage or corrosion."),
    badges: ["inspect", "safety"],
  },
};
