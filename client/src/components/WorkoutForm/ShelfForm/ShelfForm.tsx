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
  const [isChecked, setIsChecked] = useState(false);

  const recentWorkoutHistoryRecords = workoutHistory
    ? filterRecentWorkoutHistory(
        workoutHistory.records,
        NUM_RECENT_WORKOUT_HISTORY_RECORDS
      )
    : [];

  const shelfHistory = filterShelfHistory(
    recentWorkoutHistoryRecords,
    exercise,
    set,
    circuitKey
  );

  let shelfCheckButtonState;
  if (
    isAllEmptyShelfInputWorkoutValues(workoutValues, exercise, set, circuitKey)
  ) {
    shelfCheckButtonState = ShelfCheckButtonState.Disabled;
  } else {
    shelfCheckButtonState = isChecked
      ? ShelfCheckButtonState.Checked
      : ShelfCheckButtonState.Active;
  }

  return (
    <View style={{ width: "100%" }}>
      <Divider />
      <View
        style={{
          ...styles.exerciseFormShelfContainer,
          backgroundColor: isChecked
            ? "rgba(144, 238, 144, 0.2)"
            : "transparent",
        }}
      >
        <View style={styles.exerciseFormShelfLeftGroupContainer}>
          {shelfHistory.length > 0 ? (
            <IconButton
              icon={
                showHistory
                  ? "arrow-down-drop-circle-outline"
                  : "arrow-right-drop-circle-outline"
              }
              iconColor="gray"
              size={20}
              onPress={() => setShowHistory(!showHistory)}
              testID={buildShelfHistoryButtonTestID(exercise, set, circuitKey)}
            />
          ) : (
            <View style={styles.exerciseFormShelfEmptyFirstEntry}></View>
          )}
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
                measureHistory={selectWorkoutHistory(
                  recentWorkoutHistoryRecords,
                  workoutValueKey
                )}
                workoutValues={workoutValues}
                onUpdateWorkoutValues={(
                  updatedWorkoutValues: WorkoutValues
                ) => {
                  // If the check button was checked, then clear it when the
                  // form inputs are cleared.
                  if (
                    isAllEmptyShelfInputWorkoutValues(
                      updatedWorkoutValues,
                      exercise,
                      set,
                      circuitKey
                    )
                  ) {
                    setIsChecked(false);
                  }
                  onUpdateWorkoutValues(updatedWorkoutValues);
                }}
              />
            );
          })}
          <ShelfCheckButton
            state={shelfCheckButtonState}
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
      </View>
      {showHistory && (
        <ShelfHistory
          exercise={exercise}
          set={set}
          circuitKey={circuitKey}
          history={shelfHistory}
        />
      )}
    </View>
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

function filterShelfHistory(
  records: WorkoutHistoryRecord[],
  exercise: Exercise,
  set: DrillSet,
  circuitKey?: string
): WorkoutHistoryRecord[] {
  return records.flatMap((r) => {
    let hasNonEmptyMeasureValue = false;
    const measureValues = exercise.measures.map((measure) => {
      const workoutValueKey = WorkoutValueKey.create(
        circuitKey,
        exercise.key,
        set.index,
        set.setType,
        measure.key
      );

      const value = r.exercises.find((e) => workoutValueKey.equals(e.key));

      if (value) {
        hasNonEmptyMeasureValue = true;
      }

      return value;
    });

    return hasNonEmptyMeasureValue
      ? [
          {
            ...r,
            exercises: measureValues,
          },
        ]
      : [];
  });
}

function buildShelfHistoryButtonTestID(
  exercise: Exercise,
  set: DrillSet,
  circuitKey?: string
) {
  return `${circuitKey ? `${circuitKey}:` : ""}${exercise.key}:${set.index}:${
    set.setType
  }`;
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

function isAllEmptyShelfInputWorkoutValues(
  workoutValues: WorkoutValues,
  exercise: Exercise,
  set: DrillSet,
  circuitKey?: string
): Boolean {
  let isAllEmpty = true;
  exercise.measures.forEach((measure) => {
    const workoutValueKeyStr = WorkoutValueKey.create(
      circuitKey,
      exercise.key,
      set.index,
      set.setType,
      measure.key
    ).toString();

    if (workoutValues[workoutValueKeyStr]) {
      isAllEmpty = false;
    }
  });

  return isAllEmpty;
}

enum ShelfCheckButtonState {
  Active,
  Checked,
  Disabled,
}

interface ShelfCheckButtonProps {
  state: ShelfCheckButtonState;
  onPress: () => void;
}

export function ShelfCheckButton({ state, onPress }: ShelfCheckButtonProps) {
  const theme = useTheme();

  let backgroundColor, iconColor;
  switch (state) {
    case ShelfCheckButtonState.Active:
      backgroundColor = theme.colors.outline;
      iconColor = "black";
      break;
    case ShelfCheckButtonState.Checked:
      backgroundColor = "lightgreen";
      iconColor = "black";
      break;
    case ShelfCheckButtonState.Disabled:
      backgroundColor = "rgba(51, 45, 65, 1)";
      iconColor = theme.colors.surfaceDisabled;
      break;
  }

  return (
    <IconButton
      disabled={state === ShelfCheckButtonState.Disabled}
      icon="check"
      iconColor={iconColor}
      onPress={() => state !== ShelfCheckButtonState.Disabled && onPress()}
      size={15}
      style={{ backgroundColor: backgroundColor }}
      testID="shelf-check-button"
    />
  );
}

interface ShelfHistoryProps {
  exercise: Exercise;
  set: DrillSet;
  circuitKey?: string;
  history: WorkoutHistoryRecord[];
}

export function ShelfHistory({
  exercise,
  set,
  circuitKey,
  history,
}: ShelfHistoryProps) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.backdrop,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-evenly",
        paddingBottom: 15,
      }}
    >
      {history.map((r) => (
        <View
          key={r.startTimestamp.getTime()}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginTop: 10,
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

              const workoutValue = r.exercises.find(
                (e) => e && workoutValueKey.equals(e.key)
              );

              return (
                <View key={measure.key}>
                  <TextInput
                    disabled={true}
                    contentStyle={styles.measureFormInputContent}
                    dense={true}
                    mode="outlined"
                    outlineStyle={styles.measureFormInputOutline}
                    placeholder={workoutValue ? workoutValue.value : ""}
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
