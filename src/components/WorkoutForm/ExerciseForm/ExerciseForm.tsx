import { Text } from "react-native-paper";
import {
  WorkoutHistory
} from "../../../models/Workout/WorkoutHistory";
import {
  ExerciseTemplate
} from "../../../models/Workout/WorkoutTemplate";
import { SetForm } from "../SetForm/SetForm";
import { WorkoutValues } from "../common";

export interface ExerciseFormProps {
  exerciseTemplate: ExerciseTemplate;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function ExerciseForm({
  exerciseTemplate,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: ExerciseFormProps) {
  return (
    <>
      <Text variant="titleMedium">{exerciseTemplate.displayName}</Text>
      {exerciseTemplate.sets.map((s) => {
        return (
          <SetForm
            key={`${s.setType.toString()} : ${s.index}`}
            exercise={exerciseTemplate.exercise}
            set={s}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        );
      })}
    </>
  );
}
