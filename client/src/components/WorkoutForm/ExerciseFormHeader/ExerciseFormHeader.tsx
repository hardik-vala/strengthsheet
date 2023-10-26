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
      <View style={{ ...styles.exerciseFormShelfSetContainer, marginLeft: 50 }}>
        <Text variant="bodyMedium" style={styles.exerciseFormHeaderText}>
          Set
        </Text>
      </View>
      <View style={{...styles.shelfFormInputsContainer, marginRight: 40}}>
        {exercise.measures.map((measure) => (
          <View key={measure.key} style={styles.exerciseFormTextContainer}>
            <Text
            style={styles.exerciseFormHeaderText}
              variant="bodyMedium"
            >
              {measure.displayName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
