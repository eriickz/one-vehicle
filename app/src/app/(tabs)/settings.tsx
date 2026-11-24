import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ChevronRight, Plus, Tags } from "lucide-react-native";
import { BlankState } from "@/components/ui/blank-state";
import { Pressable, Text, View } from "react-native";
import { useRef, useState } from "react";
import { BottomSheetRef } from "@/components/ui/bottomsheet";
import { CategoryFormBottomSheet } from "@/src/modules/categories/components/category-form-bottomsheet";
import { useFetchCategories } from "@/src/hooks/use-fetch-categories";

export default function Settings() {
  const categoryFormRef = useRef<BottomSheetRef>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const { categories, setReload } = useFetchCategories();

  const handleOpenCreate = () => {
    setSelectedCategoryId(null);
    categoryFormRef.current?.open();
  };

  const handleOpenEdit = (id: number) => {
    setSelectedCategoryId(id);
    categoryFormRef.current?.open();
  };

  return (
    <SafeAreaView>
      <CategoryFormBottomSheet
        ref={categoryFormRef}
        categoryId={selectedCategoryId}
        onClose={() => setSelectedCategoryId(null)}
        onSaved={() => setReload(true)}
      />
      <HStack className="items-center bg-transparent justify-between mt-4 mb-6 px-5">
        <Text className="font-space-grotesk-semibold text-primary text-base">
          Categories
        </Text>
        <Button variant="outline" onPress={handleOpenCreate}>
          <ButtonIcon
            as={() => <Plus size={14} color="#F5A525" strokeWidth={3} />}
          />
          <ButtonText>Add Category</ButtonText>
        </Button>
      </HStack>
      <VStack className="gap-y-3.5 px-5">
        {categories.length > 0 ? (
          <>
            <Text className="font-body text-xs text-secondary">
              Classify every log. Create categories anytime — even mid-log.
            </Text>
            {categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => handleOpenEdit(category.id)}
                className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80"
              >
                <View
                  className="size-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <VStack className="gap-y-0.5">
                  <Text className="font-inter-semibold text-sm text-primary">
                    {category.name}
                  </Text>
                </VStack>
                <View className="ml-auto">
                  <ChevronRight size={22} color="#5E6B7A" />
                </View>
              </Pressable>
            ))}
            <Text className="font-body text-xs text-muted text-center">
              Deleting a category keeps its logs as “Uncategorized”.
            </Text>
          </>
        ) : (
          <>
            <BlankState
              icon={Tags}
              title="No categories yet"
              description="Categories classify every log — maintenance, repairs, fuel and more. Create your first one, or make one on the fly while logging."
            />
            <Text className="font-body text-xs text-muted text-center">
              You can also create categories from inside the New Log form — your
              draft is always kept.
            </Text>
          </>
        )}
      </VStack>
    </SafeAreaView>
  );
}
