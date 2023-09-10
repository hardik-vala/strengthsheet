import { format as formatDate } from "date-fns";
import { View } from "react-native";
import { List, Text, TextInput } from "react-native-paper";
import { WorkoutFieldHistory } from "../../models/WorkoutHistory";
import "./FormInputField.css";

const DATETIME_FORMAT = "MM/dd/yyyy HH:mm";

interface FormInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  fieldHistory: WorkoutFieldHistory;
  onChangeText: (text: string) => void;
  error: boolean;
}

export function FormInputField({
  label,
  placeholder,
  value,
  fieldHistory,
  onChangeText,
  error = false,
}: FormInputFieldProps) {
  return (
    <View
      style={{
        flexDirection: "column",
        width: "100%",
      }}
    >
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
      <List.Accordion
        title="History"
        titleStyle={{ fontSize: 12, marginLeft: -5 }}
        style={{ marginLeft: 0, marginTop: -25, marginBottom: -10 }}
        left={(props) => <List.Icon {...props} icon="history" />}
      >
        {fieldHistory.historyRecords.map((r) => (
          <View
            key={r.datetime.toString()}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: 5,
              marginRight: 10
            }}
          >
            <Text>{formatDate(r.datetime, DATETIME_FORMAT)}</Text>
            <Text>{r.fieldValue}</Text>
          </View>
        ))}
      </List.Accordion>
    </View>
  );
}
