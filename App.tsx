import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Main } from "./components/Main/Main";
import { SignIn } from "./components/SignIn/SignIn";
import { User } from "./models/User";
import { signIn, signOut } from "./services/authService";

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
    <View style={styles.container}>
      {user ? <Main onSignOut={_signOut} /> : <SignIn onSignIn={_signIn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
