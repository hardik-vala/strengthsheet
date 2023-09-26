import { Circuit, DrillSet, Exercise } from "./Core";

export interface WorkoutTemplate {
	key: string;
	displayName: string;
	iconKey: string;
	note: string;
	drills: DrillTemplate[];	
}

export type DrillTemplate = ExerciseTemplate | CircuitTemplate;

export interface ExerciseTemplate {
	exercise: Exercise;
	displayName: string | null;
	iconKey: string;
	note: string | null;
	sets: DrillSet[];
}

export interface CircuitTemplate {
	circuit: Circuit;
	displayName: string | null;
	iconKey: string;
	note: string | null;
	sets: DrillSet[];
}
