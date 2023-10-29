import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit,
  SetType,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import { ShelfForm } from "./ShelfForm";

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

const TEST_CIRCUIT = {
  key: "test_circuit",
  exercises: [
    { exercise: TEST_EXERCISE, note: null }
  ]
}

const TEST_SET = { index: 2, setType: SetType.Working };

const TEST_HISTORY = {
  workoutTemplate: null,
  records: [
    {
      startTimestamp: new Date("2023-08-28"),
      elapsedTime: 1800000,
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
        {
          key: WorkoutValueKey.createFromCircuit(
            "test_circuit",
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "23",
        },
        {
          key: WorkoutValueKey.createFromCircuit(
            "test_circuit",
            "test_exercise",
            2,
            SetType.Working,
            "test_measure"
          ),
          value: "23",
        },
      ],
    },
    {
      startTimestamp: new Date("2023-08-27"),
      elapsedTime: 1800000,
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
        {
          key: WorkoutValueKey.createFromCircuit(
            "test_circuit",
            "test_exercise",
            1,
            SetType.Working,
            "test_measure"
          ),
          value: "22",
        },
        {
          key: WorkoutValueKey.createFromCircuit(
            "test_circuit",
            "test_exercise",
            2,
            SetType.Working,
            "test_measure"
          ),
          value: "22",
        },
      ],
    },
  ],
};

describe("ShelfForm", () => {
  it("renders correctly", () => {
    render(
      <ShelfForm
        title="Test Title"
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders circuit shelf correctly", () => {
    render(
      <ShelfForm
        title="Test Title"
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        circuitKey={TEST_CIRCUIT.key}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders shelf history correctly", async () => {
    render(
      <ShelfForm
        title="Test Title"
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        workoutHistory={TEST_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    await act(() => {
      fireEvent.press(screen.getByTestId(`test_exercise:2:1`));
    });

    expect(screen).toMatchSnapshot();
  });
});
