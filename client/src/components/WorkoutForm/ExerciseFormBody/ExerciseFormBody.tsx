import { DrillSet, Exercise, SetType } from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { ExerciseFormHeader } from "../ExerciseFormHeader/ExerciseFormHeader";
import { ShelfForm } from "../ShelfForm/ShelfForm";
import { WorkoutValues } from "../common";

export interface ExerciseFormBodyProps {
  exercise: Exercise;
  sets: DrillSet[];
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function ExerciseFormBody({
  exercise,
  sets,
  workoutHistory,
  workoutValues,
  onUpdateWorkoutValues,
}: ExerciseFormBodyProps) {
  return (
    <>
      <ExerciseFormHeader exercise={exercise} />
      {sets.map((set) => {
        return (
          <ShelfForm
            key={`${set.setType.toString()}:${set.index}`}
            title={set.setType === SetType.Warmup ? "W" : `${set.index}`}
            exercise={exercise}
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
