import { Controller, useWatch } from "react-hook-form";
import { Pressable, Text } from "react-native";
import { Check, X } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
  BottomSheetScrollView,
} from "@/components/ui/bottomsheet";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { CategoryFormBottomSheetProps } from "../types";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "../constants";
import { useCategoryForm } from "../hooks/use-category-form";

export function CategoryFormBottomSheet({
  ref,
  categoryId,
  onSaved,
  onClose,
}: CategoryFormBottomSheetProps) {
  const handleClose = () => {
    if (ref && "current" in ref) {
      ref.current?.close();
    }
    onClose?.();
  };

  const { control, submit, errors, isSaving, isEditing } = useCategoryForm(
    categoryId,
    (savedCategory) => {
      handleClose();
      onSaved?.(savedCategory);
    },
  );

  const selectedColor = useWatch({ control, name: "color" });

  return (
    <BottomSheet ref={ref}>
      <BottomSheetPortal
        snapPoints={[480, 600]}
        backdropComponent={BottomSheetBackdrop}
        handleComponent={BottomSheetDragIndicator}
        enableHandlePanningGesture={false}
        enablePanDownToClose={false}
        enableOverDrag={false}
      >
        <BottomSheetContent>
          <HStack className="justify-between items-center">
            <Text className="text-primary font-space-grotesk-semibold text-base">
              {isEditing ? "Edit Category" : "New Category"}
            </Text>
            <Button variant="ghost" onPress={handleClose}>
              <ButtonIcon
                as={() => <X color="#96A2B3" size={20} strokeWidth={3} />}
              />
            </Button>
          </HStack>

          <VStack className="mt-2 gap-y-3.5">
            <FormControl isInvalid={!!errors.name}>
              <FormControlLabel>
                <FormControlLabelText>Name</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input isInvalid={!!errors.name}>
                    <InputField
                      placeholder="Tires"
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.name?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <Controller
              control={control}
              name="color"
              render={({ field }) => (
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Color</FormControlLabelText>
                  </FormControlLabel>
                  <HStack className="gap-x-2.5 mt-1">
                    {CATEGORY_COLORS.map((color) => {
                      const isSelected = field.value === color.value;

                      return (
                        <Pressable
                          key={color.value}
                          accessibilityRole="button"
                          accessibilityLabel={color.name}
                          onPress={() => field.onChange(color.value)}
                          className="size-7.5 rounded-full items-center justify-center"
                          style={{ backgroundColor: color.value }}
                        >
                          {isSelected && (
                            <Check size={14} color="#0D0F14" strokeWidth={3} />
                          )}
                        </Pressable>
                      );
                    })}
                  </HStack>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="icon"
              render={({ field }) => (
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Icon</FormControlLabelText>
                  </FormControlLabel>
                  <BottomSheetScrollView
                    horizontal
                    alwaysBounceHorizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 8, paddingTop: 8 }}
                  >
                    {CATEGORY_ICONS.map(({ name, Icon }) => {
                      const isSelected = field.value === name;

                      return (
                        <Pressable
                          key={name}
                          accessibilityRole="button"
                          accessibilityLabel={name}
                          onPress={() => field.onChange(name)}
                          className="rounded-xl border p-3"
                          style={{
                            borderColor: isSelected ? selectedColor : "#2A3442",
                            backgroundColor: isSelected
                              ? `${selectedColor}22`
                              : "#1C2430",
                          }}
                        >
                          <Icon
                            size={18}
                            color={isSelected ? selectedColor : "#96A2B3"}
                          />
                        </Pressable>
                      );
                    })}
                  </BottomSheetScrollView>
                </FormControl>
              )}
            />

            <Button
              className="mt-2"
              onPress={() => submit()}
              isDisabled={isSaving}
            >
              <ButtonText>
                {isSaving
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                    ? "Save Changes"
                    : "Create & Apply"}
              </ButtonText>
            </Button>

            <Button variant="secondary" onPress={handleClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </VStack>
        </BottomSheetContent>
      </BottomSheetPortal>
    </BottomSheet>
  );
}
