import { Ref } from "react";
import { BottomSheetRef } from "@/components/ui/bottomsheet";
import { Category } from "@/types";

export interface CategoryInput {
  name: string;
  color: string;
  icon: string;
}

export type CategoryFormBottomSheetProps = {
  ref?: Ref<BottomSheetRef>;
  categoryId?: number | null;
  onSaved?: (category: Category) => void;
  onClose?: () => void;
};
