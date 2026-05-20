import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { ServiceSchedule } from "@/components/ServiceSchedule";

interface Props {
  brandAccent: string;
}

export function CobaltRegulationSummary({ brandAccent }: Props) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <section className="mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md sm:p-6"
        style={{ borderColor: `${brandAccent}33` }}
      >
        <header className="mb-4">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: brandAccent }}
          >
            Chevrolet Cobalt 1.5L
          </p>
          <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
            {t("cobalt.reg.title")}
          </h2>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                style={{
                  background: `${brandAccent}22`,
                  color: brandAccent,
                }}
              >
                I
              </span>
              <p className="text-sm font-semibold">{t("cobalt.reg.iTitle")}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {t("cobalt.reg.iDesc")}
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold"
                style={{
                  background: brandAccent,
                  color: "oklch(0.13 0.01 250)",
                  boxShadow: `0 0 14px -2px ${brandAccent}aa`,
                }}
              >
                R
              </span>
              <p className="text-sm font-semibold">{t("cobalt.reg.rTitle")}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {t("cobalt.reg.rDesc")}
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          style={{
            borderColor: `${brandAccent}66`,
            color: brandAccent,
            background: `${brandAccent}14`,
          }}
        >
          <span>{open ? t("cobalt.reg.hide") : t("cobalt.reg.view")}</span>
          <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ServiceSchedule brandAccent={brandAccent} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
