import { FetchWorkoutHistoryResponse, SaveWorkoutHistoryRecordRequestBody } from "../models/Backend";
import { WorkoutHistoryRecord } from "../models/Workout/WorkoutHistory";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";

export async function fetchWorkoutHistory(
  workoutTemplate: WorkoutTemplate
): Promise<FetchWorkoutHistoryResponse> {
  const searchParams = new URLSearchParams();
  searchParams.append("workoutKey", workoutTemplate.key);

  const domain = process.env.EXPO_PUBLIC_BACKEND_DOMAIN;
  const url = `${domain}/api/v1/workout/history?${searchParams.toString()}`;

  const response = await fetch(url, { method: "GET" });

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
  const domain = process.env.EXPO_PUBLIC_BACKEND_DOMAIN;
  const url = `${domain}/api/v1/workout/save`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to save workout: ${JSON.stringify(response)}`);
  }
}
