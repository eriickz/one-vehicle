import { useEffect, useState } from "react";
import { Category } from "@/types";
import { getCategoryList } from "../services";

export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await getCategoryList();

        if (!cancelled) {
          setCategories(res.data ?? []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setCategories([]);
          setError(e instanceof Error ? e.message : "Could not load categories");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function refetch() {
    setLoading(true);
    setError(null);

    try {
      const res = await getCategoryList();
      setCategories(res.data ?? []);
    } catch (e) {
      setCategories([]);
      setError(e instanceof Error ? e.message : "Could not load categories");
    } finally {
      setLoading(false);
    }
  }

  return { categories, loading, error, refetch };
}
