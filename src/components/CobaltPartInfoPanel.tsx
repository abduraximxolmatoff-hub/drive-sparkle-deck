import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { CarPart } from "@/data/carParts";
import { COBALT_PART_INFO, type CobaltPartInfo } from "@/data/cobaltPartInfo";
import { COBALT_PART_PREVIEW_IMAGES } from "@/data/cobaltPartPreviewImages";
import { CobaltSectionPreview } from "@/components/CobaltSectionPreview";

interface Props {
  part: CarPart;
  brandAccent: string;
}
...
      <CobaltSectionPreview
        imageSrc={COBALT_PART_PREVIEW_IMAGES[part.id]}
        title={info.title[lang]}
        brandAccent={brandAccent}
      />

      {/* Function */}
      <p className="mb-4 text-sm leading-relaxed text-foreground/85">
        {info.function[lang]}
      </p>

      {/* Interval chips */}
      {info.intervals && info.intervals.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {info.intervals.map((chip, i) => {
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
                key={i}
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

      {/* Sections grid */}
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


      {/* Summary */}
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
