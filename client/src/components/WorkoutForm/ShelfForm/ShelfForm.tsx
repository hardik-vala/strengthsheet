import { format as formatDate } from "date-fns";
import { useState } from "react";
import { View } from "react-native";
import {
  Chip,
  Divider,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
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

const HISTORY_RECORD_DATETIME_FORMAT = "MM/dd/yyyy";
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
  const [showHistory, setShowHistory] = useState(false);

  const theme = useTheme();

  return (
    <View style={{ width: "100%" }}>
      <Divider />
      <View style={styles.exerciseFormShelfContainer}>
        <View style={styles.exerciseFormShelfLeftGroupContainer}>
          <IconButton
            icon={
              showHistory
                ? "arrow-down-drop-circle-outline"
                : "arrow-right-drop-circle-outline"
            }
            iconColor="gray"
            size={20}
            onPress={() => setShowHistory(!showHistory)}
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
      {showHistory && (
        <ShelfHistory
          exercise={exercise}
          set={set}
          circuitKey={circuitKey}
          workoutHistory={workoutHistory}
        />
      )}
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

interface ShelfHistoryProps {
  exercise: Exercise;
  set: DrillSet;
  circuitKey?: string;
  workoutHistory: WorkoutHistory | null;
}

export function ShelfHistory({
  exercise,
  set,
  circuitKey,
  workoutHistory,
}: ShelfHistoryProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.backdrop,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: 150,
      }}
    >
      {filterRecentWorkoutHistory(
        workoutHistory.records,
        NUM_RECENT_WORKOUT_HISTORY_RECORDS
      ).map((r) => (
        <View
          key={r.startTimestamp.getTime()}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              ...styles.exerciseFormShelfSetContainer,
              marginLeft: 45,
              paddingTop: 5,
            }}
          >
            <Text variant="bodySmall" style={{ color: "gray" }}>
              {formatDate(r.startTimestamp, HISTORY_RECORD_DATETIME_FORMAT)}
            </Text>
          </View>
          <View
            style={{
              ...styles.shelfFormInputsContainer,
              marginRight: 43,
            }}
          >
            {exercise.measures.map((measure) => {
              const workoutValueKey = WorkoutValueKey.create(
                circuitKey,
                exercise.key,
                set.index,
                set.setType,
                measure.key
              );

              const workoutValue = r.exercises.find((e) =>
                workoutValueKey.equals(e.key)
              );

              return (
                <View key={measure.key}>
                  <TextInput
                    disabled={true}
                    contentStyle={styles.measureFormInputContent}
                    dense={true}
                    mode="outlined"
                    outlineStyle={styles.measureFormInputOutline}
                    placeholder={workoutValue.value}
                    placeholderTextColor="gray"
                    style={{
                      ...styles.exerciseFormTextContainer,
                      ...styles.measureFormInput,
                      backgroundColor: theme.colors.surfaceDisabled,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
}
