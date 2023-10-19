import { render, screen } from "@testing-library/react-native";
import React from "react";
import {
  ExerciseUnit
} from "../../../models/Workout/Core";
import { ExerciseFormHeader } from "./ExerciseFormHeader";

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

describe("ExerciseFormHeader", () => {
  it("renders correctly", () => {
    render(<ExerciseFormHeader exercise={TEST_EXERCISE} />);

    expect(screen).toMatchSnapshot();
  });
});
