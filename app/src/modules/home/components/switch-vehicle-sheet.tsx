import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
  BottomSheetScrollView,
} from "@/components/ui/bottomsheet";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Plus, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { VehicleCard } from "@/src/modules/garage/components/vehicle-card";
import { SwitchVehicleSheetProps } from "../types";

export const SwitchVehicleSheet = ({
  ref,
  vehicles,
  activeVehicleId,
  selectingId,
  onSelect,
  onClose,
}: SwitchVehicleSheetProps) => {
  const router = useRouter();

  const handleClose = () => {
    if (ref && "current" in ref) {
      ref.current?.close();
    }
    onClose?.();
  };

  const handleAddVehicle = () => {
    handleClose();
    router.navigate("/(tabs)/garage/new");
  };

  return (
    <BottomSheet ref={ref}>
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
            <Button variant="ghost" onPress={handleClose}>
              <ButtonIcon
                as={() => <X color="#96A2B3" size={20} strokeWidth={3} />}
              />
            </Button>
          </HStack>
          <View className="h-auto mt-2">
            <BottomSheetScrollView
              alwaysBounceVertical
              showsVerticalScrollIndicator={false}
              contentContainerClassName="grow gap-y-3.5"
            >
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={{
                    ...vehicle,
                    isActive: vehicle.id === activeVehicleId,
                  }}
                  isSelecting={selectingId === vehicle.id}
                  onPress={() => onSelect(vehicle.id)}
                />
              ))}
            </BottomSheetScrollView>
          </View>
          <VStack className="mt-3.5 gap-y-3.5">
            <Pressable
              onPress={handleAddVehicle}
              className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-border active:bg-card/80"
            >
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
  );
};
