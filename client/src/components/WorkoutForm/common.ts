import { StyleSheet } from "react-native";
import { WorkoutValueKey } from "../../models/Workout/Core";

export interface ExerciseMeasureHistoryRecord {
  timestamp: Date;
  key: WorkoutValueKey;
  value: string;
}

export type WorkoutValues = { [k: string]: string };

export const workoutFormStyles = StyleSheet.create({
  drillTitle: {
    color: "deepskyblue",
    fontWeight: "bold",
    marginVertical: 10,
  },
});