import { format as formatDate, parse as parseDate } from "date-fns";
import { WORKOUT_TEMPLATE_REGISTRY } from "../data/registry";
import { FetchWorkoutHistoryResponse } from "../models/Backend";
import { SetType, WorkoutValueKey } from "../models/Workout/Core";
import {
  WorkoutHistory,
  WorkoutHistoryRecord,
} from "../models/Workout/WorkoutHistory";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";
import { fetchWorkoutHistory, storeRecordInWorkoutHistory } from "../services/backendService";

class WorkoutHistoryProvider {
  private static instance: WorkoutHistoryProvider;

  private constructor() {}

  static getInstance() {
    if (!WorkoutHistoryProvider.instance) {
      WorkoutHistoryProvider.instance = new WorkoutHistoryProvider();
    }

    return WorkoutHistoryProvider.instance;
  }

  async getWorkoutHistory(
    workoutTemplate: WorkoutTemplate
  ): Promise<WorkoutHistory> {
    const response = await fetchWorkoutHistory(workoutTemplate);
    return this.deserializeWorkoutHistoryResponse(response);
  }

  async addRecordToWorkoutHistory(
    workoutKey: string,
    workoutRecord: WorkoutHistoryRecord
  ): Promise<void> {
    const body = {
      workoutKey,
      workoutRecord: serializeWorkoutHistoryRecord(workoutRecord),
    };
    storeRecordInWorkoutHistory(body);
  }

  deserializeWorkoutHistoryResponse(
    response: FetchWorkoutHistoryResponse
  ): WorkoutHistory {
    return {
      ...response,
      workoutTemplate: WORKOUT_TEMPLATE_REGISTRY[response.workoutKey],
      records: response.records.map((record) => ({
        ...record,
        startTimestamp: parseDate(
          record.startTimestamp,
          "MM/dd/yyyy HH:mm",
          new Date()
        ),
        exercises: record.exercises.map((exercise) => ({
          ...exercise,
          key: WorkoutValueKey.create(
            exercise.key.circuitKey,
            exercise.key.exerciseKey,
            exercise.key.setIndex,
            exercise.key.setType as SetType,
            exercise.key.measureKey
          ),
        })),
      })),
    };
  }
}

function serializeWorkoutHistoryRecord(record: WorkoutHistoryRecord) {
  return {
    ...record,
    startTimestamp: formatDate(record.startTimestamp, "MM/dd/yyyy HH:mm"),
  };
}

export const WORKOUT_HISTORY_PROVIDER = WorkoutHistoryProvider.getInstance();
