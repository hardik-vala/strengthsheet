import { SaveWorkoutHistoryRecordRequestBody } from "@models/Backend";
import cors from "cors";
import express from "express";
import { decodeGoogleIdToken } from "./auth";
import {
  deserializeWorkoutHistoryRecord,
  WorkoutHistoryProvider,
} from "./providers/workoutHistoryProvider";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/user/register", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers["x-google-id-token"] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  let user;
  try {
    user = await decodeGoogleIdToken(idToken);
  } catch (error) {
    console.error("Error verifying Google Id token: ", error);
    return res.status(401).json({ error: "Error verifying Google Id token" });
  }

  return res.send(user);
});

app.get("/api/v1/workout/history", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers["x-google-id-token"] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  let user;
  try {
    user = await decodeGoogleIdToken(idToken);
  } catch (error) {
    console.error("Error verifying Google Id token: ", error);
    return res.status(401).json({ error: "Error verifying Google Id token" });
  }

  const { workoutKey } = req.query;

  if (!workoutKey) {
    return res.status(400).json({
      error: "workoutKey is required",
    });
  }

  const workoutHistoryProvider = await WorkoutHistoryProvider.getInstance();

  let workoutHistory;
  try {
    workoutHistory = await workoutHistoryProvider.fetchWorkoutHistory(
      user,
      workoutKey.toString()
    );
  } catch (error) {
    return res.status(400).json({
      error: `Error fetching workout history for key "${workoutKey}"`,
    });
  }

  res.send(workoutHistory);
});

app.post("/api/v1/workout/save", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers["x-google-id-token"] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  let user;
  try {
    user = await decodeGoogleIdToken(idToken);
  } catch (error) {
    console.error("Error verifying Google Id token: ", error);
    return res.status(401).json({ error: "Error verifying Google Id token" });
  }

  const body = req.body as SaveWorkoutHistoryRecordRequestBody;

  const workoutHistoryProvider = await WorkoutHistoryProvider.getInstance();

  try {
    workoutHistoryProvider.appendRecordToWorkoutHistory(
      accessToken,
      user,
      body.workoutKey,
      body.workoutDisplayName,
      deserializeWorkoutHistoryRecord(body.workoutRecord)
    );
  } catch (error) {
    return res.status(400).json({
      error: `Error appending record to workout history: ${error.message}`,
    });
  }

  res.send({});
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
