import { SaveWorkoutHistoryRecordRequestBody } from "@models/Backend";
import cors from "cors";
import express from "express";
import {
  deserializeWorkoutHistoryRecord,
  serializeWorkoutHistoryTableRow,
} from "./database";
import { WORKOUT_HISTORY_PROVIDER } from "./providers/workoutHistoryProvider";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/workout/history", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  const { workoutKey } = req.query;

  if (!workoutKey) {
    return res.status(400).json({
      error: "workoutKey is required",
    });
  }

  const workoutHistory = WORKOUT_HISTORY_PROVIDER.fetchWorkoutHistory(
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

app.post("/api/v1/workout/save", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  const body = req.body as SaveWorkoutHistoryRecordRequestBody;

  try {
    WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
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
