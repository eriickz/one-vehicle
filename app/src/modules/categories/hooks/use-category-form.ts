import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToast } from "@/components/ui/toast";
import { showToast } from "@/src/utils/show-toast";
import { Category } from "@/types";
import {
  EMPTY_CATEGORY_VALUES,
  categorySchema,
  CategoryFormValues,
} from "../schemas";
import { createCategory, getCategory, updateCategory } from "../services";
import { toCategoryInput } from "../utils/to-category-input";
import { toCategoryFormValues } from "../utils/to-category-form-values";

export function useCategoryForm(
  categoryId?: number | null,
  onSuccess?: (category: Category) => void,
) {
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(
    Boolean(categoryId),
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: yupResolver(categorySchema),
    defaultValues: EMPTY_CATEGORY_VALUES,
  });

  const isEditing = Boolean(categoryId);

  useEffect(() => {
    if (!categoryId) {
      reset(EMPTY_CATEGORY_VALUES);
      setIsLoadingCategory(false);
      return;
    }

    setIsLoadingCategory(true);

    getCategory(categoryId)
      .then(({ data }) => {
        reset(toCategoryFormValues(data));
      })
      .catch((e) => {
        showToast(
          toast,
          "error",
          "Could not load category",
          e instanceof Error ? e.message : "Please try again.",
        );
      })
      .finally(() => {
        setIsLoadingCategory(false);
      });
  }, [categoryId, reset]);

  const submit = handleSubmit(
    async (values) => {
      setIsSaving(true);

      try {
        const input = toCategoryInput(values);
        const { data: savedCategory } =
          isEditing && categoryId
            ? await updateCategory(categoryId, input)
            : await createCategory(input);

        reset(EMPTY_CATEGORY_VALUES);

        showToast(
          toast,
          "success",
          isEditing ? "Category updated" : "Category added",
          `${savedCategory.name} is ready to use.`,
        );

        onSuccess?.(savedCategory);
      } catch (e) {
        showToast(
          toast,
          "error",
          isEditing ? "Could not update category" : "Could not add category",
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

  return {
    control,
    submit,
    reset,
    errors,
    isSaving,
    isLoadingCategory,
    isEditing,
  };
}
