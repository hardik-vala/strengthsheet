export interface WorkoutHistoryRecord {
  datetime: Date;
  workoutValues: { [k: string]: string };
};

export type WorkoutHistory = WorkoutHistoryRecord[];

export interface WorkoutFieldHistoryRecord {
  datetime: Date;
  fieldValue: string;
}

export interface WorkoutFieldHistory {
  fieldName: string;
  historyRecords: WorkoutFieldHistoryRecord[];
}