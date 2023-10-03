import { ExerciseHistoryRecord, WorkoutHistoryRecord } from "./Workout/WorkoutHistory";

export interface FetchWorkoutHistoryResponse {
  workoutKey: string;
  records: {
    startTimestamp: string;
    exercises: ExerciseHistoryRecord[];
  }[];
}

export interface SaveWorkoutHistoryRecordRequestBody {
  workoutKey: string;
  workoutRecord: WorkoutHistoryRecord;
}