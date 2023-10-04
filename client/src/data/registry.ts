import {
  Circuit,
  Exercise,
  ExerciseUnit,
  SetType,
} from "../models/Workout/Core";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";

export type WorkoutTemplateRegistry = { [k: string]: WorkoutTemplate };

export const EXERCISE_REGISTRY: { [k: string]: Exercise } = {
  arnold_press_dumbbells: {
    key: "arnold_press_dumbbells",
    displayName: "Arnold Press (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bench_press_flat_barbell: {
    key: "bench_press_flat_barbell",
    displayName: "Bench Press (Flat)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bench_press_incline_barbell: {
    key: "bench_press_incline_barbell",
    displayName: "Bench Press (Incline)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  dumbbell_press_close_grip_incline: {
    key: "dumbbell_press_close_grip_incline",
    displayName: "Close-Grip Dumbbell Press (Incline)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  face_pull_cable: {
    key: "face_pull_cable",
    displayName: "Face Pull (Cable)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  hamstring_curl_machine: {
    key: "hamstring_curl_machine",
    displayName: "Hamstring Curl (Machine)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  hip_thrust: {
    key: "hip_thrust",
    displayName: "Hip Thrust (Weighted)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  hip_thrust_single_leg: {
    key: "hip_thrust_single_leg",
    displayName: "Single-Leg Hip Thrust (Weighted)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  lat_pullup_bodyweight: {
    key: "lat_pullup_bodyweight",
    displayName: "Lat Pull-up (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  lateral_raise_dumbbells: {
    key: "lateral_raise_dumbbells",
    displayName: "Lateral Raise (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  lateral_raise_hold_dumbbells: {
    key: "lateral_raise_hold_dumbbells",
    displayName: "Lateral Raise Hold (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "time", displayName: "time", unit: ExerciseUnit.time },
    ],
  },
  rowing_machine: {
    key: "rowing_machine",
    displayName: "Rowing (Machine)",
    measures: [
      { key: "meters", displayName: "meters", unit: ExerciseUnit.meters },
      { key: "time", displayName: "time", unit: ExerciseUnit.time },
    ],
  },
  shoulder_press_barbell: {
    key: "shoulder_press_barbell",
    displayName: "Shoulder Press (Barbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  shoulder_press_barbell_alternating: {
    key: "shoulder_press_barbell_alternating",
    displayName: "Alternating Shoulder Press (Barbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  squat_deep_bodyweight: {
    key: "squat_wide_stance_barbell",
    displayName: "Deep Squat (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  squat_split_bulgarian_bodyweight: {
    key: "squat_split_bulgarian_bodyweight",
    displayName: "Bulgarian Split Squat (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  squat_wide_stance_barbell: {
    key: "squat_wide_stance_barbell",
    displayName: "Wide-Stance Squat (Barbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  tricep_dip_bodyweight: {
    key: "tricep_dip_bodyweight",
    displayName: "Tricep Dip (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  tricep_extension_cable: {
    key: "tricep_extension_cable",
    displayName: "Tricep Extension (Cable)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  y_lift_off: {
    key: "y_lift_off",
    displayName: "Y Lift-Off",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
};

export const CIRCUIT_REGISTRY: { [k: string]: Circuit } = {
  bench_press_incline_circuit: {
    key: "bench_press_incline_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["bench_press_incline_barbell"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["dumbbell_press_close_grip_incline"],
        note: null,
      },
    ],
  },
  face_pulls_and_triceps_circuit: {
    key: "face_pulls_and_triceps_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["face_pull_cable"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["tricep_extension_cable"],
        note: null,
      },
    ],
  },
  hip_thrust_circuit: {
    key: "hip_thrust_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["hip_thrust_single_leg"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["hip_thrust"],
        note: null,
      },
    ],
  },
  pull_warmup_circuit: {
    key: "pull_warmup_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["lat_pullup_bodyweight"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["tricep_dip_bodyweight"],
        note: null,
      },
    ],
  },
  shoulder_press_barbell_alternating_circuit: {
    key: "shoulder_press_barbell_alternating_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["shoulder_press_barbell_alternating"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["face_pull_cable"],
        note: null,
      },
    ],
  },
};

