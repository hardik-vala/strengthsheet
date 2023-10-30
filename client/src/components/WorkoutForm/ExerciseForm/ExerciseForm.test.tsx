import { render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit,
  SetType,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import { WorkoutHistory } from "../../../models/Workout/WorkoutHistory";

const TEST_EXERCISE = {
  key: "test_exercise",
  displayName: "Test Exercise",
  measures: [
    { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
    {
      key: "test_measure",
      displayName: "reps",
      unit: ExerciseUnit.reps,
    },
  ],
};

const TEST_TEMPLATE = {
  exercise: TEST_EXERCISE,
  displayName: "Test Exercise",
  iconKey: "",
  note: null,
  sets: [
    { index: 1, setType: SetType.Working },
    { index: 2, setType: SetType.Working },
  ],
};

const TEST_HISTORY: WorkoutHistory = {
  workoutTemplate: null,
  records: [
    {
      startTimestamp: new Date("2023-08-28"),
      elapsedTime: 3600000,
      exercises: [
        {
          key: WorkoutValueKey.createFromExercise(
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "13",
        },
        {
          key: WorkoutValueKey.createFromExercise(
            "test_exercise",
            2,
            SetType.Working,
            "test_measure"
          ),
          value: "13",
        },
      ],
    },
    {
      startTimestamp: new Date("2023-08-27"),
      elapsedTime: 3600000,
      exercises: [
        {
          key: WorkoutValueKey.createFromExercise(
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "12",
        },
        {
          key: WorkoutValueKey.createFromExercise(
            "test_exercise",
            2,
            SetType.Working,
            "test_measure"
          ),
          value: "12",
        },
      ],
    },
  ],
};

jest.mock("../../../services/backendService", () => {
  return {
    fetchWorkoutHistory: jest.fn(),
    storeRecordInWorkoutHistory: jest.fn(),
  };
});

import { ExerciseForm } from "./ExerciseForm";

describe("ExerciseForm", () => {
  it("renders correctly", () => {
    render(
      <ExerciseForm
        exerciseTemplate={TEST_TEMPLATE}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders with note correctly", () => {
    render(
      <ExerciseForm
        exerciseTemplate={{...TEST_TEMPLATE, note: "This is a test note."}}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });
});
