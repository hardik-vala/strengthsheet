import { ExerciseHistoryRecord, WorkoutHistoryRecord } from "./Workout/WorkoutHistory";

export interface FetchWorkoutHistoryResponse {
  workoutKey: string;
  records: SerializedWorkoutHistoryRecord[];
}

export interface SaveWorkoutHistoryRecordRequestBody {
  workoutKey: string;
  workoutRecord: SerializedWorkoutHistoryRecord;
}

interface SerializedWorkoutHistoryRecord {
  startTimestamp: string;
  elapsedTime: number;
  exercises: ExerciseHistoryRecord[];
}