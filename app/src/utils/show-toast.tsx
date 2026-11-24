import { CircleAlert, CircleCheck } from "lucide-react-native";
import { View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { tva } from "@gluestack-ui/utils/nativewind-utils";

const toastIconContainerStyle = tva({
  base: "size-9 rounded-full flex items-center justify-center",
  variants: {
    action: {
      success: "bg-success/10",
      error: "bg-destructive/10",
    },
  },
});

export function showToast(
  toast: ReturnType<typeof useToast>,
  action: "success" | "error",
  title: string,
  description: string,
) {
  toast.show({
    placement: "top",
    duration: 3000,
    render: () => (
      <Toast action={action}>
        <HStack className="gap-x-2.5 items-center">
          <View className={toastIconContainerStyle({ action })}>
            {action === "success" ? (
              <CircleCheck size={18} color="#4CC289" />
            ) : (
              <CircleAlert size={18} color="#F26F6F" />
            )}
          </View>
          <VStack className="gap-y-0.5">
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
          </VStack>
        </HStack>
      </Toast>
    ),
  });
}
