import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { parse as parseDate } from "date-fns";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
import { SetType, WorkoutValueKey } from "../../models/Workout/Core";
import { WorkoutHistory } from "../../models/Workout/WorkoutHistory";
import { WorkoutTemplate } from "../../models/Workout/WorkoutTemplate";

const CURRENT_DATETIME = new Date("2023-08-27");

jest.useFakeTimers().setSystemTime(CURRENT_DATETIME);

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

const MOCK_WORKOUT_HISTORY: { [k: string]: WorkoutHistory } = {
  rowing_machine: {
    workoutTemplate: WORKOUT_TEMPLATE_REGISTRY["rowing_machine"],
    records: [
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "1000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:30:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/25/2023 20:04"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "1000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:30:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:19"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "2000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:31:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("08/29/2023 21:20"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "3000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:32:00",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("09/02/2023 21:10"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "4000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "00:33:00",
          },
        ],
      },
    ],
  },
  legs: {
    workoutTemplate: WORKOUT_TEMPLATE_REGISTRY["legs"],
    records: [
      {
        startTimestamp: convertToDateObj("09/20/2023 20:00"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "lb"
            ),
            value: "45",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "lb"
            ),
            value: "65",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "lb"
            ),
            value: "25",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "lb"
            ),
            value: "25",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
        ],
      },
      {
        startTimestamp: convertToDateObj("09/19/2023 20:00"),
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "lb"
            ),
            value: "45",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              1,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "lb"
            ),
            value: "65",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "squat_wide_stance_barbell",
              2,
              SetType.Warmup,
              "reps"
            ),
            value: "15",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "lb"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              1,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "lb"
            ),
            value: "20",
          },
          {
            key: WorkoutValueKey.createFromCircuit(
              "hip_thrust_circuit",
              "hip_thrust_single_leg",
              2,
              SetType.Working,
              "reps"
            ),
            value: "20",
          },
        ],
      },
    ],
  },
};

function convertToDateObj(dateStr: string) {
  return parseDate(dateStr, "MM/dd/yyyy HH:mm", new Date());
}

jest.mock("../../services/backendService", () => {
  return {
    fetchWorkoutHistory: jest.fn(),
    storeRecordInWorkoutHistory: jest.fn(),
  };
});

import { WORKOUT_HISTORY_PROVIDER } from "../../providers/WorkoutHistoryProvider";

WORKOUT_HISTORY_PROVIDER.getWorkoutHistory = jest
  .fn()
  .mockImplementation(
    async (workoutTemplate: WorkoutTemplate): Promise<WorkoutHistory> => {
      return MOCK_WORKOUT_HISTORY[workoutTemplate.key];
    }
  );

WORKOUT_HISTORY_PROVIDER.addRecordToWorkoutHistory = jest.fn();

import { WorkoutForm } from "./WorkoutForm";

describe("WorkoutForm", () => {
  let onBack;

  beforeEach(() => {
    onBack = jest.fn();
  });

  it("renders correctly", async () => {
    render(
      <WorkoutForm
        workoutTemplate={WORKOUT_TEMPLATE_REGISTRY["rowing_machine"]}
        onBack={onBack}
      />
    );

    await waitFor(() => {
      screen.getByPlaceholderText("4000");
    });

    expect(screen).toMatchSnapshot();
  });

  it("renders workouts with circuits correctly", async () => {
    render(
      <WorkoutForm
        workoutTemplate={WORKOUT_TEMPLATE_REGISTRY["legs"]}
        onBack={onBack}
      />
    );

    await waitFor(() => {
      screen.getByPlaceholderText("65");
    });

    expect(screen).toMatchSnapshot();
  });

  it("calls onBack after performing back action", async () => {
    render(
      <WorkoutForm
        workoutTemplate={WORKOUT_TEMPLATE_REGISTRY["rowing_machine"]}
        onBack={onBack}
      />
    );

    await act(() => {
      fireEvent.press(screen.getByTestId("back-action"));
    });

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("stores workout on save", async () => {
    render(
      <WorkoutForm
        workoutTemplate={WORKOUT_TEMPLATE_REGISTRY["rowing_machine"]}
        onBack={onBack}
      />
    );

    await waitFor(() => {
      screen.getByPlaceholderText("4000");
    });

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("4000"), "5000");
    });

    await act(() => {
      fireEvent.press(screen.getByText("Finish"));
    });

    expect(
      WORKOUT_HISTORY_PROVIDER.addRecordToWorkoutHistory
    ).toHaveBeenCalledWith("rowing_machine", {
      startTimestamp: CURRENT_DATETIME,
      exercises: [
        {
          key: WorkoutValueKey.createFromExercise(
            "rowing_machine",
            1,
            SetType.Warmup,
            "meters"
          ),
          value: undefined,
        },
        {
          key: WorkoutValueKey.createFromExercise(
            "rowing_machine",
            1,
            SetType.Warmup,
            "time"
          ),
          value: undefined,
        },
        {
          key: WorkoutValueKey.createFromExercise(
            "rowing_machine",
            1,
            SetType.Working,
            "meters"
          ),
          value: "5000",
        },
        {
          key: WorkoutValueKey.createFromExercise(
            "rowing_machine",
            1,
            SetType.Working,
            "time"
          ),
          value: undefined,
        },
      ],
    });
  });
});
