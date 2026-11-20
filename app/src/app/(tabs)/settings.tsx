import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
  Calendar,
  Check,
  ChevronRight,
  Disc,
  Fuel,
  Gauge,
  Plus,
  Shield,
  Tag,
  Wrench,
  X,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useRef } from "react";
import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
  BottomSheetRef,
  BottomSheetScrollView,
} from "@/components/ui/bottomsheet";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";

export default function Settings() {
  const categoryFormRef = useRef<BottomSheetRef>(null);

  return (
    <SafeAreaView>
      <HStack className="items-center bg-transparent justify-between mt-4 mb-6 px-5">
        <Text className="font-space-grotesk-semibold text-primary text-base">
          Categories
        </Text>
        <Button
          variant="outline"
          onPress={() => categoryFormRef.current?.open()}
        >
          <ButtonIcon
            as={() => <Plus size={14} color="#F5A525" strokeWidth={3} />}
          />
          <ButtonText>Add Category</ButtonText>
        </Button>
      </HStack>
      <VStack className="gap-y-3.5 px-5">
        <Text className="font-body text-xs text-secondary">
          Classify every log. Create categories anytime — even mid-log.
        </Text>
        <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80">
          <View className="size-3 rounded-full bg-accent" />
          <VStack className="gap-y-0.5">
            <Text className="font-inter-semibold text-sm text-primary">
              Maintenance
            </Text>
            <Text className="text-muted font-body text-xs">12 logs</Text>
          </VStack>
          <View className="ml-auto">
            <ChevronRight size={22} color="#5E6B7A" />
          </View>
        </Pressable>
        <Text className="font-body text-xs text-muted text-center">
          Deleting a category keeps its logs as “Uncategorized”.
        </Text>
      </VStack>
      <BottomSheet ref={categoryFormRef}>
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
                New Category
              </Text>
              <Button
                variant="ghost"
                onPress={() => categoryFormRef.current?.close()}
              >
                <ButtonIcon
                  as={() => <X color="#96A2B3" size={20} strokeWidth={3} />}
                />
              </Button>
            </HStack>
            <VStack className="mt-2 gap-y-3.5">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField placeholder="Tires" />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Color</FormControlLabelText>
                </FormControlLabel>
                <HStack className="gap-x-2.5 mt-1">
                  <Button className="rounded-full size-7.5 p-0">
                    <ButtonIcon as={Check} />
                  </Button>
                  <Button className="rounded-full size-7.5 p-0 bg-category-1 data-[active=true]:bg-category-1/80" />
                  <Button className="rounded-full size-7.5 p-0 bg-category-2 data-[active=true]:bg-category-2/80" />
                  <Button className="rounded-full size-7.5 p-0 bg-category-3 data-[active=true]:bg-category-3/80" />
                  <Button className="rounded-full size-7.5 p-0 bg-category-4 data-[active=true]:bg-category-4/80" />
                </HStack>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Icon</FormControlLabelText>
                </FormControlLabel>
                <BottomSheetScrollView
                  horizontal
                  alwaysBounceHorizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="gap-x-2 mt-2"
                >
                  <Button className="rounded-xl border border-accent bg-accent-foreground p-3">
                    <ButtonIcon
                      as={() => <Wrench color="#F5A525" size={18} />}
                    />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon as={() => <Disc color="#96A2B3" size={18} />} />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon as={() => <Fuel color="#96A2B3" size={18} />} />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon
                      as={() => <Shield color="#96A2B3" size={18} />}
                    />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon
                      as={() => <Calendar color="#96A2B3" size={18} />}
                    />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon as={() => <Tag color="#96A2B3" size={18} />} />
                  </Button>
                  <Button className="rounded-xl border border-border bg-card p-3">
                    <ButtonIcon
                      as={() => <Gauge color="#96A2B3" size={18} />}
                    />
                  </Button>
                </BottomSheetScrollView>
              </FormControl>
              <Button className="mt-2">
                <ButtonText>Create & Apply</ButtonText>
              </Button>
              <Button
                variant="secondary"
                onPress={() => categoryFormRef.current?.close()}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
            </VStack>
          </BottomSheetContent>
        </BottomSheetPortal>
      </BottomSheet>
    </SafeAreaView>
  );
}
