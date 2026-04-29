import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { getBrand, type Brand } from "@/data/brands";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AutoInfoLogo } from "@/components/AutoInfoLogo";

export const Route = createFileRoute("/brand/$slug")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.brand.name ?? "Brand"} Models — AutoINFO` },
      {
        name: "description",
        content: loaderData
          ? `Explore ${loaderData.brand.name} models. ${loaderData.brand.tagline}.`
          : "Brand models",
      },
      {
        property: "og:title",
        content: `${loaderData?.brand.name ?? "Brand"} Models — AutoINFO`,
      },
      {
        property: "og:description",
        content: loaderData?.brand.tagline ?? "",
      },
      {
        property: "og:image",
        content: loaderData?.brand.models[0]?.image ?? "",
      },
    ],
  }),
  component: BrandPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <p className="text-destructive">{error.message}</p>
          <button
            className="mt-4 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Brand not found</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to brands
        </Link>
      </div>
    </div>
  ),
});

function BrandPage() {
  const { brand } = Route.useLoaderData() as { brand: Brand };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-background"
          >
            <motion.img
              src={brand.logo}
              alt=""
              width={128}
              height={128}
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-24 w-24 object-contain"
            />
            <AutoInfoLogo />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          All brands
        </Link>
        <AutoInfoLogo size="sm" />
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loading ? 0 : 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={96}
            height={96}
            className="h-20 w-20 object-contain"
          />
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {brand.name}
          </h1>
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
            {brand.tagline}
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-4xl space-y-5 px-6 pb-24">
        {brand.models.map((model, i) => (
          <motion.article
            key={model.slug}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 40 : 0 }}
            transition={{
              delay: 1.6 + i * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-border bg-card-gradient shadow-card backdrop-blur-md transition-all hover:border-primary/40 hover:shadow-glow sm:flex-row"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-auto sm:h-44 sm:w-1/2">
              <img
                src={model.image}
                alt={model.name}
                width={800}
                height={512}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `linear-gradient(90deg, transparent 40%, ${brand.accent}22)`,
                }}
              />
            </div>
            <div className="flex flex-1 flex-col items-start gap-2 p-6 sm:items-end sm:p-8 sm:text-right">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {brand.name}
              </span>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                {model.name}
              </h2>
              {model.tagline && (
                <p className="text-sm text-muted-foreground">{model.tagline}</p>
              )}
              <span
                className="mt-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary opacity-0 transition-opacity group-hover:opacity-100"
              >
                Coming soon →
              </span>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
