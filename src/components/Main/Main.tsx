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
      <StatusBar style="auto" />
      <Text>Enter rower workout time:</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
        placeholder="30:00"
        value={userInput}
        onChangeText={(text) => setUserInput(text)}
      />
      <Text>Enter distance:</Text>
      <TextInput
        style={{
          height: 40,
          width: "80%",
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue=""
        placeholder="5000m"
      />
      <Button title="Submit" onPress={_appendToSheet} />
      <SignOut onSignOut={onSignOut} />
    </>
  );
}
