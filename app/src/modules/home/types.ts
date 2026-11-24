import { BottomSheetRef } from "@/components/ui/bottomsheet";
import { Ref } from "react";
import { Vehicle } from "../garage/types";

export interface VehicleMetrics {
  vehicleId: string;
  currentMileage: number;
  totalExpenses: string;
  totalLogsCount: number;
}

export type SwitchVehicleSheetProps = {
  vehicles: Vehicle[];
  activeVehicleId?: string;
  selectingId?: string | null;
  ref: Ref<BottomSheetRef>;
  onSelect: (id: string) => void;
  onClose?: () => void;
};
