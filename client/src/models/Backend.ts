import { ExerciseHistoryRecord } from "./Workout/WorkoutHistory";

export interface FetchWorkoutHistoryResponse {
  workoutKey: string;
  records: {
    startTimestamp: string;
    exercises: ExerciseHistoryRecord[];
  }[];
}