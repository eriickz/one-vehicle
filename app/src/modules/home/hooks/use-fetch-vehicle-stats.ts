import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { Vehicle } from "@/src/modules/garage/types";
import { getActiveVehicle, getVehicleMetrics } from "../services";
import { VehicleMetrics } from "../types";

export function useFetchVehicleStats() {
  const toast = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [metrics, setMetrics] = useState<VehicleMetrics | null>(null);
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
        const activeVehicle = await getActiveVehicle();
        const currentVehicle = activeVehicle.data?.id
          ? activeVehicle.data
          : null;

        if (cancelled) {
          return;
        }

        setVehicle(currentVehicle);

        if (!currentVehicle) {
          setMetrics(null);
          return;
        }

        const vehicleMetrics = await getVehicleMetrics(currentVehicle.id);

        if (!cancelled) {
          setMetrics(vehicleMetrics.data ?? null);
        }
      } catch (e) {
        if (!cancelled) {
          setVehicle(null);
          setMetrics(null);
          showToast(
            toast,
            "error",
            "Could not load vehicle data",
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

  return { vehicle, metrics, loading, setReload };
}
