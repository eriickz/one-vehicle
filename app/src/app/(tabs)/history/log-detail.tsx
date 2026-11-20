import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Banknote,
  Calendar,
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  CircleDollarSign,
  Gauge,
  Trash2,
} from "lucide-react-native";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { useRouter } from "expo-router";
import { Divider } from "@/components/ui/divider";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

export default function LogDetail() {
  const router = useRouter();
  const toast = useToast();

  const showToast = (action: "success" | "error") => {
    toast.show({
      placement: "top",
      render: () => (
        <Toast action={action}>
          <HStack className="gap-x-2.5 items-center">
            {action === "success" && (
              <View className="size-9 rounded-full bg-success/10 flex items-center justify-center">
                <CircleCheck size={18} color="#4CC289" />
              </View>
            )}
            {action === "error" && (
              <View className="size-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <CircleAlert size={18} color="#F26F6F" />
              </View>
            )}
            <VStack className="gap-y-0.5">
              <ToastTitle>Log saved</ToastTitle>
              <ToastDescription>Oil Change & Filter · $129.99</ToastDescription>
            </VStack>
          </HStack>
        </Toast>
      ),
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <HStack className="items-center bg-transparent justify-center mt-4 mb-6">
        <Button
          className="bg-transparent data-[active=true]:bg-white/5 absolute left-0"
          onPress={() => router.back()}
        >
          <ButtonIcon as={() => <ChevronLeft size={20} color="#EDF2F7" />} />
        </Button>
        <Text className="font-space-grotesk-semibold text-primary text-base">
          Log Detail
        </Text>
      </HStack>
      <VStack className="gap-y-5 px-5 pb-6">
        <VStack className="gap-y-3.5 p-4.5 bg-card rounded-2xl">
          <VStack className="gap-y-2 items-start">
            <Text className="font-space-grotesk-semibold text-primary text-xl">
              Oil Change & Filter
            </Text>
            <View className="flex items-center justify-center bg-card border border-border rounded-full px-2.5 py-2">
              <Text className="text-accent font-inter-medium text-xs">
                Maintenance
              </Text>
            </View>
          </VStack>
          <Divider />
          <VStack className="gap-y-3.5">
            <HStack className="justify-between">
              <HStack className="gap-x-1.5 items-center">
                <Calendar size={16} color="#5E6B7A" />
                <Text className="text-secondary font-body text-sm">Date</Text>
              </HStack>
              <Text className="text-primary font-inter-semibold text-sm">
                Oct 12, 2025
              </Text>
            </HStack>
            <HStack className="justify-between">
              <HStack className="gap-x-1.5 items-center">
                <Gauge size={16} color="#5E6B7A" />
                <Text className="text-secondary font-body text-sm">
                  Mileage
                </Text>
              </HStack>
              <Text className="text-primary font-inter-semibold text-sm">
                84,320 mi
              </Text>
            </HStack>
            <HStack className="justify-between">
              <HStack className="gap-x-1.5 items-center">
                <CircleDollarSign size={16} color="#5E6B7A" />
                <Text className="text-secondary font-body text-sm">Cost</Text>
              </HStack>
              <Text className="text-primary font-inter-semibold text-sm">
                $129.99
              </Text>
            </HStack>
            <HStack className="justify-between">
              <HStack className="gap-x-1.5 items-center">
                <Banknote size={16} color="#5E6B7A" />
                <Text className="text-secondary font-body text-sm">
                  Currency
                </Text>
              </HStack>
              <Text className="text-primary font-inter-semibold text-sm">
                USD — US Dollar
              </Text>
            </HStack>
          </VStack>
        </VStack>
        <VStack className="gap-y-1.5 p-4.5 bg-card rounded-2xl">
          <Text className="text-muted font-inter-semibold text-xs">Notes</Text>
          <Text className="text-secondary font-body text-sm">
            Full synthetic 5W-30, cabin filter swapped too. Done at Midas on 5th
            Ave. Next due around 90,000 mi.
          </Text>
        </VStack>
        <HStack className="gap-x-3">
          <Button variant="secondary" className="grow">
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button variant="destructive" className="grow">
            <ButtonText>Delete</ButtonText>
          </Button>
        </HStack>
      </VStack>
      <Modal isOpen={true}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <View className="flex items-center justify-center size-13 bg-destructive/10 rounded-full">
              <Trash2 size={24} color="#F26F6F" />
            </View>
            <Text className="text-primary font-space-grotesk-semibold text-lg">
              Delete this log?
            </Text>
          </ModalHeader>
          <VStack className="gap-y-4">
            <Text className="text-secondary font-body text-sm text-center">
              “Oil Change & Filter” from Oct 12, 2025 will be removed and its
              cost subtracted from your totals. This can't be undone.
            </Text>
            <HStack className="gap-x-2.5">
              <Button variant="secondary" className="grow">
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                className="grow bg-destructive data-[active=true]:bg-destructive/80"
                onPress={() => showToast("error")}
              >
                <ButtonText>Delete Log</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </ModalContent>
      </Modal>
    </SafeAreaView>
  );
}
