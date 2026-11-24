import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronDown, ChevronLeft, Gauge } from "lucide-react-native";
import { Text } from "react-native";
import { Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { VehicleFormModal } from "@/src/modules/garage/components/vehicle-form-modal";
import { useFetchCurrencies } from "@/src/hooks/use-fetch-currencies";
import { useVehicleForm } from "@/src/modules/garage/hooks/use-vehicle-form";

export default function VehicleForm() {
  const router = useRouter();
  const { currencies } = useFetchCurrencies();
  const { id } = useLocalSearchParams();
  const vehicleId = typeof id === "string" ? id : "new";

  const {
    control,
    requestSubmit,
    confirmSubmit,
    cancelSubmit,
    errors,
    isSaving,
    isConfirmOpen,
    isEditing,
  } = useVehicleForm(vehicleId, () => router.replace("/garage"));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack className="items-center bg-transparent justify-center mt-4 mb-6">
        <Button
          className="bg-transparent data-[active=true]:bg-white/5 absolute left-0"
          onPress={() => router.back()}
        >
          <ButtonIcon as={() => <ChevronLeft size={20} color="#EDF2F7" />} />
        </Button>
        <Text className="font-space-grotesk-semibold text-primary text-base">
          {isEditing ? "Edit Vehicle" : "Add Vehicle"}
        </Text>
      </HStack>

      <VStack className="w-full gap-y-4 px-5">
        <FormControl isInvalid={!!errors.make}>
          <FormControlLabel>
            <FormControlLabelText>Make</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="make"
            render={({ field }) => (
              <Input isInvalid={!!errors.make}>
                <InputField
                  placeholder="Toyota"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.make?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.model}>
          <FormControlLabel>
            <FormControlLabelText>Model</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="model"
            render={({ field }) => (
              <Input isInvalid={!!errors.model}>
                <InputField
                  placeholder="Corolla"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.model?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.year}>
          <FormControlLabel>
            <FormControlLabelText>Year</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <Input isInvalid={!!errors.year}>
                <InputField
                  inputMode="numeric"
                  placeholder="2019"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>{errors.year?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.licensePlate}>
          <FormControlLabel>
            <FormControlLabelText>License Plate</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="licensePlate"
            render={({ field }) => (
              <Input isInvalid={!!errors.licensePlate}>
                <InputField
                  autoCapitalize="characters"
                  placeholder="AB-123-CD"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.licensePlate?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.initialMileage}>
          <FormControlLabel>
            <FormControlLabelText>Initial Mileage</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="initialMileage"
            render={({ field }) => (
              <Input isInvalid={!!errors.initialMileage}>
                <InputField
                  inputMode="numeric"
                  placeholder="61000"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                />
                <InputSlot>
                  <InputIcon as={() => <Gauge size={16} color="#5E6B7A" />} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.initialMileage?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.currencyId}>
          <FormControlLabel>
            <FormControlLabelText>Preferred Currency</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="currencyId"
            render={({ field }) => {
              const selected = currencies.find(
                (currency) => String(currency.id) === field.value,
              );
              const selectedLabel = selected
                ? `${selected.code} - ${selected.name} (${selected.symbol})`
                : undefined;

              return (
                <Select
                  selectedValue={field.value}
                  initialLabel={selectedLabel}
                  onValueChange={field.onChange}
                  isDisabled={currencies.length === 0}
                  isInvalid={!!errors.currencyId}
                >
                  <SelectTrigger variant="outline">
                    <Text className="flex-1 px-3 text-primary text-base">
                      {selectedLabel ?? "Select a currency"}
                    </Text>
                    <SelectIcon as={ChevronDown} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {currencies.map((currency) => (
                        <SelectItem
                          key={currency.id}
                          label={`${currency.code} - ${currency.name} (${currency.symbol})`}
                          value={String(currency.id)}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              );
            }}
          />
          <FormControlHelper>
            <FormControlHelperText>
              Used to format every cost recorded for this vehicle.
            </FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorText>
              {errors.currencyId?.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button
          className="mt-4"
          onPress={() => requestSubmit()}
          isDisabled={isSaving}
        >
          <ButtonText>{isSaving ? "Saving..." : "Save Vehicle"}</ButtonText>
        </Button>
      </VStack>

      <VehicleFormModal
        isOpen={isConfirmOpen}
        isEditing={isEditing}
        isSaving={isSaving}
        onClose={cancelSubmit}
        onConfirm={confirmSubmit}
      />
    </SafeAreaView>
  );
}
