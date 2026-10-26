# Project Architecture

- Keep home-screen installation manifest-only unless offline use is explicitly requested, preventing stale preview and deployment caches.
- Store each supported vehicle's complete technical imagery as a per-model `PartImageMap`, keeping the interactive viewer model-driven.- Push notifications use a push-only `public/sw.js` (no caching) plus VAPID web push sent from the daily `/api/public/hooks/send-reminders` route, so reminders work without a third-party push account.
- Reminder intervals come from each model's part data via `resolveInterval`, falling back to general defaults, so per-model data stays the single source.

- Service directory data and filters live in a browser-safe data module with reusable UI and unnested category/provider routes, preserving the existing maintenance page and enabling future provider data replacement.
- Service translations extend the existing language context through a separate dictionary, keeping the current language choice and unrelated translations unchanged.
