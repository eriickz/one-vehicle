import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  SelectIcon,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { ChevronDown, Gauge } from "lucide-react-native";

export default function NewVehicle() {
  return (
    <VStack className="w-full gap-y-4 px-5">
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Make</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField placeholder="Toyota" />
        </Input>
      </FormControl>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Model</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField placeholder="Corolla" />
        </Input>
      </FormControl>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Year</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField inputMode="numeric" placeholder="2019" />
        </Input>
      </FormControl>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>License Plate</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField placeholder="AB-123-CD" />
        </Input>
      </FormControl>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Initial Mileage</FormControlLabelText>
        </FormControlLabel>
        <Input>
          <InputField placeholder="61,000 mi" />
          <InputSlot>
            <InputIcon as={() => <Gauge size={16} color="#5E6B7A" />} />
          </InputSlot>
        </Input>
      </FormControl>
      <FormControl>
        <FormControlLabel>
          <FormControlLabelText>Preferred Currency</FormControlLabelText>
        </FormControlLabel>
        <Select defaultValue="1">
          <SelectTrigger variant="outline">
            <SelectInput />
            <SelectIcon as={ChevronDown} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="USD - USD Dollar ($)" value="1" />
              <SelectItem label="EUR - Euro (€)" value="2" />
              <SelectItem label="GBP — British Pound (£)" value="3" />
            </SelectContent>
          </SelectPortal>
        </Select>
        <FormControlHelper>
          <FormControlHelperText>
            Used to format every cost recorded for this vehicle.
          </FormControlHelperText>
        </FormControlHelper>
      </FormControl>
      <Button className="mt-4">
        <ButtonText>Save Vehicle</ButtonText>
      </Button>
    </VStack>
  );
}
