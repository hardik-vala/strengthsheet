import { View } from "react-native";
import { Text } from "react-native-paper";
import { Exercise } from "../../../models/Workout/Core";
import { styles } from "../style";

export interface ExerciseFormHeaderProps {
  exercise: Exercise;
}

export function ExerciseFormHeader({ exercise }: ExerciseFormHeaderProps) {
  return (
    <View style={styles.exerciseFormShelfContainer}>
      <View style={styles.exerciseFormShelfSetContainer}>
        <Text variant="bodyMedium" style={styles.exerciseFormShelfText}>
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
            variant="bodyMedium"
            style={styles.exerciseFormShelfText}
          >
            {measure.displayName}
          </Text>
        ))}
      </View>
    </View>
  );
}
