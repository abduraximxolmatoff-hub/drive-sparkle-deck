import { COBALT_PART_PREVIEW_IMAGES } from "@/data/cobaltPartPreviewImages";

/** Models that already ship a dedicated close-up image for every part in the
 * interactive viewer — the supplemental preview card would duplicate it. */
const MODELS_WITH_FULL_PART_IMAGERY = new Set(["gentra-15l", "gentra", "tracker", "trailblazer", "tahoe", "traverse", "equinox"]);

/** Supplemental preview image for a (model, part) pair, or undefined when the
 * interactive viewer above already shows a dedicated image for that part. */
export function getPartPreviewImage(modelSlug: string, partId: string): string | undefined {
  if (MODELS_WITH_FULL_PART_IMAGERY.has(modelSlug)) return undefined;
  return COBALT_PART_PREVIEW_IMAGES[partId];
}
