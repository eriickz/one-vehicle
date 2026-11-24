import { VehicleFormValues } from "../schemas";
import { VehicleInput } from "../types";

export function toVehicleInput(values: VehicleFormValues): VehicleInput {
  return {
    make: values.make.trim(),
    model: values.model.trim(),
    year: Number(values.year),
    licensePlate: values.licensePlate.trim(),
    initialMileage: Number(values.initialMileage),
    currencyId: Number(values.currencyId),
  };
}
