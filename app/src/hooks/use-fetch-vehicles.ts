import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { getVehicleList } from "@/src/modules/garage/services";
import { Vehicle } from "@/src/modules/garage/types";

export function useFetchVehicles() {
  const toast = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
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
        const res = await getVehicleList();

        if (!cancelled) {
          setVehicles(res.data ?? []);
        }
      } catch (e) {
        if (!cancelled) {
          setVehicles([]);
          showToast(
            toast,
            "error",
            "Could not load vehicles",
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

  return { vehicles, loading, setReload };
}
