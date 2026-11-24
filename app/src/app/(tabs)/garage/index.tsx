import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { BlankState } from "@/components/ui/blank-state";
import { CarFront, Plus } from "lucide-react-native";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useFetchVehicles } from "@/src/hooks/use-fetch-vehicles";
import { VehicleCard } from "@/src/modules/garage/components/vehicle-card";

export default function Garage() {
  const router = useRouter();
  const { vehicles, loading } = useFetchVehicles();

  return (
    <SafeAreaView>
      <HStack className="items-center bg-transparent justify-between mt-4 mb-6 px-5">
        <Text className="font-space-grotesk-semibold text-primary text-base">
          My Garage
        </Text>
        <Button
          variant="outline"
          onPress={() => router.navigate("/(tabs)/garage/new")}
        >
          <ButtonIcon
            as={() => <Plus size={14} color="#F5A525" strokeWidth={3} />}
          />
          <ButtonText>Add Vehicle</ButtonText>
        </Button>
      </HStack>

      {loading ? (
        <VStack className="py-10 items-center">
          <ActivityIndicator color="#F5A525" />
        </VStack>
      ) : vehicles.length === 0 ? (
        <VStack className="gap-y-4 px-5">
          <BlankState
            icon={CarFront}
            title="Your garage is empty"
            description="Add your first vehicle to start tracking mileage, expenses and maintenance history."
          />
          <Button onPress={() => router.navigate("/(tabs)/garage/new")}>
            <ButtonText>Add Your First Vehicle</ButtonText>
          </Button>
        </VStack>
      ) : (
        <VStack className="gap-y-3.5 px-5">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
          <Text className="font-body text-xs text-muted text-center">
            Tap the vehicle chip on Home to switch the active vehicle.
          </Text>
        </VStack>
      )}
    </SafeAreaView>
  );
}
