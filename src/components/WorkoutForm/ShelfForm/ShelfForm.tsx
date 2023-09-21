import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import { DrillSet, Exercise } from "../../../models/Workout/Core";
import {
  WorkoutHistory,
  WorkoutHistoryRecord,
} from "../../../models/Workout/WorkoutHistory";
import { MeasureFormInput } from "../MeasureFormInput/MeasureFormInput";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "../common";

const NUM_RECENT_WORKOUT_HISTORY_RECORDS = 3;

export interface ShelfFormProps {
  title: string;
  exercise: Exercise;
  set: DrillSet;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function ShelfForm({
  title,
  exercise,
  set,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: ShelfFormProps) {
  return (
    <View style={{ width: "100%" }}>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Text variant="bodyLarge">{title}</Text>
        </View>
        {exercise.measures.map((measure) => {
          return (
            <MeasureFormInput
              key={measure.key}
              exercise={exercise}
              set={set}
              measure={measure}
              measureHistory={
                workoutHistory
                  ? projectWorkoutHistory(
                      workoutHistory.records,
                      measure.key,
                      set,
                      NUM_RECENT_WORKOUT_HISTORY_RECORDS
                    )
                  : []
              }
              workoutValues={workoutValues}
              onUpdateWorkoutValues={onUpdateWorkoutValues}
            />
          );
        })}
      </View>
    </View>
  );
}

function projectWorkoutHistory(
  records: WorkoutHistoryRecord[],
  measureKey: string,
  set: DrillSet,
  n: number
): ExerciseMeasureHistoryRecord[] {
  return selectWorkoutHistory(
    filterRecentWorkoutHistory(records, n),
    measureKey,
    set
  );
}

function filterRecentWorkoutHistory(
  records: WorkoutHistoryRecord[],
  n: number
): WorkoutHistoryRecord[] {
  const sortedRecords = [...records];
  sortedRecords.sort(
    (r1, r2) => r2.startTimestamp.getTime() - r1.startTimestamp.getTime()
  );
  return sortedRecords.slice(0, n);
}

function selectWorkoutHistory(
  records: WorkoutHistoryRecord[],
  measureKey: string,
  set: DrillSet
): ExerciseMeasureHistoryRecord[] {
  return records.flatMap((r) => {
    return r.exercises
      .filter(
        (e) =>
          e.key.measureKey === measureKey &&
          e.key.setIndex === set.index &&
          e.key.setType === set.setType
      )
      .map((e) => ({
        timestamp: r.startTimestamp,
        measureKey: e.key,
        value: e.value,
      }));
  });
}
