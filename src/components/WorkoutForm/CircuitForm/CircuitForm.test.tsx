import { render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit,
  SetType,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import { CircuitForm } from "./CircuitForm";

const TEST_EXERCISE_1 = {
  key: "test_exercise_1",
  displayName: "Test Exercise 1",
  measures: [
    { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
    {
      key: "test_measure",
      displayName: "reps",
      unit: ExerciseUnit.reps,
    },
  ],
};

const TEST_EXERCISE_2 = {
  key: "test_exercise_2",
  displayName: "Test Exercise 2",
  measures: [
    { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
    {
      key: "test_measure",
      displayName: "reps",
      unit: ExerciseUnit.reps,
    },
  ],
};

const TEST_CIRCUIT = {
  key: "test_circuit",
  exercises: [
    { exercise: TEST_EXERCISE_1, note: null },
    { exercise: TEST_EXERCISE_2, note: null },
  ],
};

const TEST_TEMPLATE = {
  circuit: TEST_CIRCUIT,
  displayName: "Test Circuit",
  iconKey: "",
  note: null,
  sets: [
    { index: 1, setType: SetType.Working },
    { index: 2, setType: SetType.Working },
  ],
};

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

describe("CircuitForm", () => {
  it("renders correctly", () => {
    render(
      <CircuitForm
        circuitTemplate={TEST_TEMPLATE}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });
});
