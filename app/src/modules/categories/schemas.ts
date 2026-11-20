import * as yup from "yup";
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  DEFAULT_CATEGORY_COLOR,
  DEFAULT_CATEGORY_ICON,
} from "./constants";

const colorValues: string[] = CATEGORY_COLORS.map((color) => color.value);
const iconValues: string[] = CATEGORY_ICONS.map((icon) => icon.name);

export const categorySchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be 50 characters or less"),
  color: yup
    .string()
    .required("Color is required")
    .oneOf(colorValues, "Select a valid color"),
  icon: yup
    .string()
    .required("Icon is required")
    .oneOf(iconValues, "Select a valid icon"),
});

export type CategoryFormValues = yup.InferType<typeof categorySchema>;

export const EMPTY_CATEGORY_VALUES: CategoryFormValues = {
  name: "",
  color: DEFAULT_CATEGORY_COLOR,
  icon: DEFAULT_CATEGORY_ICON,
};
