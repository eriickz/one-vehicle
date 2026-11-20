import { Tag } from "lucide-react-native";
import { CATEGORY_ICONS } from "../constants";

export function getCategoryIcon(name: string) {
  return CATEGORY_ICONS.find((icon) => icon.name === name)?.Icon ?? Tag;
}
