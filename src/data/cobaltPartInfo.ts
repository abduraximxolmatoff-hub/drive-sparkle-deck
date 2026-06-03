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
      "Faralar va tashqi yoritish tizimi tunda va yomon ob-havoda yo‘l ko‘rinishini, oldindagi haydovchilar bilan vizual aloqani va xavfsiz manevrni ta‘minlaydi. Kuchsiz yoki noto‘g‘ri sozlangan yoritish — bevosita xavfsizlik masalasi.",
      "Фары и внешнее освещение обеспечивают видимость ночью и в непогоду, визуальную связь с другими водителями и безопасное маневрирование. Слабый или сбитый свет — прямой риск безопасности.",
      "Headlights and exterior lighting provide visibility at night and in poor weather, visual communication with other drivers and safe maneuvering. Weak or misaligned light is a direct safety risk.",
    ),
    intervals: [
      {
        label: T("Galogen lampa", "Галогенная лампа", "Halogen bulb"),
        value: T("1–2 yil / ~500–1000 soat", "1–2 года / ~500–1000 ч", "1–2 yr / ~500–1000 h"),
        tone: "accent",
      },
      {
        label: T("LED modul", "LED модуль", "LED module"),
        value: T("15 000–30 000 soat", "15 000–30 000 ч", "15,000–30,000 h"),
        tone: "safe",
      },
      {
        label: T("Vizual tekshirish", "Визуальный осмотр", "Visual check"),
        value: T("Oyiga 1 marta", "Раз в месяц", "Once a month"),
      },
      {
        label: T("Yo‘nalish sozlash", "Регулировка света", "Beam alignment"),
        value: T("Har 20 000 km / urilishdan keyin", "Каждые 20 000 км / после удара", "Every 20,000 km / after impact"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Oyda 1 marta: yaqin nur, uzoq nur, gabarit, burilish, stop, orqaga yurish va avariya chiroqlari ishlashini tekshiring.",
        "Fara linzasi ichida bug‘ yoki kondensat bor-yo‘qligini ko‘ring — namlik aks ettiruvchi qoplamani buzadi.",
        "Plastik linzaning sarg‘ayishi yoki xiralashishi yorug‘lik kuchini 40–60% gacha pasaytiradi.",
        "Stop va burilish chiroqlarini yordamchi bilan yoki devor aksida tekshiring.",
        "Razyom va simlarda korroziya, eriyish yoki bo‘shashish belgilari bormi — qarang.",
      ],
      [
        "Раз в месяц: проверяйте ближний, дальний, габариты, поворотники, стоп, задний ход и аварийку.",
        "Осматривайте линзу на запотевание и конденсат — влага разрушает отражающее покрытие.",
        "Пожелтение и помутнение пластика снижает световой поток на 40–60%.",
        "Стоп и поворотники проверяйте с помощником или по отражению от стены.",
        "Смотрите разъёмы и провода на коррозию, оплавление и люфт.",
      ],
      [
        "Monthly: verify low beam, high beam, parking, turn signals, brake, reverse and hazard lights.",
        "Inspect the lens for fogging or condensation — moisture degrades the reflective coating.",
        "Yellowed or hazy plastic lenses cut light output by 40–60%.",
        "Test brake and turn signals with a helper or wall reflection.",
        "Check connectors and wiring for corrosion, melting or looseness.",
      ],
    ),
    replacement: TL(
      [
        "Galogen H4/H7 lampalar — 1–2 yilda yoki yorug‘lik sezilarli kuchsizlansa almashtiriladi.",
        "Lampani juftligi bilan almashtiring — bir tomon yangi, ikkinchisi eski bo‘lsa nur notekis tushadi.",
        "LED modullar uzoq xizmat qiladi, lekin nosozlikda butun blok almashtiriladi.",
        "Sarg‘aygan linzani polirovka qiling yoki UV-himoyali qoplama bilan tiklang.",
        "Razyom kuyganda yoki eriganda — lampa bilan birga razyom ham yangilanadi.",
      ],
      [
        "Галогенки H4/H7 — раз в 1–2 года или при заметном падении света.",
        "Меняйте лампы парой — иначе свет будет неравномерным.",
        "LED модули долговечны, но при отказе меняется блок целиком.",
        "Пожелтевшую линзу полируют и покрывают UV-защитой.",
        "Если разъём оплавлен — меняйте вместе с лампой.",
      ],
      [
        "Halogen H4/H7 bulbs — every 1–2 years or when output drops noticeably.",
        "Always replace bulbs in pairs — mismatched bulbs cause an uneven beam pattern.",
        "LED modules last long, but the whole unit is replaced on failure.",
        "Polish yellowed lenses and seal with a UV-protective coating.",
        "If a connector is melted or burnt, replace it together with the bulb.",
      ],
    ),
    heavyUsage: TL(
      [
        "Tungi reyslar, magistral va shahar tashqarisi safarlar lampa resursini qisqartiradi.",
        "Yomg‘ir, qor, tuman va chang sharoitida har safardan oldin yoritishni tekshiring.",
        "Yomon yo‘l va tez-tez urilishlar yo‘nalish sozlamasini buzadi.",
      ],
      [
        "Ночные поездки и трасса сокращают ресурс ламп.",
        "В дождь, снег, туман и пыль — проверяйте свет перед каждой поездкой.",
        "Плохие дороги и удары сбивают регулировку света.",
      ],
      [
        "Frequent night and highway driving shortens bulb life.",
        "In rain, snow, fog and dust — check lighting before every trip.",
        "Rough roads and impacts knock the beam out of alignment.",
      ],
    ),
    warnings: TL(
      [
        "Yaqin yoki uzoq nur sezilarli kuchsizlandi yoki sariq tusga o‘tdi.",
        "Bitta fara o‘chgan yoki lipillaydi — lampa, sigorta yoki razyom muammosi.",
        "Burilish signali oddiydan tez lipillaydi — lampalardan biri kuygan.",
        "Stop chirog‘i yonmayapti — orqadan urilish xavfi.",
        "Fara ichida bug‘, suv tomchilari yoki dog‘lar paydo bo‘ldi.",
        "Tunda nur tepaga qaratilgan — qarama-qarshi haydovchilarni ko‘r qiladi.",
        "Yorug‘lik xira, linza sarg‘aygan yoki yorilgan.",
      ],
      [
        "Ближний или дальний свет заметно ослаб или стал жёлтым.",
        "Одна фара не горит или мерцает — лампа, предохранитель или разъём.",
        "Поворотник мигает чаще обычного — одна из ламп перегорела.",
        "Стоп-сигнал не горит — риск удара сзади.",
        "Внутри фары запотевание, капли воды или пятна.",
        "Свет направлен вверх — слепит встречных.",
        "Свет тусклый, линза пожелтела или треснула.",
      ],
      [
        "Low or high beam noticeably dimmer or shifted to yellow.",
        "One headlight off or flickering — bulb, fuse or connector issue.",
        "Turn signal blinks faster than normal — one bulb is out.",
        "Brake light not working — risk of rear-end collision.",
        "Condensation, water drops or stains inside the housing.",
        "Beam aimed too high — blinds oncoming drivers.",
        "Light is dim, lens is yellowed or cracked.",
      ],
    ),
    usefulTips: TL(
      [
        "Linzani yumshoq mato va avtoshampun bilan yuving — qattiq cho‘tka qoplamani tirnaydi.",
        "Lampani almashtirayotganda kolbasiga qo‘l tegmasin — yog‘ izi resursni qisqartiradi.",
        "Faralar yo‘nalishini g‘ildirak almashtirish yoki yuk bilan uzoq safar oldidan tekshiring.",
        "Sarg‘aygan linzani polirovka + UV lak bilan tiklash yangi fara narxidan 5–10 baravar arzon.",
        "Tunda safardan oldin barcha tashqi chiroqlarni 30 soniyada tekshirib chiqing.",
        "Asl yoki ishonchli brend lampani tanlang — arzon analoglar tez kuyadi va nuri notekis.",
      ],
      [
        "Мойте линзу мягкой тканью и автошампунем — жёсткая щётка царапает покрытие.",
        "При замене не трогайте колбу руками — жир сокращает срок службы.",
        "Регулировку света проверяйте после смены колёс и перед поездкой с грузом.",
        "Полировка и UV-лак пожелтевшей фары в 5–10 раз дешевле новой.",
        "Перед ночной поездкой за 30 секунд проверьте весь внешний свет.",
        "Берите оригинал или проверенный бренд — дешёвые аналоги быстро перегорают.",
      ],
      [
        "Clean the lens with soft cloth and car shampoo — stiff brushes scratch the coating.",
        "Never touch the bulb glass with bare fingers — skin oil shortens its life.",
        "Re-check beam alignment after wheel changes or before long trips with heavy load.",
        "Polishing + UV coating a yellowed lens is 5–10× cheaper than a new headlight.",
        "Before any night trip, do a 30-second walk-around of all exterior lights.",
        "Use OEM or trusted brand bulbs — cheap copies burn out fast and project an uneven beam.",
      ],
    ),
    summaryInspection: T(
      "Oyiga 1 marta vizual + har servisda. Yo‘nalish — har 20 000 km.",
      "Раз в месяц визуально + на каждом ТО. Регулировка — каждые 20 000 км.",
      "Monthly visual + every service. Alignment — every 20,000 km.",
    ),
    summaryReplacement: T(
      "Galogen — 1–2 yil, juftligi bilan. LED — nosozlikda blok almashtiriladi.",
      "Галоген — 1–2 года, парой. LED — при отказе меняется блок.",
      "Halogen — every 1–2 yr, in pairs. LED — replace the unit on failure.",
    ),
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

  // ═══════════════════════════════════════════════════════════════
  // YANGI QISMLAR — Cobalt reglamentidan
  // ═══════════════════════════════════════════════════════════════

  fuel_filter: {
    partId: "fuel_filter",
    title: T("Yonilg'i filtri", "Топливный фильтр", "Fuel filter"),
    function: T(
      "Yonilg'i filtri dvigatelga kirayotgan yoqilg'idan ifloslantiruvchi zarrachalarni tozalab, injektorlar va nasos umrini uzaytiradi.",
      "Топливный фильтр очищает топливо от загрязнений перед двигателем, продлевая жизнь форсунок и насоса.",
      "The fuel filter removes contaminants from fuel before it reaches the engine, protecting injectors and the fuel pump.",
    ),
    intervals: [
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har 10 000 km", "Каждые 10 000 км", "Every 10,000 km"),
        tone: "accent",
      },
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("Har 20 000 km", "Каждые 20 000 км", "Every 20,000 km"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Reglament bo'yicha har 10 000 km da tekshiriladi.",
        "Yonilg'i shlang va ulanishlari bilan birga ko'zdan kechiriladi.",
        "Siqilish va sizish belgilariga e'tibor bering.",
        "Yoqilg'i sifati filtning xizmat muddatiga bevosita ta'sir qiladi.",
      ],
      [
        "По регламенту проверяется каждые 10 000 км.",
        "Осматривается вместе с топливными шлангами и соединениями.",
        "Обратите внимание на признаки засорения и утечек.",
        "Качество топлива напрямую влияет на срок службы фильтра.",
      ],
      [
        "Per regulation inspected every 10,000 km.",
        "Inspected together with fuel hoses and connections.",
        "Watch for signs of clogging and leaks.",
        "Fuel quality directly affects filter lifespan.",
      ],
    ),
    replacement: TL(
      [
        "Reglament bo'yicha har 20 000 km da almashtiriladi.",
        "Og'ir sharoitda (sifatsiz yoqilg'i, chang) oldinroq almashtiring.",
        "Tiqilish belgilari paydo bo'lsa kechiktirmang.",
        "Yonilg'i nasos va injektorlarni himoya qilish uchun o'z vaqtida almashtiring.",
      ],
      [
        "По регламенту замена каждые 20 000 км.",
        "В тяжёлых условиях (плохое топливо, пыль) — раньше.",
        "При признаках засорения — не откладывайте.",
        "Своевременная замена защищает насос и форсунки.",
      ],
      [
        "Per regulation replacement every 20,000 km.",
        "In tough conditions (poor fuel, dust) — replace earlier.",
        "If signs of clogging appear — do not delay.",
        "Timely replacement protects the fuel pump and injectors.",
      ],
    ),
    heavyUsage: TL(
      [
        "Sifatsiz yoqilg'i quyilganda filtr tezroq ifloslangan.",
        "Uzoq masofali safarlar va changli yo'llarda tez-tez tekshiring.",
        "AZS sifatiga e'tibor bering — filtning umri shunga bog'liq.",
      ],
      [
        "При некачественном топливе фильтр загрязняется быстрее.",
        "На дальних поездках и пыльных дорогах — чаще проверка.",
        "Следите за качеством АЗС — от этого зависит ресурс фильтра.",
      ],
      [
        "Poor fuel quality clogs the filter faster.",
        "On long trips and dusty roads — check more often.",
        "Pay attention to fuel station quality — it affects filter life.",
      ],
    ),
    warnings: TL(
      [
        "Dvigatel quvvatining pasayishi.",
        "Beqaror salt yurish.",
        "Tezlanishda tutilish.",
        "Yoqilg'i sarfining oshishi.",
        "Dvigatelni ishga tushirish qiyinlashadi.",
      ],
      [
        "Потеря мощности двигателя.",
        "Нестабильный холостой ход.",
        "Провалы при ускорении.",
        "Рост расхода топлива.",
        "Затруднённый запуск двигателя.",
      ],
      [
        "Engine power loss.",
        "Unstable idle.",
        "Hesitation during acceleration.",
        "Increased fuel consumption.",
        "Difficulty starting the engine.",
      ],
    ),
    usefulTips: TL(
      [
        "Sifatli AZS dan yoqilg'i quyish filtr umrini uzaytiradi.",
        "Filtni o'z vaqtida almashtirish yoqilg'i nasosini ham himoya qiladi.",
        "Yonilg'i shlanglari bilan birga tekshirish tavsiya etiladi.",
      ],
      [
        "Топливо с качественных АЗС продлевает ресурс фильтра.",
        "Своевременная замена защищает и топливный насос.",
        "Рекомендуется проверять вместе с топливными шлангами.",
      ],
      [
        "Quality fuel stations extend the filter's life.",
        "Timely replacement also protects the fuel pump.",
        "Recommended to inspect together with fuel hoses.",
      ],
    ),
    summaryInspection: T("Har 10 000 km da.", "Каждые 10 000 км.", "Every 10,000 km."),
    summaryReplacement: T("Har 20 000 km da.", "Каждые 20 000 км.", "Every 20,000 km."),
    badges: ["inspect", "replace"],
  },

  cabin_filter: {
    partId: "cabin_filter",
    title: T("Salon havo filtri", "Салонный фильтр воздуха", "Cabin air filter"),
    function: T(
      "Salon havo filtri (konditsioner filtri) salonga kiradigan havoni chang, pollen va iflosliklardan tozalaydi, haydovchi va yo'lovchilar sog'lig'ini himoya qiladi.",
      "Салонный фильтр воздуха (фильтр кондиционера) очищает воздух в салоне от пыли, пыльцы и загрязнений, защищая здоровье водителя и пассажиров.",
      "The cabin air filter (AC filter) cleans the air inside the cabin from dust, pollen and pollutants, protecting the health of driver and passengers.",
    ),
    intervals: [
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har 10 000 km", "Каждые 10 000 км", "Every 10,000 km"),
        tone: "accent",
      },
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("Har 20 000 km / yiliga", "Каждые 20 000 км / раз в год", "Every 20,000 km / yearly"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Reglament bo'yicha har 10 000 km da tekshiriladi.",
        "Konditsioner samaradorligi pasaysa filtrni tekshiring.",
        "Salondan yoqimsiz hid kelsa almashtirish vaqti kelgan.",
        "Changli sharoitda tez-tez tekshirish zarur.",
      ],
      [
        "По регламенту проверяется каждые 10 000 км.",
        "При снижении эффективности кондиционера — проверьте фильтр.",
        "Неприятный запах в салоне — признак загрязнённого фильтра.",
        "В пыльных условиях — чаще проверка.",
      ],
      [
        "Per regulation inspected every 10,000 km.",
        "Check the filter if AC efficiency decreases.",
        "Unpleasant smell in the cabin means the filter needs attention.",
        "In dusty conditions inspect more often.",
      ],
    ),
    replacement: TL(
      [
        "Har 20 000 km da yoki yiliga bir marta almashtiriladi.",
        "Og'ir sharoitda (changli yo'llar, shahar) oldinroq almashtiring.",
        "Almashtirish odatda asbobsiz, oson bajariladigan ish.",
        "Yangi filtr konditsioner va isitish samaradorligini oshiradi.",
      ],
      [
        "Замена каждые 20 000 км или раз в год.",
        "В тяжёлых условиях (пыль, город) — раньше.",
        "Замена обычно простая — без инструментов.",
        "Новый фильтр повышает эффективность кондиционера и обогрева.",
      ],
      [
        "Replace every 20,000 km or once a year.",
        "In tough conditions (dust, city) — replace earlier.",
        "Replacement is usually simple — often without tools.",
        "A new filter improves AC and heating efficiency.",
      ],
    ),
    heavyUsage: TL(
      [
        "Changli yo'llar, qurilish hududlari va shahar muhitida tez-tez almashtiring.",
        "Bahorda pollen mavsumida filtni yangilash tavsiya etiladi.",
      ],
      [
        "Пыльные дороги, стройки и городская среда — меняйте чаще.",
        "Весной в сезон пыльцы — рекомендуется обновить фильтр.",
      ],
      [
        "Dusty roads, construction zones and urban environment — replace more often.",
        "In spring pollen season — a fresh filter is recommended.",
      ],
    ),
    warnings: TL(
      [
        "Salondan yoqimsiz yoki kuchli hid.",
        "Konditsioner yoki isitish samaradorligi pasaydi.",
        "Shisha tezda bug'lanadi.",
        "Haydovchi va yo'lovchilarda nafas olish noqulayligi.",
      ],
      [
        "Неприятный или резкий запах в салоне.",
        "Снижение эффективности кондиционера или обогрева.",
        "Стёкла быстро запотевают.",
        "Дискомфорт при дыхании у водителя и пассажиров.",
      ],
      [
        "Unpleasant or strong smell in the cabin.",
        "Reduced AC or heating efficiency.",
        "Windows fog up quickly.",
        "Driver and passengers feel discomfort while breathing.",
      ],
    ),
    usefulTips: TL(
      [
        "Bahorda almashtirishni odat qiling — pollen mavsumidan oldin.",
        "Iflos filtr konditsioner kompressorini ham yuklab qo'yadi.",
        "O'zi almashtirish mumkin — YouTube da ko'rsatmalar bor.",
      ],
      [
        "Возьмите за привычку менять весной — перед сезоном пыльцы.",
        "Грязный фильтр нагружает компрессор кондиционера.",
        "Можно заменить самостоятельно — инструкции есть на YouTube.",
      ],
      [
        "Make it a habit to replace in spring — before pollen season.",
        "A dirty filter also strains the AC compressor.",
        "Can be replaced by yourself — instructions available on YouTube.",
      ],
    ),
    summaryInspection: T("Har 10 000 km da.", "Каждые 10 000 км.", "Every 10,000 km."),
    summaryReplacement: T("Har 20 000 km yoki yiliga.", "Каждые 20 000 км или раз в год.", "Every 20,000 km or yearly."),
    badges: ["inspect", "replace"],
  },

  spark_plugs: {
    partId: "spark_plugs",
    title: T("O't oldirish svechalari", "Свечи зажигания", "Spark plugs"),
    function: T(
      "O't oldirish svechalari yoqilg'i-havo aralashmasini alangalantiradi va dvigatelning muammosiz ishlashini ta'minlaydi.",
      "Свечи зажигания воспламеняют топливно-воздушную смесь и обеспечивают бесперебойную работу двигателя.",
      "Spark plugs ignite the fuel-air mixture and ensure smooth engine operation.",
    ),
    intervals: [
      {
        label: T("Tekshirish / Almashtirish", "Проверка / Замена", "Check / Replace"),
        value: T("Har 25 000 km", "Каждые 25 000 км", "Every 25,000 km"),
        tone: "accent",
      },
      {
        label: T("Og'ir sharoit", "Тяжёлые условия", "Heavy usage"),
        value: T("15 000 km / 1 yil", "15 000 км / 1 год", "15,000 km / 1 year"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Reglament bo'yicha har 25 000 km da tekshiriladi va almashtiriladi.",
        "Dvigatel beqaror ishlasa yoki quvvat yo'qolsa svechalarni tekshiring.",
        "Svecha rangi dvigatel holati haqida ko'p ma'lumot beradi.",
        "Elektrod yeyilishi yoki tuzlanishi — almashtirish belgisi.",
      ],
      [
        "По регламенту проверяются и заменяются каждые 25 000 км.",
        "При нестабильной работе или потере мощности — проверьте свечи.",
        "Цвет свечи много говорит о состоянии двигателя.",
        "Износ электрода или нагар — признак замены.",
      ],
      [
        "Per regulation inspected and replaced every 25,000 km.",
        "Check spark plugs if engine runs rough or loses power.",
        "Spark plug color tells a lot about engine condition.",
        "Worn electrode or heavy deposits — time to replace.",
      ],
    ),
    replacement: TL(
      [
        "Normal sharoitda har 25 000 km da almashtiriladi.",
        "Og'ir sharoitda (chang, qisqa safarlar, issiq) — har 15 000 km yoki 1 yilda.",
        "Faqat ishlab chiqaruvchi tavsiya qilgan svecha turini ishlating.",
        "Barcha svechalarni bir vaqtda almashtiring.",
      ],
      [
        "В нормальных условиях — каждые 25 000 км.",
        "В тяжёлых условиях (пыль, короткие поездки, жара) — каждые 15 000 км или 1 год.",
        "Используйте только рекомендованный производителем тип свечей.",
        "Меняйте все свечи одновременно.",
      ],
      [
        "Normal conditions: every 25,000 km.",
        "Heavy usage (dust, short trips, heat) — every 15,000 km or 1 year.",
        "Only use the manufacturer-recommended spark plug type.",
        "Replace all spark plugs at the same time.",
      ],
    ),
    heavyUsage: TL(
      [
        "Qisqa masofalarda tez-tez yurish svechalarni tez ifloslantiradi.",
        "Shahar tirbandligi va uzoq salt ishlash svecha umrini qisqartiradi.",
        "Og'ir sharoitda yillik almashtirish tavsiya etiladi.",
      ],
      [
        "Частые короткие поездки быстро загрязняют свечи.",
        "Городские пробки и длительный холостой ход сокращают ресурс.",
        "В тяжёлых условиях — ежегодная замена.",
      ],
      [
        "Frequent short trips quickly foul spark plugs.",
        "City traffic and long idling shorten plug life.",
        "In heavy usage conditions — annual replacement recommended.",
      ],
    ),
    warnings: TL(
      [
        "Dvigatel beqaror ishlaydi (\"titrash\").",
        "Start qiyinlashadi.",
        "Quvvat yo'qolishi.",
        "Yoqilg'i sarfining oshishi.",
        "Check Engine chirog'i.",
        "Tezlanishda tutilish.",
      ],
      [
        "Нестабильная работа двигателя (\"троит\").",
        "Затруднённый пуск.",
        "Потеря мощности.",
        "Рост расхода топлива.",
        "Индикатор Check Engine.",
        "Провалы при разгоне.",
      ],
      [
        "Engine misfires or runs rough.",
        "Difficulty starting.",
        "Power loss.",
        "Increased fuel consumption.",
        "Check Engine light on.",
        "Hesitation during acceleration.",
      ],
    ),
    usefulTips: TL(
      [
        "Svechalarni har doim to'plam bilan almashtiring.",
        "Noto'g'ri svecha turi dvigatelga zarar yetkazishi mumkin.",
        "Svecha rangini ko'rib dvigatel holatini baholash mumkin: kulrang — normal, qora — boy aralashma yoki moy.",
      ],
      [
        "Свечи меняйте всегда комплектом.",
        "Неправильный тип свечи может навредить двигателю.",
        "Цвет свечи = состояние двигателя: серый — норма, чёрный — богатая смесь или масло.",
      ],
      [
        "Always replace spark plugs as a complete set.",
        "Wrong plug type can damage the engine.",
        "Plug color = engine health: grey — normal, black — rich mixture or oil.",
      ],
    ),
    summaryInspection: T("Har 25 000 km da.", "Каждые 25 000 км.", "Every 25,000 km."),
    summaryReplacement: T("25 000 km · og'irda 15 000 km / 1 yil.", "25 000 км · в тяжёлых 15 000 км / 1 год.", "25,000 km · heavy usage 15,000 km / 1 year."),
    badges: ["inspect", "replace", "heavy"],
  },

  brake_fluid: {
    partId: "brake_fluid",
    title: T("Tormoz suyuqligi", "Тормозная жидкость", "Brake fluid"),
    function: T(
      "Tormoz suyuqligi pedal bosimini tormoz mexanizmlariga uzatadi va ilashish muftasini boshqaradi. Bu xavfsizlik tizimining asosiy elementi.",
      "Тормозная жидкость передаёт давление педали на тормозные механизмы и управляет сцеплением. Ключевой элемент системы безопасности.",
      "Brake fluid transmits pedal pressure to the brake mechanisms and controls the clutch. A key element of the safety system.",
    ),
    intervals: [
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har 10 000 km", "Каждые 10 000 км", "Every 10,000 km"),
        tone: "accent",
      },
      {
        label: T("Almashtirish", "Замена", "Replacement"),
        value: T("Har 32 500 km / 2 yil", "Каждые 32 500 км / 2 года", "Every 32,500 km / 2 years"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Reglament bo'yicha har 10 000 km da tekshiriladi.",
        "Suyuqlik darajasi min va max belgilari orasida bo'lishi kerak.",
        "Rang va tiniqligini tekshiring — qoraygan bo'lsa almashtiring.",
        "Ilashish muftasi (suyuqlik bilan boshqariladigan) ham bir vaqtda tekshiriladi.",
        "Tormoz pedalining bo'sh yurishi tekshirilishi shart.",
      ],
      [
        "По регламенту проверяется каждые 10 000 км.",
        "Уровень жидкости — между min и max.",
        "Проверяйте цвет и прозрачность — при потемнении заменить.",
        "Сцепление (гидравлическое) проверяется одновременно.",
        "Свободный ход педали тормоза — обязательная проверка.",
      ],
      [
        "Per regulation inspected every 10,000 km.",
        "Fluid level must be between min and max marks.",
        "Check color and clarity — replace if darkened.",
        "Hydraulic clutch is also checked at the same time.",
        "Brake pedal free play must be checked.",
      ],
    ),
    replacement: TL(
      [
        "Reglament bo'yicha har 32 500 km yoki 2 yilda almashtiriladi.",
        "Og'ir sharoitda (tez-tez tormoz berish, tog' yo'llari) oldinroq almashtiring.",
        "Suyuqlik qoraygan, loyqalangan yoki daraja tez pasaysa — darhol almashtiring.",
        "Faqat tavsiya etilgan tormoz suyuqligidan foydalaning (DOT spetsifikatsiya).",
      ],
      [
        "По регламенту замена каждые 32 500 км или 2 года.",
        "В тяжёлых условиях (частое торможение, горы) — раньше.",
        "При потемнении, помутнении или частом падении уровня — сразу.",
        "Используйте только рекомендованную жидкость (спецификация DOT).",
      ],
      [
        "Per regulation replacement every 32,500 km or 2 years.",
        "In tough conditions (frequent braking, mountain roads) — replace earlier.",
        "If darkened, cloudy or level drops frequently — replace immediately.",
        "Only use recommended brake fluid (DOT specification).",
      ],
    ),
    heavyUsage: TL(
      [
        "Tog' yo'llari va shahar tirbandligida tez-tez tormoz suyuqligini tekshiring.",
        "Intensiv tormoz berishda suyuqlik qizib ketishi mumkin — sifatiga e'tibor bering.",
      ],
      [
        "На горных дорогах и в городских пробках — чаще проверяйте.",
        "При интенсивном торможении жидкость может перегреться — следите за качеством.",
      ],
      [
        "On mountain roads and in city traffic — check more often.",
        "Heavy braking can overheat the fluid — pay attention to quality.",
      ],
    ),
    warnings: TL(
      [
        "Tormoz pedali yumshoq yoki \"botib\" ketadi.",
        "Tormozlash masofasi uzaydi.",
        "Tormoz suyuqligi darajasi tushadi.",
        "Tormoz ogohlantirish chirog'i yonadi.",
        "Mashina ostida tormoz suyuqligi sizib chiqadi.",
      ],
      [
        "Мягкая или \"проваливающаяся\" педаль тормоза.",
        "Увеличение тормозного пути.",
        "Падение уровня тормозной жидкости.",
        "Индикатор тормозов горит.",
        "Утечка жидкости под машиной.",
      ],
      [
        "Soft or sinking brake pedal.",
        "Increased braking distance.",
        "Brake fluid level drops.",
        "Brake warning light is on.",
        "Fluid leak under the vehicle.",
      ],
    ),
    usefulTips: TL(
      [
        "Tormoz suyuqligi namlikni yutadi — shuning uchun vaqti-vaqtida almashtirish zarur.",
        "Past sifatli yoki noto'g'ri suyuqlik tormoz tizimini shikastlaydi.",
        "Tormoz muammolari — bevosita xavfsizlik masalasi, kechiktirmang.",
      ],
      [
        "Тормозная жидкость поглощает влагу — поэтому требует периодической замены.",
        "Неправильная или низкокачественная жидкость повреждает тормозную систему.",
        "Проблемы с тормозами — вопрос безопасности, не откладывайте.",
      ],
      [
        "Brake fluid absorbs moisture — that is why periodic replacement is necessary.",
        "Wrong or low-quality fluid damages the brake system.",
        "Brake issues are a safety matter — do not delay.",
      ],
    ),
    summaryInspection: T("Har 10 000 km da.", "Каждые 10 000 км.", "Every 10,000 km."),
    summaryReplacement: T("Har 32 500 km yoki 2 yilda.", "Каждые 32 500 км или 2 года.", "Every 32,500 km or 2 years."),
    badges: ["inspect", "replace", "safety"],
  },

  transmission: {
    partId: "transmission",
    title: T("Transmissiya moyi", "Трансмиссионное масло", "Transmission fluid"),
    function: T(
      "Transmissiya moyi uzatmalar qutisi va mexanik uzatma qismlarini moylaydi, sovutadi va yeyilishdan himoya qiladi.",
      "Трансмиссионное масло смазывает, охлаждает и защищает от износа детали коробки передач.",
      "Transmission fluid lubricates, cools and protects gearbox components from wear.",
    ),
    intervals: [
      {
        label: T("Mexanik KPP", "Механическая КПП", "Manual gearbox"),
        value: T("Har servisda tekshirish", "Проверка на каждом ТО", "Check every service"),
        tone: "accent",
      },
      {
        label: T("Avtomat KPP", "Автоматическая КПП", "Automatic gearbox"),
        value: T("~105 000 km", "~105 000 км", "~105,000 km"),
        tone: "warn",
      },
    ],
    inspection: TL(
      [
        "Mexanik uzatma qutisi moyi har texnik xizmatda tekshiriladi.",
        "Suyuqlik darajasi va rangini tekshiring.",
        "Sizish belgilarini ko'zdan kechiring.",
        "Avtomat uzatma qutisi moyi reglament bo'yicha ~105 000 km da almashtiriladi.",
      ],
      [
        "Масло МКПП проверяется на каждом ТО.",
        "Проверяйте уровень и цвет жидкости.",
        "Осматривайте на признаки утечек.",
        "Масло АКПП по регламенту меняется ~каждые 105 000 км.",
      ],
      [
        "Manual gearbox oil checked at every service.",
        "Check fluid level and color.",
        "Inspect for signs of leaks.",
        "Automatic transmission fluid replaced per regulation at ~105,000 km.",
      ],
    ),
    replacement: TL(
      [
        "Avtomat KPP: normal sharoitda har 140 000 km da almashtiring.",
        "Og'ir sharoitda: har 70 000 km da almashtirish tavsiya etiladi.",
        "Mexanik KPP: sizish yoki holat yomonlashganda almashtiring.",
        "Faqat tavsiya etilgan suyuqlik turini ishlating.",
      ],
      [
        "АКПП: в нормальных условиях — каждые 140 000 км.",
        "В тяжёлых условиях: каждые 70 000 км.",
        "МКПП: при утечке или ухудшении состояния — замена.",
        "Используйте только рекомендованный тип жидкости.",
      ],
      [
        "Automatic: normal conditions — every 140,000 km.",
        "Heavy conditions: every 70,000 km.",
        "Manual: replace on leaks or when condition deteriorates.",
        "Only use the recommended fluid type.",
      ],
    ),
    heavyUsage: TL(
      [
        "Og'ir yuk, tog' yo'llari va tirbandlik uzatma qutisiga yuklanishni oshiradi.",
        "Bu sharoitlarda avtomat uzatma moyini oldinroq almashtiring.",
      ],
      [
        "Тяжёлый груз, горы и пробки повышают нагрузку на коробку.",
        "В таких условиях меняйте масло АКПП раньше срока.",
      ],
      [
        "Heavy loads, mountain roads and traffic increase gearbox stress.",
        "In these conditions replace automatic transmission fluid earlier.",
      ],
    ),
    warnings: TL(
      [
        "Uzatmalar qotib qoladi yoki shiqillaydi.",
        "Sirpanish his etiladi.",
        "Mashina ostida moy izi.",
        "Avtomat uzatma sekin javob beradi.",
        "G'alati ovoz yoki titrash.",
      ],
      [
        "Передачи не включаются или скрежет.",
        "Пробуксовка.",
        "Масляные пятна под машиной.",
        "Медленный отклик АКПП.",
        "Необычный звук или вибрация.",
      ],
      [
        "Gears won't engage or grind.",
        "Slipping sensation.",
        "Oil spots under the vehicle.",
        "Slow automatic transmission response.",
        "Unusual noise or vibration.",
      ],
    ),
    usefulTips: TL(
      [
        "Avtomat uzatmali mashinalarda to'g'ri suyuqlik turi juda muhim.",
        "Transmissiya muammolari erta aniqlansa, qimmat ta'mirdan qutilasiz.",
        "Suyuqlik rangi: qizg'ish — normal, qoraygan yoki kuygan hid — almashtiring.",
      ],
      [
        "Для автомата правильный тип жидкости критически важен.",
        "Ранняя диагностика трансмиссии спасёт от дорогого ремонта.",
        "Цвет: красноватый — норма, тёмный или запах гари — замена.",
      ],
      [
        "For automatics the correct fluid type is critical.",
        "Early detection of transmission issues saves costly repairs.",
        "Fluid color: reddish — normal; dark or burnt smell — replace.",
      ],
    ),
    summaryInspection: T("MКPP: har servisda · АКPP: reglament bo'yicha.", "МКПП: на каждом ТО · АКПП: по регламенту.", "MT: every service · AT: per regulation."),
    summaryReplacement: T("АКPP: ~105 000 km · og'irda 70 000 km.", "АКПП: ~105 000 км · в тяжёлых 70 000 км.", "AT: ~105,000 km · heavy 70,000 km."),
    badges: ["inspect", "replace", "heavy"],
  },

  steering: {
    partId: "steering",
    title: T("Rul mexanizmi", "Рулевой механизм", "Steering system"),
    function: T(
      "Rul mexanizmi haydovchining boshqaruvini g'ildiraklarga uzatadi va avtomobilning to'g'ri harakatini ta'minlaydi.",
      "Рулевой механизм передаёт управление водителя на колёса и обеспечивает правильное движение автомобиля.",
      "The steering system transfers the driver's input to the wheels and ensures correct vehicle direction.",
    ),
    intervals: [
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har servisda", "На каждом ТО", "Every service"),
        tone: "accent",
      },
      {
        label: T("Burchaklar (alignment)", "Углы установки", "Wheel alignment"),
        value: T("Har 20 000 km", "Каждые 20 000 км", "Every 20,000 km"),
      },
    ],
    inspection: TL(
      [
        "Rul g'ildiragi va mexanizmi har texnik xizmatda tekshiriladi.",
        "Rul gidrokuchaytirgichi suyuqligi, naylari va ulanishlari tekshiriladi.",
        "G'ildirak burchaklari har 20 000 km yoki rul o'zgarganda tekshiriladi.",
        "Xavfsizlik tasmalari va kuzovga mahkamlash to'qalari ham tekshiriladi.",
        "Rul bo'sh yurishi (lyuft) normadan oshmasligi kerak.",
      ],
      [
        "Рулевое колесо и механизм — на каждом ТО.",
        "ГУР: жидкость, трубки и соединения — проверка.",
        "Углы колёс — каждые 20 000 км или при изменении руля.",
        "Ремни безопасности и крепёжные узлы кузова — проверка.",
        "Люфт рулевого колеса не должен превышать норму.",
      ],
      [
        "Steering wheel and mechanism — every service.",
        "Power steering fluid, tubes and connections — inspect.",
        "Wheel angles — every 20,000 km or when steering changes.",
        "Seatbelts and body mounting nodes — inspect.",
        "Steering wheel play must not exceed normal limits.",
      ],
    ),
    replacement: TL(
      [
        "Gidrokuchaytiruvchi suyuqligi holat yomonlashganda almashtiriladi.",
        "Shikastlangan nay, ulanish yoki reyk — darhol almashtiring.",
        "Rul suyuqligi rangini tekshiring — loyqalangan bo'lsa almashtiring.",
      ],
      [
        "Жидкость ГУР меняется при ухудшении состояния.",
        "Повреждённая трубка, соединение или рейка — немедленная замена.",
        "Проверяйте цвет жидкости ГУР — при помутнении заменить.",
      ],
      [
        "Power steering fluid is replaced when condition deteriorates.",
        "Damaged tube, connection or rack — replace immediately.",
        "Check power steering fluid color — replace if cloudy.",
      ],
    ),
    heavyUsage: TL(
      [
        "Yomon yo'l, chuqurlar va keskin burilishlar rul mexanizmini tez yeyintiradi.",
        "Kuchli zarba yoki avariyadan keyin burchaklarni albatta tekshiring.",
      ],
      [
        "Плохие дороги, ямы и резкие повороты быстро изнашивают механизм.",
        "После сильного удара или аварии — обязательно проверьте углы.",
      ],
      [
        "Bad roads, potholes and sharp turns wear the steering mechanism faster.",
        "After a strong impact or accident — always check alignment.",
      ],
    ),
    warnings: TL(
      [
        "Rul bir tomonga tortadi.",
        "Rul bo'sh his qilinadi (lyuft oshgan).",
        "Burishda g'alati ovoz.",
        "Rul og'irlashadi.",
        "Gidrokuchaytiruvchi suyuqligi kamayadi.",
        "Notekis shina yeyilishi.",
      ],
      [
        "Руль тянет в одну сторону.",
        "Увеличенный люфт руля.",
        "Посторонний звук при повороте.",
        "Тяжёлый руль.",
        "Падение уровня жидкости ГУР.",
        "Неравномерный износ шин.",
      ],
      [
        "Steering pulls to one side.",
        "Increased steering play.",
        "Strange noise when turning.",
        "Heavy steering wheel.",
        "Power steering fluid level drops.",
        "Uneven tire wear.",
      ],
    ),
    usefulTips: TL(
      [
        "G'ildirak burchaklari noto'g'ri bo'lsa shina tez yeyiladi.",
        "Rul muammosi sezilsa kechiktirmang — bu xavfsizlik masalasi.",
        "Kuchli zarba yoki avariyadan keyin servisga boring.",
      ],
      [
        "Неправильные углы — шины быстро изнашиваются.",
        "Проблемы с рулём — не откладывайте, это вопрос безопасности.",
        "После удара или ДТП — в сервис.",
      ],
      [
        "Wrong wheel angles cause rapid tire wear.",
        "Steering problems — do not delay, it is a safety issue.",
        "After an impact or accident — visit a service center.",
      ],
    ),
    summaryInspection: T("Har servisda + burchaklar har 20 000 km.", "На каждом ТО + углы каждые 20 000 км.", "Every service + alignment every 20,000 km."),
    summaryReplacement: T("Holat bo'yicha · shikastlanganda darhol.", "По состоянию · при повреждении — сразу.", "By condition · on damage — immediately."),
    badges: ["inspect", "safety"],
  },

  exhaust: {
    partId: "exhaust",
    title: T("Chiqindi gaz tizimi", "Выхлопная система", "Exhaust system"),
    function: T(
      "Chiqindi gaz tizimi yonish gazlarini dvigateldan tashqariga chiqaradi, shovqinni kamaytiradi va zararli gazlarni filtrlaydi.",
      "Выхлопная система выводит газы сгорания из двигателя, снижает шум и фильтрует вредные выбросы.",
      "The exhaust system removes combustion gases from the engine, reduces noise and filters harmful emissions.",
    ),
    intervals: [
      {
        label: T("Tekshirish", "Проверка", "Inspection"),
        value: T("Har servisda", "На каждом ТО", "Every service"),
        tone: "accent",
      },
      {
        label: T("PCV / EVAP tizimi", "Система PCV/EVAP", "PCV/EVAP system"),
        value: T("Muntazam", "Регулярно", "Regularly"),
      },
    ],
    inspection: TL(
      [
        "Ishlangan gazlarni chiqarish tizimi va uning mahkamlanishi har servisda tekshiriladi.",
        "PCV tizimi (karter ventilyatsiyasi) muntazam tekshiriladi.",
        "EVAP bachok tizimi (yoqilg'i bug'larini tutib qolish) nazorat qilinadi.",
        "Gaz taqsimlash mexanizmi yuritma zanjiri ham tekshiriladi.",
        "Egzoz trubasi va ulanishlaridan gaz sizishi bo'lmasligi kerak.",
      ],
      [
        "Система выпуска и крепёж — на каждом ТО.",
        "Система PCV (вентиляция картера) — регулярно.",
        "Система EVAP (улавливание паров) — контроль.",
        "Цепь привода ГРМ — также проверяется.",
        "Трубки выхлопа и соединения не должны пропускать газы.",
      ],
      [
        "Exhaust system and its mounting — every service.",
        "PCV system (crankcase ventilation) — regularly.",
        "EVAP system (fuel vapor capture) — monitored.",
        "Timing chain drive — also inspected.",
        "Exhaust pipes and connections must not leak gases.",
      ],
    ),
    replacement: TL(
      [
        "Korroziya, sizish yoki shikastlanganda tezda almashtiring.",
        "Katalitik konvertor eskirganda yoki shikastlanganda almashtiring.",
        "PCV va EVAP komponentlari holat bo'yicha almashtiriladi.",
      ],
      [
        "При коррозии, утечке или повреждении — срочная замена.",
        "Катализатор — при износе или повреждении.",
        "Компоненты PCV и EVAP — по состоянию.",
      ],
      [
        "On corrosion, leaks or damage — replace urgently.",
        "Catalytic converter — when worn or damaged.",
        "PCV and EVAP components — by condition.",
      ],
    ),
    heavyUsage: TL(
      [
        "Tuzli yo'llar va namlik korroziyani tezlashtiradi.",
        "Qisqa safarlar katalitik konvertorni to'liq isitmaydi — tez eskiradi.",
      ],
      [
        "Солёные дороги и влажность ускоряют коррозию.",
        "Короткие поездки не разогревают катализатор — он быстрее изнашивается.",
      ],
      [
        "Salty roads and humidity accelerate corrosion.",
        "Short trips do not fully heat the catalytic converter — it wears faster.",
      ],
    ),
    warnings: TL(
      [
        "Baland yoki g'alati egzoz shovqini.",
        "Egzoz hidi salonga kiradi.",
        "Mashina ostidan taqillash.",
        "Qora yoki oq tutun.",
        "Check Engine chirog'i (katalitik konvertor).",
        "Yoqilg'i sarfining oshishi.",
      ],
      [
        "Громкий или необычный звук выхлопа.",
        "Запах выхлопа в салоне.",
        "Дребезжание под машиной.",
        "Чёрный или белый дым.",
        "Индикатор Check Engine (катализатор).",
        "Рост расхода топлива.",
      ],
      [
        "Loud or unusual exhaust noise.",
        "Exhaust smell inside cabin.",
        "Rattling under the vehicle.",
        "Black or white smoke.",
        "Check Engine light (catalytic converter).",
        "Increased fuel consumption.",
      ],
    ),
    usefulTips: TL(
      [
        "Qisqa safarlardan so'ng vaqti-vaqtida uzoqroq yuring — katalitikni tozalaydi.",
        "Egzoz hidi salonga kirsa darhol servisga boring — bu jiddiy xavf.",
        "Korroziyaga qarshi emal bilan egzoz trubalarini himoya qilish mumkin.",
      ],
      [
        "После коротких поездок иногда проезжайте дольше — очищает катализатор.",
        "Запах выхлопа в салоне — немедленно в сервис, это серьёзная опасность.",
        "Трубы можно защитить антикоррозийным составом.",
      ],
      [
        "After short trips occasionally drive longer — it cleans the catalytic converter.",
        "Exhaust smell inside the cabin — go to service immediately, it is a serious hazard.",
        "Exhaust pipes can be protected with anti-corrosion coating.",
      ],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Korroziya / sizishda — darhol.", "При коррозии/утечке — сразу.", "On corrosion/leaks — immediately."),
    badges: ["inspect", "safety"],
  },
};

/**
 * Future / hidden Cobalt service items prepared from the official regulation.
 * Not shown in the main sidebar yet — kept here as a structured data source
 * for future expansion (extra cards, tooltips, expanded schedule, etc.).
 */
export const COBALT_FUTURE_PART_INFO: Record<string, CobaltPartInfo> = {
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
};
