import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { Currency } from "@/types";
import { getCurrencyList } from "@/src/modules/garage/services";

export function useFetchCurrencies() {
  const toast = useToast();
  const [currencies, setCurrencies] = useState<Currency[]>([]);
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
        const res = await getCurrencyList();

        if (!cancelled) {
          setCurrencies(res.data ?? []);
        }
      } catch (e) {
        if (!cancelled) {
          setCurrencies([]);
          showToast(
            toast,
            "error",
            "Could not load currencies",
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

  return {
    currencies: currencies.filter((currency) => currency.active),
    loading,
    setReload,
  };
}
