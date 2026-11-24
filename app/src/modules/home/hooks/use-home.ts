import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import { BottomSheetRef } from "@/components/ui/bottomsheet";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { useFetchVehicles } from "@/src/hooks/use-fetch-vehicles";
import { setCurrentVehicle } from "@/src/modules/garage/services";
import { useFetchVehicleStats } from "./use-fetch-vehicle-stats";

export function useHome() {
  const router = useRouter();
  const toast = useToast();
  const switchVehicleSheetRef = useRef<BottomSheetRef>(null);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  const {
    vehicle,
    metrics,
    loading,
    setReload: setStatsReload,
  } = useFetchVehicleStats();

  const { vehicles, setReload: setVehiclesReload } = useFetchVehicles();

  async function handleSelectVehicle(id: string) {
    if (selectingId) {
      return;
    }

    if (id === vehicle?.id) {
      switchVehicleSheetRef.current?.close();
      return;
    }

    setSelectingId(id);

    try {
      await setCurrentVehicle(id);
      switchVehicleSheetRef.current?.close();
      setStatsReload(true);
      setVehiclesReload(true);
    } catch (e) {
      showToast(
        toast,
        "error",
        "Could not switch vehicle",
        e instanceof Error ? e.message : "Please try again.",
      );
    } finally {
      setSelectingId(null);
    }
  }

  function openSwitchVehicleSheet() {
    setVehiclesReload(true);
    switchVehicleSheetRef.current?.open();
  }

  function goToAddVehicle() {
    router.navigate("/(tabs)/garage/new");
  }

  function goToNewLog() {
    router.navigate("/(tabs)/new-log");
  }

  const currencySymbol = vehicle?.currency?.symbol ?? "$";
  const currencyCode = vehicle?.currency?.code ?? "USD";
  const totalExpenses = Number(metrics?.totalExpenses ?? 0);
  const totalLogsCount = metrics?.totalLogsCount ?? 0;
  const hasHistory = totalLogsCount > 0;

  const vehicleLabel = vehicle
    ? `${vehicle.make} ${vehicle.model} · ${vehicle.year}`
    : loading
      ? "Loading vehicle..."
      : "No vehicle selected";

  return {
    switchVehicleSheetRef,
    vehicle,
    vehicles,
    loading,
    selectingId,
    hasHistory,
    vehicleLabel,
    currentMileageLabel: `${metrics?.currentMileage.toLocaleString() ?? 0} mi`,
    initialMileageLabel: `${vehicle?.initialMileage.toLocaleString() ?? 0} mi`,
    totalExpensesLabel: `${currencySymbol}${totalExpenses.toFixed(2)}`,
    totalLogsLabel: `${currencyCode} · ${totalLogsCount} logs`,
    logButtonLabel: hasHistory ? "Log Service" : "Log First Service",
    handleSelectVehicle,
    openSwitchVehicleSheet,
    goToAddVehicle,
    goToNewLog,
  };
}
