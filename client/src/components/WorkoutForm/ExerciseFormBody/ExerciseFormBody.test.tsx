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

const TEST_TEMPLATE_WITH_DROP_SETS = {
  exercise: TEST_EXERCISE,
  displayName: "Test Exercise",
  iconKey: "",
  note: null,
  sets: [
    { index: 1, setType: SetType.Working },
    { index: 1, setType: SetType.Drop },
    { index: 2, setType: SetType.Working },
    { index: 2, setType: SetType.Drop },
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

import { ExerciseFormBody } from "./ExerciseFormBody";

describe("ExerciseFormBody", () => {
  it("renders correctly", () => {
    render(
      <ExerciseFormBody
        exercise={TEST_EXERCISE}
        sets={TEST_TEMPLATE.sets}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders drop sets correctly", () => {
    render(
      <ExerciseFormBody
        exercise={TEST_EXERCISE}
        sets={TEST_TEMPLATE_WITH_DROP_SETS.sets}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });
});
