import { useState } from "react";
import { View } from "react-native";
import {
  BottomNavigation
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { WorkoutTemplateRegistry } from "../../data/registry";
import { WorkoutTemplate } from "../../models/Workout/WorkoutTemplate";
import { styles } from "../../styles/style";
import { SignOut } from "../SignOut/SignOut";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";
import { WorkoutLibrary } from "../WorkoutLibrary/WorkoutLibrary";

interface WorkoutPortalProps {
  workoutTemplateRegistry: WorkoutTemplateRegistry;
  onSignOut: () => void;
}

export function WorkoutPortal({
  workoutTemplateRegistry,
  onSignOut,
}: WorkoutPortalProps) {
  const [tabIndex, setTabIndex] = useState(0);
  const [activeWorkout, setActiveWorkout] = useState(null);

  const [routes] = useState([
    { key: "workoutLibrary", title: "Workout", focusedIcon: "weight-lifter" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  function routeWorkout() {
    return (
      <WorkoutForm
        workoutTemplate={activeWorkout}
        onBack={() => setActiveWorkout(null)}
      />
    );
  }

  const renderScene = BottomNavigation.SceneMap({
    workoutLibrary: () => {
      if (activeWorkout) {
        return routeWorkout();
      }

      return (
        <SafeAreaProvider>
          <WorkoutLibrary
            workoutTemplateRegistry={workoutTemplateRegistry}
            onStartWorkout={(workoutTemplate: WorkoutTemplate) =>
              setActiveWorkout(workoutTemplate)
            }
          />
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
      navigationState={{ index: tabIndex, routes }}
      onIndexChange={setTabIndex}
      renderScene={renderScene}
    />
  );
}
