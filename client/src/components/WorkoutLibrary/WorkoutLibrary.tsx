import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Divider, List, Modal, Portal } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WorkoutTemplateRegistry } from "../../data/registry";
import { SetType } from "../../models/Workout/Core";
import {
  DrillTemplate,
  WorkoutTemplate,
} from "../../models/Workout/WorkoutTemplate";

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
        <List.Section
          title="Workouts"
          titleStyle={{ fontSize: 32, fontWeight: "bold" }}
        >
          {Object.values(workoutTemplateRegistry).map((w: WorkoutTemplate) => {
            return (
              <WorkoutListItem
                key={w.key}
                title={w.displayName}
                description={getWorkoutDescription(w)}
                iconKey={w.iconKey}
                onPress={() => setPreviewWorkout(w)}
              />
            );
          })}
          <Divider style={workoutLibraryStyles.workoutListItemDivider} />
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
        {workoutTemplate.drills.map((d) => (
          <List.Item key={getDrillKey(d)} title={getDrillPreview(d)} />
        ))}
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
    <>
      <Divider style={workoutLibraryStyles.workoutListItemDivider} />
      <List.Item
        title={title}
        titleStyle={{ marginBottom: 5, fontWeight: "bold" }}
        description={description}
        descriptionStyle={{ fontSize: 13 }}
        descriptionNumberOfLines={2}
        descriptionEllipsizeMode="tail"
        left={() => <List.Icon icon={iconKey} />}
        onPress={onPress}
        style={workoutLibraryStyles.workoutListItem}
      />
    </>
  );
}

function getWorkoutDescription(workoutTemplate: WorkoutTemplate) {
  if (workoutTemplate.note) {
    return workoutTemplate.note;
  }

  return workoutTemplate.drills.map((d) => d.displayName).join(", ");
}

function getDrillKey(drill: DrillTemplate): string {
  if ("circuit" in drill) {
    return drill.circuit.key;
  }

  if ("exercise" in drill) {
    return drill.exercise.key;
  }

  throw new Error(`Cannot find key for drill: ${JSON.stringify(drill)}`);
}

function getDrillPreview(drill: DrillTemplate): string {
  const setNum = drill.sets.filter((s) => s.setType !== SetType.Warmup).length;

  return (setNum > 0 ? `${setNum} x ` : "") + drill.displayName;
}

const workoutLibraryStyles = StyleSheet.create({
  workoutListItem: {
    paddingHorizontal: 10,
  },
  workoutListItemDivider: {
    height: 2,
  }
});
