import { SaveWorkoutHistoryRecordRequestBody } from "@models/Backend";
import cors from "cors";
import express from "express";
import { decodeGoogleIdToken } from "./auth";
import {
  deserializeWorkoutHistoryRecord,
  serializeWorkoutHistoryTableRow,
} from "./database";
import { WORKOUT_HISTORY_PROVIDER } from "./providers/workoutHistoryProvider";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/user/register", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers['x-google-id-token'] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  const user = await decodeGoogleIdToken(idToken);

  res.send(user);
});

app.get("/api/v1/workout/history", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers['x-google-id-token'] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  const user = await decodeGoogleIdToken(idToken);

  const { workoutKey } = req.query;

  if (!workoutKey) {
    return res.status(400).json({
      error: "workoutKey is required",
    });
  }

  const workoutHistory = WORKOUT_HISTORY_PROVIDER.fetchWorkoutHistory(
    user,
    workoutKey.toString()
  );
  if (!workoutHistory) {
    return res.status(400).json({
      error: `No workout for key "${workoutKey}"`,
    });
  }

  const payload = serializeWorkoutHistoryTableRow(workoutHistory);

  res.send(payload);
});

app.post("/api/v1/workout/save", async (req, res) => {
  const authHeader = req.headers.authorization;
  const idToken = req.headers['x-google-id-token'] as string;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  if (!idToken) {
    return res.status(401).json({ error: "Google Id token header required" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  const user = await decodeGoogleIdToken(idToken);

  const body = req.body as SaveWorkoutHistoryRecordRequestBody;

  try {
    WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
      accessToken,
      user,
      body.workoutKey,
      deserializeWorkoutHistoryRecord(body.workoutRecord)
    );
  } catch (error) {
    return res.status(400).json({
      error: `Error appending record to workout history: ${error.message}`,
    });
  }

  res.send("POST request received!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
