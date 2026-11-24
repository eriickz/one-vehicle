import { Text, View } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { LucideIcon } from "lucide-react-native";

type BlankStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function BlankState({ icon: Icon, title, description }: BlankStateProps) {
  return (
    <VStack className="py-9.5 px-7 items-center justify-center bg-card border border-border rounded-2xl gap-y-2">
      <View className="rounded-full size-15 bg-surface flex justify-center items-center">
        <Icon color="#5E6B7A" size={26} />
      </View>
      <Text className="text-primary font-space-grotesk-bold text-base">
        {title}
      </Text>
      <Text className="font-body text-sm text-center text-secondary mt-0.5">
        {description}
      </Text>
    </VStack>
  );
}
