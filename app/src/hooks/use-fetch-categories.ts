import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { Category } from "@/types";
import { getCategoryList } from "@/src/modules/categories/services";

export function useFetchCategories() {
  const toast = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    if (!reload) {
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const res = await getCategoryList();

        if (!cancelled) {
          setCategories(res.data ?? []);
        }
      } catch (e) {
        if (!cancelled) {
          setCategories([]);
          showToast(
            toast,
            "error",
            "Could not load categories",
            e instanceof Error ? e.message : "Please try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setReload(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [reload]);

  return { categories, loading, setReload };
}
