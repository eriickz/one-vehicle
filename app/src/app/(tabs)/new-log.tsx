import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  DateTimePicker,
  DateTimePickerIcon,
  DateTimePickerInput,
  DateTimePickerTrigger,
} from "@/components/ui/date-time-picker";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { Calendar, Gauge, Info, X } from "lucide-react-native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function NewLog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HStack className="items-center bg-transparent justify-center mt-4 mb-6">
        <Button
          className="bg-transparent data-[active=true]:bg-white/5 absolute left-0"
          onPress={() => router.back()}
        >
          <ButtonIcon as={() => <X size={20} color="#EDF2F7" />} />
        </Button>
        <Text className="font-space-grotesk-semibold text-primary text-base">
          New Log
        </Text>
      </HStack>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack className="w-full gap-y-4 px-5">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Category</FormControlLabelText>
              </FormControlLabel>
              <ScrollView
                contentContainerClassName="flex gap-x-2 mt-0.5"
                showsHorizontalScrollIndicator={false}
                alwaysBounceHorizontal
                horizontal
              >
                <Button variant="chip" size="sm" isHovered>
                  <ButtonText>Maintenance</ButtonText>
                </Button>
                <Button variant="chip" size="sm">
                  <ButtonText>Repair</ButtonText>
                </Button>
                <Button variant="chip" size="sm">
                  <ButtonText>Fuel</ButtonText>
                </Button>
                <Button variant="chip" size="sm">
                  <ButtonText>+ New</ButtonText>
                </Button>
              </ScrollView>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Title / Concept</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField placeholder="Oil Change & Filter" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Date</FormControlLabelText>
              </FormControlLabel>
              <DateTimePicker
                mode="date"
                value={date}
                onChange={setDate}
                locale="en-US"
                format="MMM DD, YYYY"
              >
                <DateTimePickerTrigger>
                  <DateTimePickerInput />
                  <DateTimePickerIcon
                    as={() => <Calendar size={16} color="#5E6B7A" />}
                  />
                </DateTimePickerTrigger>
              </DateTimePicker>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Mileage</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField inputMode="numeric" placeholder="84,000 mi" />
                <InputSlot>
                  <InputIcon as={() => <Gauge size={16} color="#5E6B7A" />} />
                </InputSlot>
              </Input>
              <FormControlHelper className="flex gap-x-2 w-[90%]">
                <Info size={14} color="#5E6B7A" />
                <FormControlHelperText>
                  Mileage can't be lower than this vehicle's initial mileage
                  (61,000 mi).
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Cost</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField inputMode="decimal" placeholder="5.00" />
              </Input>
            </FormControl>
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Notes</FormControlLabelText>
              </FormControlLabel>
              <Textarea>
                <TextareaInput placeholder="Optional notes, parts, workshop…" />
              </Textarea>
            </FormControl>
            <Button className="mt-3 mb-6">
              <ButtonText>Save Log</ButtonText>
            </Button>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
