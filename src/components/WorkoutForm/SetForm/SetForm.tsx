import { View } from "react-native";
import { Divider, Text } from "react-native-paper";
import {
  DrillSet,
  Exercise,
  SetType
} from "../../../models/Workout/Core";
import {
  WorkoutHistory,
  WorkoutHistoryRecord
} from "../../../models/Workout/WorkoutHistory";
import { MeasureFormInput } from "../MeasureFormInput/MeasureFormInput";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "../common";

const NUM_RECENT_WORKOUT_HISTORY_RECORDS = 3;

export interface SetFormProps {
  exercise: Exercise;
  set: DrillSet;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function SetForm({
  exercise,
  set,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: SetFormProps) {
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
          <Text variant="bodyLarge">
            {set.setType === SetType.Warmup ? "W" : `Set ${set.index}`}
          </Text>
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
                      set.setType,
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
  setType: SetType,
  n: number
): ExerciseMeasureHistoryRecord[] {
  return selectWorkoutHistory(
    filterRecentWorkoutHistory(records, n),
    measureKey,
    setType
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
  setType: SetType
): ExerciseMeasureHistoryRecord[] {
  return records.flatMap((r) => {
    return r.exercises
      .filter(
        (e) => e.key.measureKey === measureKey && e.key.setType === setType
      )
      .map((e) => ({
        timestamp: r.startTimestamp,
        measureKey: e.key,
        value: e.value,
      }));
  });
}