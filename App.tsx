import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SignIn } from "./src/components/SignIn/SignIn";
import { WorkoutPortal } from "./src/components/WorkoutPortal/WorkoutPortal";
import { WORKOUT_TEMPLATE_REGISTRY } from "./src/data/registry";
import { User } from "./src/models/User";
import { signIn, signOut } from "./src/services/authService";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "black",
    secondary: "gray",
  },
};

export default function App() {
  const [user, setUser] = useState<User>(null);

  const _signIn = async () => {
    try {
      const user = await signIn();
      setUser(user);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const _signOut = async () => {
    try {
      signOut();
      setUser(null);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Content
            user={user}
            onSignIn={_signIn}
            onSignOut={_signOut}
          ></Content>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export function Content({ user, onSignIn, onSignOut }) {
  if (user) {
    return (
      <WorkoutPortal
        workoutTemplateRegistry={WORKOUT_TEMPLATE_REGISTRY}
        onSignOut={onSignOut}
      />
    );
  }

  return <SignIn onSignIn={onSignIn} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
