import { brands, type Brand, type CarModel } from "@/data/brands";

export type SearchResult =
  | { kind: "brand"; brand: Brand; label: string; score: number }
  | { kind: "model"; brand: Brand; model: CarModel; label: string; score: number };

const CYR: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "j", з: "z", и: "i", й: "y",
  к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
  х: "x", ц: "ts", ч: "ch", ш: "sh", щ: "sh", ъ: "", ы: "i", ь: "", э: "e", ю: "yu", я: "ya",
  ў: "o", қ: "k", ғ: "g", ҳ: "h",
};

/** Lowercase, transliterate Cyrillic, drop accents/spaces/hyphens. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("")
    .map((c) => CYR[c] ?? c)
    .join("")
    .replace(/[\s\-_.'‘’`]+/g, "");
}

/** Phonetic folding so "jentra"≈"gentra", "kobalt"≈"cobalt", "mersedes"≈"mercedes". */
function fold(s: string): string {
  return s
    .replace(/ch/g, "c")
    .replace(/sh/g, "s")
    .replace(/ts/g, "c")
    .replace(/[kqc]/g, "k")
    .replace(/[jg]/g, "j")
    .replace(/[sz]/g, "s")
    .replace(/[yi]/g, "i")
    .replace(/x/g, "h")
    .replace(/w/g, "v")
    .replace(/(.)\1+/g, "$1");
}

const BRAND_ALIASES: Record<string, string[]> = {
  bmw: ["бмв", "bimmer", "bemve"],
  chevrolet: ["chevy", "шевроле", "shevrole", "chevrole"],
  "mercedes-benz": ["mercedes", "мерседес", "mers", "benz", "mersedes", "мерс"],
  audi: ["ауди"],
  porsche: ["порше", "porshe"],
  lamborghini: ["ламборгини", "lambo", "lamborgini"],
};

const MODEL_ALIASES: Record<string, string[]> = {
  "cobalt-15l": ["cobalt", "кобальт", "kobalt"],
  "gentra-15l": ["gentra", "джентра", "жентра", "jentra", "lacetti", "лачетти"],
  tracker: ["трекер"],
  trailblazer: ["трейлблейзер"],
  tahoe: ["тахо"],
  traverse: ["траверс"],
  equinox: ["эквинокс"],
  malibu: ["малибу"],
  "c-class": ["c class", "ц класс", "с класс", "cklass"],
  "e-class": ["e class", "е класс", "eklass"],
  "g-class": ["g class", "g63", "гелик", "gelik", "gelendvagen", "гелендваген"],
  "7-series-sedan": ["7 series", "7er", "i7", "семерка"],
  m5: ["м5"],
  x5: ["х5"],
  a6: ["а6"],
  q7: ["ку7"],
  rs7: ["рс7"],
  cayenne: ["кайен"],
  panamera: ["панамера"],
  "911": ["911"],
  huracan: ["уракан", "hurakan"],
  aventador: ["авентадор"],
  urus: ["урус"],
};

function lev(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++)
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}

/** Score one query against one term: 100 exact, 80 starts-with, 60 contains, ≤40 fuzzy, 0 none. */
function scoreTerm(q: string, term: string): number {
  const t = normalize(term);
  if (!t) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 80 + Math.min(10, q.length);
  if (q.length >= 2 && t.includes(q)) return 60;
  if (q.length < 3) return 0;
  const fq = fold(q), ft = fold(t);
  if (fq.length < 3) return 0;
  if (ft === fq) return 50;
  if (ft.startsWith(fq)) return 45;
  const prefix = ft.slice(0, Math.max(fq.length, 3));
  const d = Math.min(lev(fq, prefix), lev(fq, ft));
  const allowed = fq.length <= 4 ? 1 : 2;
  return d <= allowed ? 40 - d * 10 : 0;
}

function termsForModel(b: Brand, m: CarModel): string[] {
  const short = m.name.replace(b.name, "").trim();
  return [m.name, short, m.slug, ...(m.legacySlugs ?? []), ...(MODEL_ALIASES[m.slug] ?? [])];
}

function best(q: string, terms: string[]) {
  return terms.reduce((s, t) => Math.max(s, scoreTerm(q, t)), 0);
}

export function searchCars(raw: string, limit = 8): SearchResult[] {
  const q = normalize(raw);
  if (!q) return [];
  const out: SearchResult[] = [];
  for (const b of brands) {
    const bs = best(q, [b.name, b.slug, ...(BRAND_ALIASES[b.slug] ?? [])]);
    if (bs > 0) {
      out.push({ kind: "brand", brand: b, label: b.name, score: bs + 5 });
      b.models.forEach((m, i) =>
        out.push({ kind: "model", brand: b, model: m, label: m.name, score: bs - 1 - i * 0.01 }),
      );
    }
    for (const m of b.models) {
      const ms = best(q, termsForModel(b, m));
      if (ms <= 0) continue;
      const existing = out.find((r) => r.kind === "model" && r.model.slug === m.slug && r.brand.slug === b.slug);
      if (existing) existing.score = Math.max(existing.score, ms);
      else out.push({ kind: "model", brand: b, model: m, label: m.name, score: ms });
    }
  }
  return out.sort((a, b) => b.score - a.score).slice(0, limit);
}

/** Closest models regardless of threshold, for "did you mean". */
export function suggestCars(raw: string, n = 3) {
  const q = fold(normalize(raw));
  const all = brands.flatMap((b) => b.models.map((m) => ({ b, m })));
  return all
    .map(({ b, m }) => ({
      brand: b,
      model: m,
      d: Math.min(...termsForModel(b, m).map((t) => lev(q, fold(normalize(t)).slice(0, q.length + 2)))),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n);
}

/** Index range of the visible match within a label, for highlighting. */
export function matchRange(label: string, raw: string): [number, number] | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;
  const i = label.toLowerCase().indexOf(q);
  return i >= 0 ? [i, i + q.length] : null;
}

export const POPULAR = [
  ["chevrolet", "cobalt-15l"],
  ["chevrolet", "gentra-15l"],
  ["chevrolet", "tracker"],
  ["mercedes-benz", "g-class"],
  ["bmw", "m5"],
  ["lamborghini", "urus"],
] as const;
