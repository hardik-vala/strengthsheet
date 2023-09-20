import { parse as parseDate } from "date-fns";
import { WORKOUT_TEMPLATE_REGISTRY } from "../data/registry";
import { SetType, WorkoutValueKey } from "../models/Workout/Core";
import { WorkoutHistory } from "../models/Workout/WorkoutHistory";

const WORKOUT_HISTORY_DATABASE: { [k: string]: WorkoutHistory } = {
  rowing_machine: {
    workoutTemplate: WORKOUT_TEMPLATE_REGISTRY["rowing_machine"],
    records: [
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        exercises: [
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "meters"),
            value: "1000",
          },
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "time"),
            value: "00:30:00",
          }
        ],
      },
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        exercises: [
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "meters"),
            value: "1000",
          },
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "time"),
            value: "00:30:00",
          }
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:19"),
        exercises: [
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "meters"),
            value: "2000",
          },
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "time"),
            value: "00:31:00",
          }
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:20"),
        exercises: [
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "meters"),
            value: "3000",
          },
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "time"),
            value: "00:32:00",
          }
        ],
      },
      {
        startTimestamp: convertToDateObj("09/02/2023 21:10"),
        exercises: [
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "meters"),
            value: "4000",
          },
          {
            key: WorkoutValueKey.create("rowing_machine", 1, SetType.Working, "time"),
            value: "00:33:00",
          }
        ],
      },
    ],
  }
}

class WorkoutHistoryProvider {
  private static instance: WorkoutHistoryProvider;

  private constructor() {};

  static getInstance() {
    if (!WorkoutHistoryProvider.instance) {
      WorkoutHistoryProvider.instance = new WorkoutHistoryProvider();
    }

    return WorkoutHistoryProvider.instance;
  }

  getWorkoutHistory(workoutKey: string): WorkoutHistory {
    if (!WORKOUT_HISTORY_DATABASE[workoutKey]) {
      throw new WorkoutNotFoundError(workoutKey);
    }
  
    return WORKOUT_HISTORY_DATABASE[workoutKey];
  }
}

export const WORKOUT_HISTORY_PROVIDER = WorkoutHistoryProvider.getInstance();

function convertToDateObj(dateStr: string) {
  return parseDate(dateStr, "MM/dd/yyyy HH:mm", new Date());
}

export class WorkoutNotFoundError extends Error {
  constructor(workoutKey: string) {
    super(`Workout with key ${workoutKey} not found.`);
    this.name = "WorkoutNotFoundError";
  }
}