import { Circuit, Exercise, ExerciseUnit, SetType } from "../models/Workout/Core";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";

export type WorkoutTemplateRegistry = { [k: string]: WorkoutTemplate };

export const EXERCISE_REGISTRY: { [k: string]: Exercise } = {
  hamstring_curl_machine: {
    key: "hamstring_curl_machine",
    displayName: "Hamstring Curl (Machine)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ]
  },
  hip_thrust: {
    key: "hip_thrust",
    displayName: "Hip Thrust (Weighted)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ]
  },
  hip_thrust_single_leg: {
    key: "hip_thrust_single_leg",
    displayName: "Single-Leg Hip Thrust (Weighted)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ]
  },
  rowing_machine: {
    key: "rowing_machine",
    displayName: "Rowing (Machine)",
    measures: [
      { key: "meters", displayName: "meters", unit: ExerciseUnit.meters },
      { key: "time", displayName: "time", unit: ExerciseUnit.time }
    ],
  },
  squat_split_bulgarian_bodyweight: {
    key: "squat_split_bulgarian_bodyweight",
    displayName: "Bulgarian Split Squat (Bodyweight)",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ]
  },
  squat_wide_stance_barbell: {
    key: "squat_wide_stance_barbell",
    displayName: "Wide-Stance Squat (Barbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ]
  },
};

export const CIRCUIT_REGISTRY: { [k: string]: Circuit } = {
  hip_thrust_circuit: {
    key: "hip_thrust_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["hip_thrust_single_leg"],
        note: null
      },
      {
        exercise: EXERCISE_REGISTRY["hip_thrust"],
        note: null
      },
    ],
  }
}

export const WORKOUT_TEMPLATE_REGISTRY: WorkoutTemplateRegistry = {
  rowing_machine: {
    key: "rowing_machine",
    displayName: "Rowing (Machine)",
    iconKey: "rowing",
    note: "Rowing machine for cardio.",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["rowing_machine"],
        displayName: "Rowing (Machine)",
        iconKey: "",
        note: null,
        sets: [{index: 1, setType: SetType.Warmup}, {index: 1, setType: SetType.Working}],
      },
    ]
  },
  legs: {
    key: "legs",
    displayName: "Legs",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["squat_wide_stance_barbell"],
        displayName: "Wide-Stance Squats (Barbell)",
        iconKey: "",
        note: null,
        sets: [
          {index: 1, setType: SetType.Warmup},
          {index: 2, setType: SetType.Warmup},
          {index: 3, setType: SetType.Warmup},
          {index: 1, setType: SetType.Working},
          {index: 2, setType: SetType.Working},
          {index: 3, setType: SetType.Working},
          {index: 4, setType: SetType.Working},
          {index: 5, setType: SetType.Working}
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["hip_thrust_circuit"],
        displayName: "Hip Thrust Circuit",
        iconKey: "",
        note: null,
        sets: [
          {index: 1, setType: SetType.Working},
          {index: 2, setType: SetType.Working},
          {index: 3, setType: SetType.Working},
          {index: 4, setType: SetType.Working},
          {index: 5, setType: SetType.Working},
          {index: 6, setType: SetType.Working},
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["squat_split_bulgarian_bodyweight"],
        displayName: "Bulgarian Split Squats (Bodyweight)",
        iconKey: "",
        note: null,
        sets: [
          {index: 1, setType: SetType.Working},
          {index: 2, setType: SetType.Working},
          {index: 3, setType: SetType.Working},
          {index: 4, setType: SetType.Working},
          {index: 5, setType: SetType.Working},
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["hamstring_curl_machine"],
        displayName: "Hamstring Curls (Machine)",
        iconKey: "",
        note: null,
        sets: [
          {index: 1, setType: SetType.Working},
          {index: 2, setType: SetType.Working},
          {index: 3, setType: SetType.Working},
        ],
      }
    ],
  },
};
