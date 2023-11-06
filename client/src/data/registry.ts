import {
  Circuit,
  Exercise,
  ExerciseUnit,
  SetType,
} from "../models/Workout/Core";
import { WorkoutTemplate } from "../models/Workout/WorkoutTemplate";

export type WorkoutTemplateRegistry = { [k: string]: WorkoutTemplate };

export const EXERCISE_REGISTRY: { [k: string]: Exercise } = {
  ankle_evertor_exercise_band: {
    key: "ankle_evertor_exercise_band",
    displayName: "Ankle Evertor Exercise (Band)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  arm_circle: {
    key: "arm_circle",
    displayName: "Arm Circle",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  arm_cross_over: {
    key: "arm_cross_over",
    displayName: "Arm Cross-Over",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
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
  bent_knee_fall_out_band: {
    key: "bent_knee_fall_out_band",
    displayName: "Bent Knee Fallout (Band)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  bicep_curl_under_hand_chest_supported_dumbbells: {
    key: "bicep_curl_under_hand_chest_supported_dumbbells",
    displayName: "Chest-Supported Underhand Bicep Curl (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bicep_curl_hammer_chest_supported_dumbbells: {
    key: "bicep_curl_hammer_chest_supported_dumbbells",
    displayName: "Chest-Supported Hammer Bicep Curl (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bicep_curl_gorilla_chest_supported_dumbbells: {
    key: "bicep_curl_gorilla_chest_supported_dumbbells",
    displayName: "Chest-Supported Gorilla Bicep Curl (Dumbbells)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bicycle_backward: {
    key: "bicycle_backward",
    displayName: "Bicycle (Backward)",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bicycle_forward: {
    key: "bicycle_forward",
    displayName: "Bicycle (Forward)",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  bird_dog: {
    key: "bird_dog",
    displayName: "Bird Dog",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  carioca: {
    key: "carioca",
    displayName: "Carioca",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  chin_tuck: {
    key: "chin_tuck",
    displayName: "Chin Tuck",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  crunchy_frog: {
    key: "crunchy_frog",
    displayName: "Crunchy Frog",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  dead_bug: {
    key: "dead_bug",
    displayName: "Dead Bug",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  dead_lift_barbell: {
    key: "dead_lift_barbell",
    displayName: "Dead Lift (Barbell)",
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
  fifer_scissor: {
    key: "fifer_scissor",
    displayName: "Fifer Scissor",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  frankenstein_mark_rdl: {
    key: "frankenstein_mark_rdl",
    displayName: "Frankenstein March with RDL",
    measures: [
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
  hip_abduction_looped_elastic_band: {
    key: "hip_abduction_looped_elastic_band",
    displayName: "Hip Abduction (Looped Elastic Band)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  hip_rock_n_raise: {
    key: "hip_rock_n_raise",
    displayName: "Hip Rock 'N Raise",
    measures: [
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
  in_and_out: {
    key: "in_and_out",
    displayName: "In-And-Out",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  knee_hug: {
    key: "knee_hug",
    displayName: "Knee Hug",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  knee_raise_alternating: {
    key: "knee_raise_alternating",
    displayName: "Alternating Knee Raise",
    measures: [
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
  lateral_step_down: {
    key: "lateral_step_down",
    displayName: "Lateral Step Down",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  lateral_touch: {
    key: "lateral_touch",
    displayName: "Lateral Touch",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  leg_climb: {
    key: "leg_climb",
    displayName: "Leg Climb",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  leg_swing_forward_backward: {
    key: "leg_swing_forward_backward",
    displayName: "Leg Swing (Forward / Backward)",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  leg_swing_lateral: {
    key: "leg_swing_lateral",
    displayName: "Leg Swing (Lateral)",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  lunges_walking_torso_twist_calf_raise: {
    key: "lunges_walking_torso_twist_calf_raise",
    displayName: "Walking Lunge with Torso Twist into Calf-Raise",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  mason_twist: {
    key: "mason_twist",
    displayName: "Mason Twist",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  ninety_ninety: {
    key: "ninety_ninety",
    displayName: "90-90",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  oblique_v_up: {
    key: "oblique_v_up",
    displayName: "Oblique V-Up",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  plank_alternating_leg_lifts: {
    key: "plank_alternating_leg_lifts",
    displayName: "Plank with Alternating Leg Lifts",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  pull_mid_chest_cable: {
    key: "pull_mid_chest_cable",
    displayName: "Mid-Chest Pull (Cable)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  pull_over_cable: {
    key: "pull_over_cable",
    displayName: "Pull-Over (Cable)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  pulse_up: {
    key: "pulse_up",
    displayName: "Pulse-Up",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  quad_walk_lean: {
    key: "quad_walk_lean",
    displayName: "Quad-Walk with Lean",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  rdl_single_leg_dumbbell: {
    key: "rdl_single_leg_dumbbell",
    displayName: "Single-Leg RDL (Dumbbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  row_bent_over_barbell: {
    key: "row_bent_over_barbell",
    displayName: "Bent-Over Row (Barbell)",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  row_cable: {
    key: "row_cable",
    displayName: "Cable Row",
    measures: [
      { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
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
    key: "squat_deep_bodyweight",
    displayName: "Deep Squat (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  squat_jump_forward_bodyweight: {
    key: "squat_jump_forward_bodyweight",
    displayName: "Forward Jump Squats (Bodyweight)",
    measures: [{ key: "reps", displayName: "reps", unit: ExerciseUnit.reps }],
  },
  squat_over_the_fence: {
    key: "squat_over_the_fence",
    displayName: "Over-The-Fence and Squat",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
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
  v_up_roll_up_combo: {
    key: "v_up_roll_up_combo",
    displayName: "V-Up / Roll-Up Combo",
    measures: [
      { key: "reps", displayName: "reps", unit: ExerciseUnit.reps },
    ],
  },
  wide_leg_sit_up: {
    key: "wide_leg_sit_up",
    displayName: "Wide-Leg Sit-Up",
    measures: [
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
  bicep_curl_circuit: {
    key: "bicep_curl_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["bicep_curl_under_hand_chest_supported_dumbbells"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["bicep_curl_hammer_chest_supported_dumbbells"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["bicep_curl_gorilla_chest_supported_dumbbells"],
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
  pull_over_and_tricep_cable_circuit: {
    key: "pull_over_and_tricep_cable_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["pull_over_cable"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["tricep_extension_cable"],
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
  row_cable_circuit: {
    key: "row_cable_circuit",
    exercises: [
      {
        exercise: EXERCISE_REGISTRY["row_cable"],
        note: null,
      },
      {
        exercise: EXERCISE_REGISTRY["pull_mid_chest_cable"],
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
    iconKey: "yoga",
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
      {
        exercise: EXERCISE_REGISTRY["lateral_raise_dumbbells"],
        displayName: "Lateral Raise (Dumbbells)",
        iconKey: "",
        note: "15, 10, 5 lb @ 10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 1, setType: SetType.Drop },
          { index: 2, setType: SetType.Drop },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Drop },
          { index: 4, setType: SetType.Drop },
          { index: 3, setType: SetType.Working },
          { index: 5, setType: SetType.Drop },
          { index: 6, setType: SetType.Drop },
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
        iconKey: "",
        note: "45 lb, 65 lb, 95 lb @ 15 reps, then 145 lb @ 10 reps",
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
        iconKey: "",
        note: "20 reps down to 10 (-2 reps per round) @ 65 lb and 20 lb DBs",
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
    drills: [
      {
        exercise: EXERCISE_REGISTRY["in_and_out"],
        displayName: "In-And-Out",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["bicycle_forward"],
        displayName: "Bicycle (Forward)",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["bicycle_backward"],
        displayName: "Bicycle (Backward)",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["crunchy_frog"],
        displayName: "Crunchy Frog",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["wide_leg_sit_up"],
        displayName: "Wide-Leg Sit-Up",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["fifer_scissor"],
        displayName: "Fifer Scissor",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["hip_rock_n_raise"],
        displayName: "Hip Rock 'N Raise",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["pulse_up"],
        displayName: "Pulse-Up",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["v_up_roll_up_combo"],
        displayName: "V-Up / Roll-Up Combo",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["oblique_v_up"],
        displayName: "Oblique V-Up",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["leg_climb"],
        displayName: "Leg Climb",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["mason_twist"],
        displayName: "Mason Twist",
        iconKey: "",
        note: "25 reps",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
    ],
  },
  it_band_rehab: {
    key: "it_band_rehab",
    displayName: "IT Band Rehab",
    iconKey: "yoga",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["squat_deep_bodyweight"],
        displayName: "Deep Squat (Bodyweight)",
        iconKey: "",
        note: "1 rep",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["lateral_step_down"],
        displayName: "Lateral Step Down",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["squat_jump_forward_bodyweight"],
        displayName: "Forward Jump Squats (Bodyweight)",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["rdl_single_leg_dumbbell"],
        displayName: "Single-Leg RDL (Dumbbell)",
        iconKey: "",
        note: "10 reps with 20 lb dumbbell",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["hip_abduction_looped_elastic_band"],
        displayName: "Hip Abduction (Looped Elastic Band)",
        iconKey: "",
        note: "10 reps with 1 second hold",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["bent_knee_fall_out_band"],
        displayName: "Bent Knee Fallout (Band)",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["plank_alternating_leg_lifts"],
        displayName: "Plank with Alternating Leg Lifts",
        iconKey: "",
        note: "10 reps with 2 second hold",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["ankle_evertor_exercise_band"],
        displayName: "Ankle Evertor Exercise (Band)",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["ninety_ninety"],
        displayName: "90-90",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
        ],
      },
    ],
  },
  basketball_warmup: {
    key: "basketball_warmup",
    displayName: "Basketball Warmup",
    iconKey: "basketball",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["arm_cross_over"],
        displayName: "Arm Cross-Over",
        iconKey: "",
        note: "About 30",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["arm_circle"],
        displayName: "Arm Circle",
        iconKey: "",
        note: "About 30 forward / backward",
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["knee_hug"],
        displayName: "Knee Hug",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["lunges_walking_torso_twist_calf_raise"],
        displayName: "Walking Lunge with Torso Twist into Calf-Raise",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["quad_walk_lean"],
        displayName: "Quad-Walk with Lean",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["knee_raise_alternating"],
        displayName: "Alternating Knee Raise",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["carioca"],
        displayName: "Carioca",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["frankenstein_mark_rdl"],
        displayName: "Frankenstein March with RDL",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["lateral_touch"],
        displayName: "Lateral Touch",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["squat_over_the_fence"],
        displayName: "Over-The-Fence and Squat",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["leg_swing_forward_backward"],
        displayName: "Leg Swing (Forward / Backward)",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["leg_swing_lateral"],
        displayName: "Leg Swing (Lateral)",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
        ],
      },
    ],
  },
  legs: {
    key: "legs",
    displayName: "Legs",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["bird_dog"],
        displayName: "Bird Dog",
        iconKey: "",
        note: null,
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["squat_wide_stance_barbell"],
        displayName: "Wide-Stance Squats (Barbell)",
        iconKey: "",
        note: "15 reps for warm-up (45, 65, 75 lb), 10 reps @ 115 lb",
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
        note: "20 x 20 x 20 @ 25 lb",
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
    displayName: "Pull (Upper Back)",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["dead_bug"],
        displayName: "Dead Bug",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["chin_tuck"],
        displayName: "Chin Tuck",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
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
      {
        exercise: EXERCISE_REGISTRY["row_bent_over_barbell"],
        displayName: "Bent-Over Row (Barbell)",
        iconKey: "",
        note: "Touch chest. Warm-up: 15 reps @ 45 lb, 95 lb, Working: 8 reps, 115 reps.",
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
        circuit: CIRCUIT_REGISTRY["row_cable_circuit"],
        displayName: "Cable Row Circuit",
        iconKey: "",
        note: "40 lb",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
          { index: 4, setType: SetType.Working },
          { index: 5, setType: SetType.Working },
          { index: 6, setType: SetType.Working },
          { index: 7, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["bicep_curl_circuit"],
        displayName: "Bicep Curl Circuit",
        iconKey: "",
        note: "10 reps @ 25 lb",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
    ],
  },
  pull_lower_back: {
    key: "pull_lower_back",
    displayName: "Pull (Lower Back)",
    iconKey: "weight-lifter",
    note: "",
    drills: [
      {
        exercise: EXERCISE_REGISTRY["dead_bug"],
        displayName: "Dead Bug",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["chin_tuck"],
        displayName: "Chin Tuck",
        iconKey: "",
        note: "10 reps",
        sets: [
          { index: 1, setType: SetType.Working },
          { index: 2, setType: SetType.Working },
          { index: 3, setType: SetType.Working },
        ],
      },
      {
        exercise: EXERCISE_REGISTRY["dead_lift_barbell"],
        displayName: "Dead Lift (Barbell)",
        iconKey: "",
        note: "5 reps every min. on the min. for 20 min., 205 lb",
        sets: [
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
          { index: 11, setType: SetType.Working },
          { index: 12, setType: SetType.Working },
          { index: 13, setType: SetType.Working },
          { index: 14, setType: SetType.Working },
          { index: 15, setType: SetType.Working },
          { index: 16, setType: SetType.Working },
          { index: 17, setType: SetType.Working },
          { index: 18, setType: SetType.Working },
          { index: 19, setType: SetType.Working },
          { index: 20, setType: SetType.Working },
        ],
      },
      {
        circuit: CIRCUIT_REGISTRY["pull_over_and_tricep_cable_circuit"],
        displayName: "Pull-Over and Tricep Circuit",
        iconKey: "",
        note: "20 reps @ 30 lb",
        sets: [
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
    ],
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
