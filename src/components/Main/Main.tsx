import { useState } from "react";
import { View } from "react-native";
import { BottomNavigation, Button } from "react-native-paper";
import { SignOut } from "../SignOut/SignOut";
import { WorkoutForm } from "../WorkoutForm/WorkoutForm";

interface MainProps {
  onSignOut: () => void;
}

export function Main({ onSignOut }: MainProps) {
  const [index, setIndex] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [routes] = useState([
    { key: "workout", title: "Workout", focusedIcon: "weight-lifter" },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    workout: () => {
      if (selectedWorkout) {
        return <WorkoutForm />;
      } else {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              buttonColor="blue"
              onPress={() => setSelectedWorkout({ rower: true })}
            >
              Rower workout
            </Button>
          </View>
        );
      }
    },
    account: () => (
      // TODO: Define this style as a reusable asset.
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
