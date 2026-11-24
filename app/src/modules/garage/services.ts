import { APIResponse, Currency } from "@/types";
import { Vehicle, VehicleInput } from "./types";
import { apiClient } from "@/src/api-client";

export async function getVehicleList(): Promise<APIResponse<Vehicle[]>> {
  return await apiClient.get("vehicles").json();
}

export async function getVehicle(id: string): Promise<APIResponse<Vehicle>> {
  return await apiClient.get(`vehicles/${id}`).json();
}

export async function getCurrentVehicle(): Promise<APIResponse<Vehicle>> {
  return await apiClient.get("vehicles/current").json();
}

export async function setCurrentVehicle(
  id: string,
): Promise<APIResponse<Vehicle>> {
  return await apiClient.put(`vehicles/${id}/current`).json();
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
