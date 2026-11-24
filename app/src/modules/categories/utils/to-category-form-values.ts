import { Category } from "@/types";
import { CategoryFormValues } from "../schemas";

export function toCategoryFormValues(category: Category): CategoryFormValues {
  return {
    name: category.name,
    color: category.color,
    icon: category.icon,
  };
}
