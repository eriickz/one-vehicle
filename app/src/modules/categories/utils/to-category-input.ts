import { CategoryFormValues } from "../schemas";
import { CategoryInput } from "../types";

export function toCategoryInput(values: CategoryFormValues): CategoryInput {
  return {
    name: values.name.trim(),
    color: values.color,
    icon: values.icon,
  };
}
