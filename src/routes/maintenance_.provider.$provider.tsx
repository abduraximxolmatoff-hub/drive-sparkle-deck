import { useEffect, useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Phone, Navigation, Star, MapPin, Clock, ArrowUpRight, Check, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useLanguage } from "@/i18n/LanguageContext";
import { serviceProviders, findCategory } from "@/data/services";
import { ServiceMap, ServiceDirectionsButton } from '@/components/services/ServiceMap';
import { ServiceShell, BackLink, SampleNotice, serviceHead } from "@/components/services/ServiceUI";
export const Route = createFileRoute("/maintenance_/provider/$provider")({
  loader: ({ params }) => {
    const provider = serviceProviders.find((p) => p.id === params.provider);
    if (!provider) throw notFound();
    return provider;
  },
  head: ({ loaderData }) =>
    serviceHead(
      `${loaderData?.name ?? "Servis"} — AutoINFO`,
      "Servis xizmatlari, ish vaqti va aloqa ma’lumotlari.",
      loaderData?.coverImage,
    ),
  component: ServiceProviderDetail,
});
function ServiceProviderDetail() {
  const p = Route.useLoaderData();
  const { t, lang } = useLanguage();
  const [rateOpen, setRateOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [saved, setSaved] = useState(0);
  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(`autoinfo.serviceRating.${p.id}`));
      setSaved(n >= 1 && n <= 5 ? n : 0);
    } catch {}
  }, [p.id]);
  const demo = () => toast.info(t("svc.demoAction"));
  return (
    <ServiceShell>
      <BackLink category={p.category[0]} />
      <section className="relative -mx-4 overflow-hidden sm:mx-0 sm:rounded-2xl">
        <img
          src={p.coverImage}
          alt={p.name}
          width={1536}
          height={1024}
          className="aspect-[16/9] max-h-96 w-full object-cover"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-background/85 px-3 py-1 text-xs backdrop-blur">
          {t(p.isOpen ? "svc.open" : "svc.closed")} · {p.workingHours}
        </span>
      </section>
      <section className="mt-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 font-display text-xl font-bold text-primary">
            {p.logo}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">{p.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {p.category
                .slice(0, 2)
                .map((id) => findCategory(id)?.name[lang])
                .join(" • ")}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              {p.rating}
              <span className="text-muted-foreground">
                ({p.reviewCount}) · {p.distance} km
              </span>
            </p>
          </div>
        </div>
        <SampleNotice />
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <Button onClick={demo} className="h-11">
            <Phone />
            {t("svc.call")}
          </Button>
          <ServiceDirectionsButton provider={p} />
          <Button
            onClick={() => {
              setRating(saved);
              setRateOpen(true);
            }}
            variant="outline"
            className="col-span-2 h-11 sm:col-span-1"
          >
            <Star />
            {t("svc.rate")}
            {saved > 0 ? ` · ${saved}` : ""}
          </Button>
        </div>
      </section>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <section>
            <h2 className="font-display text-xl font-semibold">{t("svc.services")}</h2>
            <div className="mt-4 divide-y divide-border border-y border-border">
              {p.services.map((id) => (
                <div key={id} className="flex items-center justify-between gap-4 py-4">
                  <span className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {findCategory(id)?.name[lang]}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("svc.price")}:{" "}
              <span className="text-foreground">
                {p.priceRange.min.toLocaleString()} – {p.priceRange.max.toLocaleString()}{" "}
                {t("svc.currency")}
              </span>
            </p>
          </section>
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">{t("svc.photos")}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {p.photos.map((src, i) => (
                <a key={src} href={src} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={`${p.name} ${i + 1}`}
                    loading="lazy"
                    width={1536}
                    height={1024}
                    className="aspect-[4/3] w-full rounded-xl object-cover transition hover:opacity-80"
                  />
                </a>
              ))}
            </div>
          </section>
          <section className="mt-8 border-t border-border pt-6">
            <h2 className="font-display text-xl font-semibold">{t("svc.reviews")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("svc.noReviews")}</p>
          </section>
        </div>
        <aside>
          <div className="space-y-5 border-y border-border py-5">
            {[
              { icon: MapPin, title: t("svc.address"), value: p.address[lang] },
              { icon: Clock, title: t("svc.hours"), value: p.workingHours },
              { icon: Phone, title: t("svc.phone"), value: p.phone ?? t("svc.unavailable") },
            ].map(({ icon: Icon, title, value }) => (
              <div key={title} className="flex gap-3">
                <Icon className="mt-1 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{title}</p>
                  <p className="mt-1 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="mt-7 font-display text-xl font-semibold">{t("svc.map")}</h2>
          <ServiceMap providers={[p]} />
        </aside>
      </div>
      <Dialog open={rateOpen} onOpenChange={setRateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("svc.rateTitle")}</DialogTitle>
            <DialogDescription>{t("svc.rateNote")}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center gap-2 py-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <Button
                key={n}
                variant="ghost"
                size="icon"
                aria-label={`${n} ${t("svc.rating")}`}
                onClick={() => setRating(n)}
              >
                <Star
                  className={n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}
                />
              </Button>
            ))}
          </div>
          <Button
            disabled={!rating}
            onClick={() => {
              try {
                localStorage.setItem(`autoinfo.serviceRating.${p.id}`, String(rating));
                setSaved(rating);
                setRateOpen(false);
                toast.success(t("svc.saved"));
              } catch {
                toast.error(t("svc.unavailable"));
              }
            }}
          >
            {t("svc.save")}
          </Button>
        </DialogContent>
      </Dialog>
    </ServiceShell>
  );
}
