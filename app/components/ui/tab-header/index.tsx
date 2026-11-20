import { Href, useRouter } from "expo-router";
import { HStack } from "../hstack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { Button, ButtonIcon } from "../button";
import { Text } from "react-native";

export type TabHeaderProps = {
  hidden?: boolean;
  title?: string;
  btnText?: string;
  btnHref?: Href;
};

export const TabHeader = ({
  hidden,
  title,
  btnText,
  btnHref,
}: TabHeaderProps) => {
  const router = useRouter();

  if (hidden || !title) {
    return null;
  }

  return (
    <SafeAreaView>
      <HStack className="items-center bg-transparent justify-center mt-4">
        <Button
          className="bg-transparent data-[active=true]:bg-white/5 absolute left-0"
          onPress={() => router.back()}
        >
          <ButtonIcon as={() => <ChevronLeft size={24} color="#EDF2F7" />} />
        </Button>
        <Text className="font-space-grotesk-semibold text-primary text-base">
          {title}
        </Text>
      </HStack>
    </SafeAreaView>
  );
};
