import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  FetchWorkoutHistoryResponse,
  SaveWorkoutHistoryRecordRequestBody,
} from "../models/Backend";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";

export async function fetchWorkoutHistory(
  workoutTemplate: WorkoutTemplate
): Promise<FetchWorkoutHistoryResponse> {
  const googleAuthTokens = await GoogleSignin.getTokens();

  const searchParams = new URLSearchParams();
  searchParams.append("workoutKey", workoutTemplate.key);

  const domain = process.env.EXPO_PUBLIC_BACKEND_DOMAIN;
  const url = `${domain}/api/v1/workout/history?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${googleAuthTokens.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch workout history: ${JSON.stringify(response)}`
    );
  }

  return await response.json();
}

export async function storeRecordInWorkoutHistory(
  body: SaveWorkoutHistoryRecordRequestBody
): Promise<void> {
  const googleAuthTokens = await GoogleSignin.getTokens();

  const domain = process.env.EXPO_PUBLIC_BACKEND_DOMAIN;
  const url = `${domain}/api/v1/workout/save`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${googleAuthTokens.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to save workout: ${JSON.stringify(response)}`);
  }
}
