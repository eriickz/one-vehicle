import { Button, ButtonText } from "@/components/ui/button";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Disc, Search } from "lucide-react-native";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

export default function History() {
  return (
    <SafeAreaView>
      <View className="items-center bg-transparent justify-center mt-4 mb-6">
        <Text className="font-space-grotesk-semibold text-primary text-base">
          History
        </Text>
      </View>
      <View className="px-5 pb-6">
        <Input>
          <InputIcon as={() => <Search color="#5E6B7A" size={16} />} />
          <InputField
            className="text-sm"
            placeholder="Search maintenances, notes..."
          />
        </Input>
        <VStack className="gap-y-3.5 mt-3.5">
          <ScrollView
            contentContainerClassName="flex gap-x-2"
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal
            horizontal
          >
            <Button variant="chip" size="sm" isHovered>
              <ButtonText>All</ButtonText>
            </Button>
            <Button variant="chip" size="sm">
              <ButtonText>Maintenance</ButtonText>
            </Button>
            <Button variant="chip" size="sm">
              <ButtonText>Repair</ButtonText>
            </Button>
            <Button variant="chip" size="sm">
              <ButtonText>Fuel</ButtonText>
            </Button>
          </ScrollView>
          <Text className="font-body text-xs text-muted">
            8 results for “brake” · 4 filters selected
          </Text>
          <VStack className="gap-y-3.5 justify-center">
            <Text className="font-space-grotesk-bold text-base text-primary">
              October 2025
            </Text>
            <Pressable className="flex-row gap-x-3 bg-card rounded-[14px] p-3.5 items-center active:bg-card/80">
              <View className="size-9.5 rounded-xl flex items-center justify-center bg-accent-foreground">
                <Disc size={18} color="#F5A525" />
              </View>
              <VStack className="gap-y-1">
                <Text className="font-inter-medium text-xs text-primary">
                  Brake Pads Replacement
                </Text>
                <Text className="text-muted font-body text-xs">
                  Oct 3, 2025 · 84,105 mi
                </Text>
              </VStack>
              <Text className="font-space-grotesk-bold text-xs text-primary ml-auto">
                $310.00
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </View>
    </SafeAreaView>
  );
}
