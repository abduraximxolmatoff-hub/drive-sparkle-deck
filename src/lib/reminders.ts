import { getChevPartInfo } from "@/data/chevPartContent";
import { CHEV_MODEL_SPECS } from "@/data/chevModelSpecs";

export interface ReminderPartDef {
  id: string;
  name: string;
  /** Phrase used in push text: "<noun> almashtirish vaqti keldi!" */
  noun: string;
  fallback: { km: number | null; months: number | null };
}

/** The 17 parts shown in Eslatmalar, with general fallback intervals. */
export const REMINDER_PARTS: ReminderPartDef[] = [
  { id: "tires", name: "Shina", noun: "Shinani", fallback: { km: null, months: 72 } },
  { id: "windows", name: "Oyna (cho'tkalar)", noun: "Oyna cho'tkalarini", fallback: { km: null, months: 6 } },
  { id: "oil", name: "Motor moyi", noun: "Motor moyini", fallback: { km: 7000, months: 6 } },
  { id: "engine", name: "Dvigatel (GRM kamari)", noun: "GRM kamarini", fallback: { km: 60000, months: null } },
  { id: "battery", name: "Akkumulyator", noun: "Akkumulyatorni", fallback: { km: null, months: 36 } },
  { id: "brakes", name: "Tormoz tizimi", noun: "Tormoz kolodkalarini", fallback: { km: 10000, months: null } },
  { id: "headlights", name: "Faralar", noun: "Faralarni", fallback: { km: null, months: 12 } },
  { id: "cooling", name: "Sovutish tizimi (antifriz)", noun: "Antifrizni", fallback: { km: null, months: 36 } },
  { id: "airfilter", name: "Havo filtri", noun: "Havo filtrini", fallback: { km: 15000, months: 12 } },
  { id: "suspension", name: "Podveska", noun: "Podveskani", fallback: { km: 15000, months: null } },
  { id: "fuel_filter", name: "Yonilg'i filtri", noun: "Yonilg'i filtrini", fallback: { km: 30000, months: 24 } },
  { id: "cabin_filter", name: "Salon havo filtri", noun: "Salon filtrini", fallback: { km: 10000, months: 12 } },
  { id: "spark_plugs", name: "Ot oldirish svechalari", noun: "Svechalarni", fallback: { km: 30000, months: null } },
  { id: "brake_fluid", name: "Tormoz suyuqligi", noun: "Tormoz suyuqligini", fallback: { km: null, months: 24 } },
  { id: "transmission", name: "Transmissiya moyi", noun: "Transmissiya moyini", fallback: { km: 40000, months: null } },
  { id: "steering", name: "Rul mexanizmi", noun: "Rul mexanizmini", fallback: { km: 10000, months: null } },
  { id: "exhaust", name: "Chiqindi gaz tizimi", noun: "Chiqindi gaz tizimini", fallback: { km: null, months: 12 } },
];

export type IntervalSource = "model" | "general";
export interface ResolvedInterval {
  km: number | null;
  months: number | null;
  source: IntervalSource;
}

const toInt = (s: string) => parseInt(s.replace(/[\s,.\u00a0]/g, ""), 10);

/** Extracts km / months from interval text like "40–50 000 km · 6–12 oy". */
export function parseIntervalText(text: string): { km: number | null; months: number | null } {
  let km: number | null = null;
  let months: number | null = null;
  const kmM = /(\d[\d\s,.\u00a0]*?)(?:\s*[–-]\s*(\d[\d\s,.\u00a0]*?))?\s*km/i.exec(text);
  if (kmM) {
    let first = toInt(kmM[1]);
    const second = kmM[2] ? toInt(kmM[2]) : null;
    if (second && first < 1000 && second >= 1000) first *= 1000;
    if (first >= 500) km = first;
  }
  const moM = /(\d+)(?:\s*[–-]\s*\d+)?\s*oy/i.exec(text);
  if (moM) months = parseInt(moM[1], 10);
  else {
    const yM = /(\d+)(?:\s*[–-]\s*\d+)?\s*yil/i.exec(text);
    if (yM) months = parseInt(yM[1], 10) * 12;
  }
  return { km, months };
}

const SKIP_LABEL = /bosim|voltaj|tekshir|protektor|soat/i;

/** Interval from the model's own part data, else the general fallback. */
export function resolveInterval(modelSlug: string, part: ReminderPartDef): ResolvedInterval {
  if (CHEV_MODEL_SPECS[modelSlug]) {
    const info = getChevPartInfo(modelSlug, part.id);
    for (const chip of info?.intervals ?? []) {
      if (SKIP_LABEL.test(chip.label.uz)) continue;
      const p = parseIntervalText(chip.value.uz);
      if (p.km || p.months) return { ...p, source: "model" };
    }
  }
  return { ...part.fallback, source: "general" };
}

export type ReminderStatus = "ok" | "soon" | "overdue" | "unset";

export interface StatusInput {
  last_date: string | null;
  last_km: number | null;
  interval_km: number | null;
  interval_months: number | null;
}

export function addMonths(dateIso: string, months: number): Date {
  const d = new Date(dateIso + "T00:00:00Z");
  d.setUTCMonth(d.getUTCMonth() + months);
  return d;
}

export function computeStatus(r: StatusInput, currentKm: number | null, today = new Date()) {
  const dueDate = r.last_date && r.interval_months ? addMonths(r.last_date, r.interval_months) : null;
  const dueKm = r.last_km != null && r.interval_km ? r.last_km + r.interval_km : null;
  const t0 = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const daysLeft = dueDate ? Math.round((dueDate.getTime() - t0) / 86400000) : null;
  const kmLeft = dueKm != null && currentKm != null ? dueKm - currentKm : null;

  let status: ReminderStatus = "unset";
  if (daysLeft != null || kmLeft != null) {
    status = "ok";
    const soonKm = r.interval_km ? Math.max(500, r.interval_km * 0.1) : 500;
    if ((daysLeft != null && daysLeft <= 14) || (kmLeft != null && kmLeft <= soonKm)) status = "soon";
    if ((daysLeft != null && daysLeft < 0) || (kmLeft != null && kmLeft < 0)) status = "overdue";
  }
  return { dueDate, dueKm, daysLeft, kmLeft, status };
}

export const VAPID_PUBLIC_KEY =
  "BKuTJx2NbrKBWuSkbUV8i889RbFXrAL1cxQZKFaV9H_wfgPtFW3NfakgbEkbtnZRX8IMxQA38_DIzA9pB64aGGM";
