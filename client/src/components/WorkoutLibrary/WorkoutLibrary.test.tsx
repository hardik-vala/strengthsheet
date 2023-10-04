import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

import { PaperProvider } from "react-native-paper";
import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
import { WorkoutLibrary } from "./WorkoutLibrary";

const mockOnStartWorkout = jest.fn();

describe("WorkoutLibrary", () => {
  it("renders correctly", () => {
    render(
      <PaperProvider>
        <WorkoutLibrary
          workoutTemplateRegistry={WORKOUT_TEMPLATE_REGISTRY}
          onStartWorkout={mockOnStartWorkout}
        />
      </PaperProvider>
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders workout preview when a workout is selected", async () => {
    render(
      <PaperProvider>
        <WorkoutLibrary
          workoutTemplateRegistry={WORKOUT_TEMPLATE_REGISTRY}
          onStartWorkout={mockOnStartWorkout}
        />
      </PaperProvider>
    );

    await act(() => {
      fireEvent.press(screen.getByText("Rowing (Machine)"));
    });

    expect(screen).toMatchSnapshot();
  });

  it("renders workout form when a workout is started", async () => {
    render(
      <PaperProvider>
        <WorkoutLibrary
          workoutTemplateRegistry={WORKOUT_TEMPLATE_REGISTRY}
          onStartWorkout={mockOnStartWorkout}
        />
      </PaperProvider>
    );

    await act(() => {
      fireEvent.press(screen.getByText("Rowing (Machine)"));
    });

    await act(() => {
      fireEvent.press(screen.getByText("Start"));
    });

    expect(screen).toMatchSnapshot();
  });
});
