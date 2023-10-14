import { View } from "react-native";
import { Appbar, Avatar, Text } from "react-native-paper";
import { WorkoutTemplate } from "../../models/Workout/WorkoutTemplate";

interface WorkoutFinishProps {
  workoutTemplate: WorkoutTemplate;
  onDismiss: () => void;
}

export function WorkoutFinish({
  workoutTemplate,
  onDismiss,
}: WorkoutFinishProps) {
  return (
    <View>
      <Appbar.Header statusBarHeight={15}>
        <Appbar.Action icon="close" onPress={onDismiss} />
      </Appbar.Header>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Text
          variant="headlineSmall"
          style={{ fontWeight: "bold", textAlign: "center" }}
        >{`${workoutTemplate.displayName} workout complete!`}</Text>
        <Avatar.Icon
          color="green"
          icon="check-circle"
          size={80}
          style={{ marginTop: 5 }}
        />
      </View>
    </View>
  );
}
