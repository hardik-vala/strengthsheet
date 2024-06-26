import { useState } from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import {
  DrillSet,
  Exercise,
  ExerciseMeasure,
  WorkoutValueKey,
  isValidMeasureValue,
} from "../../../models/Workout/Core";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "../common";
import { styles } from "../style";

export interface MeasureFormInputProps {
  circuitKey?: string;
  exercise: Exercise;
  set: DrillSet;
  measure: ExerciseMeasure;
  measureHistory: ExerciseMeasureHistoryRecord[];
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
  onError: () => void;
}

export function MeasureFormInput({
  circuitKey,
  exercise,
  set,
  measure,
  measureHistory,
  workoutValues,
  onUpdateWorkoutValues,
  onError,
}: MeasureFormInputProps) {
  const [currWorkoutValue, setCurrWorkoutValue] = useState("");
  const [isError, setIsError] = useState(false);

  const theme = useTheme();

  const workoutValueKeyStr = WorkoutValueKey.create(
    circuitKey,
    exercise.key,
    set.index,
    set.setType,
    measure.key
  ).toString();

  function getPlaceholder() {
    if (!measureHistory || measureHistory.length == 0) {
      return "";
    }

    const sortedHistory = [...measureHistory];
    sortedHistory.sort(
      (r1, r2) => r2.timestamp.getTime() - r1.timestamp.getTime()
    );

    return sortedHistory[0].value;
  }

  return (
    <View>
      <TextInput
        activeOutlineColor={theme.colors.secondary}
        contentStyle={styles.measureFormInputContent}
        defaultValue=""
        dense={true}
        error={isError}
        mode="outlined"
        onChangeText={(text) => {
          const isValid = isValidMeasureValue(text, measure.unit);
          setCurrWorkoutValue(text);
          
          const nextIsError = text && !isValid;
          setIsError(nextIsError);
          if (nextIsError) {
            onError();
          }

          if (!text || isValid) {
            workoutValues[workoutValueKeyStr] = text;
            onUpdateWorkoutValues(workoutValues);
          }
        }}
        outlineColor="transparent"
        outlineStyle={styles.measureFormInputOutline}
        placeholder={getPlaceholder()}
        placeholderTextColor="darkgray"
        style={{
          ...styles.exerciseFormTextContainer,
          ...styles.measureFormInput,
          backgroundColor: theme.colors.secondaryContainer,
        }}
        value={currWorkoutValue}
      />
    </View>
  );
}
