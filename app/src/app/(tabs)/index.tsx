import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronDown, Wrench, X } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView>
      <VStack className="mt-5 px-5 pb-6 gap-y-4">
        <Button className="bg-card border border-border min-w-42 android:min-w-48 rounded-full self-center px-0 data-[active=true]:bg-card/50">
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
    </SafeAreaView>
  );
}
