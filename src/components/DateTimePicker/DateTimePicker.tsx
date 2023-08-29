import RNCDateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { Text } from "react-native-paper";

interface DateTimePickerProps {
  label: string;
  testID: string;
  value: Date;
  isDate: boolean;
  onChange: (e, d: Date) => void;
}

export function DateTimePicker({
  label,
  testID,
  value,
  isDate,
  onChange,
}: DateTimePickerProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        padding: 5
      }}
    >
      <Text variant="bodyLarge">{label}</Text>
      <RNCDateTimePicker
        testID={testID}
        value={value}
        mode={isDate ? "date" : "time"}
        is24Hour={true}
        onChange={onChange}
        style={{marginTop: 3}}
      />
    </View>
  );
}
