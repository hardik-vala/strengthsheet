import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavigation, List } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { styles } from "../../styles/style";
import { SignOut } from "../SignOut/SignOut";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";

interface WorkoutLibraryProps {
  onSignOut: () => void;
}

export function WorkoutLibrary({ onSignOut }: WorkoutLibraryProps) {
  const [index, setIndex] = useState(0);
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
    return <WorkoutForm onBack={() => setSelectedWorkout(null)} />;
  }

  const renderScene = BottomNavigation.SceneMap({
    workoutLibrary: () => {
      if (selectedWorkout) {
        return routeWorkout(selectedWorkout);
      }

      return (
        <SafeAreaProvider>
          <View style={{ marginTop: "25%" }}>
            <List.Section title="Workouts">
              <List.Subheader>Cardio</List.Subheader>
              <List.Item
                title="Rower"
                left={() => <List.Icon icon="rowing" />}
                onPress={() => setSelectedWorkout("rower")}
                style={workoutLibraryStyles.workoutListItem}
              />
              <List.Subheader>Strength</List.Subheader>
              <List.Item
                title="Push"
                left={() => <List.Icon icon="weight-lifter" />}
                onPress={() => setSelectedWorkout("push")}
                style={workoutLibraryStyles.workoutListItem}
              />
              <List.Item
                title="Pull"
                left={() => <List.Icon icon="weight-lifter" />}
                onPress={() => setSelectedWorkout("pull")}
                style={workoutLibraryStyles.workoutListItem}
              />
              <List.Item
                title="Legs"
                left={() => <List.Icon icon="weight-lifter" />}
                onPress={() => setSelectedWorkout("legs")}
                style={workoutLibraryStyles.workoutListItem}
              />
              <List.Subheader>PT</List.Subheader>
              <List.Item
                title="PT routine"
                left={() => <List.Icon icon="yoga" />}
                onPress={() => setSelectedWorkout("ptRoutine")}
                style={workoutLibraryStyles.workoutListItem}
              />
              <List.Item
                title="Stretching"
                left={() => <List.Icon icon="yoga" />}
                onPress={() => setSelectedWorkout("stretching")}
                style={workoutLibraryStyles.workoutListItem}
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

const workoutLibraryStyles = StyleSheet.create({
  workoutListItem: {
    marginHorizontal: 12,
  },
});
