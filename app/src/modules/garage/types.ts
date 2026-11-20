import { Currency, EntityTimestamps } from "@/types";

export interface Vehicle extends EntityTimestamps {
  id: string;
  currencyId: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  initialMileage: number;
  currency: Currency;
}
