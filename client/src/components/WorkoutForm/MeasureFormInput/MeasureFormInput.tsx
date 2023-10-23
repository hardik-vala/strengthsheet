import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import {
  DrillSet,
  Exercise,
  ExerciseMeasure,
  WorkoutValueKey,
  isValidMeasureValue,
} from "../../../models/Workout/Core";
import { MeasureHistoryList } from "../MeasureHistoryList/MeasureHistoryList";
import { ExerciseMeasureHistoryRecord, WorkoutValues } from "../common";

export interface MeasureFormInputProps {
  circuitKey?: string;
  exercise: Exercise;
  set: DrillSet;
  measure: ExerciseMeasure;
  measureHistory: ExerciseMeasureHistoryRecord[];
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function MeasureFormInput({
  circuitKey,
  exercise,
  set,
  measure,
  measureHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: MeasureFormInputProps) {
  const [currWorkoutValue, setCurrWorkoutValue] = useState("");
  const [isError, setIsError] = useState(false);

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
        defaultValue=""
        dense={true}
        error={isError}
        mode="flat"
        onChangeText={(text) => {
          const isValid = isValidMeasureValue(text, measure.unit);
          setCurrWorkoutValue(text);
          setIsError(text && !isValid);
          if (!text || isValid) {
            workoutValues[workoutValueKeyStr] = text;
            onUpdateWorkoutValues(workoutValues);
          }
        }}
        placeholder={getPlaceholder()}
        style={{
          textAlign: "right",
          height: 30,
          width: 80,
        }}
        value={currWorkoutValue}
      />
      {measureHistory && measureHistory.length > 0 && (
        <MeasureHistoryList measureHistory={measureHistory} />
      )}
    </View>
  );
}
