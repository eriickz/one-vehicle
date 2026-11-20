import { Button } from "@/components/ui/button";
import { TabHeader } from "@/components/ui/tab-header";
import { Tabs, useRouter, useSegments } from "expo-router";
import { PlatformPressable } from "expo-router/build/react-navigation/index.js";
import {
  Gauge,
  ScrollText,
  Plus,
  CarFront,
  Settings2,
} from "lucide-react-native";

const ICON_SIZE = 20;

export default function TabsLayout() {
  const router = useRouter();
  const segments = useSegments();

  const hideTab = [...segments].includes("new-log");

  return (
    <Tabs
      tabBar={hideTab ? () => null : undefined}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        animation: "fade",
        sceneStyle: {
          backgroundColor: "#0D0F14",
        },
        tabBarActiveTintColor: "#F5A525",
        tabBarInactiveTintColor: "#5E6B7A",
        tabBarLabelStyle: {
          fontFamily: "Inter_600SemiBold",
          fontSize: 10,
        },
        tabBarStyle: {
          width: "90%",
          height: 65,
          padding: 6,
          backgroundColor: "rgba(23, 29, 38, .8)",
          borderRadius: 28,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, .07)",
          marginBottom: 26,
          marginHorizontal: "auto",
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarButton: (props) => (
          <PlatformPressable
            {...props}
            style={[
              props.style,
              {
                justifyContent: "center",
              },
            ]}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Gauge size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <ScrollText size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-log"
        options={{
          title: "New Log",
          tabBarButton: () => {
            return (
              <Button
                className="p-0 rounded-full size-11.5"
                onPress={() => router.navigate("/(tabs)/new-log")}
              >
                <Plus size={ICON_SIZE} color="#171208" />
              </Button>
            );
          },
        }}
      />
      <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color }) => (
            <CarFront size={ICON_SIZE} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Settings2 size={ICON_SIZE} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
