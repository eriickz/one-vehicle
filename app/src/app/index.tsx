import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image, ImageBackground } from "expo-image";
import { Text, View } from "react-native";
import { CarFront, CircleDollarSign, Tags } from "lucide-react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="pb-7 h-full items-center">
      <ImageBackground
        source={require("@/assets/images/onboarding.png")}
        style={{
          width: "100%",
          height: 400,
        }}
        contentFit="cover"
      >
        <VStack className="items-center justify-center absolute inset-0 bg-onboarding-gradient">
          <View className="bg-accent size-24 rounded-3xl flex items-center justify-center mt-40">
            <Image
              source={require("@/assets/images/logo.svg")}
              style={{ width: 49, height: 26 }}
            />
          </View>
          <VStack className="mt-3 items-center w-72.5 gap-y-2.5">
            <Text className="text-primary font-space-grotesk-bold text-[28px]">
              One Vehicle
            </Text>
            <Text className="font-body text-secondary text-center">
              Every service, cost and event — tracked for every vehicle you own.
            </Text>
          </VStack>
        </VStack>
      </ImageBackground>
      <VStack className="mt-5 w-full px-5 gap-y-3.5">
        <HStack className="gap-x-3">
          <View className="flex items-center justify-center size-9.5 bg-accent-foreground text-accent rounded-[10px]">
            <CarFront size={18} color="#F5A525" />
          </View>
          <VStack>
            <Text className="text-primary font-inter-semibold text-sm">
              Multi-vehicle garage
            </Text>
            <Text className="text-muted font-body text-xs">
              Switch the active vehicle anytime
            </Text>
          </VStack>
        </HStack>
        <HStack className="gap-x-3">
          <View className="flex items-center justify-center size-9.5 bg-accent-foreground text-accent rounded-[10px]">
            <CircleDollarSign size={18} color="#F5A525" />
          </View>
          <VStack>
            <Text className="text-primary font-inter-semibold text-sm">
              Costs in your currency
            </Text>
            <Text className="text-muted font-body text-xs">
              USD, EUR, GBP and more, per vehicle
            </Text>
          </VStack>
        </HStack>
        <HStack className="gap-x-3">
          <View className="flex items-center justify-center size-9.5 bg-accent-foreground text-accent rounded-[10px]">
            <Tags size={18} color="#F5A525" />
          </View>
          <VStack>
            <Text className="text-primary font-inter-semibold text-sm">
              Categories & notes
            </Text>
            <Text className="text-muted font-body text-xs">
              Classify every event, your way
            </Text>
          </VStack>
        </HStack>
        <Button
          className="mt-2.5"
          onPress={() => router.navigate("/(tabs)/add-vehicle")}
        >
          <ButtonText className="capitalize">Add your first vehicle</ButtonText>
        </Button>
        <Text className="text-muted text-center text-xs">
          Takes under a minute · No account needed
        </Text>
      </VStack>
    </View>
  );
}
