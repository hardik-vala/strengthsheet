import { format, setDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, View } from "react-native";
import { Divider, Text, TextInput } from "react-native-paper";
import { appendToGoogleSheet } from "../../services/sheetService";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { FormInputField } from "../FormInputField/FormInputField";
import { SignOut } from "../SignOut/SignOut";

interface MainProps {
  onSignOut: () => void;
}

export function Main({ onSignOut }: MainProps) {
  const [dateInput, setDateInput] = useState(new Date());
  const [startTimeInput, setStartTimeInput] = useState(new Date());
  const [rowerWorkoutTimeInput, setRowerWorkoutTimeInput] = useState("");
  const [rowerWorkoutDistanceInput, setRowerWorkoutDistanceInput] =
    useState("");

  async function _appendToSheet() {
    const spreadsheetId = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

    try {
      await appendToGoogleSheet(spreadsheetId, [
        format(dateInput, "MM/dd/yyyy"),
        format(startTimeInput, "HH:mm"),
        rowerWorkoutTimeInput,
        rowerWorkoutDistanceInput,
      ]);
    } catch (error) {
      Alert.alert("Error writing to Google Sheets");
      console.error(error);
      return;
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <DateTimePicker
          label="Date"
          testID="datePicker"
          value={dateInput}
          isDate={true}
          onChange={(_, d) => setDateInput(d)}
        />
        <DateTimePicker
          label="Start time"
          testID="timePicker"
          value={startTimeInput}
          isDate={false}
          onChange={(_, t) => setStartTimeInput(t)}
        />
      </View>
      <Divider />
      <FormInputField
        label="Total Time"
        placeholder="30:00"
        value={rowerWorkoutTimeInput}
        onChangeText={(text) => setRowerWorkoutTimeInput(text)}
      />
      <Divider />
      <FormInputField
        label="Total Distance"
        placeholder="5000m"
        value={rowerWorkoutDistanceInput}
        onChangeText={(text) => setRowerWorkoutDistanceInput(text)}
      />
      <Divider />
      <Button title="Submit" onPress={_appendToSheet} />
      <SignOut onSignOut={onSignOut} />
    </>
  );
}
