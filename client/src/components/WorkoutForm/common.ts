import { WorkoutValueKey } from "../../models/Workout/Core";

export interface ExerciseMeasureHistoryRecord {
  timestamp: Date;
  key: WorkoutValueKey;
  value: string;
}

export type WorkoutValues = { [k: string]: string };
