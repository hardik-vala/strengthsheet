import { View } from "react-native";
import { Text } from "react-native-paper";
import { SetType } from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { ExerciseTemplate } from "../../../models/Workout/WorkoutTemplate";
import { ExerciseFormHeader } from "../ExerciseFormHeader/ExerciseFormHeader";
import { ShelfForm } from "../ShelfForm/ShelfForm";
import { WorkoutValues } from "../common";
import { styles } from "../style";

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
      <Text variant="titleMedium" style={styles.drillTitle}>
        {exerciseTemplate.displayName}
      </Text>
      <View style={styles.drillNoteContainer}>
        <Text variant="bodyMedium" style={styles.drillNoteText}>
          {exerciseTemplate.note}
        </Text>
      </View>
      <ExerciseFormHeader exercise={exerciseTemplate.exercise} />
      {exerciseTemplate.sets.map((set) => {
        return (
          <ShelfForm
            key={`${set.setType.toString()}:${set.index}`}
            title={set.setType === SetType.Warmup ? "W" : `${set.index}`}
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
