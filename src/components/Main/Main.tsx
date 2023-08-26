import DateTimePicker from "@react-native-community/datetimepicker";
import { format, setDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { appendToGoogleSheet } from "../../services/sheetService";
import { SignOut } from "../SignOut/SignOut";

interface MainProps {
  onSignOut: () => void;
}

export function Main({ onSignOut }: MainProps) {
  const [dateInput, setDateInput] = useState(new Date());
  const [rowerWorkoutTimeInput, setRowerWorkoutTimeInput] = useState("");
  const [rowerWorkoutDistanceInput, setRowerWorkoutDistanceInput] =
    useState("");

  async function _appendToSheet() {
    const spreadsheetId = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

    try {
      await appendToGoogleSheet(spreadsheetId, [
        format(dateInput, "MM/dd/yyyy"),
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
        testID="dateTimePicker"
        value={dateInput}
        mode="date"
        is24Hour={true}
        onChange={(_, d) => setDateInput(d)}
      />
      <Text>Enter rower workout time:</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
        placeholder="e.g. 30:00"
        value={rowerWorkoutTimeInput}
        onChangeText={(text) => setRowerWorkoutTimeInput(text)}
      />
      <Text>Enter distance:</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
        placeholder="e.g. 5000m"
        value={rowerWorkoutDistanceInput}
        onChangeText={(text) => setRowerWorkoutDistanceInput(text)}
      />
      <Button title="Submit" onPress={_appendToSheet} />
      <SignOut onSignOut={onSignOut} />
    </>
  );
}
