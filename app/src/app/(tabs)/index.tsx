import { SafeAreaView } from "react-native-safe-area-context";
import {
  CarFront,
  ChevronDown,
  ChevronRight,
  Plus,
  Wrench,
  X,
} from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
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

export default function Home() {
  const router = useRouter();
  const switchVehicleSheetRef = useRef<BottomSheetRef>(null);

  return (
    <SafeAreaView>
      <VStack className="mt-5 px-5 pb-6 gap-y-4">
        <Button
          onPress={() => switchVehicleSheetRef.current?.open()}
          className="bg-card border border-border min-w-42 android:min-w-48 rounded-full self-center px-0 data-[active=true]:bg-card/50"
        >
          <ButtonText className="font-inter-medium text-sm text-secondary">
            Ford F-150 · 2021
          </ButtonText>
          <ButtonIcon as={() => <ChevronDown size={18} color="#5E6B7A" />} />
        </Button>
        <HStack className="gap-x-3 w-full justify-center">
          <VStack className="p-4 rounded-2xl bg-card gap-y-0.5 grow">
            <Text className="uppercase font-inter-bold text-xs text-secondary">
              Current Mileage
            </Text>
            <Text className="font-space-grotesk-bold text-[26px] text-primary">
              0 mi
            </Text>
            <Text className="font-body text-sm text-muted">Initial 0 mi</Text>
          </VStack>
          <VStack className="p-4 rounded-2xl bg-card gap-y-0.5 grow">
            <Text className="uppercase font-inter-bold text-xs text-secondary">
              Total Expenses
            </Text>
            <Text className="font-space-grotesk-bold text-[26px] text-primary">
              $0.00
            </Text>
            <Text className="font-body text-sm text-muted">USD · 0 logs</Text>
          </VStack>
        </HStack>
        <VStack className="py-9.5 px-7 items-center justify-center bg-card border border-border rounded-2xl gap-y-2">
          <View className="rounded-full size-15 bg-surface flex justify-center items-center">
            <Wrench color="#5E6B7A" size={26} />
          </View>
          <Text className="text-primary font-space-grotesk-bold text-base">
            No service history yet
          </Text>
          <Text className="font-body text-sm text-center text-secondary mt-0.5">
            This vehicle has no logged maintenance. Add your first event to
            start tracking mileage and costs.
          </Text>
        </VStack>
        <Button onPress={() => router.navigate("/(tabs)/new-log")}>
          <ButtonText>Log First Service</ButtonText>
        </Button>
      </VStack>
      <BottomSheet ref={switchVehicleSheetRef}>
        <BottomSheetPortal
          snapPoints={[455]}
          backdropComponent={BottomSheetBackdrop}
          handleComponent={BottomSheetDragIndicator}
          enableHandlePanningGesture={false}
          enablePanDownToClose={false}
          enableOverDrag={false}
        >
          <BottomSheetContent style={{ flex: 1 }}>
            <HStack className="justify-between items-center">
              <Text className="text-primary font-space-grotesk-semibold text-base">
                Switch Vehicle
              </Text>
              <Button
                variant="ghost"
                onPress={() => switchVehicleSheetRef.current?.close()}
              >
                <ButtonIcon
                  as={() => <X color="#96A2B3" size={20} strokeWidth={3} />}
                />
              </Button>
            </HStack>
            <View className="h-[44.5%] mt-2">
              <BottomSheetScrollView
                alwaysBounceVertical
                showsVerticalScrollIndicator={false}
                contentContainerClassName="grow gap-y-3.5"
              >
                <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-accent active:bg-card/80">
                  <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
                    <CarFront size={18} color="#F5A525" />
                  </View>
                  <VStack className="gap-y-0.5">
                    <Text className="font-inter-semibold text-sm text-primary">
                      Honda Civic · 2019
                    </Text>
                    <Text className="text-muted font-body text-xs">
                      AB-123-CD
                    </Text>
                    <Text className="text-secondary font-body text-xs">
                      84,320 mi · $2,418.75 · USD
                    </Text>
                  </VStack>
                  <View className="px-2.25 py-1 rounded-full flex items-center justify-center bg-accent ml-auto">
                    <Text className="text-on-accent font-inter-bold text-xs">
                      Active
                    </Text>
                  </View>
                </Pressable>
                <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80">
                  <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
                    <CarFront size={18} color="#F5A525" />
                  </View>
                  <VStack className="gap-y-0.5">
                    <Text className="font-inter-semibold text-sm text-primary">
                      Honda Civic · 2019
                    </Text>
                    <Text className="text-muted font-body text-xs">
                      AB-123-CD
                    </Text>
                    <Text className="text-secondary font-body text-xs">
                      84,320 mi · $2,418.75 · USD
                    </Text>
                  </VStack>
                  <View className="ml-auto">
                    <ChevronRight size={22} color="#5E6B7A" />
                  </View>
                </Pressable>
                <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80">
                  <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
                    <CarFront size={18} color="#F5A525" />
                  </View>
                  <VStack className="gap-y-0.5">
                    <Text className="font-inter-semibold text-sm text-primary">
                      Honda Civic · 2019
                    </Text>
                    <Text className="text-muted font-body text-xs">
                      AB-123-CD
                    </Text>
                    <Text className="text-secondary font-body text-xs">
                      84,320 mi · $2,418.75 · USD
                    </Text>
                  </VStack>
                  <View className="ml-auto">
                    <ChevronRight size={22} color="#5E6B7A" />
                  </View>
                </Pressable>
              </BottomSheetScrollView>
            </View>
            <VStack className="mt-3.5 gap-y-3.5">
              <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80">
                <View className="size-10.5 rounded-xl flex items-center justify-center bg-accent-foreground">
                  <Plus size={18} color="#F5A525" />
                </View>
                <Text className="text-accent font-inter-semibold text-sm">
                  Add New Vehicle
                </Text>
              </Pressable>
              <Text className="font-body text-xs text-muted text-center">
                Metrics, history and totals always reflect the selected vehicle.
              </Text>
            </VStack>
          </BottomSheetContent>
        </BottomSheetPortal>
      </BottomSheet>
    </SafeAreaView>
  );
}
