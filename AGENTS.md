# Project Architecture

- Keep home-screen installation manifest-only unless offline use is explicitly requested, preventing stale preview and deployment caches.
- Store each supported vehicle's complete technical imagery as a per-model `PartImageMap`, keeping the interactive viewer model-driven.