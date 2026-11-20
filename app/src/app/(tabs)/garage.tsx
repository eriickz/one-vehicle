import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { CarFront, ChevronRight, Plus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Garage() {
  return (
    <SafeAreaView>
      <HStack className="items-center bg-transparent justify-between mt-4 mb-6 px-5">
        <Text className="font-space-grotesk-semibold text-primary text-base">
          My Garage
        </Text>
        <Button variant="outline">
          <ButtonIcon
            as={() => <Plus size={14} color="#F5A525" strokeWidth={3} />}
          />
          <ButtonText>Add Vehicle</ButtonText>
        </Button>
      </HStack>
      <VStack className="gap-y-3.5 px-5">
        <Pressable className="flex-row gap-x-3 items-center rounded-2xl bg-card p-3.5 border border-accent active:bg-card/80">
          <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
            <CarFront size={18} color="#F5A525" />
          </View>
          <VStack className="gap-y-0.5">
            <Text className="font-inter-semibold text-sm text-primary">
              Honda Civic · 2019
            </Text>
            <Text className="text-muted font-body text-xs">AB-123-CD</Text>
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
            <Text className="text-muted font-body text-xs">AB-123-CD</Text>
            <Text className="text-secondary font-body text-xs">
              84,320 mi · $2,418.75 · USD
            </Text>
          </VStack>
          <View className="ml-auto">
            <ChevronRight size={22} color="#5E6B7A" />
          </View>
        </Pressable>
        <Text className="font-body text-xs text-muted text-center">
          Tap the vehicle chip on Home to switch the active vehicle.
        </Text>
      </VStack>
    </SafeAreaView>
  );
}
