// Reusable car parts maintenance data (Uzbek). Focus = % coords on car image to zoom into.

export interface PartFocus {
  // Center of zoom area in % of image (0-100). Origin top-left.
  x: number;
  y: number;
  // Zoom level (1 = no zoom)
  scale: number;
  // Highlight marker size in % of image width
  size: number;
}

export interface CarPart {
  id: string;
  name: string;
  uz: string;
  icon: string; // emoji icon for lightweight visual
  subtitle: string;
  title: string;
  bullets: string[];
  seasonal?: { label: string; text: string }[];
  focus: PartFocus;
}

export const CAR_PARTS: CarPart[] = [
  {
    id: "tires",
    name: "Tires",
    uz: "Shina",
    icon: "🛞",
    subtitle: "Bosim va protektor",
    title: "Shina holati va bosimi",
    bullets: [
      "Shina bosimini kamida oyiga 1 marta tekshirish kerak.",
      "Bosimni shina sovuq holatda, ya'ni mashina uzoq yurmagan paytda o'lchash kerak.",
      "To'g'ri PSI qiymati avtomobil manualida yoki haydovchi eshigi yonidagi stickerda yoziladi.",
      "Oddiy yengil avtomobillarda ko'pincha 30–35 PSI oralig'i uchraydi, lekin aniq qiymat modelga bog'liq.",
      "Qishda havo soviganda bosim pasayishi mumkin, shuning uchun tez-tez tekshirish kerak.",
      "Yozda uzoq yo'l oldidan bosim va protektor holatini tekshirish kerak.",
      "Protektor juda yeyilgan bo'lsa yoki yoriqlar bo'lsa, shinani almashtirish kerak.",
    ],
    seasonal: [
      { label: "Qish", text: "Bosimni tez-tez tekshir, qishki shina ishlat." },
      { label: "Yoz", text: "Uzoq safardan oldin bosim va qizib ketish xavfini tekshir." },
      { label: "Bahor/Kuz", text: "Harorat o'zgarganda PSI o'zgarishini nazorat qil." },
    ],
    focus: { x: 78, y: 78, scale: 2.2, size: 14 },
  },
  {
    id: "engine",
    name: "Engine",
    uz: "Dvigatel",
    icon: "⚙️",
    subtitle: "Asosiy quvvat manbai",
    title: "Dvigatel holati",
    bullets: [
      "Dvigatel avtomobilning asosiy qismi.",
      "G'alati ovoz, titrash, tutun yoki kuch pasayishi bo'lsa servisga murojaat qilish kerak.",
      "Dvigatel qizib ketmasligi uchun sovutish suyuqligi va moy darajasi tekshiriladi.",
      "Har kuni haydashdan oldin paneldagi ogohlantirish belgilariga e'tibor berish kerak.",
      "Check Engine belgisi yonsa, diagnostika qilish kerak.",
    ],
    focus: { x: 30, y: 55, scale: 2, size: 22 },
  },
  {
    id: "oil",
    name: "Engine Oil",
    uz: "Motor moyi",
    icon: "🛢️",
    subtitle: "Moylash va himoya",
    title: "Motor moyi",
    bullets: [
      "Moy dvigatel qismlarini moylaydi, sovutadi va yeyilishdan himoya qiladi.",
      "Moy darajasini dipstick orqali tekshirish mumkin.",
      "Moy juda qorayib ketgan, kamaygan yoki kuygan hid chiqsa almashtirish kerak.",
      "Almashtirish oralig'i avtomobil manualiga bog'liq.",
      "Ko'p avtomobillarda 7,500–10,000 mile oralig'i uchraydi, og'ir sharoitda 5,000 mile yoki 6 oy atrofida almashtirish tavsiya qilinadi.",
      "Har doim ishlab chiqaruvchi tavsiya qilgan moy turidan foydalan.",
    ],
    focus: { x: 32, y: 50, scale: 2.4, size: 14 },
  },
  {
    id: "battery",
    name: "Battery",
    uz: "Akkumulyator",
    icon: "🔋",
    subtitle: "Elektr quvvati",
    title: "Akkumulyator",
    bullets: [
      "Akkumulyator avtomobilni ishga tushirish va elektr tizimlarini quvvatlantirish uchun kerak.",
      "3 yildan keyin akkumulyatorni yiliga kamida 1 marta test qilish foydali.",
      "Qishda sovuq sababli akkumulyator kuchi pasayishi mumkin.",
      "Kontakt joylari zanglamagan va mahkam bo'lishi kerak.",
      "Mashina sekin start olsa, chiroqlar xira bo'lsa yoki panelda battery belgisi chiqsa tekshirtirish kerak.",
    ],
    focus: { x: 25, y: 48, scale: 2.4, size: 14 },
  },
  {
    id: "brakes",
    name: "Brakes",
    uz: "Tormoz tizimi",
    icon: "🛑",
    subtitle: "Xavfsizlik tizimi",
    title: "Tormoz tizimi",
    bullets: [
      "Tormoz xavfsizlikdagi eng muhim tizimlardan biri.",
      "Tormoz bosganda g'ichirlash, titrash yoki uzoqroq to'xtash sezilsa servisga borish kerak.",
      "Tormoz suyuqligi darajasini tekshirish kerak.",
      "Kolodka va disklar yeyilgan bo'lsa almashtiriladi.",
      "Yomg'irli yoki qishki yo'lda tormoz masofasi uzayadi.",
    ],
    focus: { x: 22, y: 78, scale: 2.4, size: 13 },
  },
  {
    id: "headlights",
    name: "Headlights",
    uz: "Faralar",
    icon: "💡",
    subtitle: "Ko'rish va xavfsizlik",
    title: "Faralar",
    bullets: [
      "Faralar tunda va yomon ob-havoda ko'rish uchun muhim.",
      "Har oy faralar, stop chiroqlar va burilish chiroqlarini tekshir.",
      "Faralar xiralashgan bo'lsa tozalash yoki polirovka qilish kerak.",
      "Qishda qor, loy va muzdan tozalab yurish kerak.",
    ],
    focus: { x: 18, y: 60, scale: 2.6, size: 12 },
  },
  {
    id: "cooling",
    name: "Cooling system",
    uz: "Sovutish tizimi",
    icon: "❄️",
    subtitle: "Antifriz va radiator",
    title: "Sovutish tizimi",
    bullets: [
      "Sovutish tizimi dvigatel qizib ketishining oldini oladi.",
      "Antifriz/sovutish suyuqligi darajasini tekshirib turish kerak.",
      "Harorat ko'rsatkichi normadan oshsa mashinani to'xtatish kerak.",
      "Radiator, shlanglar va suyuqlik sizib chiqishini nazorat qilish kerak.",
      "Qishda antifriz sifati juda muhim.",
    ],
    focus: { x: 20, y: 55, scale: 2.4, size: 16 },
  },
  {
    id: "airfilter",
    name: "Air filter",
    uz: "Havo filtri",
    icon: "🌬️",
    subtitle: "Toza havo oqimi",
    title: "Havo filtri",
    bullets: [
      "Havo filtri dvigatelga kirayotgan havoni changdan tozalaydi.",
      "Changli hududlarda tezroq ifloslanadi.",
      "Filtr iflos bo'lsa yoqilg'i sarfi oshishi va tortish kuchi kamayishi mumkin.",
      "Har servisda tekshirish va kerak bo'lsa almashtirish kerak.",
    ],
    focus: { x: 35, y: 45, scale: 2.4, size: 13 },
  },
  {
    id: "fuel",
    name: "Fuel system",
    uz: "Yoqilg'i tizimi",
    icon: "⛽",
    subtitle: "Yoqilg'i sifati",
    title: "Yoqilg'i tizimi",
    bullets: [
      "Sifatli yoqilg'i ishlatish dvigatel ishlashiga ta'sir qiladi.",
      "Juda past sifatli yoqilg'i forsunkalar va filtrga zarar yetkazishi mumkin.",
      "Yoqilg'i sarfi keskin oshsa yoki mashina tortmay qolsa diagnostika kerak.",
      "Bakni doimiy juda bo'sh holatda yuritmaslik tavsiya qilinadi.",
    ],
    focus: { x: 70, y: 55, scale: 2.2, size: 13 },
  },
  {
    id: "suspension",
    name: "Suspension",
    uz: "Podveska",
    icon: "🔧",
    subtitle: "Yo'l yumshatuvchi",
    title: "Podveska",
    bullets: [
      "Podveska yo'ldagi notekisliklarni yumshatadi.",
      "G'alati taqillash, mashinaning bir tomonga tortishi yoki notekis yeyilgan shina podveska muammosi belgisi bo'lishi mumkin.",
      "Amortizator, sharli tayanch va rezina vtulkalarni servisda tekshirtirish kerak.",
      "Yomon yo'llarda ehtiyotkor haydash podveska umrini uzaytiradi.",
    ],
    focus: { x: 50, y: 82, scale: 2, size: 22 },
  },
  {
    id: "transmission",
    name: "Transmission",
    uz: "Uzatma qutisi",
    icon: "🔩",
    subtitle: "Kuch uzatish",
    title: "Uzatma qutisi",
    bullets: [
      "Uzatma qutisi dvigatel kuchini g'ildiraklarga uzatadi.",
      "Avtomat qutida silkinish, kechikish yoki g'alati ovoz bo'lsa diagnostika kerak.",
      "Mexanik qutida sirpanish yoki qiyin uzatish sezilsa servis kerak.",
      "Moy/suyuqlik almashinuvi model manualiga qarab bajariladi.",
    ],
    focus: { x: 50, y: 70, scale: 2.2, size: 18 },
  },
  {
    id: "wipers",
    name: "Wipers",
    uz: "Oyna tozalagichlar",
    icon: "🌧️",
    subtitle: "Oyna tozaligi",
    title: "Oyna tozalagichlar",
    bullets: [
      "Yomg'ir, qor va changda ko'rish sifatini saqlaydi.",
      "Rezina qismi qotib qolsa yoki oynada iz qoldirsa almashtirish kerak.",
      "Qishda muzlagan oynada wiperni majburlab ishlatmaslik kerak.",
      "Oyna yuvish suyuqligini faslga mos tanlash kerak.",
    ],
    focus: { x: 45, y: 38, scale: 2.2, size: 22 },
  },
];
