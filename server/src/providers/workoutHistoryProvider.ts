import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { WORKOUT_HISTORY_TABLE, WorkoutHistoryTableRow } from "../database";

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
    workoutKey: string,
    record: WorkoutHistoryRecord
  ): void {
    if (!WORKOUT_HISTORY_TABLE[workoutKey]) {
      throw new Error(`No workout history for "${workoutKey}"`);
    }

    WORKOUT_HISTORY_TABLE[workoutKey].records.push(record);
  }

  fetchWorkoutHistory(workoutKey: string): WorkoutHistoryTableRow {
    return WORKOUT_HISTORY_TABLE[workoutKey];
  }
}

export const WORKOUT_HISTORY_PROVIDER = WorkoutHistoryProvider.getInstance();
