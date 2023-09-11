export interface WorkoutTemplate {
  key: string;
  category: string;
  displayTitle: string;
  description?: string;
  iconName: string;
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