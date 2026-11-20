import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/showToast";
import { Category } from "@/types";
import {
  EMPTY_CATEGORY_VALUES,
  categorySchema,
  CategoryFormValues,
} from "../schemas";
import { createCategory } from "../services";
import { toCategoryInput } from "../utils/toCategoryInput";

export function useCategoryForm(onSuccess?: (category: Category) => void) {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    defaultValues: EMPTY_CATEGORY_VALUES,
  });

  const submit = handleSubmit(
    async (values) => {
      setIsSaving(true);

      try {
        const { data: category } = await createCategory(
          toCategoryInput(values),
        );

        reset(EMPTY_CATEGORY_VALUES);

        showToast(
          toast,
          "success",
          "Category added",
          `${category.name} is ready to use.`,
        );

        onSuccess?.(category);
      } catch (e) {
        showToast(
          toast,
          "error",
          "Could not add category",
          e instanceof Error ? e.message : "Please try again.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    () => {
      showToast(
        toast,
        "error",
        "Check the form",
        "Some fields are missing or invalid.",
      );
    },
  );

  return { control, submit, reset, errors, isSaving };
}
