# Project Architecture

- Keep home-screen installation manifest-only unless offline use is explicitly requested, preventing stale preview and deployment caches.
- Store each supported vehicle's complete technical imagery as a per-model `PartImageMap`, keeping the interactive viewer model-driven.- Push notifications use a push-only `public/sw.js` (no caching) plus VAPID web push sent from the daily `/api/public/hooks/send-reminders` route, so reminders work without a third-party push account.
- Reminder intervals come from each model's part data via `resolveInterval`, falling back to general defaults, so per-model data stays the single source.
