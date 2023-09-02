import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import "./FormInputField.css";

interface FormInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error: boolean;
}

export function FormInputField({
  label,
  placeholder,
  value,
  onChangeText,
  error = false,
}: FormInputFieldProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Text variant="bodyLarge">{label}</Text>
      </View>
      <TextInput
        id="form-input-field"
        style={{
          textAlign: "right",
          height: 30,
          width: 100,
        }}
        mode="flat"
        dense={true}
        defaultValue=""
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
      />
    </View>
  );
}
