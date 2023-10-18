import { View } from "react-native";
import { Text } from "react-native-paper";
import { DrillSet, SetType } from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { CircuitTemplate } from "../../../models/Workout/WorkoutTemplate";
import { ShelfForm } from "../ShelfForm/ShelfForm";
import { WorkoutValues, workoutFormStyles } from "../common";

export interface CircuitFormProps {
  circuitTemplate: CircuitTemplate;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function CircuitForm({
  circuitTemplate,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: CircuitFormProps) {
  return (
    <>
      <Text variant="titleMedium" style={workoutFormStyles.drillTitle}>
        {circuitTemplate.displayName}
      </Text>
      <View style={workoutFormStyles.drillNoteContainer}>
        <Text variant="bodyMedium" style={workoutFormStyles.drillNoteText}>
          {circuitTemplate.note}
        </Text>
      </View>
      {circuitTemplate.sets.map((set) => {
        return (
          <CircuitSetForm
            key={`${set.setType.toString()}:${set.index}`}
            circuitTemplate={circuitTemplate}
            set={set}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        );
      })}
    </>
  );
}

export interface CircuitSetFormProps {
  circuitTemplate: CircuitTemplate;
  set: DrillSet;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function CircuitSetForm({
  circuitTemplate,
  set,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}) {
  return (
    <>
      <Text variant="titleSmall">
        {set.setType === SetType.Warmup ? "Warmup" : `Set ${set.index}`}
      </Text>
      {circuitTemplate.circuit.exercises.map((wrappedExercise) => {
        return (
          <ShelfForm
            key={wrappedExercise.exercise.key}
            title={wrappedExercise.exercise.displayName}
            exercise={wrappedExercise.exercise}
            set={set}
            circuitKey={circuitTemplate.circuit.key}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        );
      })}
    </>
  );
}
