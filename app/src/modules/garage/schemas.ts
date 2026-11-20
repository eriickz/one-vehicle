import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const vehicleSchema = yup.object({
  make: yup
    .string()
    .trim()
    .required("Make is required")
    .max(100, "Make must be 100 characters or less"),
  model: yup
    .string()
    .trim()
    .required("Model is required")
    .max(100, "Model must be 100 characters or less"),
  year: yup
    .string()
    .required("Year is required")
    .matches(/^\d{4}$/, "Year must be a 4-digit number")
    .test(
      "year-range",
      `Year must be between 1900 and ${currentYear + 1}`,
      (value) => {
        if (!value) return false;
        const year = Number(value);
        return year >= 1900 && year <= currentYear + 1;
      },
    ),
  licensePlate: yup
    .string()
    .trim()
    .required("License plate is required")
    .max(20, "License plate must be 20 characters or less")
    .matches(
      /^[A-Za-z0-9 -]+$/,
      "License plate can only contain letters, numbers, spaces and hyphens",
    ),
  initialMileage: yup
    .string()
    .required("Initial mileage is required")
    .matches(/^\d+$/, "Mileage must be a whole number")
    .test("mileage-range", "Mileage is too high", (value) => {
      if (!value) return false;
      return Number(value) <= 10_000_000;
    }),
  currencyId: yup
    .string()
    .required("Currency is required")
    .test(
      "currency",
      "Select a valid currency",
      (value) => Number(value) > 0,
    ),
});

export type VehicleFormValues = yup.InferType<typeof vehicleSchema>;
