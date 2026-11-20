import { CategoryFormValues } from "../schemas";
import { CategoryInput } from "../services";

export function toCategoryInput(values: CategoryFormValues): CategoryInput {
  return {
    name: values.name.trim(),
    color: values.color,
    icon: values.icon,
  };
}
