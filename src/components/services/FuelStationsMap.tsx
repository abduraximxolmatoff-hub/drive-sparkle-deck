import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import { loadServiceMap } from "@/lib/google-map-loader";
import { serviceDirectionsUrl } from "@/lib/service-directions";
import { getFuelStations, type FuelType, type FuelStation } from "@/lib/fuel-stations.functions";
import fuelImg from "@/assets/services/cats/fuel.png";

const TYPES: { id: FuelType; key: string; color: string }[] = [
  { id: "petrol", key: "fuel.petrol", color: "#22c55e" },
  { id: "methane", key: "fuel.methane", color: "#38bdf8" },
  { id: "propane", key: "fuel.propane", color: "#f59e0b" },
  { id: "electric", key: "fuel.electric", color: "#a78bfa" },
];

export function FuelStationsMap() {
  const { t } = useLanguage();
  const [type, setType] = useState<FuelType>("petrol");
  const [selectedId, setSelectedId] = useState<string>();
  const [mapState, setMapState] = useState<"loading" | "ready" | "error">("loading");
  const container = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<FuelStation[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  useEffect(() => {
    let off = false;
    setLoading(true);
    setError(false);
    setData([]);
    getFuelStations({ data: { type } })
      .then((d) => !off && setData(d))
      .catch(() => !off && setError(true))
      .finally(() => !off && setLoading(false));
    return () => {
      off = true;
    };
  }, [type]);
  const color = TYPES.find((x) => x.id === type)!.color;
  const selected = data.find((s) => s.id === selectedId) ?? data[0];

  useEffect(() => {
    if (!data.length) return;
    let disposed = false;
    const markers: google.maps.Marker[] = [];
    loadServiceMap()
      .then((maps) => {
        if (disposed || !container.current) return;
        const map = new maps.Map(container.current, {
          center: { lat: data[0].latitude, lng: data[0].longitude },
          zoom: 12,
          clickableIcons: false,
          mapTypeControl: false,
          streetViewControl: false,
          gestureHandling: "cooperative",
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        });
        const bounds = new maps.LatLngBounds();
        data.forEach((s) => {
          const position = { lat: s.latitude, lng: s.longitude };
          bounds.extend(position);
          const m = new maps.Marker({
            map,
            position,
            title: s.name,
            icon: {
              path: maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: color,
              fillOpacity: 1,
              strokeColor: "#0b0d12",
              strokeWeight: 2,
            },
          });
          m.addListener("click", () => setSelectedId(s.id));
          markers.push(m);
        });
        if (data.length > 1) map.fitBounds(bounds, 40);
        setMapState("ready");
      })
      .catch(() => !disposed && setMapState("error"));
    return () => {
      disposed = true;
      markers.forEach((m) => m.setMap(null));
    };
  }, [data, color]);

  const url = selected ? serviceDirectionsUrl(selected) : null;

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center gap-3">
        <img src={fuelImg} alt="" width={816} height={816} loading="lazy" className="h-10 w-10 object-contain" />
        <div>
          <h2 className="font-display text-xl font-semibold">{t("fuel.title")}</h2>
          <p className="text-xs text-muted-foreground">{t("fuel.subtitle")}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2" role="tablist">
        {TYPES.map((x) => (
          <button
            key={x.id}
            role="tab"
            aria-selected={type === x.id}
            onClick={() => {
              setType(x.id);
              setSelectedId(undefined);
            }}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition sm:text-sm ${
              type === x.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:bg-secondary"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: x.color }} />
            {t(x.key)}
          </button>
        ))}
      </div>
      <div className="relative mt-3 h-80 overflow-hidden rounded-2xl border border-border bg-secondary sm:h-96">
        <div ref={container} className="h-full w-full" aria-label={t("fuel.title")} />
        {(mapState !== "ready" || isLoading || isError || !data.length) && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary px-6 text-center text-sm text-muted-foreground"
          >
            <MapPin className="h-7 w-7 text-primary" />
            {isError
              ? t("fuel.error")
              : !isLoading && !data.length
                ? t("fuel.empty")
                : mapState === "error"
                  ? t("svc.mapError")
                  : t("svc.mapLoading")}
          </div>
        )}
      </div>
      {selected && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="min-w-0">
            <p className="truncate font-semibold">{selected.name}</p>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{selected.address}</p>
            {selected.rating && (
              <p className="mt-1 flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                {selected.rating}
                <span className="text-muted-foreground">({selected.reviewCount})</span>
              </p>
            )}
          </div>
          {url && (
            <Button asChild className="shrink-0">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <Navigation />
                {t("svc.directions")}
              </a>
            </Button>
          )}
        </div>
      )}
      {data.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {data.slice(0, 10).map((s) => (
            <Button
              key={s.id}
              size="sm"
              variant={s.id === selected?.id ? "default" : "secondary"}
              onClick={() => setSelectedId(s.id)}
              className="shrink-0"
            >
              {s.name}
            </Button>
          ))}
        </div>
      )}
      <p className="mt-2 text-[11px] text-muted-foreground">{t("fuel.source")}</p>
    </section>
  );
}
