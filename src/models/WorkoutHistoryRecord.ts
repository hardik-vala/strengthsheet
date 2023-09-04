export interface WorkoutHistoryRecord {
  date: Date,
  workoutValues: { [k: string]: string },
};