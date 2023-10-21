import { View } from "react-native";
import { Text } from "react-native-paper";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { ExerciseTemplate } from "../../../models/Workout/WorkoutTemplate";
import { ExerciseFormBody } from "../ExerciseFormBody/ExerciseFormBody";
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
      <ExerciseFormBody 
        exercise={exerciseTemplate.exercise}
        sets={exerciseTemplate.sets}
        workoutHistory={workoutHistory}
        workoutValues={workoutValues}
        onUpdateWorkoutValues={onUpdateWorkoutValues}
      />
    </>
  );
}