export const WORKOUT_TEMPLATE_REGISTRY: WorkoutTemplateRegistry = {
  stretches: {
    key: "stretches",
    displayName: "Stretches",
    iconKey: "weight-lifter",
    note: "",
    drills: [],
  },
  push_shoulders: {
    key: "push_shoulders",
    displayName: "Push (Shoulders)",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["lateral_raise_hold_dumbbells"],
        displayName: "Lateral Raise Hold (Dumbbells)",
        iconKey: "",
        note: "1 min. hold with 10 lb. dumbbells",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["y_lift_off"],
        displayName: "Y Lift-Off",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["shoulder_press_barbell"],
        displayName: "Shoulder Press (Barbell)",
        iconKey: "",
        note: "45 lb, 65 lb, 75 lb @ 15 reps and 95 lb @ 8 reps",
        sets: [
          { index: 1, setType: SetType.Warmup },
          { index: 2, setType: SetType.Warmup },
          { index: 3, setType: SetType.Warmup },
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["shoulder_press_barbell_alternating_circuit"],
        displayName: "Alternating Shoulder Press Circuit",
        iconKey: "",
        note: "75 lb @ 6 reps, 60 lb @ 20 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["arnold_press_dumbbells"],
        displayName: "Arnold Press (Dumbbells)",
        iconKey: "",
        note: "30 lb @ 10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["face_pulls_and_triceps_circuit"],
        displayName: "Face-Pulls & Tricep Extensions",
        iconKey: "",
        note: "20 reps down to 10 (-2 reps per round), 30 lb",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
          { index: 6, setType: SetType.Working },
        ],
      },
    ],
  },
  push_chest: {
    key: "push_chest",
    displayName: "Push (Chest)",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["lateral_raise_hold_dumbbells"],
        displayName: "Lateral Raise Hold (Dumbbells)",
        iconKey: "",
        note: "1 min. hold with 10 lb. dumbbells",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["y_lift_off"],
        displayName: "Y Lift-Off",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["bench_press_flat_barbell"],
        displayName: "Bench Press (Flat)",
        iconKey: "45 lb, 65 lb, 95 lb @ 15 reps, then 145 lb @ 10 reps",
        note: null,
        sets: [
          { index: 1, setType: SetType.Warmup },
          { index: 2, setType: SetType.Warmup },
          { index: 3, setType: SetType.Warmup },
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
          { index: 6, setType: SetType.Working },
          { index: 7, setType: SetType.Working },
          { index: 8, setType: SetType.Working },
          { index: 9, setType: SetType.Working },
          { index: 10, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["bench_press_incline_circuit"],
        displayName: "Bench Press Circuit (Incline)",
        iconKey: "20 reps down to 10 (-2 reps per round) @ 65 lb and 20 lb DBs",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
          { index: 6, setType: SetType.Working },
        ],
      },
    ],
  },
  ab_ripper_x: {
    key: "ab_ripper_x",
    displayName: "Ab Ripper X",
    iconKey: "weight-lifter",
    note: "",
    drills: [],
  },
  it_band_rehab: {
    key: "it_band_rehab",
    displayName: "IT Band Rehab",
    iconKey: "weight-lifter",
    note: "",
    drills: [],
  },
  basketball_warmup: {
    key: "basketball_warmup",
    displayName: "Basketball Warmup",
    iconKey: "weight-lifter",
    note: "",
    drills: [],
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
          { index: 1, setType: SetType.Warmup },
          { index: 2, setType: SetType.Warmup },
          { index: 3, setType: SetType.Warmup },
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["hip_thrust_circuit"],
        displayName: "Hip Thrust Circuit",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
          { index: 6, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["squat_split_bulgarian_bodyweight"],
        displayName: "Bulgarian Split Squats (Bodyweight)",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["hamstring_curl_machine"],
        displayName: "Hamstring Curls (Machine)",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
    ],
  },
  pull_upper_back: {
    key: "pull_upper_back",
    displayName: "Pull (Upper back)",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        circuit: CIRCUIT_REGISTRY["pull_warmup_circuit"],
        displayName: "Pull Warm-up Circuit",
        iconKey: "",
        note: "10 second break in-between sets",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
        ],
      },
    ],
  },
  pull_lower_back: {
    key: "pull_lower_back",
    displayName: "Pull (Lower Back)",
    iconKey: "weight-lifter",
    note: "",
    drills: [],
  },
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
        sets: [
          { index: 1, setType: SetType.Warmup },
          { index: 1, setType: SetType.Working },
        ],
      },
    ],
  },
};
