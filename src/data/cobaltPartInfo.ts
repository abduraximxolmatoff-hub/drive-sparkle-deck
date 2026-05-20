import type { Lang } from "@/i18n/translations";

type L = Record<Lang, string>;
type LL = Record<Lang, string[]>;

export interface CobaltPartInfo {
  /** Maps to CarPart.id */
  partId: string;
  title: L;
  function: L;
  inspection: LL;
  replacement: LL;
  heavyUsage: LL;
  warnings: LL;
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
      "Shinalar yo'l bilan aloqani, barqarorlikni, tormozlash samarasini va xavfsizlikni ta'minlaydi.",
      "Шины обеспечивают сцепление с дорогой, устойчивость, эффективность торможения и безопасность.",
      "Tires provide road contact, stability, braking performance, and driving safety.",
    ),
    inspection: TL(
      [
        "Shina holati va ichki bosimini muntazam tekshirib turing.",
        "Bosimni kamida oyiga 1 marta tekshiring.",
        "Uzoq safardan oldin ham bosimni tekshiring.",
        "Tekshirishni shinalar sovuq holatda bajaring.",
        "Protektor yeyilishi, yoriqlar, shishish va notekis yeyilishni nazorat qiling.",
      ],
      [
        "Регулярно проверяйте состояние и давление шин.",
        "Давление проверяйте минимум раз в месяц.",
        "Также проверяйте давление перед длительной поездкой.",
        "Измеряйте давление на холодных шинах.",
        "Контролируйте износ протектора, трещины, вздутия и неравномерный износ.",
      ],
      [
        "Tire condition and internal pressure must be checked regularly.",
        "Check pressure at least once a month.",
        "Also check pressure before long trips.",
        "Inspect when tires are cold.",
        "Watch for tread wear, cracks, bulges, cuts and uneven wear.",
      ],
    ),
    replacement: TL(
      [
        "Protektor yeyilgan bo'lsa almashtiring.",
        "Yoriq, yon devor shikasti, shishish yoki jiddiy notekis yeyilishda almashtiring.",
        "Bosimni ushlay olmasa almashtiring.",
      ],
      [
        "Меняйте при износе протектора.",
        "Меняйте при трещинах, повреждениях боковины, вздутии или сильном неравномерном износе.",
        "Меняйте, если шина не держит давление.",
      ],
      [
        "Replace when tread is worn out.",
        "Replace if cracks, sidewall damage, swelling or serious uneven wear appear.",
        "Replace if the tire cannot hold pressure.",
      ],
    ),
    heavyUsage: TL(
      [
        "Yomon yo'l, uzoq safar, issiq/sovuq ob-havo va og'ir yuk sharoitida tez-tez tekshiring.",
      ],
      ["В тяжёлых условиях (плохие дороги, длительные поездки, жара/холод, груз) проверяйте чаще."],
      ["On rough roads, long trips, hot/cold weather or heavy loads — inspect more often."],
    ),
    warnings: TL(
      [
        "Avtomobil bir tomonga tortadi.",
        "Rul titraydi.",
        "Notekis protektor yeyilishi.",
        "Bosim tez-tez pasayadi.",
        "Yoriq yoki shishish ko'rinadi.",
      ],
      [
        "Машину уводит в сторону.",
        "Вибрация руля.",
        "Неравномерный износ протектора.",
        "Давление часто падает.",
        "Видны трещины или вздутия.",
      ],
      [
        "Vehicle pulls to one side.",
        "Steering wheel vibration.",
        "Uneven tread wear.",
        "Pressure drops often.",
        "Visible cracks or bulges.",
      ],
    ),
    summaryInspection: T(
      "Oyiga 1 marta va uzoq safardan oldin.",
      "Раз в месяц и перед длительной поездкой.",
      "Monthly and before long trips.",
    ),
    summaryReplacement: T(
      "Yeyilgan, shikastlangan yoki xavfli bo'lsa.",
      "При износе, повреждении или небезопасном состоянии.",
      "When worn, damaged or unsafe.",
    ),
    badges: ["inspect", "replace", "safety"],
  },

  oil: {
    partId: "oil",
    title: T("Motor moyi va moy filtri", "Моторное масло и масляный фильтр", "Engine oil and oil filter"),
    function: T(
      "Motor moyi dvigatel qismlarini moylaydi, sovutadi va yeyilishdan himoya qiladi.",
      "Моторное масло смазывает, охлаждает и защищает детали двигателя от износа.",
      "Engine oil lubricates, cools and protects internal engine components from wear.",
    ),
    inspection: TL(
      [
        "Moy darajasini muntazam tekshiring.",
        "Moy holatini (rang, hid) tekshiring.",
        "Sizib chiqishini nazorat qiling.",
        "Moy ogohlantirish chirog'iga e'tibor bering.",
      ],
      [
        "Регулярно проверяйте уровень масла.",
        "Контролируйте состояние масла (цвет, запах).",
        "Проверяйте на утечки.",
        "Следите за индикатором давления масла.",
      ],
      [
        "Check oil level regularly.",
        "Inspect oil condition (color, smell).",
        "Watch for leaks.",
        "Monitor oil warning light.",
      ],
    ),
    replacement: TL(
      [
        "Reglamentda dvigatel moyi va moy filtri almashtirish (R) sifatida belgilangan.",
        "Belgilangan servis intervaliga muvofiq almashtiring.",
        "Og'ir foydalanish sharoitida intervallar qisqartiriladi.",
      ],
      [
        "В регламенте моторное масло и фильтр отмечены как заменяемые (R).",
        "Меняйте согласно установленному интервалу ТО.",
        "В тяжёлых условиях интервалы сокращаются.",
      ],
      [
        "The regulation marks engine oil and oil filter as Replacement (R) items.",
        "Replace at the scheduled service interval.",
        "Under heavy usage, shorten the replacement interval.",
      ],
    ),
    heavyUsage: TL(
      [
        "Tez-tez qisqa masofalarga yurish.",
        "Changli yo'llar.",
        "Uzoq salt ishlash.",
        "Tirbandlik.",
        "Yuqori harorat.",
        "Og'ir yuk bilan harakat.",
      ],
      [
        "Частые короткие поездки.",
        "Пыльные дороги.",
        "Длительная работа на холостом ходу.",
        "Пробки.",
        "Высокая температура.",
        "Езда с грузом.",
      ],
      [
        "Frequent short trips.",
        "Dusty roads.",
        "Long idling.",
        "Traffic congestion.",
        "High temperature.",
        "Heavy load driving.",
      ],
    ),
    warnings: TL(
      [
        "Past moy darajasi.",
        "Qora yoki kuygan hidli moy.",
        "Moy sizishi.",
        "Dvigatel ovozi.",
        "Moy ogohlantirish chirog'i.",
      ],
      [
        "Низкий уровень масла.",
        "Тёмное или пахнущее гарью масло.",
        "Утечки масла.",
        "Стук в двигателе.",
        "Индикатор давления масла.",
      ],
      [
        "Low oil level.",
        "Dark or burnt-smelling oil.",
        "Oil leaks.",
        "Engine noise.",
        "Oil warning light.",
      ],
    ),
    summaryInspection: T(
      "Har servisda va haydovchi tomonidan muntazam.",
      "На каждом ТО и регулярно водителем.",
      "Every service and regularly by the driver.",
    ),
    summaryReplacement: T(
      "Reglament bo'yicha; og'ir sharoitda oldinroq.",
      "Согласно регламенту; в тяжёлых условиях — раньше.",
      "Per regulation; earlier in heavy usage.",
    ),
    badges: ["inspect", "replace", "heavy"],
  },

  airfilter: {
    partId: "airfilter",
    title: T("Dvigatel havo filtri", "Воздушный фильтр двигателя", "Engine air filter"),
    function: T(
      "Havo filtri dvigatelga kirayotgan havodan chang va zarrachalarni tozalaydi.",
      "Воздушный фильтр очищает воздух от пыли и частиц перед двигателем.",
      "The air filter cleans dust and particles before air enters the engine.",
    ),
    inspection: TL(
      [
        "Havo filtri elementini muntazam tekshiring.",
        "Rejali servisda tekshiring.",
        "Changli sharoitda tez-tez tekshiring.",
      ],
      [
        "Регулярно проверяйте элемент воздушного фильтра.",
        "Проверяйте на плановом ТО.",
        "В пыльных условиях — чаще.",
      ],
      [
        "Inspect the air filter element regularly.",
        "Check at every scheduled service.",
        "Inspect more often in dusty conditions.",
      ],
    ),
    replacement: TL(
      ["Iflos, tiqilib qolgan yoki shikastlangan bo'lsa almashtiring.", "Reglament talab qilsa almashtiring."],
      ["Меняйте при загрязнении, забивании или повреждении.", "Меняйте по требованию регламента."],
      ["Replace when dirty, clogged or damaged.", "Replace per the regulation when required."],
    ),
    heavyUsage: TL(
      ["Changli yo'llarda tez-tez tekshiring va almashtiring.", "Shahar tirbandligi va qurilish hududlarida filtr tezroq ifloslanadi."],
      ["В пыли — чаще проверка и замена.", "В пробках и на стройках фильтр загрязняется быстрее."],
      ["Dusty roads need more frequent checks and replacement.", "Urban traffic and construction areas clog filters faster."],
    ),
    warnings: TL(
      ["Tezlanish susayishi.", "Yoqilg'i sarfining oshishi.", "Dvigatel ovozining qo'pollashi.", "Filtr elementi qora yoki iflos."],
      ["Слабый разгон.", "Повышенный расход топлива.", "Грубый звук двигателя.", "Грязный/тёмный элемент."],
      ["Weak acceleration.", "Increased fuel consumption.", "Rough engine sound.", "Dirty or dark filter element."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Iflos bo'lsa yoki reglament bo'yicha.", "При загрязнении или по регламенту.", "If dirty or per regulation."),
    badges: ["inspect", "replace"],
  },

  cooling: {
    partId: "cooling",
    title: T("Sovutish tizimi va antifriz", "Система охлаждения и антифриз", "Cooling system and coolant"),
    function: T(
      "Sovutish tizimi dvigatelni qizib ketishdan saqlaydi va to'g'ri ishlash haroratini ushlab turadi.",
      "Система охлаждения предотвращает перегрев двигателя и поддерживает рабочую температуру.",
      "The cooling system prevents engine overheating and keeps it at proper operating temperature.",
    ),
    inspection: TL(
      [
        "Antifriz darajasini tekshiring.",
        "Antifriz holatini tekshiring.",
        "Radiator, shlanglar va ulanishlarni ko'zdan kechiring.",
        "Sovutish, yoqilg'i, moylash va konditsioner tizimlarining germetikligini tekshiring (reglament bo'yicha).",
      ],
      [
        "Проверяйте уровень охлаждающей жидкости.",
        "Контролируйте состояние антифриза.",
        "Осматривайте радиатор, шланги и соединения.",
        "Проверяйте герметичность систем охлаждения, топлива, смазки и кондиционера (по регламенту).",
      ],
      [
        "Check coolant level.",
        "Check coolant condition.",
        "Inspect radiator, hoses and connections.",
        "Check sealing of cooling, fuel, lubrication and A/C systems (per regulation).",
      ],
    ),
    replacement: TL(
      ["Reglament bo'yicha yoki sifati pasaysa antifrizni almashtiring.", "Shikastlangan shlang va oqayotgan qismlarni almashtiring."],
      ["Меняйте антифриз по регламенту или при ухудшении свойств.", "Меняйте повреждённые шланги и протекающие компоненты."],
      ["Replace coolant per regulation or if quality drops.", "Replace damaged hoses or leaking components."],
    ),
    heavyUsage: TL(
      ["Issiq iqlim, tog' yo'llari, tirbandlik va og'ir yukda tez-tez tekshiring."],
      ["В жару, на горных дорогах, в пробках и с грузом — чаще проверка."],
      ["In hot climates, mountain roads, traffic jams or heavy loads — check more often."],
    ),
    warnings: TL(
      ["Dvigatel harorati ko'tariladi.", "Antifriz darajasi pasayadi.", "Mashina ostida sizish.", "Kapot ostidan bug'.", "Shirin hid."],
      ["Растёт температура двигателя.", "Падает уровень антифриза.", "Течь под машиной.", "Пар из-под капота.", "Сладкий запах."],
      ["Engine temperature rises.", "Coolant level drops.", "Leak under the vehicle.", "Steam from engine bay.", "Sweet smell."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Reglament bo'yicha yoki sifat yomonlashsa.", "По регламенту или при ухудшении свойств.", "Per regulation or if quality drops."),
    badges: ["inspect", "replace", "safety"],
  },

  brakes: {
    partId: "brakes",
    title: T("Tormoz tizimi", "Тормозная система", "Brake system"),
    function: T(
      "Tormoz tizimi avtomobilni xavfsiz to'xtatadi va tezlikni boshqaradi.",
      "Тормозная система обеспечивает безопасную остановку и контроль скорости.",
      "The brake system allows the vehicle to stop safely and controls speed.",
    ),
    inspection: TL(
      [
        "Tormoz suyuqligi.",
        "Old tormoz kolodka va disklari.",
        "Orqa tormoz kolodka, disk/baraban va qoplamalari.",
        "Qo'l (to'xtab turish) tormozi.",
        "Tormoz naylari va ulanishlari.",
        "Tormoz kuchaytirgichi/gidravlik elementlar.",
      ],
      [
        "Тормозная жидкость.",
        "Передние колодки и диски.",
        "Задние колодки, диски/барабаны и накладки.",
        "Стояночный тормоз.",
        "Тормозные шланги и соединения.",
        "Вакуумный усилитель / гидравлические элементы.",
      ],
      [
        "Brake fluid.",
        "Front brake pads and rotors.",
        "Rear brake pads, rotors/drums and linings.",
        "Parking brake.",
        "Brake hoses and connections.",
        "Brake booster / hydraulic elements.",
      ],
    ),
    replacement: TL(
      [
        "Yeyilgan kolodka, disk, baraban yoki qoplamalarni almashtiring.",
        "Tormoz suyuqligini reglament bo'yicha almashtiring.",
        "Shikastlangan yoki oqayotgan naylarni darhol almashtiring.",
      ],
      [
        "Меняйте изношенные колодки, диски, барабаны или накладки.",
        "Меняйте тормозную жидкость по регламенту.",
        "Повреждённые или протекающие шланги — немедленно.",
      ],
      [
        "Replace worn pads, rotors, drums or linings.",
        "Replace brake fluid per regulation.",
        "Replace damaged or leaking hoses immediately.",
      ],
    ),
    heavyUsage: TL(
      ["Shahar, tog' yo'li, og'ir yuk va tez-tez tormoz berishda tez-tez tekshiring."],
      ["В городе, в горах, с грузом и при частом торможении — чаще проверка."],
      ["City driving, mountain roads, heavy loads and frequent braking need more frequent checks."],
    ),
    warnings: TL(
      ["G'ichirlash.", "Tormozlashda titrash.", "To'xtash masofasi uzayishi.", "Yumshoq pedal.", "Tormoz suyuqligi sizishi.", "Tormoz ogohlantirish chirog'i."],
      ["Скрип.", "Вибрация при торможении.", "Удлинённый тормозной путь.", "Мягкая педаль.", "Утечка жидкости.", "Индикатор тормозов."],
      ["Squealing.", "Vibration when braking.", "Longer stopping distance.", "Soft pedal.", "Brake fluid leak.", "Brake warning light."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Yeyilsa yoki reglament bo'yicha.", "При износе или по регламенту.", "When worn or per regulation."),
    badges: ["inspect", "replace", "safety"],
  },

  headlights: {
    partId: "headlights",
    title: T("Faralar va elektr jihozlari", "Фары и электрооборудование", "Headlights and electrical equipment"),
    function: T(
      "Faralar va elektr jihozlari ko'rinish, signalizatsiya va xavfsiz harakatni ta'minlaydi.",
      "Фары и электрооборудование обеспечивают видимость, сигнализацию и безопасность.",
      "Headlights and electrical equipment provide visibility, signaling and safe driving.",
    ),
    inspection: TL(
      ["Elektr jihozlari.", "Faralar.", "Tozalagichlar.", "Yuvish moslamasi.", "Akkumulyator."],
      ["Электрооборудование.", "Фары.", "Стеклоочистители.", "Омыватель.", "Аккумулятор."],
      ["Electrical equipment.", "Headlights.", "Wipers.", "Washer system.", "Battery."],
    ),
    replacement: TL(
      ["Yonmagan yoki kuchsiz lampalarni almashtiring.", "Ko'rinish yomon bo'lsa cho'tkalarni almashtiring."],
      ["Меняйте перегоревшие или тусклые лампы.", "Меняйте дворники при ухудшении видимости."],
      ["Replace failed or weak bulbs.", "Replace wipers if visibility drops."],
    ),
    heavyUsage: TL(
      ["Tunda haydash, yomg'ir, chang va qish sharoitida tez-tez tekshiring."],
      ["Ночная езда, дождь, пыль и зима — чаще проверка."],
      ["Night driving, rain, dust and winter conditions — check more often."],
    ),
    warnings: TL(
      ["Faralar kuchsiz.", "Lampa lipillaydi.", "Bitta fara ishlamaydi.", "Burilish signali ishlamaydi.", "Tunda yomon ko'rinish."],
      ["Слабые фары.", "Мерцание.", "Не работает одна фара.", "Не работают указатели поворота.", "Плохая видимость ночью."],
      ["Weak headlights.", "Flickering lights.", "One headlight not working.", "Turn signals not working.", "Poor visibility at night."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Kuchsiz, shikastlangan yoki ishlamasa.", "При ослаблении, повреждении или отказе.", "If weak, damaged or not working."),
    badges: ["inspect", "replace", "safety"],
  },

  battery: {
    partId: "battery",
    title: T("Akkumulyator holati", "Состояние аккумулятора", "Battery condition"),
    function: T(
      "Akkumulyator dvigatelni ishga tushirish va elektr tizimlarni quvvatlash uchun energiya beradi.",
      "Аккумулятор обеспечивает энергией пуск двигателя и работу электросистем.",
      "The battery supplies power for starting the engine and operating electrical systems.",
    ),
    inspection: TL(
      ["Akkumulyator elektr jihozlari bilan birga tekshiriladi.", "Klemmalar va ulanishlarni tekshiring.", "Quvvat darajasi va start sifatini nazorat qiling."],
      ["АКБ проверяется вместе с электрооборудованием.", "Проверяйте клеммы и соединения.", "Контролируйте заряд и пуск."],
      ["Battery is checked together with electrical equipment.", "Inspect terminals and connections.", "Check charge level and starting performance."],
    ),
    replacement: TL(
      ["Quvvatni ushlay olmasa almashtiring.", "Start ishonchsiz bo'lsa almashtiring.", "~3 yildan keyin muntazam test tavsiya etiladi."],
      ["Меняйте, если не держит заряд.", "Меняйте при ненадёжном пуске.", "После ~3 лет — регулярный тест."],
      ["Replace if it cannot hold charge.", "Replace if starting becomes unreliable.", "After ~3 years, regular testing is recommended."],
    ),
    heavyUsage: TL(
      ["Sovuq ob-havo, qisqa safarlar va uzoq turish — tez-tez tekshiring."],
      ["Холод, короткие поездки и долгая стоянка — чаще проверка."],
      ["Cold weather, short trips and long parking — check more often."],
    ),
    warnings: TL(
      ["Sekin start.", "Xira chiroqlar.", "Akkumulyator ogohlantirishi.", "Klemmalarda korroziya.", "Elektronika kuchsiz ishlaydi."],
      ["Медленный пуск.", "Тусклый свет.", "Индикатор АКБ.", "Коррозия клемм.", "Слабая работа электроники."],
      ["Slow engine start.", "Dim lights.", "Battery warning light.", "Corrosion on terminals.", "Electronics work weakly."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Kuchsiz yoki quvvatni ushlay olmasa.", "При слабости или потере заряда.", "If weak or unable to hold charge."),
    badges: ["inspect", "replace"],
  },

  suspension: {
    partId: "suspension",
    title: T("Podveska, shassi va g'ildirak burchaklari", "Подвеска, шасси и углы установки колёс", "Suspension, chassis and wheel alignment"),
    function: T(
      "Podveska va shassi qulaylik, barqarorlik, rul boshqaruvi va xavfsiz harakatni ta'minlaydi.",
      "Подвеска и шасси обеспечивают комфорт, устойчивость, управляемость и безопасность.",
      "Suspension and chassis provide comfort, stability, steering control and safe handling.",
    ),
    inspection: TL(
      [
        "G'ildirak o'rnatish burchaklari.",
        "Rul g'ildiragi va mexanizmi.",
        "Rul gidrokuchaytirgichi suyuqligi, naylari va ulanishlari.",
        "Shassi va kuzov rezbali ulanishlari.",
        "Tegishli qismlarni mahkamlash va tekshirish.",
      ],
      [
        "Углы установки колёс.",
        "Руль и рулевой механизм.",
        "Жидкость, шланги и соединения ГУР.",
        "Резьбовые соединения шасси и кузова.",
        "Подтяжка и проверка связанных узлов.",
      ],
      [
        "Wheel alignment angles.",
        "Steering wheel and mechanism.",
        "Power steering fluid, hoses and connections.",
        "Chassis and body threaded connections.",
        "Tightening and inspection of related parts.",
      ],
    ),
    replacement: TL(
      ["Yeyilgan podveska qismlarini almashtiring.", "Burchaklar normadan tashqarida bo'lsa sozlang."],
      ["Меняйте изношенные элементы подвески.", "Регулируйте углы при отклонении от нормы."],
      ["Replace worn suspension components.", "Adjust wheel alignment if values are out of range."],
    ),
    heavyUsage: TL(
      ["Yomon yo'l, chuqurlar, og'ir yuk va notekis yo'llarda tez-tez tekshiring."],
      ["Плохие дороги, ямы, груз и неровности — чаще проверка."],
      ["Bad roads, potholes, heavy loads and uneven roads — check more often."],
    ),
    warnings: TL(
      ["Taqillash.", "Bir tomonga tortish.", "Shina notekis yeyilishi.", "Titrash.", "Yomon barqarorlik.", "Rul bo'sh his qilinadi."],
      ["Стук.", "Увод в сторону.", "Неравномерный износ шин.", "Вибрация.", "Плохая устойчивость.", "Люфт руля."],
      ["Knocking noise.", "Car pulls to one side.", "Uneven tire wear.", "Vibration.", "Poor stability.", "Steering feels loose."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Burchaklar noto'g'ri bo'lsa sozlash.", "При отклонении углов — регулировка.", "Adjust if alignment is incorrect."),
    badges: ["inspect", "safety"],
  },

  windows: {
    partId: "windows",
    title: T("Oynalar, tozalagichlar va yuvish tizimi", "Стёкла, дворники и омыватель", "Windows, wipers and washer system"),
    function: T(
      "Oynalar, tozalagichlar va yuvish tizimi haydash paytida aniq ko'rinishni ta'minlaydi.",
      "Стёкла, дворники и омыватель обеспечивают чёткую видимость при движении.",
      "Windows, wipers and washer system provide clear visibility while driving.",
    ),
    inspection: TL(
      ["Tozalagichlar.", "Yuvish tizimi.", "Elektr jihozlari.", "Ko'rinishga oid qismlar."],
      ["Стеклоочистители.", "Омыватель.", "Электрооборудование.", "Компоненты, влияющие на обзор."],
      ["Wipers.", "Washer system.", "Electrical equipment.", "Visibility-related components."],
    ),
    replacement: TL(
      ["Iz qoldirayotgan tozalagichni almashtiring.", "Shikastlangan oynani ko'rinish/xavfsizlik uchun almashtiring.", "Yuvish suyuqligini to'ldiring."],
      ["Меняйте дворники, оставляющие полосы.", "Меняйте повреждённые стёкла.", "Доливайте омывающую жидкость."],
      ["Replace wiper blades that leave streaks.", "Replace damaged windshield/side glass.", "Refill washer fluid when needed."],
    ),
    heavyUsage: TL(
      ["Yomg'ir, qor, chang, loy va qish sharoitida tez-tez tekshiring."],
      ["Дождь, снег, пыль, грязь и зима — чаще проверка."],
      ["Rain, snow, dust, mud and winter — check more often."],
    ),
    warnings: TL(
      ["Tozalagich iz qoldiradi.", "Yuvish suyuqligi purkamaydi.", "Oynada yoriq.", "Yomon ko'rinish.", "Tozalagich shovqini."],
      ["Дворник оставляет полосы.", "Омыватель не льёт.", "Трещина на стекле.", "Плохая видимость.", "Шум дворников."],
      ["Wipers leave marks.", "Washer does not spray.", "Glass is cracked.", "Poor visibility.", "Wiper noise."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Ko'rinish yomonlashsa.", "При ухудшении видимости.", "If visibility is reduced."),
    badges: ["inspect", "replace", "safety"],
  },

  engine: {
    partId: "engine",
    title: T("Dvigatel holati", "Состояние двигателя", "Engine condition"),
    function: T(
      "Dvigatel — avtomobilning asosiy quvvat manbai.",
      "Двигатель — главный источник мощности автомобиля.",
      "The engine is the main power source of the vehicle.",
    ),
    inspection: TL(
      [
        "Dvigatel tizimlari.",
        "Yoqilg'i ta'minoti tizimi.",
        "Moylash tizimi.",
        "Sovutish tizimi.",
        "Chiqaruv tizimi.",
        "O't oldirish svechalari.",
        "PCV tizimi.",
        "EVAP tizimi.",
        "Shlanglar va ulanishlar.",
      ],
      [
        "Системы двигателя.",
        "Система подачи топлива.",
        "Система смазки.",
        "Система охлаждения.",
        "Выхлопная система.",
        "Свечи зажигания.",
        "Система PCV.",
        "Система EVAP.",
        "Шланги и соединения.",
      ],
      [
        "Engine systems.",
        "Fuel supply system.",
        "Lubrication system.",
        "Cooling system.",
        "Exhaust system.",
        "Ignition spark plugs.",
        "PCV system.",
        "EVAP system.",
        "Hoses and connections.",
      ],
    ),
    replacement: TL(
      ["Shikastlangan yoki yeyilgan qismlarni reglament bo'yicha almashtiring.", "Svechalarni jadval bo'yicha almashtiring.", "Filtr va suyuqliklarni servis talabiga ko'ra almashtiring."],
      ["Меняйте повреждённые/изношенные узлы по регламенту.", "Свечи — по графику.", "Фильтры и жидкости — по требованию ТО."],
      ["Replace damaged/worn engine parts per regulation.", "Replace spark plugs per schedule.", "Replace filters and fluids per service needs."],
    ),
    heavyUsage: TL(
      ["Tirbandlik, chang, qisqa safarlar, yuqori harorat va uzoq salt ishlash — tez-tez tekshiring."],
      ["Пробки, пыль, короткие поездки, жара и длительный холостой ход — чаще проверка."],
      ["Heavy traffic, dust, short trips, high heat and long idling — check more often."],
    ),
    warnings: TL(
      ["Check Engine chirog'i.", "G'ayritabiiy ovoz.", "Titrash.", "Tutun.", "Qizib ketish.", "Yoqilg'i sarfining oshishi.", "Quvvat yo'qolishi."],
      ["Индикатор Check Engine.", "Необычные звуки.", "Вибрация.", "Дым.", "Перегрев.", "Рост расхода топлива.", "Потеря мощности."],
      ["Check engine light.", "Unusual noise.", "Vibration.", "Smoke.", "Overheating.", "Increased fuel consumption.", "Power loss."],
    ),
    summaryInspection: T("Har servisda.", "На каждом ТО.", "Every service."),
    summaryReplacement: T("Reglament va holatga ko'ra.", "По регламенту и состоянию.", "Per regulation and component condition."),
    badges: ["inspect", "replace", "safety"],
  },
};
