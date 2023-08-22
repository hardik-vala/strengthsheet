import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { appendToGoogleSheet } from "../../services/sheetService";
import { SignOut } from "../SignOut/SignOut";

interface MainProps {
  onSignOut: () => void;
}

export function Main({ onSignOut }: MainProps) {
  const [userInput, setUserInput] = useState("");

  async function _appendToSheet() {
    const spreadsheetId = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";
    try {
      await appendToGoogleSheet(spreadsheetId, userInput);
    } catch (error) {
      Alert.alert(error);
    }
  }

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
      <SignOut onSignOut={onSignOut} />
    </>
  );
}
