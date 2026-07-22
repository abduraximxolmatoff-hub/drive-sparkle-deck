import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "autoinfo.favorites";

/**
 * Shared favorites store backed by localStorage. Used on the profile page
 * (to list favorites) and on model detail pages (to toggle the heart button).
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch (err) {
      console.warn("Could not load favorites from storage:", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.warn("Could not save favorites to storage:", err);
    }
  }, [favorites]);

  const isFavorite = useCallback((key: string) => favorites.includes(key), [favorites]);

  const toggleFavorite = useCallback((key: string) => {
    setFavorites((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }, []);

  return { favorites, isFavorite, toggleFavorite };
}
