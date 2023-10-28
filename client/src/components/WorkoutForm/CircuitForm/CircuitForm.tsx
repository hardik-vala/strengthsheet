import { View } from "react-native";
import { Text } from "react-native-paper";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";
import { CircuitTemplate } from "../../../models/Workout/WorkoutTemplate";
import { ExerciseFormBody } from "../ExerciseFormBody/ExerciseFormBody";
import { WorkoutValues } from "../common";
import { styles } from "../style";

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
      <Text variant="titleMedium" style={styles.drillTitle}>
        {circuitTemplate.displayName}
      </Text>
      {circuitTemplate.note && <View style={styles.drillNoteContainer}>
        <Text variant="bodyMedium" style={styles.drillNoteText}>
          {circuitTemplate.note}
        </Text>
      </View>}
      {circuitTemplate.circuit.exercises.map((exercise) => (
        <View key={exercise.exercise.key}>
          <Text
            variant="titleSmall"
            style={{
              color: "lightblue",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {exercise.exercise.displayName}
          </Text>
          <ExerciseFormBody
            exercise={exercise.exercise}
            sets={circuitTemplate.sets}
            circuitKey={circuitTemplate.circuit.key}
            workoutHistory={workoutHistory}
            workoutValues={workoutValues}
            onUpdateWorkoutValues={onUpdateWorkoutValues}
          />
        </View>
      ))}
    </>
  );
}
