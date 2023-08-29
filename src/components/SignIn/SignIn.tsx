import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { View } from "react-native";

interface SignInProps {
  onSignIn: () => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <View style={{ alignItems: "center" }}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignIn}
      />
    </View>
  );
}
