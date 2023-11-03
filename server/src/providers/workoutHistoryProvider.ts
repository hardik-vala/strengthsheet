import { WorkoutValueKey } from "@models/Workout/Core";
import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { format as formatDate } from "date-fns";
import { WORKOUT_HISTORY_TABLE, WorkoutHistoryTableRow } from "../database";
import { SHEET_PROVIDER } from "./sheetProvider";

const SPREADSHEET_ID = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";
const SHEET_DATE_COLUMN_TITLE = "Date";
const SHEET_START_TIME_COLUMN_TITLE = "Start Time";
const SHEET_ELAPSED_TIME_COLUMN_TITLE = "Elapsed Time";

class WorkoutHistoryProvider {
  private static instance: WorkoutHistoryProvider;

  private constructor() {}

  static getInstance() {
    if (!WorkoutHistoryProvider.instance) {
      WorkoutHistoryProvider.instance = new WorkoutHistoryProvider();
    }

    return WorkoutHistoryProvider.instance;
  }

  appendRecordToWorkoutHistory(
    accessToken: string,
    workoutKey: string,
    record: WorkoutHistoryRecord
  ): void {
    if (!WORKOUT_HISTORY_TABLE[workoutKey]) {
      throw new Error(`No workout history for "${workoutKey}"`);
    }

    WORKOUT_HISTORY_TABLE[workoutKey].records.push(record);

    SHEET_PROVIDER.appendRowToGoogleSheet(
      accessToken,
      SPREADSHEET_ID,
      WORKOUT_HISTORY_TABLE[workoutKey].sheetId,
      serializeRecordAsSheetRow(
        WORKOUT_HISTORY_TABLE[workoutKey].sheetHeader,
        record
      )
    );
  }

  fetchWorkoutHistory(workoutKey: string): WorkoutHistoryTableRow {
    return WORKOUT_HISTORY_TABLE[workoutKey];
  }
}

export const WORKOUT_HISTORY_PROVIDER = WorkoutHistoryProvider.getInstance();

function serializeRecordAsSheetRow(
  sheetHeader: string[],
  record: WorkoutHistoryRecord
): string[] {
  const dateStr = formatDate(record.startTimestamp, "MM/dd/yyyy");
  const startTimeStr = formatDate(record.startTimestamp, "HH:mm");
  const elapsedTime = getFormattedTime(record.elapsedTime);

  const rowMap: { [k: string]: string } = {
    [SHEET_DATE_COLUMN_TITLE]: dateStr,
    [SHEET_START_TIME_COLUMN_TITLE]: startTimeStr,
    [SHEET_ELAPSED_TIME_COLUMN_TITLE]: elapsedTime,
  };

  record.exercises.forEach(
    (e) => (rowMap[workoutValueKeyToString(e.key)] = e.value)
  );

  const sheetRow = [];
  for (let h of sheetHeader) {
    if (h in rowMap) {
      sheetRow.push(rowMap[h]);
    } else {
      console.error();
    }
  }

  return sheetRow;
}

function getFormattedTime(ms: number) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(seconds / 60);

  return `${minutes}:${seconds}`;
}

function workoutValueKeyToString(key: WorkoutValueKey): string {
  let s = `${key.exerciseKey}:${key.setIndex}:${key.setType.toString()}:${
    key.measureKey
  }`;

  if (key.circuitKey) {
    s = `${key.circuitKey}:${s}`;
  }

  return s;
}
