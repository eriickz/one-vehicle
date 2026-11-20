import { APIResponse, Currency } from "@/types";
import { Vehicle } from "./types";
import { apiClient } from "@/src/api-client";

export interface VehicleInput {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  initialMileage: number;
  currencyId: number;
}

export async function getVehicleList(): Promise<APIResponse<Vehicle[]>> {
  return await apiClient.get("vehicles").json();
}

export async function getVehicle(id: string): Promise<APIResponse<Vehicle>> {
  return await apiClient.get(`vehicles/${id}`).json();
}

export async function getCurrencyList(): Promise<APIResponse<Currency[]>> {
  return await apiClient
    .get("currencies", { searchParams: { pageSize: 100 } })
    .json();
}

export async function createVehicle(
  input: VehicleInput,
): Promise<APIResponse<Vehicle>> {
  return await apiClient.post("vehicles", { json: input }).json();
}

export async function updateVehicle(
  id: string,
  input: VehicleInput,
): Promise<APIResponse<Vehicle>> {
  return await apiClient.put(`vehicles/${id}`, { json: input }).json();
}
