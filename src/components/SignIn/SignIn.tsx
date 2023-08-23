import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

interface SignInProps {
  onSignIn: () => void;
}

export function SignIn({ onSignIn }: SignInProps) {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={onSignIn}
    />
  );
}
