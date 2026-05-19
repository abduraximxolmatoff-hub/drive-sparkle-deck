import { motion } from "framer-motion";
import {
  COBALT_INTERVALS_KM,
  COBALT_INTERVALS_MONTHS,
  COBALT_SCHEDULE,
  type Action,
} from "@/data/serviceSchedule";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  brandAccent: string;
}

function ActionCell({ action, accent }: { action: Action; accent: string }) {
  if (action === "—")
    return <span className="text-foreground/20">·</span>;

  const isReplace = action === "R";
  return (
    <span
      className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold"
      style={{
        background: isReplace ? accent : `${accent}22`,
        color: isReplace ? "oklch(0.13 0.01 250)" : accent,
        boxShadow: isReplace ? `0 0 14px -2px ${accent}aa` : undefined,
      }}
      title={action}
    >
      {action}
    </span>
  );
}

/** Official Cobalt maintenance schedule rendered as a premium dark table. */
export function ServiceSchedule({ brandAccent }: Props) {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-10 overflow-hidden rounded-3xl border border-border bg-card-gradient shadow-card backdrop-blur-md"
      style={{ borderColor: `${brandAccent}33` }}
    >
      <header
        className="flex flex-wrap items-end justify-between gap-3 border-b border-border/70 px-5 py-4 sm:px-7 sm:py-5"
        style={{ borderColor: `${brandAccent}22` }}
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: brandAccent }}
          >
            {t("sched.subtitle")}
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {t("sched.title")}
          </h2>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ActionCell action="I" accent={brandAccent} />
            {t("sched.legend.I")}
          </span>
          <span className="flex items-center gap-1.5">
            <ActionCell action="R" accent={brandAccent} />
            {t("sched.legend.R")}
          </span>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-xs">
          <thead>
            <tr className="bg-background/40 text-foreground/80">
              <th className="sticky left-0 z-10 min-w-[220px] bg-background/80 px-4 py-3 text-left font-semibold uppercase tracking-wider backdrop-blur-md">
                {t("sched.km")} / {t("sched.months")}
              </th>
              {COBALT_INTERVALS_KM.map((km, i) => (
                <th
                  key={km}
                  className="border-l border-border/40 px-2 py-3 text-center font-semibold"
                >
                  <div className="text-[11px]" style={{ color: brandAccent }}>
                    {km}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {COBALT_INTERVALS_MONTHS[i]}m
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COBALT_SCHEDULE.map((item, rowIdx) => (
              <tr
                key={item.labelKey}
                className={`border-t border-border/40 transition-colors hover:bg-background/30 ${
                  rowIdx % 2 ? "bg-background/10" : ""
                }`}
              >
                <td className="sticky left-0 z-10 bg-background/80 px-4 py-2.5 text-left text-[12px] font-medium text-foreground/90 backdrop-blur-md">
                  <div>{t(item.labelKey)}</div>
                  {item.notes && (
                    <div className="text-[10px] text-muted-foreground">
                      {item.notes}
                    </div>
                  )}
                </td>
                {item.actions.map((action, i) => (
                  <td
                    key={i}
                    className="border-l border-border/30 px-1.5 py-2.5 text-center"
                  >
                    <ActionCell action={action} accent={brandAccent} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
