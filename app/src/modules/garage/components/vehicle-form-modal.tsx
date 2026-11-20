import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { VStack } from "@/components/ui/vstack";
import { CarFront, Pencil } from "lucide-react-native";
import { Text, View } from "react-native";

type VehicleFormModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  isSaving: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function VehicleFormModal({
  isOpen,
  isEditing,
  isSaving,
  onClose,
  onConfirm,
}: VehicleFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <View className="flex items-center justify-center size-13 bg-accent-foreground rounded-full">
            {isEditing ? (
              <Pencil size={24} color="#F5A525" />
            ) : (
              <CarFront size={24} color="#F5A525" />
            )}
          </View>
          <Text className="text-primary font-space-grotesk-semibold text-lg">
            {isEditing ? "Save these changes?" : "Add this vehicle?"}
          </Text>
        </ModalHeader>
        <VStack className="gap-y-4">
          <Text className="text-secondary font-body text-sm text-center">
            {isEditing
              ? "The vehicle details will be updated in your garage."
              : "This vehicle will be added to your garage and set as the active vehicle."}
          </Text>
          <HStack className="gap-x-2.5">
            <Button
              variant="secondary"
              className="grow"
              onPress={onClose}
              isDisabled={isSaving}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button className="grow" onPress={onConfirm} isDisabled={isSaving}>
              <ButtonText>
                {isSaving
                  ? "Saving..."
                  : isEditing
                    ? "Save changes"
                    : "Add vehicle"}
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
}
