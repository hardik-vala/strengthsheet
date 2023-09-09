export interface WorkoutTemplate {
  key: string;
  displayTitle: string;
  category: string;
  inputs: WorkoutInput[];
}

export interface WorkoutInput {
  key: string;
  index: number;
  displayTitle: string;
  sheetTitle: string;
  placeholder: string;
  validator: WorkoutInputValidator;
}

export type WorkoutInputValidator = (string) => boolean;