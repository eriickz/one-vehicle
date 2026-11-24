import { Currency, EntityTimestamps } from "@/types";

export interface Vehicle extends EntityTimestamps {
  id: string;
  currencyId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  initialMileage: number;
  isActive: boolean;
  currency: Currency;
}

export interface VehicleInput {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  initialMileage: number;
  currencyId: number;
}

export type VehicleFormModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onClose: () => void;
  onConfirm: () => void;
};
