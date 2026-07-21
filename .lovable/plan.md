# Standardize Chevrolet Model Detail Pages

Turn every Chevrolet model page (Cobalt, Gentra, Tracker, Trailblazer, Tahoe, Traverse, Equinox, Malibu) into the same interactive experience as Cobalt — model-specific images, colors, markers, and content — using one reusable, data-driven architecture.

## Scope

### 1. Data architecture (one source of truth)
Create `src/data/chevroletModels.ts` with an entry per model:
- `slug`, `name`, `bodyColor`, `mainImage`, `fullCarImage`
- `partImages` map for all 12 parts (tires, windows, oil, engine, battery, brakes, headlights, cooling, airfilter, suspension, fuel_filter, cabin_filter)
- `markers` per part (x, y, size %)
- `maintenance`: same shape as `CobaltPartInfo`, per part, per language, with an `isRegulationBased` flag (true only for Cobalt today; other models labeled "General recommendation" / "Umumiy tavsiya" / "Общая рекомендация")
- `partFallbacks` for graceful degradation

Cobalt keeps its regulation-based content already in `cobaltPartInfo.ts` — migrated into this structure.

### 2. Reusable components (replace Cobalt-only versions)
- `ModelPartsSidebar` — 12 parts, translated, active state
- `InteractiveCarViewer` — accepts `partImage`, `marker`, `bodyAccent` (already exists; small tweaks to always take image from props)
- `PartDetailsPanel` — generic version of `CobaltPartInfoPanel`, driven by model + part; shows model name in header (not hardcoded "Chevrolet Cobalt 1.5L"); shows "Regulation-based" only when `isRegulationBased`, else "General recommendation"
- `PartVisualPreview` — the top image card (rename of `CobaltSectionPreview`)
- `ServiceTimeline`, `MaintenanceInfoCards` — kept simple, share tire timeline UI where applicable

Delete/deprecate `CobaltPartInfoPanel`, `CobaltTirePanel`, `CobaltSectionPreview` after migration; keep the tire panel's rich UI as an optional variant driven by data (`part.hasRichTireView: true`).

### 3. Model detail route
Refactor `src/routes/$brand.$model.tsx`:
- Look up model in `chevroletModels` when brand is chevrolet, fall back to existing brand data for others
- Single state: `selectedPart` (default `"tires"`)
- `useEffect(() => { setSelectedPart("tires"); resetViewer(); }, [model.slug])` — full state reset on model change
- Header shows the current model's name (fixes "still says Cobalt" bug)
- Single visual + single info panel (fixes duplicated tire image)
- Fallback chain: partImage → model.partFallbacks → model.mainImage (never Cobalt)

### 4. Model-specific imagery
Generate one clean studio image per (model, part) at premium quality, matching each model's body color:
- Cobalt (white), Gentra (silver), Tracker (black), Trailblazer (black), Tahoe (black), Traverse (black), Equinox (white), Malibu (black)
- 10 primary parts × 8 models = 80 images. For fuel_filter and cabin_filter, reuse the existing generic maintenance-preview images (already model-agnostic technical illustrations), so 80 new images total.
- All generated via `imagegen` at `standard` quality, stored under `src/assets/chev/<model>/<part>.jpg`.

This is the largest single cost/time item. To keep it tractable, I'll batch generate in parallel and save as JPGs.

### 5. Maintenance content per model
- Cobalt: keep existing regulation-based content (10 parts covered).
- Other 7 models: generic content structured identically (function, inspection, replacement, heavy usage, warnings, tips, intervals) labeled "General recommendation." Content is model-type-aware (SUVs get different tire pressure ranges, oil intervals, etc.) but shares one template per body type (compact sedan, midsize sedan, compact SUV, midsize SUV, full-size SUV).

### 6. Bug fixes covered
- Wrong-model image on part click → dynamic per-model asset map
- Header still saying "Cobalt" → header reads from current model
- Duplicated tire image → single `PartVisualPreview` at top, no double render
- State bleed across model switch → reset effect on `model.slug`
- Fallback to Cobalt → fallback chain never crosses model boundary
- Routes already resolve model-by-slug via `getBrandModel`; not-found handled

### 7. Out of scope (this pass)
- Non-Chevrolet brands stay on the existing simpler viewer.
- Real 360° image arrays (structure already exists, still empty).
- New translations UI beyond what's needed for the 12 parts × 3 languages.

## Technical notes
- All new files typed, no `any`.
- Data file kept flat and JSON-serializable for future SSR/loader use.
- Image generation batched in parallel exec calls (8-way) to keep total wall time manageable — still expect ~5–10 min of generation time.

## Deliverables
- `src/data/chevroletModels.ts` (new)
- `src/data/chevroletMaintenance.ts` (new — shared content templates)
- `src/components/model-detail/ModelPartsSidebar.tsx`
- `src/components/model-detail/PartDetailsPanel.tsx`
- `src/components/model-detail/PartVisualPreview.tsx`
- Refactored `src/routes/$brand.$model.tsx`
- `src/assets/chev/<model>/*.jpg` (80 new images)
- Removed: Cobalt-only panel components after migration
