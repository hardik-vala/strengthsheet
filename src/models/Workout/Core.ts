export enum ExerciseUnit {
  kilometers,
  lb,
  meters,
  miles,
  millimeters,
  reps,
  time
}

export enum SetType {
  Warmup,
  Working,
  Failure
}

export interface Circuit {
  key: string;
  exercises: { exercise: Exercise, note: string | null }[];
}

export interface Exercise {
  key: string;
  displayName: string;
  measures: ExerciseMeasure[];
}

export interface ExerciseMeasure {
  key: string;
  displayName: string;
  unit: ExerciseUnit;
}

export interface DrillSet {
  index: number;
  setType: SetType;
}

export class WorkoutValueKey {

  readonly exerciseKey: string;
  readonly setIndex: number;
  readonly setType: SetType;
  readonly measureKey: string;

  private constructor(exerciseKey: string, setIndex: number, setType: SetType, measureKey: string) {
    this.exerciseKey = exerciseKey;
    this.setIndex = setIndex;
    this.setType = setType;
    this.measureKey = measureKey;
  }

  private freeze() {
    Object.freeze(this);
  }

  public static create(exerciseKey: string, setIndex: number, setType: SetType, measureKey: string): WorkoutValueKey {
    const key = new WorkoutValueKey(exerciseKey, setIndex, setType, measureKey);
    key.freeze();
    return key;
  }

  public toString(): string {
    return `${this.exerciseKey}:${this.setIndex}:${this.setType.toString()}:${this.measureKey}`;
  }
}

const TIME_MINUTES_SECONDS_REGEX = /^[0-5][0-9]:[0-5][0-9]$/;
const TIME_HOURS_MINUTES_SECONDS_REGEX = /^[0-9][0-9]:[0-5][0-9]:[0-5][0-9]$/;

export function isValidMeasureValue(value: string, unit: ExerciseUnit): boolean {
  value = value.trim();

  if (value.length === 0) {
    return false;
  }

  switch (unit) {
    case ExerciseUnit.kilometers:
    case ExerciseUnit.lb:
    case ExerciseUnit.meters:
    case ExerciseUnit.miles:
    case ExerciseUnit.millimeters:
      const parsedFloat = Number(value);
      return Number.isFinite(parsedFloat) && parsedFloat > 0;
    case ExerciseUnit.reps:
      const parsedInt = Number(value);
      return Number.isInteger(parsedInt) && parsedInt > 0;
    case ExerciseUnit.time:
      return isValidTime(value);
  }
}

function isValidTime(time: string): boolean {
  return (
    TIME_MINUTES_SECONDS_REGEX.test(time) ||
    TIME_HOURS_MINUTES_SECONDS_REGEX.test(time)
  );
}
