import { Text } from "react-native-paper";
import { SetType } from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { ExerciseTemplate } from "../../../models/Workout/WorkoutTemplate";
import { ShelfForm } from "../ShelfForm/ShelfForm";
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
      <Text variant="bodyMedium">{exerciseTemplate.note}</Text>
      {exerciseTemplate.sets.map((set) => {
        return (
          <ShelfForm
            key={`${set.setType.toString()}:${set.index}`}
            title={set.setType === SetType.Warmup ? "W" : `Set ${set.index}`}
            exercise={exerciseTemplate.exercise}
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
