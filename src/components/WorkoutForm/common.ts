import { WorkoutValueKey } from "../../models/Workout/Core";

export interface ExerciseMeasureHistoryRecord {
  timestamp: Date;
  measureKey: WorkoutValueKey;
  value: string;
}

export type WorkoutValues = { [k: string]: string };