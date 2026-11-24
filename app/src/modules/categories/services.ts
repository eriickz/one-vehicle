import { APIResponse, Category } from "@/types";
import { CategoryInput } from "./types";
import { apiClient } from "@/src/api-client";

export async function getCategoryList(): Promise<APIResponse<Category[]>> {
  return await apiClient
    .get("categories", { searchParams: { pageSize: 100 } })
    .json();
}

export async function getCategory(id: number): Promise<APIResponse<Category>> {
  return await apiClient.get(`categories/${id}`).json();
}

export async function createCategory(
  input: CategoryInput,
): Promise<APIResponse<Category>> {
  return await apiClient.post("categories", { json: input }).json();
}

export async function updateCategory(
  id: number,
  input: CategoryInput,
): Promise<APIResponse<Category>> {
  return await apiClient.put(`categories/${id}`, { json: input }).json();
}
