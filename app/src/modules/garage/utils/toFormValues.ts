import { VehicleFormValues } from "../schemas";
import { Vehicle } from "../types";

export function toFormValues(vehicle: Vehicle): VehicleFormValues {
  return {
    make: vehicle.make,
    model: vehicle.model,
    year: String(vehicle.year),
    licensePlate: vehicle.licensePlate,
    initialMileage: String(vehicle.initialMileage),
    currencyId: String(vehicle.currencyId),
  };
}
