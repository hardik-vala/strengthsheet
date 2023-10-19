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
  drillNoteContainer: {
    backgroundColor: "gray",
    padding: 5,
  },
  drillNoteText: {
    color: "black",
  },
  exerciseFormShelfContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  exerciseFormShelfSetContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  exerciseFormShelfText: {
    color: "gray",
    fontWeight: "bold",
    width: 80
  },
});
