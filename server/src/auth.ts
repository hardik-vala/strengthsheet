import { User } from "@models/User";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = "781325465794-s811qagpli7g8vore9mbdqr4593m8i6m.apps.googleusercontent.com";

const googleAuthClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export async function decodeGoogleIdToken(idToken: string): Promise<User> {
  const ticket = await googleAuthClient.verifyIdToken({
    idToken: idToken
  });
  const payload = ticket.getPayload();
  return {
    email: payload["email"],
    googleId: payload["sub"],
    googleIdToken: idToken,
    name: payload["name"]
  };
}