import * as yup from "yup";

const currentYear = new Date().getFullYear();

export const vehicleSchema = yup.object({
  make: yup.string().trim().required("Make is required"),
  model: yup.string().trim().required("Model is required"),
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
  licensePlate: yup.string().trim().required("License plate is required"),
  initialMileage: yup
    .string()
    .required("Initial mileage is required")
    .matches(/^\d+$/, "Mileage must be a whole number"),
  currencyId: yup
    .string()
    .required("Currency is required")
    .test("currency", "Select a valid currency", (value) => Number(value) > 0),
});

export type VehicleFormValues = yup.InferType<typeof vehicleSchema>;
