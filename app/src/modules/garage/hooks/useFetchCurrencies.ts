import { useEffect, useState } from "react";
import { Currency } from "@/types";
import { getCurrencyList } from "../services";

export function useFetchCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await getCurrencyList();

        if (!cancelled) {
          setCurrencies(res.data ?? []);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setCurrencies([]);
          setError(e instanceof Error ? e.message : "Could not load currencies");
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

  return {
    currencies: currencies.filter((currency) => currency.active),
    loading,
    error,
  };
}
