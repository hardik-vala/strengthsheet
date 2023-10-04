import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { format as formatDate } from "date-fns";
import { WORKOUT_HISTORY_TABLE, WorkoutHistoryTableRow } from "../database";
import { SHEET_PROVIDER } from "./sheetProvider";

const SPREADSHEET_ID = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

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
      serializeRecordAsSheetRow(record)
    );
  }

  fetchWorkoutHistory(workoutKey: string): WorkoutHistoryTableRow {
    return WORKOUT_HISTORY_TABLE[workoutKey];
  }
}

export const WORKOUT_HISTORY_PROVIDER = WorkoutHistoryProvider.getInstance();

function serializeRecordAsSheetRow(record: WorkoutHistoryRecord): string[] {
  const dateStr = formatDate(record.startTimestamp, "MM/dd/yyyy");
  const startTimeStr = formatDate(record.startTimestamp, "HH:mm");

  return [dateStr, startTimeStr].concat(record.exercises.map((e) => e.value));
}
