import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { User } from "./models/User";
import { signIn, signOut } from "./services/authService";
import { appendToGoogleSheet } from "./services/sheetService";

export default function App() {
  const [user, setUser] = useState<User>(null);
  const [userInput, setUserInput] = useState("");

  const _signIn = async () => {
    try {
      const userInfo = await signIn();
      setUser(userInfo);
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

  function render() {
    const body = user ? renderMain() : renderSignInButton();
    return body;
  }

  function renderMain() {
    return (
      <>
        <Text>Enter a workout value:</Text>
        <StatusBar style="auto" />
        <TextInput
          style={{
            height: 40,
            width: "80%",
            borderColor: "gray",
            borderWidth: 1,
          }}
          defaultValue=""
          placeholder="Type here"
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
        />
        <Button title="Submit" onPress={_appendToSheet} />
        <Button title="Log out" onPress={_signOut} />
      </>
    );
  }

  function renderSignInButton() {
    return (
      <>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={_signIn}
        />
      </>
    );
  }

  async function _appendToSheet() {
    const spreadsheetId = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";
    try {
      appendToGoogleSheet(spreadsheetId, userInput);
    } catch (error) {
      Alert.alert(error);
    }
  }

  return <View style={styles.container}>{render()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
