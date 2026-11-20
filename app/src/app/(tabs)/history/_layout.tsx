import { Stack } from "expo-router";

export default function HistoryLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#0D0F14" } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="log-detail" />
    </Stack>
  );
}
