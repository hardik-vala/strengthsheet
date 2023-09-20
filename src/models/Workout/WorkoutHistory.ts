import { WorkoutValueKey } from "./Core";
import { WorkoutTemplate } from "./WorkoutTemplate";

export interface WorkoutHistory {
  workoutTemplate: WorkoutTemplate
  records: WorkoutHistoryRecord[];
}

export interface WorkoutHistoryRecord {
  startTimestamp: Date;
  exercises: ExerciseHistoryRecord[];
};

export interface ExerciseHistoryRecord {
  key: WorkoutValueKey;
  value: string;
}
