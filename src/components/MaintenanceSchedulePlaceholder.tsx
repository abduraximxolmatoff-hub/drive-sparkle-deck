import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  brandAccent: string;
}

const INTERVALS = ["5 000", "10 000", "15 000", "30 000", "60 000"];

export function MaintenanceSchedulePlaceholder({ brandAccent }: Props) {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 rounded-2xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md sm:p-6"
      style={{ borderColor: `${brandAccent}40` }}
    >
      <header className="mb-4">
        <h2
          className="font-display text-xl font-semibold sm:text-2xl"
          style={{ color: brandAccent }}
        >
          {t("maint.title")}
        </h2>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {t("maint.subtitle")}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {INTERVALS.map((km, i) => (
          <motion.div
            key={km}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07 }}
            className="rounded-xl border border-border/70 bg-background/40 p-4 backdrop-blur-sm"
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: brandAccent }}
            >
              {t("maint.every")} {km} km
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {t("maint.placeholder")}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
