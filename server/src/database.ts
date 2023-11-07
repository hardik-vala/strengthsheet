import { SetType, WorkoutValueKey } from "@models/Workout/Core";
import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { format as formatDate, parse as parseDate } from "date-fns";

export interface WorkoutHistoryTableRow {
  workoutKey: string;
  sheetId: string;
  sheetHeader: string[];
  records: WorkoutHistoryRecord[];
}

export const WORKOUT_HISTORY_TABLE: { [k: string]: WorkoutHistoryTableRow } = {
  stretches: {
    workoutKey: "stretches",
    sheetId: "Stretches",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  push_shoulders: {
    workoutKey: "push_shoulders",
    sheetId: "Push (Shoulders)",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  push_chest: {
    workoutKey: "push_chest",
    sheetId: "Push (Chest)",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  ab_ripper_x: {
    workoutKey: "ab_ripper_x",
    sheetId: "Ab Ripper X",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  it_band_rehab: {
    workoutKey: "it_band_rehab",
    sheetId: "IT Band Rehab",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  basketball_warmup: {
    workoutKey: "basketball_warmup",
    sheetId: "Basketball Warmup",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  legs: {
    workoutKey: "legs",
    sheetId: "Legs",
    sheetHeader: [
      "date",
      "start_time",
      "elapsed_time"
    ],
    records: [
      {
        startTimestamp: convertToDateObj("09/20/2023 20:00"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "lb"
            ),
            value: "45",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "lb"
            ),
            value: "65",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "lb"
            ),
            value: "25",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "lb"
            ),
            value: "25",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("09/19/2023 20:00"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "lb"
            ),
            value: "45",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "lb"
            ),
            value: "65",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "lb"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "lb"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
        ],
      },
    ],
  },
  pull_upper_back: {
    workoutKey: "pull_upper_back",
    sheetId: "Pull (Upper Back)",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  pull_lower_back: {
    workoutKey: "pull_lower_back",
    sheetId: "Pull (Lower Back)",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
    ],
    records: []
  },
  rowing_machine: {
    workoutKey: "rowing_machine",
    sheetId: "Rowing (Machine)",
    sheetHeader: [
      "Date",
      "Start Time",
      "Elapsed Time",
      "rowing_machine:1:2:meters",
      "rowing_machine:1:2:time",
      "rowing_machine:1:3:meters",
      "rowing_machine:1:3:time"
    ],
    records: [
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "1000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:30:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "1000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:30:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:19"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "2000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:31:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:20"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "3000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:32:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("09/02/2023 21:10"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "4000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:33:00",
          },
        ],
      },
    ],
  },
};

export function serializeWorkoutHistoryTableRow(row: WorkoutHistoryTableRow) {
  return {
    ...row,
    records: row.records.map((record) => ({
      ...record,
      startTimestamp: formatDate(record.startTimestamp, "MM/dd/yyyy HH:mm"),
    })),
  };
}

export function deserializeWorkoutHistoryRecord(record: any) {
  return {
    ...record,
    startTimestamp: convertToDateObj(record.startTimestamp),
  };
}

function convertToDateObj(dateStr: string) {
  return parseDate(dateStr, "MM/dd/yyyy HH:mm", new Date());
}
