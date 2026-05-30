import type { Lang } from "@/i18n/translations";

export interface PartFocus {
  x: number;
  y: number;
  scale: number;
  size: number;
}

type LocalizedString = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

export interface CarPartSeasonal {
  labelKey: "season.winter" | "season.summer" | "season.spring_autumn";
  text: LocalizedString;
}

export interface CarPart {
  id: string;
  icon: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  title: LocalizedString;
  bullets: LocalizedList;
  seasonal?: CarPartSeasonal[];
  focus: PartFocus;
}

export const CAR_PARTS: CarPart[] = [
  {
    id: "tires",
    icon: "🛞",
    name: { uz: "Shina", ru: "Шины", en: "Tires" },
    subtitle: { uz: "Bosim va protektor", ru: "Давление и протектор", en: "Pressure and tread" },
    title: { uz: "Shina holati va bosimi", ru: "Состояние и давление шин", en: "Tire condition and pressure" },
    bullets: {
      uz: ["Shina bosimini kamida oyiga 1 marta tekshirish kerak.", "Bosimni shina sovuq holatda olchash kerak.", "Togri PSI qiymati avtomobil manualida yoki haydovchi eshigi yonidagi stickerda yoziladi.", "Yengil avtomobillarda kopincha 30-35 PSI oraligi uchraydi.", "Qishda havo soviganda bosim pasayadi, tez-tez tekshiring.", "Protektor yeyilgan yoki yoriq bolsa shinani almashtiring."],
      ru: ["Давление в шинах следует проверять минимум раз в месяц.", "Измеряйте давление на холодных шинах.", "Правильное PSI указано в мануале или на стикере у двери водителя.", "Для легковых авто типичный диапазон 30-35 PSI.", "Зимой давление падает из-за холода, проверяйте чаще.", "При износе протектора или трещинах меняйте шину."],
      en: ["Tire pressure should be checked at least once a month.", "Measure pressure when tires are cold.", "Correct PSI is in the owners manual or driver door sticker.", "Most passenger cars use 30-35 PSI.", "Pressure drops in cold weather check more often in winter.", "Replace tires with worn tread or visible cracks."],
    },
    seasonal: [
      { labelKey: "season.winter", text: { uz: "Bosimni tez-tez tekshir, qishki shina ishlat.", ru: "Чаще проверяйте давление, используйте зимние шины.", en: "Check pressure often and use winter tires." } },
      { labelKey: "season.summer", text: { uz: "Uzoq safardan oldin bosim va qizib ketishni tekshir.", ru: "Перед длительной поездкой проверяйте давление и перегрев.", en: "Before long trips check pressure and overheating risk." } },
      { labelKey: "season.spring_autumn", text: { uz: "Harorat ozgarganda PSI ozgarishini nazorat qil.", ru: "Следите за изменением PSI при перепадах температуры.", en: "Watch PSI changes when temperatures shift." } },
    ],
    focus: { x: 78, y: 78, scale: 2.2, size: 14 },
  },
  {
    id: "windows",
    icon: "🪟",
    name: { uz: "Oyna", ru: "Стекло", en: "Windows" },
    subtitle: { uz: "Old va yon oynalar", ru: "Лобовое и боковые стёкла", en: "Windshield and side windows" },
    title: { uz: "Oynalar holati", ru: "Состояние стёкол", en: "Window condition" },
    bullets: {
      uz: ["Old oynada chip yoki yoriq bolsa tezda tamirlang.", "Oynalarni muntazam tozalab turing.", "Qishda muzni majburlab qirmang, oynani avval isiting.", "Yuvish suyuqligini faslga mos tanlang."],
      ru: ["Скол или трещину на лобовом стекле ремонтируйте сразу.", "Регулярно очищайте стёкла.", "Зимой не соскребайте лёд силой, сначала прогрейте стекло.", "Подбирайте омывайку под сезон."],
      en: ["Repair chips or cracks on the windshield immediately.", "Clean windows regularly.", "In winter warm the glass before scraping ice.", "Use season-appropriate washer fluid."],
    },
    focus: { x: 45, y: 38, scale: 2.2, size: 22 },
  },
  {
    id: "oil",
    icon: "🛢️",
    name: { uz: "Motor moyi", ru: "Моторное масло", en: "Engine Oil" },
    subtitle: { uz: "Moylash va himoya", ru: "Смазка и защита", en: "Lubrication and protection" },
    title: { uz: "Motor moyi", ru: "Моторное масло", en: "Engine oil" },
    bullets: {
      uz: ["Moy dvigatel qismlarini moylaydi va sovutadi.", "Darajani dipstick orqali tekshiring.", "Moy juda qoraygan yoki kuygan hid chiqsa almashtiring.", "Ogir sharoitda 5000 km yoki 6 oyda almashtiriladi.", "Faqat ishlab chiqaruvchi tavsiya qilgan moy turidan foydalaning."],
      ru: ["Масло смазывает и охлаждает детали двигателя.", "Уровень проверяйте щупом.", "Если масло почернело или пахнет гарью меняйте.", "В тяжёлых условиях 8000 км или 6 месяцев.", "Используйте только рекомендованный производителем тип масла."],
      en: ["Oil lubricates and cools engine components.", "Check the level with the dipstick.", "Replace oil if its very dark or smells burnt.", "In tough conditions 5000 miles or 6 months.", "Always use the oil grade recommended by the manufacturer."],
    },
    focus: { x: 32, y: 50, scale: 2.4, size: 14 },
  },
  {
    id: "engine",
    icon: "⚙️",
    name: { uz: "Dvigatel", ru: "Двигатель", en: "Engine" },
    subtitle: { uz: "Asosiy quvvat manbai", ru: "Главный источник мощности", en: "Main power source" },
    title: { uz: "Dvigatel holati", ru: "Состояние двигателя", en: "Engine condition" },
    bullets: {
      uz: ["Galati ovoz, titrash yoki tutun bolsa servisga boring.", "Sovutish suyuqligi va moy darajasini muntazam tekshiring.", "Panel ogohlantirish belgilariga etibor bering.", "Check Engine yonsa diagnostika qiling."],
      ru: ["Странные звуки, вибрация или дым повод обратиться в сервис.", "Регулярно проверяйте охлаждающую жидкость и масло.", "Следите за индикаторами на приборной панели.", "При загорании Check Engine выполните диагностику."],
      en: ["Unusual noises vibration or smoke mean its time to visit a shop.", "Check coolant and oil levels regularly.", "Watch dashboard warning lights.", "Run a diagnostic if the Check Engine light comes on."],
    },
    focus: { x: 30, y: 55, scale: 2, size: 22 },
  },
  {
    id: "battery",
    icon: "🔋",
    name: { uz: "Akkumulyator", ru: "Аккумулятор", en: "Battery" },
    subtitle: { uz: "Elektr quvvati", ru: "Электропитание", en: "Electrical power" },
    title: { uz: "Akkumulyator", ru: "Аккумулятор", en: "Battery" },
    bullets: {
      uz: ["3 yildan keyin akkumulyatorni yiliga test qiling.", "Sovuqda quvvat pasayadi.", "Kontaktlar zanglamagan va mahkam bolishi kerak.", "Sekin start, xira chiroq yoki battery belgisi bolsa tekshiring."],
      ru: ["После 3 лет тестируйте АКБ ежегодно.", "На холоде ёмкость падает.", "Клеммы должны быть чистыми и плотно затянутыми.", "Медленный старт тусклый свет или индикатор АКБ повод проверить."],
      en: ["After 3 years test the battery yearly.", "Cold weather reduces battery capacity.", "Terminals must be clean and tight.", "Slow cranking dim lights or battery icon get it checked."],
    },
    focus: { x: 25, y: 48, scale: 2.4, size: 14 },
  },
  {
    id: "brakes",
    icon: "🛑",
    name: { uz: "Tormoz tizimi", ru: "Тормозная система", en: "Brakes" },
    subtitle: { uz: "Xavfsizlik tizimi", ru: "Система безопасности", en: "Safety system" },
    title: { uz: "Tormoz tizimi", ru: "Тормозная система", en: "Brake system" },
    bullets: {
      uz: ["Gichirlash, titrash yoki uzun toxtash bolsa servisga boring.", "Tormoz suyuqligi darajasini tekshiring.", "Yeyilgan kolodka va disklarni almashtiring.", "Yomgir va qor tormoz masofasini uzaytiradi."],
      ru: ["Скрип вибрация или удлинённый тормозной путь в сервис.", "Проверяйте уровень тормозной жидкости.", "Меняйте изношенные колодки и диски.", "Дождь и снег увеличивают тормозной путь."],
      en: ["Squealing vibration or longer stops mean a service visit.", "Check brake fluid level.", "Replace worn pads and rotors.", "Rain and snow extend braking distance."],
    },
    focus: { x: 22, y: 78, scale: 2.4, size: 13 },
  },
  {
    id: "headlights",
    icon: "💡",
    name: { uz: "Faralar", ru: "Фары", en: "Headlights" },
    subtitle: { uz: "Korish va xavfsizlik", ru: "Видимость и безопасность", en: "Visibility and safety" },
    title: { uz: "Faralar", ru: "Фары", en: "Headlights" },
    bullets: {
      uz: ["Tunda va yomon ob-havoda muhim.", "Har oy faralar va stop chiroqlarni tekshiring.", "Xiralashgan plastikni polirovka qiling.", "Qishda qor va loydan tozalab yuring."],
      ru: ["Важны ночью и в плохую погоду.", "Раз в месяц проверяйте фары и стоп-сигналы.", "Полируйте помутневший пластик.", "Зимой очищайте от снега и грязи."],
      en: ["Critical at night and in bad weather.", "Check headlights and brake lights monthly.", "Polish hazy plastic lenses.", "Keep them free of snow and mud in winter."],
    },
    focus: { x: 18, y: 60, scale: 2.6, size: 12 },
  },
  {
    id: "cooling",
    icon: "❄️",
    name: { uz: "Sovutish tizimi", ru: "Система охлаждения", en: "Cooling System" },
    subtitle: { uz: "Antifriz va radiator", ru: "Антифриз и радиатор", en: "Coolant and radiator" },
    title: { uz: "Sovutish tizimi", ru: "Система охлаждения", en: "Cooling system" },
    bullets: {
      uz: ["Dvigatelning qizib ketishini oldini oladi.", "Antifriz darajasini tekshirib turing.", "Harorat normadan oshsa darhol toxtang.", "Radiator va shlanglardan suyuqlik sizishini nazorat qiling."],
      ru: ["Предотвращает перегрев двигателя.", "Регулярно проверяйте уровень антифриза.", "При перегреве сразу остановитесь.", "Следите за течами радиатора и шлангов."],
      en: ["Prevents the engine from overheating.", "Check coolant level regularly.", "Stop immediately if temperature exceeds normal.", "Watch radiator and hoses for leaks."],
    },
    focus: { x: 20, y: 55, scale: 2.4, size: 16 },
  },
  {
    id: "airfilter",
    icon: "🌬️",
    name: { uz: "Havo filtri", ru: "Воздушный фильтр", en: "Air Filter" },
    subtitle: { uz: "Toza havo oqimi", ru: "Чистый поток воздуха", en: "Clean airflow" },
    title: { uz: "Havo filtri", ru: "Воздушный фильтр", en: "Air filter" },
    bullets: {
      uz: ["Dvigatelga kirayotgan havoni tozalaydi.", "Changli hududlarda tezroq ifloslanadi.", "Iflos filtr yoqilgi sarfini oshiradi.", "Har servisda tekshirib, kerak bolsa almashtiring."],
      ru: ["Очищает воздух, поступающий в двигатель.", "В пыльных регионах загрязняется быстрее.", "Грязный фильтр повышает расход топлива.", "Проверяйте на каждом ТО и меняйте при необходимости."],
      en: ["Cleans air entering the engine.", "Gets dirty faster in dusty areas.", "A dirty filter increases fuel consumption.", "Inspect every service and replace as needed."],
    },
    focus: { x: 35, y: 45, scale: 2.4, size: 13 },
  },
  {
    id: "suspension",
    icon: "🔧",
    name: { uz: "Podveska", ru: "Подвеска", en: "Suspension" },
    subtitle: { uz: "Yol yumshatuvchi", ru: "Сглаживает дорогу", en: "Smooths the road" },
    title: { uz: "Podveska", ru: "Подвеска", en: "Suspension" },
    bullets: {
      uz: ["Yol notekisliklarini yumshatadi.", "Taqillash, bir tomonga tortish yoki notekis shina yeyilishi muammo belgisi.", "Amortizator va sharli tayanchlarni servisda tekshirtiring.", "Yomon yolda ehtiyot boling podveska umrini uzaytiradi."],
      ru: ["Сглаживает неровности дороги.", "Стук увод в сторону или неравномерный износ шин признаки проблем.", "Проверяйте амортизаторы и шаровые в сервисе.", "Аккуратная езда по плохим дорогам продлевает срок службы."],
      en: ["Absorbs road imperfections.", "Knocking pulling or uneven tire wear signal problems.", "Have shocks and ball joints inspected at the shop.", "Driving carefully on rough roads extends suspension life."],
    },
    focus: { x: 50, y: 82, scale: 2, size: 22 },
  },
  {
    id: "fuel_filter",
    icon: "⛽",
    name: { uz: "Yonilgi filtri", ru: "Топливный фильтр", en: "Fuel Filter" },
    subtitle: { uz: "Yoqilgi tozaligi", ru: "Чистота топлива", en: "Fuel cleanliness" },
    title: { uz: "Yonilgi filtri", ru: "Топливный фильтр", en: "Fuel filter" },
    bullets: {
      uz: ["Dvigatelga kiruvchi yoqilgini tozalaydi.", "Har 10000 km da tekshiriladi.", "Har 20000 km da almashtiriladi.", "Iflos filtr dvigatel quvvatini kamaytiradi.", "Yonilgi naylari bilan birga tekshiriladi."],
      ru: ["Очищает топливо перед двигателем.", "Проверка каждые 10000 км.", "Замена каждые 20000 км.", "Засорённый фильтр снижает мощность.", "Проверяется вместе с топливными шлангами."],
      en: ["Cleans fuel before it reaches the engine.", "Inspected every 10000 km.", "Replaced every 20000 km.", "A clogged filter reduces engine power.", "Inspected together with fuel hoses."],
    },
    focus: { x: 40, y: 55, scale: 2.2, size: 13 },
  },
  {
    id: "cabin_filter",
    icon: "🍃",
    name: { uz: "Salon havo filtri", ru: "Салонный фильтр", en: "Cabin Air Filter" },
    subtitle: { uz: "Konditsioner filtri", ru: "Фильтр кондиционера", en: "AC cabin filter" },
    title: { uz: "Salon havo filtri", ru: "Салонный фильтр воздуха", en: "Cabin air filter" },
    bullets: {
      uz: ["Salonga kiradigan havoni tozalaydi.", "Har 10000 km da tekshiriladi.", "Har 20000 km yoki yiliga almashtiriladi.", "Iflos filtr konditsioner samaradorligini pasaytiradi.", "Changli sharoitda tezroq almashtiriladi."],
      ru: ["Очищает воздух в салоне.", "Проверка каждые 10000 км.", "Замена каждые 20000 км или раз в год.", "Загрязнённый фильтр снижает эффективность кондиционера.", "В пыльных условиях меняется чаще."],
      en: ["Cleans cabin air from dust and pollen.", "Inspected every 10000 km.", "Replaced every 20000 km or yearly.", "A dirty filter reduces AC efficiency.", "Replace more often in dusty conditions."],
    },
    focus: { x: 55, y: 40, scale: 2.2, size: 13 },
  },
  {
    id: "spark_plugs",
    icon: "⚡",
    name: { uz: "Ot oldirish svechalari", ru: "Свечи зажигания", en: "Spark Plugs" },
    subtitle: { uz: "Dvigatel alangasi", ru: "Воспламенение двигателя", en: "Engine ignition" },
    title: { uz: "Ot oldirish svechalari", ru: "Свечи зажигания", en: "Spark plugs" },
    bullets: {
      uz: ["Yoqilgi-havo aralashmasini alangalantiradi.", "Har 25000 km da tekshiriladi va almashtiriladi.", "Ogir sharoitda har 15000 km yoki 1 yilda.", "Yeyilgan svecha dvigatel quvvatini kamaytiradi.", "Barcha svechalar bir vaqtda almashtiriladi."],
      ru: ["Воспламеняет топливно-воздушную смесь.", "Проверка и замена каждые 25000 км.", "В тяжёлых условиях каждые 15000 км или 1 год.", "Изношенные свечи снижают мощность.", "Все свечи меняются одновременно."],
      en: ["Ignites the fuel-air mixture.", "Inspected and replaced every 25000 km.", "Heavy usage every 15000 km or 1 year.", "Worn plugs reduce engine power.", "All spark plugs replaced at the same time."],
    },
    focus: { x: 33, y: 48, scale: 2.4, size: 12 },
  },
  {
    id: "brake_fluid",
    icon: "💧",
    name: { uz: "Tormoz suyuqligi", ru: "Тормозная жидкость", en: "Brake Fluid" },
    subtitle: { uz: "Xavfsizlik tizimi", ru: "Система безопасности", en: "Safety system" },
    title: { uz: "Tormoz suyuqligi", ru: "Тормозная жидкость", en: "Brake fluid" },
    bullets: {
      uz: ["Pedal bosimini tormoz mexanizmlariga uzatadi.", "Har 10000 km da tekshiriladi.", "Har 32500 km yoki 2 yilda almashtiriladi.", "Qoraygan bolsa darhol almashtiring.", "Tormoz pedali bosh yurishi ham tekshiriladi."],
      ru: ["Передаёт давление педали на тормоза.", "Проверка каждые 10000 км.", "Замена каждые 32500 км или 2 года.", "При потемнении немедленная замена.", "Также проверяется свободный ход педали."],
      en: ["Transmits pedal pressure to the brakes.", "Inspected every 10000 km.", "Replaced every 32500 km or 2 years.", "Replace immediately if darkened.", "Brake pedal free play also checked."],
    },
    focus: { x: 24, y: 72, scale: 2.4, size: 12 },
  },
  {
    id: "transmission",
    icon: "🔩",
    name: { uz: "Transmissiya moyi", ru: "Трансмиссионное масло", en: "Transmission Fluid" },
    subtitle: { uz: "Uzatmalar qutisi", ru: "Коробка передач", en: "Gearbox fluid" },
    title: { uz: "Transmissiya moyi", ru: "Трансмиссионное масло", en: "Transmission fluid" },
    bullets: {
      uz: ["Uzatmalar qutisini moylaydi va sovutadi.", "Mexanik KPP moyi har servisda tekshiriladi.", "Avtomat KPP moyi 105000 km da almashtiriladi.", "Ogir sharoitda har 70000 km da almashtiring.", "Suyuqlik rangini tekshiring."],
      ru: ["Смазывает и охлаждает коробку передач.", "Масло МКПП проверяется при каждом ТО.", "Масло АКПП меняется каждые 105000 км.", "В тяжёлых условиях каждые 70000 км.", "Проверяйте цвет жидкости."],
      en: ["Lubricates and cools the gearbox.", "Manual gearbox oil checked every service.", "Automatic fluid replaced at 105000 km.", "Heavy conditions every 70000 km.", "Check fluid color."],
    },
    focus: { x: 48, y: 70, scale: 2.0, size: 14 },
  },
  {
    id: "steering",
    icon: "🎯",
    name: { uz: "Rul mexanizmi", ru: "Рулевой механизм", en: "Steering" },
    subtitle: { uz: "Boshqaruv va xavfsizlik", ru: "Управление и безопасность", en: "Control and safety" },
    title: { uz: "Rul mexanizmi", ru: "Рулевой механизм", en: "Steering mechanism" },
    bullets: {
      uz: ["Har texnik xizmatda tekshiriladi.", "Gidrokuchaytiruvchi suyuqligi nazorat qilinadi.", "Burchaklar har 20000 km da tekshiriladi.", "Rul tortsa yoki bosh his qilinsa servisga boring.", "Xavfsizlik tasmalari ham tekshiriladi."],
      ru: ["Проверяется при каждом ТО.", "Жидкость ГУР контролируется.", "Углы колёс каждые 20000 км.", "Увод или люфт в сервис.", "Ремни безопасности проверяются одновременно."],
      en: ["Inspected at every service.", "Power steering fluid is monitored.", "Wheel alignment every 20000 km.", "Pulling or loose feel visit service.", "Seatbelts also checked at the same time."],
    },
    focus: { x: 42, y: 35, scale: 2.2, size: 13 },
  },
  {
    id: "exhaust",
    icon: "💨",
    name: { uz: "Chiqindi gaz tizimi", ru: "Выхлопная система", en: "Exhaust System" },
    subtitle: { uz: "Ishlangan gazlar", ru: "Отработанные газы", en: "Exhaust gases" },
    title: { uz: "Chiqindi gaz tizimi", ru: "Выхлопная система", en: "Exhaust system" },
    bullets: {
      uz: ["Ishlangan gazlarni xavfsiz chiqaradi.", "Har servisda mahkamlanish tekshiriladi.", "PCV tizimi muntazam tekshiriladi.", "EVAP tizimi nazorat qilinadi.", "Galati tutun dvigatel muammosining belgisi."],
      ru: ["Безопасно выводит газы сгорания.", "Крепёж проверяется на каждом ТО.", "Система PCV регулярно.", "Система EVAP контроль.", "Необычный дым признак проблем двигателя."],
      en: ["Safely removes combustion gases.", "Mounting checked at every service.", "PCV system checked regularly.", "EVAP system monitored.", "Unusual smoke may signal an engine issue."],
    },
    focus: { x: 60, y: 75, scale: 2.0, size: 14 },
  },
];
