import cors from "cors";
import express from "express";
import { WORKOUT_HISTORY_TABLE, serializeWorkoutHistoryTableRow } from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/v1/workout/history", (req, res) => {
  const { workoutKey } = req.query;

  if (!workoutKey) {
    return res.status(400).json({
      error: "workoutKey is required"
    });
  }

  if (!WORKOUT_HISTORY_TABLE[workoutKey.toString()]) {
    return res.status(400).json({
      error: `No workout for key "${workoutKey}"`
    });
  }

  const payload = serializeWorkoutHistoryTableRow(
    WORKOUT_HISTORY_TABLE[workoutKey.toString()]
  );

  res.send(payload);
});

app.post("/api/v1/workout/save", (req, res) => {
  const body = req.body;

  console.log(JSON.stringify(body));

  res.send("POST request received!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});