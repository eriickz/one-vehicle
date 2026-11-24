import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { VehicleFormValues, vehicleSchema } from "../schemas";
import { createVehicle, getVehicle, updateVehicle } from "../services";
import { Vehicle } from "../types";
import { toFormValues } from "../utils/to-form-values";
import { toVehicleInput } from "../utils/to-vehicle-input";
import { useFetchVehicles } from "@/src/hooks/use-fetch-vehicles";

const EMPTY_VALUES: VehicleFormValues = {
  make: "",
  model: "",
  year: "",
  licensePlate: "",
  initialMileage: "",
  currencyId: "1",
};

export function useVehicleForm(
  vehicleId: string,
  onSuccess?: (vehicle: Vehicle) => void,
) {
  const toast = useToast();
  const isEditing = Boolean(vehicleId) && vehicleId !== "new";
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(isEditing);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<VehicleFormValues | null>(
    null,
  );

  const { setReload: setReloadVehicles } = useFetchVehicles();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: yupResolver(vehicleSchema),
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (vehicleId === "new") {
      return;
    }

    getVehicle(vehicleId)
      .then(({ data }) => {
        reset(toFormValues(data));
      })
      .catch((e) => {
        showToast(
          toast,
          "error",
          "Could not load vehicle",
          e instanceof Error ? e.message : "Please try again.",
        );
      })
      .finally(() => {
        setIsLoadingVehicle(false);
      });
  }, [vehicleId, reset]);

  const requestSubmit = handleSubmit((values) => {
    setPendingValues(values);
    setIsConfirmOpen(true);
  });

  async function confirmSubmit() {
    if (!pendingValues || isSaving) return;

    setIsSaving(true);

    try {
      const input = toVehicleInput(pendingValues);

      const { data: vehicle } = isEditing
        ? await updateVehicle(vehicleId, input)
        : await createVehicle(input);

      reset(isEditing ? toFormValues(vehicle) : EMPTY_VALUES);
      setIsConfirmOpen(false);
      setPendingValues(null);

      showToast(
        toast,
        "success",
        isEditing ? "Vehicle updated" : "Vehicle added",
        `${vehicle.make} ${vehicle.model} was saved.`,
      );

      onSuccess?.(vehicle);
    } catch (e) {
      showToast(
        toast,
        "error",
        isEditing ? "Could not update vehicle" : "Could not add vehicle",
        e instanceof Error ? e.message : "Please try again.",
      );
    } finally {
      setIsSaving(false);
      setReloadVehicles(true);
    }
  }

  function cancelSubmit() {
    if (isSaving) return;
    setIsConfirmOpen(false);
    setPendingValues(null);
  }

  return {
    control,
    handleSubmit,
    requestSubmit,
    confirmSubmit,
    cancelSubmit,
    reset,
    errors,
    isSaving,
    isLoadingVehicle,
    isConfirmOpen,
    isEditing,
  };
}
