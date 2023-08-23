import type { User as GoogleUser } from "@react-native-google-signin/google-signin";
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { User } from "../models/User";
import { AuthError } from "./authError";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function signIn(): Promise<User> {
  try {
    await GoogleSignin.hasPlayServices();
    const googleUser: GoogleUser = await GoogleSignin.signIn();
    return {
      email: googleUser.user.email,
      googleId: googleUser.user.id,
      googleIdToken: googleUser.idToken,
      name: googleUser.user.name
    };
  } catch (error) {
    const typedError = error as NativeModuleError;

    switch (typedError.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        throw new AuthError("Sign-in cancelled.");
      case statusCodes.IN_PROGRESS:
        throw new AuthError("Sign-in in progress.");
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // Android only.
        throw new AuthError("Play services are not available or outdated.");
      default:
        throw new AuthError("Something went wrong: ", typedError);
    }
  }
};

export async function signOut() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    const typedError = error as NativeModuleError;
    throw new AuthError("Something went wrong: ", typedError);
  }
};
