import { act } from "@testing-library/react-native";
import { format as formatDate, parse as parseDate } from "date-fns";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Appbar, Button, Divider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GoogleSheetDataValues } from "../../models/GoogleSheet";
import {
  WorkoutFieldHistory,
  WorkoutHistory,
} from "../../models/WorkoutHistory";
import {
  appendToGoogleSheet,
  readSheetData,
} from "../../services/sheetService";
import { styles } from "../../styles/style";
import { DateTimePicker } from "../DateTimePicker/DateTimePicker";
import { FormInputField } from "../FormInputField/FormInputField";

const SPREADSHEET_ID = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

const DISTANCE_REGEX = /^\d+(\.\d+)?\s*(mi|km|m|ft|yd|cm|mm|in)$/;
const TIMER_MINUTES_SECONDS_REGEX = /^[0-5][0-9]:[0-5][0-9]$/;
const TIMER_HOURS_MINUTES_SECONDS_REGEX = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

interface WorkoutFormProps {
  onBack: () => void;
}

export function WorkoutForm({ onBack }: WorkoutFormProps) {
  const [dateInput, setDateInput] = useState(new Date());
  const [startTimeInput, setStartTimeInput] = useState(new Date());
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [rowerWorkoutTimeInput, setRowerWorkoutTimeInput] = useState("");
  const [rowerWorkoutDistanceInput, setRowerWorkoutDistanceInput] =
    useState("");
  const [isAppendingToSheet, setIsAppendingToSheet] = useState(false);

  useEffect(() => {
    async function readSheetValuesWrapper() {
      const sheetData = await readSheetData(SPREADSHEET_ID);

      if (!sheetData.values) {
        throw new Error(`Spreadsheet has no values.`);
      }

      const workoutHistory = convertSheetValuesToWorkoutHistory(
        sheetData.values
      );

      act(() => {
        setWorkoutHistory(workoutHistory);
      });
    }

    readSheetValuesWrapper();
  }, []);

  async function _appendToSheet() {
    try {
      await appendToGoogleSheet(SPREADSHEET_ID, [
        formatDate(dateInput, "MM/dd/yyyy"),
        formatDate(startTimeInput, "HH:mm"),
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
    <SafeAreaProvider>
    <View style={styles.center}>
      <Appbar.Header>
        <Appbar.BackAction onPress={onBack} testID="back-action" />
      </Appbar.Header>
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
        fieldHistory={getWorkoutFieldHistory(workoutHistory, "Time", 3)}
        onChangeText={(text) => setRowerWorkoutTimeInput(text)}
        error={!isValidTimerInput(rowerWorkoutTimeInput)}
      />
      <Divider />
      <FormInputField
        label="Total Distance"
        placeholder="5000m"
        value={rowerWorkoutDistanceInput}
        fieldHistory={getWorkoutFieldHistory(workoutHistory, "Distance", 3)}
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
    </View>
    </SafeAreaProvider>
  );
}

function convertSheetValuesToWorkoutHistory(
  sheetValues: GoogleSheetDataValues
): WorkoutHistory {
  const workoutHistory = [];
  const [header, ...rest] = sheetValues;
  for (const row of rest) {
    const record = {
      datetime: parseDate(
        `${row[0]} ${row[1]}`,
        "MM/dd/yyyy HH:mm",
        new Date()
      ),
      workoutValues: {},
    };
    for (let i = 2; i < row.length; i++) {
      record.workoutValues[header[i]] = row[i];
    }
    workoutHistory.push(record);
  }

  return workoutHistory;
}

function getWorkoutFieldHistory(
  workoutHistory: WorkoutHistory,
  fieldName: string,
  n: number
): WorkoutFieldHistory {
  return {
    fieldName: fieldName,
    historyRecords: selectWorkHistory(
      getRecentWorkoutHistory(workoutHistory, n),
      fieldName
    ),
  };
}

function getRecentWorkoutHistory(workoutHistory: WorkoutHistory, n: number) {
  const sortedWorkoutHistory = [...workoutHistory];
  sortedWorkoutHistory.sort(
    (r1, r2) => r2.datetime.getTime() - r1.datetime.getTime()
  );
  return sortedWorkoutHistory.slice(0, n);
}

function selectWorkHistory(workoutHistory: WorkoutHistory, fieldName: string) {
  return workoutHistory.map((r) => {
    return { datetime: r.datetime, fieldValue: r.workoutValues[fieldName] };
  });
}

function isValidTimerInput(timer: string): boolean {
  if (timer === "") {
    return true;
  }

  return (
    TIMER_MINUTES_SECONDS_REGEX.test(timer) ||
    TIMER_HOURS_MINUTES_SECONDS_REGEX.test(timer)
  );
}

function isValidDistanceInput(distance: string): boolean {
  if (distance === "") {
    return true;
  }

  return DISTANCE_REGEX.test(distance);
}
