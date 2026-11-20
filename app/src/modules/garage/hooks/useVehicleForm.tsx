import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/showToast";
import { VehicleFormValues, vehicleSchema } from "../schemas";
import { createVehicle, getVehicle, updateVehicle } from "../services";
import { Vehicle } from "../types";
import { toFormValues } from "../utils/toFormValues";
import { toVehicleInput } from "../utils/toVehicleInput";

const EMPTY_VALUES: VehicleFormValues = {
  make: "",
  model: "",
  year: "",
  licensePlate: "",
  initialMileage: "",
  currencyId: "1",
};

export function useVehicleForm(
  vehicleId?: string,
  onSuccess?: (vehicle: Vehicle) => void,
) {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(Boolean(vehicleId));
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingValues, setPendingValues] = useState<VehicleFormValues | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: yupResolver(vehicleSchema),
    defaultValues: EMPTY_VALUES,
  });

  const isEditing = Boolean(vehicleId);

  useEffect(() => {
    if (!vehicleId) {
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
  }, [vehicleId, reset, toast]);

  const requestSubmit = handleSubmit(
    (values) => {
      setPendingValues(values);
      setIsConfirmOpen(true);
    },
    () => {
      showToast(
        toast,
        "error",
        "Check the form",
        "Some fields are missing or invalid.",
      );
    },
  );

  async function confirmSubmit() {
    if (!pendingValues || isSaving) return;

    setIsSaving(true);

    try {
      const input = toVehicleInput(pendingValues);

      const { data: vehicle } = vehicleId
        ? await updateVehicle(vehicleId, input)
        : await createVehicle(input);

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
