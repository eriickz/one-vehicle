import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Vehicle } from "../types";
import { CarFront, ChevronRight } from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";

type VehicleCardProps = {
  vehicle: Vehicle;
  onPress?: () => void;
  isSelecting?: boolean;
};

export const VehicleCard = ({
  vehicle,
  onPress,
  isSelecting = false,
}: VehicleCardProps) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={onPress ?? (() => router.navigate(`/garage/${vehicle.id}`))}
      className={`flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border active:bg-card/80 ${
        vehicle.isActive ? "border-accent" : "border-border"
      }`}
    >
      <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
        <CarFront size={18} color="#F5A525" />
      </View>
      <VStack className="gap-y-0.5">
        <Text className="font-inter-semibold text-sm text-primary">
          {vehicle.make} {vehicle.model} · {vehicle.year}
        </Text>
        <Text className="text-muted font-body text-xs">
          {vehicle.licensePlate}
        </Text>
        <Text className="text-secondary font-body text-xs">
          {vehicle.initialMileage.toLocaleString()} mi ·{" "}
          {vehicle.currency?.code ?? "—"}
        </Text>
      </VStack>
      {vehicle.isActive ? (
        <View className="px-2.25 py-1 rounded-full flex items-center justify-center bg-accent ml-auto">
          <Text className="text-on-accent font-inter-bold text-xs">Active</Text>
        </View>
      ) : (
        <View className="ml-auto">
          {isSelecting ? (
            <ActivityIndicator size="small" color="#5E6B7A" />
          ) : (
            <ChevronRight size={22} color="#5E6B7A" />
          )}
        </View>
      )}
    </Pressable>
  );
};
