import { APIResponse } from "@/types";
import { Vehicle } from "../garage/types";
import { apiClient } from "@/src/api-client";
import { VehicleMetrics } from "./types";

export async function getActiveVehicle(): Promise<APIResponse<Vehicle>> {
  return await apiClient.get("vehicles/current").json();
}

export async function getVehicleMetrics(
  id: string,
): Promise<APIResponse<VehicleMetrics>> {
  return await apiClient.get(`vehicles/${id}/metrics`).json();
}
