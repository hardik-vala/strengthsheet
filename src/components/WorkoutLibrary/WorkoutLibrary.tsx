import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  BottomNavigation,
  Button,
  List,
  Modal,
  Portal,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
import { WorkoutTemplate } from "../../models/WorkoutTemplate";
import { styles } from "../../styles/style";
import { SignOut } from "../SignOut/SignOut";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";

const WORKOUT_CATEGORY_METADATA = [
  {
    key: "cardio",
    displayTitle: "Cardio",
  },
  {
    key: "strength",
    displayTitle: "Strength",
  },
  {
    key: "pt",
    displayTitle: "PT",
  },
];

interface WorkoutLibraryProps {
  onSignOut: () => void;
}

export function WorkoutLibrary({ onSignOut }: WorkoutLibraryProps) {
  const [index, setIndex] = useState(0);
  const [previewWorkout, setPreviewWorkout] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [routes] = useState([
    { key: "workoutLibrary", title: "Workout", focusedIcon: "weight-lifter" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  function routeWorkout(selectedWorkout: string) {
    return (
      <WorkoutForm
        workoutKey={selectedWorkout}
        onBack={() => setSelectedWorkout(null)}
      />
    );
  }

  const workoutsGroupedByCategory = groupWorkoutsByCategory(
    WORKOUT_TEMPLATE_REGISTRY
  );

  const renderScene = BottomNavigation.SceneMap({
    workoutLibrary: () => {
      if (selectedWorkout) {
        return routeWorkout(selectedWorkout);
      }

      return (
        <SafeAreaProvider>
          <Portal>
            <Modal
              visible={!!previewWorkout}
              onDismiss={() => setPreviewWorkout(null)}
              contentContainerStyle={{ backgroundColor: "white", padding: 20 }}
            >
              <List.Section title={previewWorkout}>
                <List.Item title="Rower" />
              </List.Section>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  setSelectedWorkout("rowing");
                  setPreviewWorkout(null);
                }}
              >
                Start
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => setPreviewWorkout(null)}
              >
                Cancel
              </Button>
            </Modal>
          </Portal>
          <ScrollView style={{ marginTop: "25%" }}>
            <List.Section title="Workouts">
              {WORKOUT_CATEGORY_METADATA.map((m) => {
                return (
                  <View key={m.key}>
                    <List.Subheader>
                      {m.displayTitle}
                    </List.Subheader>
                    {workoutsGroupedByCategory[m.key].map((w) => {
                      return <WorkoutListItem
                        key={w.key}
                        title={w.displayTitle}
                        description={w.description}
                        iconName={w.iconName}
                        onPress={() => setPreviewWorkout(w.key)}
                      />;
                    })}
                  </View>
                );
              })}
            </List.Section>
          </ScrollView>
        </SafeAreaProvider>
      );
    },
    account: () => (
      <View style={styles.center}>
        <SignOut onSignOut={onSignOut} />
      </View>
    ),
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

interface WorkoutListItemProps {
  title: string;
  description: string;
  iconName: string;
  onPress: () => void;
}

function WorkoutListItem({
  title,
  description,
  iconName,
  onPress,
}: WorkoutListItemProps) {
  return (
    <List.Item
      title={title}
      description={description}
      descriptionNumberOfLines={1}
      descriptionEllipsizeMode="tail"
      left={() => <List.Icon icon={iconName} />}
      onPress={onPress}
      style={workoutLibraryStyles.workoutListItem}
    />
  );
}

function groupWorkoutsByCategory(workoutTemplates: {
  [k: string]: WorkoutTemplate;
}) {
  const groupedByCategory: { [key: string]: WorkoutTemplate[] } = {};

  for (const template of Object.values(workoutTemplates)) {
    const category = template.category;
    if (!groupedByCategory[category]) {
      groupedByCategory[category] = [];
    }
    groupedByCategory[category].push(template);
  }

  return groupedByCategory;
}

const workoutLibraryStyles = StyleSheet.create({
  workoutListItem: {
    marginHorizontal: 12,
  },
});
