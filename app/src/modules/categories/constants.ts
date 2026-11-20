import {
  Calendar,
  Disc,
  Fuel,
  Gauge,
  Shield,
  Tag,
  Wrench,
} from "lucide-react-native";

export const CATEGORY_COLORS = [
  { name: "Amber", value: "#F5A525" },
  { name: "Coral", value: "#F26F6F" },
  { name: "Blue", value: "#5B9DF5" },
  { name: "Purple", value: "#B58DF2" },
  { name: "Green", value: "#4CC289" },
] as const;

export const CATEGORY_ICONS = [
  { name: "wrench", Icon: Wrench },
  { name: "disc", Icon: Disc },
  { name: "fuel", Icon: Fuel },
  { name: "shield", Icon: Shield },
  { name: "calendar", Icon: Calendar },
  { name: "tag", Icon: Tag },
  { name: "gauge", Icon: Gauge },
] as const;

export type CategoryIconName = (typeof CATEGORY_ICONS)[number]["name"];

export const DEFAULT_CATEGORY_COLOR = CATEGORY_COLORS[0].value;
export const DEFAULT_CATEGORY_ICON = CATEGORY_ICONS[0].name;
