import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { signIn, signOut } from "./authService";
import { User } from "./models/User";

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
        <Button title="Submit" onPress={submitToSheet} />
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

  async function submitToSheet() {
    const authTokens = await GoogleSignin.getTokens();
    const spreadsheetId = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:A1:append?valueInputOption=RAW`;

    const headers = {
      Authorization: `Bearer ${authTokens.accessToken}`,
    };

    const body = {
      range: "Sheet1!A1:A1",
      majorDimension: "ROWS",
      values: [[userInput]],
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Submit to sheet failed: ${JSON.stringify(response)}`);
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
