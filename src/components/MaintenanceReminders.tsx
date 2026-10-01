import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Bell, Car, Gauge, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { brands } from "@/data/brands";
import { getPartIcon } from "@/data/partIcons";
import { REMINDER_PARTS, computeStatus, resolveInterval, type ReminderStatus } from "@/lib/reminders";
import { enablePush } from "@/lib/push";

interface CarRow {
  brand_slug: string;
  model_slug: string;
  year: number;
  current_km: number | null;
  km_updated_at: string | null;
}
interface ReminderRow {
  part_id: string;
  last_date: string | null;
  last_km: number | null;
  interval_km: number | null;
  interval_months: number | null;
  enabled: boolean;
}

const STATUS_UI: Record<ReminderStatus, { label: string; cls: string }> = {
  ok: { label: "Yaxshi", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40" },
  soon: { label: "Yaqinlashmoqda", cls: "bg-amber-500/15 text-amber-400 border-amber-500/40" },
  overdue: { label: "Muddati o'tgan", cls: "bg-red-500/15 text-red-400 border-red-500/40" },
  unset: { label: "Ma'lumot kiritilmagan", cls: "bg-muted/40 text-muted-foreground border-border" },
};

const input = "w-full rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm";
const card = "rounded-3xl border border-border bg-card-gradient p-5 backdrop-blur-md shadow-card";
const todayIso = () => new Date().toISOString().slice(0, 10);
const numOrNull = (v: string) => (v.trim() === "" ? null : Math.max(0, parseInt(v, 10) || 0));

export function MaintenanceReminders() {
  const { user, loading } = useAuth();
  const [car, setCar] = useState<CarRow | null>(null);
  const [rows, setRows] = useState<Record<string, ReminderRow>>({});
  const [draft, setDraft] = useState({ brand: "", model: "", year: new Date().getFullYear() });
  const [kmInput, setKmInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: c }, { data: r }] = await Promise.all([
        supabase.from("user_cars").select("*").eq("user_id", user.id).maybeSingle(),
        supabase.from("part_reminders").select("*").eq("user_id", user.id),
      ]);
      if (c) {
        setCar(c);
        setDraft({ brand: c.brand_slug, model: c.model_slug, year: c.year });
        setKmInput(c.current_km?.toString() ?? "");
      }
      setRows(Object.fromEntries((r ?? []).map((x) => [x.part_id, x])));
      setLoaded(true);
    })();
  }, [user]);

  useEffect(() => {
    if (loaded && window.location.hash === "#eslatmalar")
      document.getElementById("eslatmalar")?.scrollIntoView({ behavior: "smooth" });
  }, [loaded]);

  const brand = brands.find((b) => b.slug === draft.brand);
  const carBrand = brands.find((b) => b.slug === car?.brand_slug);
  const carModel = carBrand?.models.find((m) => m.slug === car?.model_slug);

  const intervals = useMemo(
    () => Object.fromEntries(REMINDER_PARTS.map((p) => [p.id, resolveInterval(car?.model_slug ?? "", p)])),
    [car?.model_slug],
  );

  if (loading) return null;
  if (!user)
    return (
      <div id="eslatmalar" className={card}>
        <div className="mb-2 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">Eslatmalar</h2>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">
          Asosiy mashinangizni saqlash va servis eslatmalarini olish uchun hisobingizga kiring.
        </p>
        <Link to="/auth" className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Kirish / Ro'yxatdan o'tish
        </Link>
      </div>
    );

  const saveCar = async () => {
    if (!draft.brand || !draft.model) return toast.error("Brend va modelni tanlang");
    const row = { user_id: user.id, brand_slug: draft.brand, model_slug: draft.model, year: draft.year };
    const { data, error } = await supabase.from("user_cars").upsert(row).select().single();
    if (error) return toast.error("Saqlab bo'lmadi");
    setCar(data);
    toast.success("Asosiy mashina saqlandi");
  };

  const saveKm = async () => {
    const km = numOrNull(kmInput);
    if (km == null) return;
    const { data, error } = await supabase
      .from("user_cars")
      .update({ current_km: km, km_updated_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .select()
      .single();
    if (error) return toast.error("Saqlab bo'lmadi");
    setCar(data);
    toast.success("Probeg yangilandi");
  };

  const getRow = (partId: string): ReminderRow => {
    const iv = intervals[partId];
    return (
      rows[partId] ?? {
        part_id: partId,
        last_date: null,
        last_km: null,
        interval_km: iv.km,
        interval_months: iv.months,
        enabled: true,
      }
    );
  };

  const savePart = async (partId: string, patch: Partial<ReminderRow>) => {
    const next = { ...getRow(partId), ...patch };
    setRows((r) => ({ ...r, [partId]: next }));
    const { error } = await supabase
      .from("part_reminders")
      .upsert({ ...next, user_id: user.id, last_notified: null }, { onConflict: "user_id,part_id" });
    if (error) toast.error("Saqlab bo'lmadi");
  };

  const onEnablePush = async () => {
    const r = await enablePush(user.id);
    const msg: Record<typeof r, string> = {
      registered: "Bildirishnomalar yoqildi",
      unsupported: "Brauzeringiz bildirishnomalarni qo'llamaydi",
      "open-in-new-tab": "Ilovani alohida oynada (yoki o'rnatilgan ilovada) oching va qayta urinib ko'ring",
      denied: "Ruxsat berilmadi — brauzer sozlamalarida bildirishnomalarga ruxsat bering",
      error: "Bildirishnomalarni yoqib bo'lmadi",
    };
    r === "registered" ? toast.success(msg[r]) : toast.error(msg[r]);
  };

  const kmStale =
    car && (!car.km_updated_at || Date.now() - new Date(car.km_updated_at).getTime() > 30 * 86400000);

  return (
    <>
      {/* Asosiy mashina */}
      <div className={card}>
        <div className="mb-3 flex items-center gap-2">
          <Car className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">Asosiy mashina</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          <select className={input} value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value, model: "" })}>
            <option value="">Brend</option>
            {brands.map((b) => (
              <option key={b.slug} value={b.slug}>{b.name}</option>
            ))}
          </select>
          <select className={input} value={draft.model} onChange={(e) => setDraft({ ...draft, model: e.target.value })}>
            <option value="">Model</option>
            {brand?.models.map((m) => (
              <option key={m.slug} value={m.slug}>{m.name}</option>
            ))}
          </select>
          <select className={input} value={draft.year} onChange={(e) => setDraft({ ...draft, year: +e.target.value })}>
            {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <button onClick={saveCar} className="rounded-lg bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
            Saqlash
          </button>
        </div>
        {car && (
          <div className="mt-4 flex flex-wrap items-end gap-2">
            <label className="flex-1 text-xs text-muted-foreground">
              <span className="mb-1 flex items-center gap-1"><Gauge className="h-3.5 w-3.5" /> Joriy probeg (km)</span>
              <input className={input} inputMode="numeric" value={kmInput} onChange={(e) => setKmInput(e.target.value)} />
            </label>
            <button onClick={saveKm} className="rounded-lg border border-primary/60 px-3 py-1.5 text-sm font-semibold text-primary">
              Yangilash
            </button>
          </div>
        )}
        {kmStale && (
          <p className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-400">
            Iltimos, joriy probegni yangilang — oyiga bir marta yangilash eslatmalarni aniq qiladi.
          </p>
        )}
      </div>

      {/* Eslatmalar */}
      <div id="eslatmalar" className={card}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Eslatmalar</h2>
          </div>
          <button onClick={onEnablePush} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            Bildirishnomalarni yoqish
          </button>
        </div>
        {!car ? (
          <p className="text-sm text-muted-foreground">Avval asosiy mashinangizni tanlang.</p>
        ) : (
          <>
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              {carBrand?.name} {carModel?.name} · {car.year}
            </p>
            <ul className="grid gap-3">
              {REMINDER_PARTS.map((p) => {
                const row = getRow(p.id);
                const st = computeStatus(row, car.current_km);
                const ui = STATUS_UI[st.status];
                const Icon = getPartIcon(p.id);
                const src = intervals[p.id].source;
                return (
                  <li key={p.id} className="rounded-2xl border border-border/60 bg-background/40 p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{p.name}</span>
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                        {src === "model" ? "Model ma'lumoti" : "Umumiy tavsiya"}
                      </span>
                      <span className={`ml-auto rounded-full border px-2 py-0.5 text-[11px] font-semibold ${ui.cls}`}>
                        {ui.label}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      <label className="text-[11px] text-muted-foreground">Oxirgi almashtirish
                        <input type="date" className={input} value={row.last_date ?? ""} onChange={(e) => savePart(p.id, { last_date: e.target.value || null })} />
                      </label>
                      <label className="text-[11px] text-muted-foreground">O'shanda probeg (km)
                        <input inputMode="numeric" className={input} defaultValue={row.last_km ?? ""} onBlur={(e) => savePart(p.id, { last_km: numOrNull(e.target.value) })} />
                      </label>
                      <label className="text-[11px] text-muted-foreground">Interval (km)
                        <input inputMode="numeric" className={input} defaultValue={row.interval_km ?? ""} onBlur={(e) => savePart(p.id, { interval_km: numOrNull(e.target.value) })} />
                      </label>
                      <label className="text-[11px] text-muted-foreground">Interval (oy)
                        <input inputMode="numeric" className={input} defaultValue={row.interval_months ?? ""} onBlur={(e) => savePart(p.id, { interval_months: numOrNull(e.target.value) })} />
                      </label>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                      <span className="text-muted-foreground">
                        Keyingisi:{" "}
                        {st.dueDate ? st.dueDate.toLocaleDateString("uz-UZ") : "—"}
                        {st.dueKm != null && ` · ${st.dueKm.toLocaleString("uz-UZ")} km`}
                        {st.daysLeft != null && ` (${st.daysLeft} kun)`}
                        {st.kmLeft != null && ` · ${st.kmLeft} km qoldi`}
                      </span>
                      <label className="ml-auto flex items-center gap-1.5">
                        <input type="checkbox" checked={row.enabled} onChange={(e) => savePart(p.id, { enabled: e.target.checked })} />
                        Eslatma
                      </label>
                      <button
                        onClick={() => savePart(p.id, { last_date: todayIso(), last_km: car.current_km })}
                        className="flex items-center gap-1 rounded-lg border border-primary/60 px-2.5 py-1 font-semibold text-primary"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Almashtirildi
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Muddatlar umumiy tavsiya. Mashinangiz qo'llanmasini tekshiring.
        </p>
      </div>
    </>
  );
}
