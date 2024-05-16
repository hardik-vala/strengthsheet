db.createCollection("users");
db.createCollection("workoutHistory");

const users = [
  // For hardikvala24@gmail.com.
  { userId: "108369507806083237863", spreadsheetId: "TEMPORARY" },
  // For fitleo824@gmail.com.
  {
    userId: "112354883135997385001",
    spreadsheetId: "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o",
  },
];

const workoutHistory = [
  {
    userId: "108369507806083237863",
    history: {
      rowing_machine: {
        workoutKey: "rowing_machine",
        sheetId: "Rowing (Machine)",
        sheetHeader: [
          "Date",
          "Start Time",
          "Elapsed Time",
          "rowing_machine:1:2:meters",
          "rowing_machine:1:2:time",
          "rowing_machine:1:3:meters",
          "rowing_machine:1:3:time",
        ],
        records: [],
      },
      muscle_up_requirement: {
        workoutKey: "muscle_up_requirement",
        sheetId: "Muscle-Up Requirement",
        sheetHeader: [],
        records: [],
      },
    },
  },
  {
    userId: "112354883135997385001",
    history: {
      stretches: {
        workoutKey: "stretches",
        sheetId: "Stretches",
        sheetHeader: [],
        records: [],
      },
      muscle_up_requirement: {
        workoutKey: "muscle_up_requirement",
        sheetId: "Muscle-Up Requirement",
        sheetHeader: [],
        records: [],
      },
      push_shoulders: {
        workoutKey: "push_shoulders",
        sheetId: "Push (Shoulders)",
        sheetHeader: [],
        records: [],
      },
      push_chest: {
        workoutKey: "push_chest",
        sheetId: "Push (Chest)",
        sheetHeader: [],
        records: [],
      },
      ab_ripper_x: {
        workoutKey: "ab_ripper_x",
        sheetId: "Ab Ripper X",
        sheetHeader: [],
        records: [],
      },
      it_band_rehab: {
        workoutKey: "it_band_rehab",
        sheetId: "IT Band Rehab",
        sheetHeader: [],
        records: [],
      },
      basketball_warmup: {
        workoutKey: "basketball_warmup",
        sheetId: "Basketball Warmup",
        sheetHeader: [],
        records: [],
      },
      legs: {
        workoutKey: "legs",
        sheetId: "Legs",
        sheetHeader: ["date", "start_time", "elapsed_time"],
        records: [
          {
            startTimestamp: "2023-09-21T03:00:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 1,
                  setType: 2,
                  measureKey: "lb",
                },
                value: "45",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 1,
                  setType: 2,
                  measureKey: "reps",
                },
                value: "15",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 2,
                  setType: 2,
                  measureKey: "lb",
                },
                value: "65",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 2,
                  setType: 2,
                  measureKey: "reps",
                },
                value: "15",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "lb",
                },
                value: "25",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "reps",
                },
                value: "20",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 2,
                  setType: 3,
                  measureKey: "lb",
                },
                value: "25",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 2,
                  setType: 3,
                  measureKey: "reps",
                },
                value: "20",
              },
            ],
          },
          {
            startTimestamp: "2023-09-20T03:00:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 1,
                  setType: 2,
                  measureKey: "lb",
                },
                value: "45",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 1,
                  setType: 2,
                  measureKey: "reps",
                },
                value: "15",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 2,
                  setType: 2,
                  measureKey: "lb",
                },
                value: "65",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "squat_wide_stance_barbell",
                  setIndex: 2,
                  setType: 2,
                  measureKey: "reps",
                },
                value: "15",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "lb",
                },
                value: "20",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "reps",
                },
                value: "20",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 2,
                  setType: 3,
                  measureKey: "lb",
                },
                value: "20",
              },
              {
                key: {
                  circuitKey: "hip_thrust_circuit",
                  exerciseKey: "hip_thrust_single_leg",
                  setIndex: 2,
                  setType: 3,
                  measureKey: "reps",
                },
                value: "20",
              },
            ],
          },
        ],
      },
      pull_upper_back: {
        workoutKey: "pull_upper_back",
        sheetId: "Pull (Upper Back)",
        sheetHeader: [],
        records: [],
      },
      pull_lower_back: {
        workoutKey: "pull_lower_back",
        sheetId: "Pull (Lower Back)",
        sheetHeader: [],
        records: [],
      },
      rowing_machine: {
        workoutKey: "rowing_machine",
        sheetId: "Rowing (Machine)",
        sheetHeader: [
          "Date",
          "Start Time",
          "Elapsed Time",
          "rowing_machine:1:2:meters",
          "rowing_machine:1:2:time",
          "rowing_machine:1:3:meters",
          "rowing_machine:1:3:time",
        ],
        records: [
          {
            startTimestamp: "2023-08-26T03:04:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "meters",
                },
                value: "1000",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "time",
                },
                value: "00:30:00",
              },
            ],
          },
          {
            startTimestamp: "2023-08-26T03:04:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "meters",
                },
                value: "1000",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "time",
                },
                value: "00:30:00",
              },
            ],
          },
          {
            startTimestamp: "2023-08-30T04:19:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "meters",
                },
                value: "2000",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "time",
                },
                value: "00:31:00",
              },
            ],
          },
          {
            startTimestamp: "2023-08-30T04:20:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "meters",
                },
                value: "3000",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "time",
                },
                value: "00:32:00",
              },
            ],
          },
          {
            startTimestamp: "2023-09-03T04:10:00.000Z",
            elapsedTime: 1800000,
            exercises: [
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "meters",
                },
                value: "4000",
              },
              {
                key: {
                  circuitKey: null,
                  exerciseKey: "rowing_machine",
                  setIndex: 1,
                  setType: 3,
                  measureKey: "time",
                },
                value: "00:33:00",
              },
            ],
          },
        ],
      },
    },
  },
];

db.users.insertMany(users);
db.workoutHistory.insertMany(workoutHistory);
