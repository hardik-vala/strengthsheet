import { Button } from "react-native";

interface SignOutProps {
  onSignOut: () => void;
}

export function SignOut({ onSignOut }: SignOutProps) {
  return (
    <Button title="Log out" onPress={onSignOut} />
  );
}
