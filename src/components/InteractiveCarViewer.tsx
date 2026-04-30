import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { DEFAULT_MARKERS, type CarModel } from "@/data/brands";

interface InteractiveCarViewerProps {
  model: CarModel;
  brandAccent: string;
  /** Currently selected part id (e.g. "tires", "oil"). Null = full car view. */
  selectedPartId: string | null;
  /** Optional callback invoked when the user clicks the in-viewer reset button. */
  onResetView?: () => void;
}

const MAX_YAW = 180; // degrees of horizontal rotation each direction
const MAX_PITCH = 18; // degrees of vertical tilt each direction
const STEP = 30; // degrees per arrow click

export function InteractiveCarViewer({
  model,
  brandAccent,
  selectedPartId,
  onResetView,
}: InteractiveCarViewerProps) {
  const { t } = useLanguage();
  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Reset rotation whenever a part is selected (so the user sees the correct view).
  useEffect(() => {
    if (selectedPartId) {
      setYaw(0);
      setPitch(0);
    }
  }, [selectedPartId]);

  const clampYaw = (v: number) => Math.max(-MAX_YAW, Math.min(MAX_YAW, v));
  const clampPitch = (v: number) => Math.max(-MAX_PITCH, Math.min(MAX_PITCH, v));

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (selectedPartId) return; // disable drag while zoomed into a part
      (e.target as Element).setPointerCapture?.(e.pointerId);
      dragRef.current = { x: e.clientX, y: e.clientY, yaw, pitch };
      setIsDragging(true);
    },
    [yaw, pitch, selectedPartId],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setYaw(clampYaw(dragRef.current.yaw + dx * 0.5));
    setPitch(clampPitch(dragRef.current.pitch - dy * 0.2));
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  const reset = () => {
    setYaw(0);
    setPitch(0);
    onResetView?.();
  };

  // Determine which image to show.
  const partImage = selectedPartId ? model.partImages?.[selectedPartId] : undefined;
  const usingPartImage = Boolean(partImage);
  const displayedImage = partImage ?? model.image;

  // Marker for the selected part — only show on the main image (when no dedicated partImage).
  const marker =
    selectedPartId && !usingPartImage
      ? model.markers?.[selectedPartId] ?? DEFAULT_MARKERS[selectedPartId]
      : null;

  const showsControls = !selectedPartId;

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card-gradient shadow-card backdrop-blur-md"
      style={{
        background: `radial-gradient(ellipse at center, ${brandAccent}1a, transparent 70%), var(--gradient-card)`,
        perspective: "1400px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${brandAccent}22, transparent 60%)`,
        }}
      />

      {/* Drag surface + 3D transformed image */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`absolute inset-0 ${
          selectedPartId ? "" : isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ touchAction: "none" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${model.slug}-${selectedPartId ?? "main"}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95, x: usingPartImage ? 0 : 200 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.img
              src={displayedImage}
              alt={model.name}
              className="h-full w-full object-cover select-none pointer-events-none"
              draggable={false}
              animate={
                selectedPartId
                  ? { rotateX: 0, rotateY: 0, scale: usingPartImage ? 1 : 1.6 }
                  : { rotateX: pitch, rotateY: yaw, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{
                transformOrigin:
                  selectedPartId && !usingPartImage && marker
                    ? `${marker.x}% ${marker.y}%`
                    : "center",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Glowing marker (only when zoomed into the main image, not a part image) */}
        <AnimatePresence>
          {marker && (
            <motion.div
              key={`marker-${selectedPartId}`}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="pointer-events-none absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: `${marker.size * 1.6}%`,
                aspectRatio: "1",
              }}
            >
              <div
                className="absolute inset-0 animate-ping rounded-full opacity-50"
                style={{
                  background: `radial-gradient(circle, ${brandAccent}aa, transparent 60%)`,
                }}
              />
              <div
                className="absolute inset-[18%] rounded-full border-2"
                style={{
                  borderColor: brandAccent,
                  boxShadow: `0 0 32px ${brandAccent}, inset 0 0 22px ${brandAccent}66`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marker on dedicated part image (small pulse circle in the center) */}
        <AnimatePresence>
          {usingPartImage && (
            <motion.div
              key={`part-pulse-${selectedPartId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-32 sm:w-32"
            >
              <div
                className="absolute inset-0 animate-ping rounded-full opacity-40"
                style={{
                  background: `radial-gradient(circle, ${brandAccent}aa, transparent 60%)`,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 360° badge */}
      {showsControls && (
        <div
          className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md sm:left-4 sm:top-4"
          style={{ color: brandAccent, borderColor: `${brandAccent}66` }}
        >
          <span className="text-[11px]">⟳</span>
          <span>{t("viewer.360")}</span>
        </div>
      )}

      {/* Drag hint */}
      {showsControls && yaw === 0 && pitch === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.4 }}
          className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:bottom-20"
        >
          {t("viewer.dragHint")}
        </motion.p>
      )}

      {/* Arrow controls */}
      {showsControls && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background/60 p-1 backdrop-blur-md sm:bottom-4">
          <ArrowBtn label="↑" onClick={() => setPitch((p) => clampPitch(p + STEP / 3))} />
          <ArrowBtn label="←" onClick={() => setYaw((y) => clampYaw(y - STEP))} />
          <button
            onClick={reset}
            className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/80 transition hover:bg-foreground/10"
            aria-label={t("viewer.reset")}
          >
            ⟲
          </button>
          <ArrowBtn label="→" onClick={() => setYaw((y) => clampYaw(y + STEP))} />
          <ArrowBtn label="↓" onClick={() => setPitch((p) => clampPitch(p - STEP / 3))} />
        </div>
      )}

      {/* Reset button when zoomed into a part */}
      {selectedPartId && (
        <button
          onClick={reset}
          className="absolute right-3 top-3 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md transition hover:bg-background sm:right-4 sm:top-4"
          style={{ color: brandAccent, borderColor: `${brandAccent}66` }}
        >
          ⟲ {t("viewer.reset")}
        </button>
      )}
    </div>
  );
}

function ArrowBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-full text-sm text-foreground/80 transition hover:bg-foreground/10"
      aria-label={label}
    >
      {label}
    </button>
  );
}
