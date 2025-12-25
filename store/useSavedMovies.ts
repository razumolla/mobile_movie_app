import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "@saved_movies_v1";

export function useSavedMovies() {
  const [saved, setSaved] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const savedIds = useMemo(() => new Set(saved.map((m) => m.id)), [saved]);

  const loadSaved = async () => {
    try {
      setLoading(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (!raw) return setSaved([]);
      const parsed = JSON.parse(raw) as Movie[];
      setSaved(parsed ?? []);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (next: Movie[]) => {
    setSaved(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const isSaved = (movieId: number) => savedIds.has(movieId);

  const add = async (movie: Movie) => {
    if (isSaved(movie.id)) return;
    await persist([movie, ...saved]);
  };

  const remove = async (movieId: number) => {
    await persist(saved.filter((m) => m.id !== movieId));
  };

  const toggle = async (movie: Movie) => {
    if (isSaved(movie.id)) return remove(movie.id);
    return add(movie);
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setSaved([]);
  };

  useEffect(() => {
    loadSaved();
  }, []);

  return { saved, loading, loadSaved, add, remove, toggle, isSaved, clearAll };
}
