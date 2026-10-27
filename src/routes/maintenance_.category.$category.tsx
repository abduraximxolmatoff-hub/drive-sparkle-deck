import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLanguage } from "@/i18n/LanguageContext";
import { findCategory, filterProviders, type ProviderFilters } from "@/data/services";
import { ServiceMap } from '@/components/services/ServiceMap';
import {
  ServiceShell,
  ServiceLocation,
  ServiceSearch,
  ServiceProviderCard,
  ServiceEmpty,
  SampleNotice,
  FilterBar,
  BackLink,
  serviceHead,
} from "@/components/services/ServiceUI";
export const Route = createFileRoute("/maintenance_/category/$category")({
  loader: ({ params }) => {
    const category = findCategory(params.category);
    if (!category) throw notFound();
    return category;
  },
  head: ({ loaderData }) =>
    serviceHead(
      `${loaderData?.name.uz ?? "Xizmat"} — AutoINFO`,
      loaderData?.description.uz ?? "AutoINFO avtomobil xizmatlari.",
    ),
  component: ServiceDetail,
});
function ServiceDetail() {
  const category = Route.useLoaderData();
  const { t, lang } = useLanguage();
  const [filters, setFilters] = useState<ProviderFilters>({ query: "", sort: "nearest" });
  const providers = filterProviders({ ...filters, category: category.id });
  return (
    <ServiceShell>
      <BackLink />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">{category.name[lang]}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{category.description[lang]}</p>
        </div>
        <ServiceLocation />
      </div>
      <div className="mt-6">
        <ServiceSearch
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
        />
      </div>
      <FilterBar value={filters} onChange={setFilters} />
      <div className="flex items-center justify-between border-t border-border pt-5">
        <h2 className="font-semibold">{t("svc.nearby")}</h2>
        <span className="text-sm text-muted-foreground">
          {providers.length} {t("svc.results")}
        </span>
      </div>
      <SampleNotice />
      <ServiceMap providers={providers} />
      <div className="grid gap-3 lg:grid-cols-2">
        {providers.map((p) => (
          <ServiceProviderCard key={p.id} provider={p} />
        ))}
      </div>
      {!providers.length && (
        <ServiceEmpty reset={() => setFilters({ query: "", sort: "nearest" })} />
      )}
    </ServiceShell>
  );
}
