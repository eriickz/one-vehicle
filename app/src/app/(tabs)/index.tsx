import { SafeAreaView } from "react-native-safe-area-context";
import { CarFront, ChevronDown, Wrench } from "lucide-react-native";
import { BlankState } from "@/components/ui/blank-state";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { ActivityIndicator, Text } from "react-native";
import { SwitchVehicleSheet } from "@/src/modules/home/components/switch-vehicle-sheet";
import { useHome } from "@/src/modules/home/hooks/use-home";

export default function Home() {
  const {
    switchVehicleSheetRef,
    vehicle,
    vehicles,
    loading,
    selectingId,
    hasHistory,
    vehicleLabel,
    currentMileageLabel,
    initialMileageLabel,
    totalExpensesLabel,
    totalLogsLabel,
    logButtonLabel,
    handleSelectVehicle,
    openSwitchVehicleSheet,
    goToAddVehicle,
    goToNewLog,
  } = useHome();

  return (
    <SafeAreaView>
      <VStack className="mt-5 px-5 pb-6 gap-y-4">
        <Button
          onPress={openSwitchVehicleSheet}
          className="bg-card border border-border android:min-w-48 rounded-full self-center px-4 data-[active=true]:bg-card/50"
        >
          <ButtonText className="font-inter-medium text-sm text-secondary">
            {vehicleLabel}
          </ButtonText>
          <ButtonIcon as={() => <ChevronDown size={18} color="#5E6B7A" />} />
        </Button>

        {loading ? (
          <VStack className="py-10 items-center">
            <ActivityIndicator color="#F5A525" />
          </VStack>
        ) : !vehicle ? (
          <VStack className="gap-y-4">
            <BlankState
              icon={CarFront}
              title="No vehicle selected"
              description="Add a vehicle to start tracking mileage, expenses and maintenance history."
            />
            <Button onPress={goToAddVehicle}>
              <ButtonText>Add Your First Vehicle</ButtonText>
            </Button>
          </VStack>
        ) : (
          <>
            <HStack className="gap-x-3 w-full justify-center">
              <VStack className="p-4 rounded-2xl bg-card gap-y-0.5 grow">
                <Text className="uppercase font-inter-bold text-xs text-secondary">
                  Current Mileage
                </Text>
                <Text className="font-space-grotesk-bold text-[26px] text-primary">
                  {currentMileageLabel}
                </Text>
                <Text className="font-body text-sm text-muted">
                  Initial {initialMileageLabel}
                </Text>
              </VStack>
              <VStack className="p-4 rounded-2xl bg-card gap-y-0.5 grow">
                <Text className="uppercase font-inter-bold text-xs text-secondary">
                  Total Expenses
                </Text>
                <Text className="font-space-grotesk-bold text-[26px] text-primary">
                  {totalExpensesLabel}
                </Text>
                <Text className="font-body text-sm text-muted">
                  {totalLogsLabel}
                </Text>
              </VStack>
            </HStack>
            {!hasHistory ? (
              <BlankState
                icon={Wrench}
                title="No service history yet"
                description="This vehicle has no logged maintenance. Add your first event to start tracking mileage and costs."
              />
            ) : null}
            <Button onPress={goToNewLog}>
              <ButtonText>{logButtonLabel}</ButtonText>
            </Button>
          </>
        )}
      </VStack>

      <SwitchVehicleSheet
        ref={switchVehicleSheetRef}
        vehicles={vehicles}
        activeVehicleId={vehicle?.id}
        selectingId={selectingId}
        onSelect={handleSelectVehicle}
      />
    </SafeAreaView>
  );
}
