import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Phone, Plus, Gauge, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { loadServiceMap } from "@/lib/google-map-loader";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { brands } from "@/data/brands";

export const Route = createFileRoute("/market")({
  head: () => ({
    meta: [
      { title: "Savdo — AutoINFO" },
      { name: "description", content: "Avtomobil savdo e'lonlari xaritada: rusum, narx, sotuvchi." },
      { property: "og:title", content: "Savdo — AutoINFO" },
      { property: "og:description", content: "Avtomobil e'lonlarini xaritada ko'ring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MarketPage,
});

type Listing = {
  id: string;
  user_id: string | null;
  seller_name: string;
  phone: string;
  brand: string;
  model: string;
  year: number;
  price_usd: number;
  mileage_km: number;
  city: string;
  latitude: number;
  longitude: number;
  description: string | null;
  is_demo: boolean;
};

const TX = {
  uz: { title: "Savdo", sub: "Avtomobil e'lonlari — kartani suring, xaritada ko'rinadi", all: "Barchasi", add: "E'lon berish", login: "E'lon berish uchun kiring", empty: "E'lonlar yo'q", sample: "Namuna e'lon", km: "km", seller: "Sotuvchi", call: "Qo'ng'iroq", save: "Joylash", name: "Ismingiz", phone: "Telefon", brand: "Rusum", model: "Model", year: "Yil", price: "Narx ($)", mileage: "Probeg (km)", city: "Manzil", desc: "Izoh", ok: "E'lon joylandi", err: "Xatolik, maydonlarni tekshiring", del: "O'chirish", map: "Xarita ochilmadi" },
  ru: { title: "Продажа", sub: "Объявления — листайте карточки, они видны на карте", all: "Все", add: "Подать объявление", login: "Войдите, чтобы подать объявление", empty: "Нет объявлений", sample: "Пример", km: "км", seller: "Продавец", call: "Позвонить", save: "Опубликовать", name: "Имя", phone: "Телефон", brand: "Марка", model: "Модель", year: "Год", price: "Цена ($)", mileage: "Пробег (км)", city: "Адрес", desc: "Описание", ok: "Объявление опубликовано", err: "Ошибка, проверьте поля", del: "Удалить", map: "Карта не загрузилась" },
  en: { title: "Market", sub: "Car listings — swipe cards to see them on the map", all: "All", add: "Post a listing", login: "Sign in to post", empty: "No listings", sample: "Sample", km: "km", seller: "Seller", call: "Call", save: "Publish", name: "Your name", phone: "Phone", brand: "Brand", model: "Model", year: "Year", price: "Price ($)", mileage: "Mileage (km)", city: "Location", desc: "Notes", ok: "Listing published", err: "Error, check the fields", del: "Delete", map: "Map failed to load" },
};

function MarketPage() {
  const { lang } = useLanguage();
  const tx = TX[(lang as keyof typeof TX)] ?? TX.uz;
  const { user } = useAuth();
  const [items, setItems] = useState<Listing[]>([]);
  const [brand, setBrand] = useState<string>("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [mapErr, setMapErr] = useState(false);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | undefined>(undefined);
  const markers = useRef<google.maps.Marker[]>([]);
  const strip = useRef<HTMLDivElement>(null);

  const load = () =>
    supabase.from("car_listings").select("*").order("created_at", { ascending: false })
      .then(({ data }) => setItems((data as Listing[]) ?? []));
  useEffect(() => { load(); }, []);

  const list = useMemo(() => (brand ? items.filter((i) => i.brand === brand) : items), [items, brand]);
  const brandNames = useMemo(() => [...new Set(items.map((i) => i.brand))], [items]);

  useEffect(() => { setActive(0); strip.current?.scrollTo({ left: 0 }); }, [brand]);

  // markers
  useEffect(() => {
    let off = false;
    loadServiceMap().then((maps) => {
      if (off || !mapEl.current) return;
      if (!mapRef.current) {
        mapRef.current = new maps.Map(mapEl.current, {
          center: { lat: 41.31, lng: 69.27 }, zoom: 11, clickableIcons: false,
          mapTypeControl: false, streetViewControl: false, gestureHandling: "greedy",
        });
      }
      markers.current.forEach((m) => m.setMap(null));
      markers.current = list.map((l, i) => {
        const m = new maps.Marker({ map: mapRef.current, position: { lat: l.latitude, lng: l.longitude }, title: `${l.brand} ${l.model}` });
        m.addListener("click", () => {
          const el = strip.current?.children[i] as HTMLElement | undefined;
          el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
          setActive(i);
        });
        return m;
      });
    }).catch(() => !off && setMapErr(true));
    return () => { off = true; };
  }, [list]);

  // pan to active
  useEffect(() => {
    const l = list[active];
    const maps = typeof google !== "undefined" ? google.maps : undefined;
    if (!l || !mapRef.current || !maps) return;
    mapRef.current.panTo({ lat: l.latitude, lng: l.longitude });
    mapRef.current.setZoom(13);
    markers.current.forEach((m, i) => m.setAnimation(i === active ? maps.Animation.BOUNCE : null));
  }, [active, list]);

  const onScroll = () => {
    const s = strip.current;
    if (!s || !s.children.length) return;
    const w = (s.children[0] as HTMLElement).offsetWidth + 12;
    const i = Math.min(list.length - 1, Math.max(0, Math.round(s.scrollLeft / w)));
    if (i !== active) setActive(i);
  };

  const remove = async (id: string) => {
    await supabase.from("car_listings").delete().eq("id", id);
    load();
  };

  return (
    <main className="relative min-h-screen pb-28">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-6">
        <AutoInfoLogo size="sm" />
        <LanguageSwitcher />
      </header>
      <section className="mx-auto max-w-3xl px-4 pt-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">{tx.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{tx.sub}</p>
          </div>
          {user ? (
            <Button onClick={() => setOpen(true)} className="shrink-0"><Plus />{tx.add}</Button>
          ) : (
            <Button asChild variant="secondary" className="shrink-0"><Link to="/auth">{tx.login}</Link></Button>
          )}
        </div>

        <div className="relative mt-4 h-72 overflow-hidden rounded-2xl border border-border bg-secondary sm:h-96">
          <div ref={mapEl} className="h-full w-full" />
          {mapErr && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />{tx.map}
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {["", ...brandNames].map((b) => (
            <Button key={b || "all"} size="sm" variant={brand === b ? "default" : "secondary"} className="shrink-0" onClick={() => setBrand(b)}>
              {b || tx.all} <span className="opacity-60">{b ? items.filter((i) => i.brand === b).length : items.length}</span>
            </Button>
          ))}
        </div>

        {list.length === 0 ? (
          <p className="mt-8 text-center text-sm text-muted-foreground">{tx.empty}</p>
        ) : (
          <div ref={strip} onScroll={onScroll} className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3">
            {list.map((l, i) => (
              <article
                key={l.id}
                onClick={() => setActive(i)}
                className={`w-[85%] shrink-0 snap-center rounded-2xl border bg-card p-4 transition sm:w-[60%] ${i === active ? "border-primary" : "border-border"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{l.brand}</p>
                    <h2 className="truncate font-display text-xl font-semibold">{l.model}</h2>
                  </div>
                  <p className="font-display text-xl font-bold text-primary">${l.price_usd.toLocaleString("en-US")}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{l.year}</span>
                  <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{l.mileage_km.toLocaleString("en-US")} {tx.km}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{l.city}</span>
                </div>
                {l.description && <p className="mt-2 line-clamp-2 text-sm">{l.description}</p>}
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                  <div className="min-w-0 text-xs">
                    <p className="text-muted-foreground">{tx.seller}</p>
                    <p className="truncate font-medium">{l.seller_name}{l.is_demo && <span className="ml-2 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">{tx.sample}</span>}</p>
                  </div>
                  <div className="flex gap-2">
                    {user?.id === l.user_id && <Button size="sm" variant="ghost" onClick={() => remove(l.id)}>{tx.del}</Button>}
                    <Button size="sm" asChild><a href={`tel:${l.phone}`}><Phone />{tx.call}</a></Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      {user && <AddListing open={open} setOpen={setOpen} tx={tx} userId={user.id} onDone={load} />}
      <BottomNav />
    </main>
  );
}

function AddListing({ open, setOpen, tx, userId, onDone }: { open: boolean; setOpen: (v: boolean) => void; tx: (typeof TX)["uz"]; userId: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    let lat = 41.31 + (Math.random() - 0.5) * 0.08, lng = 69.27 + (Math.random() - 0.5) * 0.1;
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout: 6000 }));
      lat = pos.coords.latitude; lng = pos.coords.longitude;
    } catch { /* use Tashkent area */ }
    const { error } = await supabase.from("car_listings").insert({
      user_id: userId,
      seller_name: String(f.get("name")).trim(),
      phone: String(f.get("phone")).trim(),
      brand: String(f.get("brand")),
      model: String(f.get("model")).trim(),
      year: Number(f.get("year")),
      price_usd: Number(f.get("price")),
      mileage_km: Number(f.get("mileage") || 0),
      city: String(f.get("city")).trim(),
      description: String(f.get("desc") || "").trim() || null,
      latitude: lat, longitude: lng,
    });
    setBusy(false);
    if (error) return toast.error(tx.err);
    toast.success(tx.ok);
    setOpen(false);
    onDone();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{tx.add}</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="grid gap-3">
          <Input name="name" placeholder={tx.name} required minLength={2} maxLength={40} />
          <Input name="phone" placeholder={tx.phone} required minLength={7} maxLength={20} type="tel" />
          <select name="brand" required className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {brands.map((b) => <option key={b.slug} value={b.name}>{b.name}</option>)}
          </select>
          <Input name="model" placeholder={tx.model} required maxLength={40} />
          <div className="grid grid-cols-2 gap-3">
            <Input name="year" placeholder={tx.year} required type="number" min={1970} max={2030} />
            <Input name="price" placeholder={tx.price} required type="number" min={1} />
          </div>
          <Input name="mileage" placeholder={tx.mileage} type="number" min={0} />
          <Input name="city" placeholder={tx.city} required minLength={2} maxLength={60} />
          <Input name="desc" placeholder={tx.desc} maxLength={500} />
          <Button type="submit" disabled={busy}>{tx.save}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
