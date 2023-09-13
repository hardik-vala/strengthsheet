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

// export interface WorkoutTemplate {
// 	key: string;
// 	displayName: string;
// 	iconKey: string;
// 	note: string;
// 	exercises: ExerciseTemplate[];	
// }

export interface ExerciseTemplate {
	key: string;
	displayName: string;
	iconKey: string;
	note: string;
	sinkSheetKey: string;
	sets: (SetTemplate | MiniCircuitSubSetTemplate)[];
}

export interface SetTemplate {
	key: string;
	setType: "warmup" | "working" | "failure";
	setFields: SetFieldTemplate[];
}

export interface MiniCircuitTemplate {
	key: string;
	setType: "warmup" | "working" | "failure";
	subSets: MiniCircuitSubSetTemplate[];
}

export interface MiniCircuitSubSetTemplate {
	key: string;
	displayName: string;
	setFields: SetFieldTemplate[];
}

export interface SetFieldTemplate {
	key: string;
	displayName: string;
	valueType: "number" | "timestamp";
}
