import { Stack } from "expo-router";

export default function GarageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0D0F14" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="add-vehicle" />
    </Stack>
  );
}
