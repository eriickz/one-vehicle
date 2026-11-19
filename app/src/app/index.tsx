import { ImageBackground } from "expo-image";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex items-center justify-center w-full h-full">
      <ImageBackground
        source={require("@/assets/images/onboarding.png")}
        style={{
          width: "100%",
          height: 400,
          position: "absolute",
        }}
        contentFit="cover"
        contentPosition={{ left: -140 }}
      />
      <View>
        <Text className="text-white">One Vehicle</Text>
      </View>
    </View>
  );
}
