import { useEffect, useState } from "react";
import { getVehicleList } from "../services";
import { Vehicle } from "../types";

export function useFetchVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await getVehicleList();

        if (!cancelled) {
          setVehicles(res.data ?? []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setVehicles([]);
          setError(e instanceof Error ? e.message : "Could not load vehicles");
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
      const res = await getVehicleList();
      setVehicles(res.data ?? []);
    } catch (e) {
      setVehicles([]);
      setError(e instanceof Error ? e.message : "Could not load vehicles");
    } finally {
      setLoading(false);
    }
  }

  return { vehicles, loading, error, refetch };
}
