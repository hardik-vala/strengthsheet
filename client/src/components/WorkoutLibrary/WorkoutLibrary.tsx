import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  List,
  Modal,
  Portal,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WorkoutTemplateRegistry } from "../../data/registry";
import { WorkoutTemplate } from "../../models/Workout/WorkoutTemplate";

interface WorkoutLibraryProps {
  workoutTemplateRegistry: WorkoutTemplateRegistry;
  onStartWorkout: (workoutTemplate: WorkoutTemplate) => void;
}

export function WorkoutLibrary({
  workoutTemplateRegistry,
  onStartWorkout,
}: WorkoutLibraryProps) {
  const [previewWorkout, setPreviewWorkout] = useState(null);

  return (
    <SafeAreaProvider>
      <Portal>
        {previewWorkout && (
          <WorkoutPreviewModal
            visible={!!previewWorkout}
            onDismiss={() => setPreviewWorkout(null)}
            workoutTemplate={previewWorkout}
            onStartWorkout={() => {
              onStartWorkout(previewWorkout);
              setPreviewWorkout(null);
            }}
          />
        )}
      </Portal>
      <ScrollView style={{ marginTop: "25%" }}>
        <List.Section title="Workouts">
          {Object.values(workoutTemplateRegistry).map((w: WorkoutTemplate) => {
            return (
              <WorkoutListItem
                key={w.key}
                title={w.displayName}
                description={w.note}
                iconKey={w.iconKey}
                onPress={() => setPreviewWorkout(w)}
              />
            );
          })}
        </List.Section>
      </ScrollView>
    </SafeAreaProvider>
  );
}

interface WorkoutPreviewModalProps {
  visible: boolean;
  onDismiss: () => void;
  workoutTemplate: WorkoutTemplate;
  onStartWorkout: () => void;
}

function WorkoutPreviewModal({
  visible,
  onDismiss,
  workoutTemplate,
  onStartWorkout,
}: WorkoutPreviewModalProps) {
  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
    >
      <List.Section title={workoutTemplate.displayName}>
        <List.Item title="TODO" />
      </List.Section>
      <Button mode="contained-tonal" onPress={onStartWorkout}>
        Start
      </Button>
      <Button mode="contained-tonal" onPress={onDismiss}>
        Cancel
      </Button>
    </Modal>
  );
}

interface WorkoutListItemProps {
  title: string;
  description: string;
  iconKey: string;
  onPress: () => void;
}

function WorkoutListItem({
  title,
  description,
  iconKey,
  onPress,
}: WorkoutListItemProps) {
  return (
    <List.Item
      title={title}
      description={description}
      descriptionNumberOfLines={1}
      descriptionEllipsizeMode="tail"
      left={() => <List.Icon icon={iconKey} />}
      onPress={onPress}
      style={workoutLibraryStyles.workoutListItem}
    />
  );
}

const workoutLibraryStyles = StyleSheet.create({
  workoutListItem: {
    marginHorizontal: 12,
  },
});
