import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
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
});
