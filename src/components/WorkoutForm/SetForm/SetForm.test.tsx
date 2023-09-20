import { render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit,
  SetType,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import { SetForm } from "./SetForm";

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

const TEST_SET = { index: 2, setType: SetType.Working };

const TEST_HISTORY = {
  workoutTemplate: null,
  records: [
    {
      startTimestamp: new Date("2023-08-28"),
      exercises: [
        {
          key: WorkoutValueKey.create(
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "13",
        },
        {
          key: WorkoutValueKey.create(
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
      exercises: [
        {
          key: WorkoutValueKey.create(
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "12",
        },
        {
          key: WorkoutValueKey.create(
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

describe("SetForm", () => {
  it("renders correctly", () => {
    render(
      <SetForm
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });
});
