import { View } from "react-native";
import { Chip, Divider, IconButton, Text, useTheme } from "react-native-paper";
import {
  DrillSet,
  Exercise,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import {
  WorkoutHistory,
  WorkoutHistoryRecord,
} from "../../../models/Workout/WorkoutHistory";
import { MeasureFormInput } from "../MeasureFormInput/MeasureFormInput";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "../common";
import { styles } from "../style";

const NUM_RECENT_WORKOUT_HISTORY_RECORDS = 3;

export interface ShelfFormProps {
  title: string;
  exercise: Exercise;
  set: DrillSet;
  circuitKey?: string;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function ShelfForm({
  title,
  exercise,
  set,
  circuitKey,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: ShelfFormProps) {
  const theme = useTheme();

  return (
    <View style={{ width: "100%" }}>
      <Divider />
      <View style={styles.exerciseFormShelfContainer}>
        <View style={styles.exerciseFormShelfLeftGroupContainer}>
          <IconButton
            icon="arrow-right-drop-circle-outline"
            iconColor="gray"
            size={20}
          />
          <View style={styles.exerciseFormShelfSetContainer}>
            <Chip compact={true} textStyle={{ fontSize: 12 }}>
              {title}
            </Chip>
          </View>
        </View>
        <View style={styles.shelfFormInputsContainer}>
          {exercise.measures.map((measure) => {
            const workoutValueKey = WorkoutValueKey.create(
              circuitKey,
              exercise.key,
              set.index,
              set.setType,
              measure.key
            );

            return (
              <MeasureFormInput
                key={measure.key}
                circuitKey={circuitKey}
                exercise={exercise}
                set={set}
                measure={measure}
                measureHistory={
                  workoutHistory
                    ? projectWorkoutHistory(
                        workoutHistory.records,
                        workoutValueKey,
                        NUM_RECENT_WORKOUT_HISTORY_RECORDS
                      )
                    : []
                }
                workoutValues={workoutValues}
                onUpdateWorkoutValues={onUpdateWorkoutValues}
              />
            );
          })}
          <IconButton
            icon="check"
            iconColor="gray"
            size={15}
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          />
        </View>
      </View>
    </View>
  );
}

function projectWorkoutHistory(
  records: WorkoutHistoryRecord[],
  workoutValueKey: WorkoutValueKey,
  n: number
): ExerciseMeasureHistoryRecord[] {
  return selectWorkoutHistory(
    filterRecentWorkoutHistory(records, n),
    workoutValueKey
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
  workoutValueKey: WorkoutValueKey
): ExerciseMeasureHistoryRecord[] {
  return records.flatMap((r) => {
    return r.exercises
      .filter((e) => e.key.equals(workoutValueKey))
      .map((e) => ({
        timestamp: r.startTimestamp,
        key: e.key,
        value: e.value,
      }));
  });
}
