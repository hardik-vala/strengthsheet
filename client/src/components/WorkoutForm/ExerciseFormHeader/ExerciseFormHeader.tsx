import { View } from "react-native";
import { Text } from "react-native-paper";
import { Exercise } from "../../../models/Workout/Core";
import { workoutFormStyles } from "../common";

export interface ExerciseFormHeaderProps {
  exercise: Exercise;
}

export function ExerciseFormHeader({ exercise }: ExerciseFormHeaderProps) {
  return (
    <View style={workoutFormStyles.exerciseFormShelfContainer}>
      <View style={workoutFormStyles.exerciseFormShelfSetContainer}>
        <Text
          variant="bodyLarge"
          style={workoutFormStyles.exerciseFormShelfText}
        >
          Set
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {exercise.measures.map((measure) => (
          <Text
            key={measure.key}
            variant="bodyLarge"
            style={workoutFormStyles.exerciseFormShelfText}
          >
            {measure.displayName}
          </Text>
        ))}
      </View>
    </View>
  );
}
