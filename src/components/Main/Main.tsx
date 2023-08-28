import DateTimePicker from "@react-native-community/datetimepicker";
import { format, setDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { appendToGoogleSheet } from "../../services/sheetService";
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
      <Text>Date:</Text>
      <DateTimePicker
        testID="datePicker"
        value={dateInput}
        mode="date"
        is24Hour={true}
        onChange={(_, d) => setDateInput(d)}
      />
      <Text>Start time:</Text>
      <DateTimePicker
        testID="timePicker"
        value={startTimeInput}
        mode="time"
        is24Hour={true}
        onChange={(_, t) => setStartTimeInput(t)}
      />
      <FormInputField
        label="Total Time"
        placeholder="30:00"
        value={rowerWorkoutTimeInput}
        onChangeText={(text) => setRowerWorkoutTimeInput(text)}
      />
      <FormInputField
        label="Total Distance"
        placeholder="5000m"
        value={rowerWorkoutDistanceInput}
        onChangeText={(text) => setRowerWorkoutDistanceInput(text)}
      />
      <Button title="Submit" onPress={_appendToSheet} />
      <SignOut onSignOut={onSignOut} />
    </>
  );
}
