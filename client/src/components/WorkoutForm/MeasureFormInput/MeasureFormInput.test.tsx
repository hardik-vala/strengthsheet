import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit,
  SetType,
  WorkoutValueKey,
} from "../../../models/Workout/Core";
import { MeasureFormInput } from "./MeasureFormInput";

const TEST_MEASURE = {
  key: "test_measure",
  displayName: "reps",
  unit: ExerciseUnit.reps,
};

const TEST_EXERCISE = {
  key: "test_exercise",
  displayName: "Test Exercise",
  measures: [
    { key: "lb", displayName: "lb", unit: ExerciseUnit.lb },
    TEST_MEASURE,
  ],
};

const TEST_CIRCUIT = {
  key: "test_circuit",
  exercises: [
    { exercise: TEST_EXERCISE, note: null }
  ]
}

const TEST_SET = { index: 2, setType: SetType.Working };

const TEST_MEASURE_HISTORY = [
  {
    timestamp: new Date("2023-08-28"),
    key: WorkoutValueKey.createFromExercise(
      "test_exercise",
      2,
      SetType.Working,
      "test_measure"
    ),
    value: "13",
  },
  {
    timestamp: new Date("2023-08-27"),
    key: WorkoutValueKey.createFromExercise(
      "test_exercise",
      2,
      SetType.Working,
      "test_measure"
    ),
    value: "12",
  },
  {
    timestamp: new Date("2023-08-28"),
    key: WorkoutValueKey.createFromCircuit(
      "test_circuit",
      "test_exercise",
      2,
      SetType.Working,
      "test_measure"
    ),
    value: "23",
  },
  {
    timestamp: new Date("2023-08-27"),
    key: WorkoutValueKey.createFromCircuit(
      "test_circuit",
      "test_exercise",
      2,
      SetType.Working,
      "test_measure"
    ),
    value: "12",
  },
];

describe("MeasureFormInput", () => {
  it("renders correctly", () => {
    render(
      <MeasureFormInput
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        measure={TEST_MEASURE}
        measureHistory={[]}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders with history", () => {
    render(
      <MeasureFormInput
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        measure={TEST_MEASURE}
        measureHistory={TEST_MEASURE_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("calls onUpdateWorkoutValues when text input changes", () => {
    const onUpdateWorkoutValues = jest.fn();

    render(
      <MeasureFormInput
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        measure={TEST_MEASURE}
        measureHistory={TEST_MEASURE_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={onUpdateWorkoutValues}
      />
    );

    act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("13"), "8");
    });

    expect(onUpdateWorkoutValues).toHaveBeenCalledWith(
      expect.objectContaining({
        "test_exercise:2:1:test_measure": "8",
      })
    );
  });

  it("renders circuit measure inputs correctly", () => {
    render(
      <MeasureFormInput
        exercise={TEST_EXERCISE}
        set={TEST_SET}
        measure={TEST_MEASURE}
        circuitKey={TEST_CIRCUIT.key}
        measureHistory={TEST_MEASURE_HISTORY}
        workoutValues={{}}
        onUpdateWorkoutValues={() => {}}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  describe("when the text input is invalid", () => {
    it("renders the error indicator", () => {
      render(
        <MeasureFormInput
          exercise={TEST_EXERCISE}
          set={TEST_SET}
          measure={TEST_MEASURE}
          measureHistory={TEST_MEASURE_HISTORY}
          workoutValues={{}}
          onUpdateWorkoutValues={() => {}}
        />
      );

      act(() => {
        fireEvent.changeText(screen.getByPlaceholderText("13"), "Q");
      });

      expect(screen).toMatchSnapshot();
    });

    it("doesn't call onUpdateWorkoutValues", () => {
      const onUpdateWorkoutValues = jest.fn();

      render(
        <MeasureFormInput
          exercise={TEST_EXERCISE}
          set={TEST_SET}
          measure={TEST_MEASURE}
          measureHistory={TEST_MEASURE_HISTORY}
          workoutValues={{}}
          onUpdateWorkoutValues={onUpdateWorkoutValues}
        />
      );

      act(() => {
        fireEvent.changeText(screen.getByPlaceholderText("13"), "Q");
      });

      expect(onUpdateWorkoutValues).not.toHaveBeenCalled();
    });
  });
});