import { render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
import { WorkoutFinish } from "./WorkoutFinish";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

describe("WorkoutFinish", () => {
  it("renders correctly", () => {
    const onDismiss = jest.fn();
    render(
      <WorkoutFinish
        workoutTemplate={WORKOUT_TEMPLATE_REGISTRY["rowing_machine"]}
        onDismiss={onDismiss}
      />
    );

    expect(screen).toMatchSnapshot();
  });
});
