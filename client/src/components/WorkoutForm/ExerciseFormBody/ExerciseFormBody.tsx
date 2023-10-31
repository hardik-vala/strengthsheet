import { set } from "date-fns";
import { DrillSet, Exercise, SetType } from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { ExerciseFormHeader } from "../ExerciseFormHeader/ExerciseFormHeader";
import { ShelfForm } from "../ShelfForm/ShelfForm";
import { WorkoutValues } from "../common";

export interface ExerciseFormBodyProps {
  exercise: Exercise;
  sets: DrillSet[];
  circuitKey?: string;
  workoutHistory: WorkoutHistory | null;
  workoutValues: WorkoutValues;
  onUpdateWorkoutValues: (updatedWorkoutValues: WorkoutValues) => void;
}

export function ExerciseFormBody({
  exercise,
  sets,
  circuitKey,
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
            title={getShelfTitle(set)}
            exercise={exercise}
            set={set}
            circuitKey={circuitKey}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        );
      })}
    </>
  );
}

function getShelfTitle(set: DrillSet): string {
  switch(set.setType) {
    case SetType.Drop:
      return "D";
    case SetType.Warmup:
      return "W";
    default:
      return `${set.index}`;
  }
}