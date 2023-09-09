import { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  BottomNavigation,
  Button,
  List,
  Modal,
  Portal,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "../../styles/style";
import { SignOut } from "../SignOut/SignOut";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";

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
          <View style={{ marginTop: "25%" }}>
            <List.Section title="Workouts">
              <List.Subheader>Cardio</List.Subheader>
              <WorkoutListItem
                title="Rower"
                description="Rower, Cool Down"
                iconName="rowing"
                onPress={() => setPreviewWorkout("rower")}
              />
              <List.Subheader>Strength</List.Subheader>
              <WorkoutListItem
                title="Push"
                description="Flat Bench Press, Angled Bench Press"
                iconName="weight-lifter"
                onPress={() => setPreviewWorkout("push")}
              />
              <WorkoutListItem
                title="Pull"
                description="Lat Pull-ups, Tricep Dips, Bent Over Rows"
                iconName="weight-lifter"
                onPress={() => setPreviewWorkout("pull")}
              />
              <WorkoutListItem
                title="Legs"
                description="Wide-stance Squats, Hip Thrusts, Bulgarian Split Squats"
                iconName="weight-lifter"
                onPress={() => setPreviewWorkout("legs")}
              />
              <List.Subheader>PT</List.Subheader>
              <WorkoutListItem
                title="PT routine"
                description="Chicken Wings, Side-to-sides, Single-leg Bridges"
                iconName="yoga"
                onPress={() => setPreviewWorkout("ptRoutine")}
              />
              <WorkoutListItem
                title="Stretching"
                description="Standing Calf Stretch, Standing IT Band Stretch"
                iconName="yoga"
                onPress={() => setPreviewWorkout("stretching")}
              />
            </List.Section>
          </View>
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

const workoutLibraryStyles = StyleSheet.create({
  workoutListItem: {
    marginHorizontal: 12,
  },
});
