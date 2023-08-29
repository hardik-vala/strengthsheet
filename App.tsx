import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { Main } from "./src/components/Main/Main";
import { SignIn } from "./src/components/SignIn/SignIn";
import { User } from "./src/models/User";
import { signIn, signOut } from "./src/services/authService";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'black',
    secondary: 'gray',
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
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Content user={user} onSignIn={_signIn} onSignOut={_signOut}></Content>
      </View>
    </PaperProvider>
  );
}

export function Content({ user, onSignIn, onSignOut }) {
  if (user) {
    return <Main onSignOut={onSignOut} />;
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
