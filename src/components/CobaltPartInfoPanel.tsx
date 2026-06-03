import { motion } from "framer-motion";
import { CobaltSectionPreview } from "@/components/CobaltSectionPreview";
import type { CarPart } from "@/data/carParts";
import { COBALT_PART_INFO, type CobaltPartInfo } from "@/data/cobaltPartInfo";
import { COBALT_PART_PREVIEW_IMAGES } from "@/data/cobaltPartPreviewImages";
import { useLanguage } from "@/i18n/LanguageContext";

interface Props {
  part: CarPart;
  brandAccent: string;
}

function Badge({
  kind,
  accent,
  label,
}: {
  kind: "inspect" | "replace" | "heavy" | "safety";
  accent: string;
  label: string;
}) {
  const styles: Record<typeof kind, { bg: string; fg: string; border: string }> = {
    inspect: { bg: `${accent}1f`, fg: accent, border: `${accent}55` },
    replace: { bg: accent, fg: "oklch(0.13 0.01 250)", border: accent },
    heavy: {
      bg: "rgba(239,68,68,0.12)",
      fg: "rgb(248,113,113)",
      border: "rgba(239,68,68,0.4)",
    },
    safety: {
      bg: "rgba(250,204,21,0.12)",
      fg: "rgb(250,204,21)",
      border: "rgba(250,204,21,0.4)",
    },
  };
  const s = styles[kind];

  return (
    <span
      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ background: s.bg, color: s.fg, borderColor: s.border }}
    >
      {label}
    </span>
  );
}

function Section({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <p
        className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
        style={{ color: accent }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-1.5 text-xs leading-relaxed text-foreground/90">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CobaltPartInfoPanel({ part, brandAccent }: Props) {
  const { t, lang } = useLanguage();
  const info: CobaltPartInfo | undefined = COBALT_PART_INFO[part.id];

  if (!info) return null;

  const badgeLabels: Record<"inspect" | "replace" | "heavy" | "safety", string> = {
    inspect: t("cobalt.badge.inspect"),
    replace: t("cobalt.badge.replace"),
    heavy: t("cobalt.badge.heavy"),
    safety: t("cobalt.badge.safety"),
  };

  return (
    <motion.div
      key={part.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="mt-5 overflow-hidden rounded-2xl border border-border bg-card-gradient p-5 shadow-card backdrop-blur-md sm:p-6"
      style={{ borderColor: `${brandAccent}40` }}
    >
      <CobaltSectionPreview
        imageSrc={COBALT_PART_PREVIEW_IMAGES[part.id]}
        title={info.title[lang]}
        brandAccent={brandAccent}
      />

      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl"
            style={{ background: `linear-gradient(135deg, ${brandAccent}44, transparent)` }}
          >
            {part.icon}
          </span>
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: brandAccent }}
            >
              Chevrolet Cobalt 1.5L
            </p>
            <h3 className="font-display text-xl font-semibold sm:text-2xl">{info.title[lang]}</h3>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: `${brandAccent}1a`,
                color: brandAccent,
                borderColor: `${brandAccent}55`,
              }}
            >
              {t("cobalt.regulationBased")}
            </span>
            {info.badges.map((badge) => (
              <Badge key={badge} kind={badge} accent={brandAccent} label={badgeLabels[badge]} />
            ))}
          </div>

          <span
            className="rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground"
            style={{ background: `${brandAccent}0d` }}
            title={t("cobalt.legendTooltip")}
          >
            {t("cobalt.legendCompact")}
          </span>
        </div>
      </div>

      <p className="mb-4 text-sm leading-relaxed text-foreground/85">{info.function[lang]}</p>

      {info.intervals && info.intervals.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {info.intervals.map((chip, index) => {
            const tone = chip.tone ?? "default";
            const toneStyles: Record<string, { bg: string; fg: string; border: string }> = {
              default: {
                bg: "rgba(255,255,255,0.04)",
                fg: "rgb(229,229,229)",
                border: "rgba(255,255,255,0.1)",
              },
              accent: { bg: `${brandAccent}1f`, fg: brandAccent, border: `${brandAccent}55` },
              warn: {
                bg: "rgba(239,68,68,0.1)",
                fg: "rgb(248,113,113)",
                border: "rgba(239,68,68,0.35)",
              },
              safe: {
                bg: "rgba(34,197,94,0.1)",
                fg: "rgb(74,222,128)",
                border: "rgba(34,197,94,0.35)",
              },
            };
            const s = toneStyles[tone];

            return (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] backdrop-blur-sm"
                style={{ background: s.bg, borderColor: s.border }}
              >
                <span className="font-semibold uppercase tracking-wider opacity-70">
                  {chip.label[lang]}
                </span>
                <span className="font-semibold" style={{ color: s.fg }}>
                  {chip.value[lang]}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        <Section title={t("cobalt.section.inspection")} accent={brandAccent}>
          <BulletList items={info.inspection[lang]} accent={brandAccent} />
        </Section>
        <Section title={t("cobalt.section.replacement")} accent={brandAccent}>
          <BulletList items={info.replacement[lang]} accent={brandAccent} />
        </Section>
        <Section title={t("cobalt.section.heavy")} accent={brandAccent}>
          <BulletList items={info.heavyUsage[lang]} accent={brandAccent} />
        </Section>
        <Section title={t("cobalt.section.warnings")} accent={brandAccent}>
          <BulletList items={info.warnings[lang]} accent={brandAccent} />
        </Section>
        {info.usefulTips && (
          <div className="md:col-span-2">
            <Section title={t("cobalt.section.tips")} accent={brandAccent}>
              <BulletList items={info.usefulTips[lang]} accent={brandAccent} />
            </Section>
          </div>
        )}
      </div>

      <div
        className="mt-4 grid gap-2 rounded-xl border p-4 sm:grid-cols-2"
        style={{
          borderColor: `${brandAccent}33`,
          background: `linear-gradient(135deg, ${brandAccent}10, transparent)`,
        }}
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: brandAccent }}
          >
            {t("cobalt.summary.inspection")}
          </p>
          <p className="mt-1 text-xs text-foreground/85">{info.summaryInspection[lang]}</p>
        </div>
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: brandAccent }}
          >
            {t("cobalt.summary.replacement")}
          </p>
          <p className="mt-1 text-xs text-foreground/85">{info.summaryReplacement[lang]}</p>
        </div>
      </div>
    </motion.div>
  );
}
