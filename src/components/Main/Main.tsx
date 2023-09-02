import { format } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, View } from "react-native";
import { Button, Divider } from "react-native-paper";
import { appendToGoogleSheet } from "../../services/sheetService";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { FormInputField } from "../FormInputField/FormInputField";
import { SignOut } from "../SignOut/SignOut";

const DISTANCE_REGEX = /^\d+(\.\d+)?\s*(mi|km|m|ft|yd|cm|mm|in)$/;
const TIMER_MINUTES_SECONDS_REGEX = /^[0-5][0-9]:[0-5][0-9]$/;
const TIMER_HOURS_MINUTES_SECONDS_REGEX = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

interface MainProps {
  onSignOut: () => void;
}

export function Main({ onSignOut }: MainProps) {
  const [dateInput, setDateInput] = useState(new Date());
  const [startTimeInput, setStartTimeInput] = useState(new Date());
  const [rowerWorkoutTimeInput, setRowerWorkoutTimeInput] = useState("");
  const [rowerWorkoutDistanceInput, setRowerWorkoutDistanceInput] =
    useState("");
  const [isAppendingToSheet, setIsAppendingToSheet] = useState(false);

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
    <View>
      <StatusBar style="auto" />
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
        error={!isValidTimerInput(rowerWorkoutTimeInput)}
      />
      <Divider />
      <FormInputField
        label="Total Distance"
        placeholder="5000m"
        value={rowerWorkoutDistanceInput}
        onChangeText={(text) => setRowerWorkoutDistanceInput(text)}
        error={!isValidDistanceInput(rowerWorkoutDistanceInput)}
      />
      <Divider />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Button
          buttonColor="blue"
          compact={true}
          loading={isAppendingToSheet}
          mode="contained"
          onPress={async () => {
            setIsAppendingToSheet(true);
            await _appendToSheet();
            setIsAppendingToSheet(false);
          }}
          contentStyle={{
            flexDirection: "row",
          }}
          style={{
            marginTop: 25,
            height: 40,
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isAppendingToSheet ? "Saving" : "Save"}
        </Button>
      </View>
      <SignOut onSignOut={onSignOut} />
    </View>
  );
}

function isValidTimerInput(timer: string): boolean {
  if (timer === "" ) {
    return true;
  }

  return (
    TIMER_MINUTES_SECONDS_REGEX.test(timer) ||
    TIMER_HOURS_MINUTES_SECONDS_REGEX.test(timer)
  );
}

function isValidDistanceInput(distance: string): boolean {
  if (distance === "" ) {
    return true;
  }

  return DISTANCE_REGEX.test(distance);
}
