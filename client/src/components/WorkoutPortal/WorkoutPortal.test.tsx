import { render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("../../services/backendService", () => {
  return {
    fetchWorkoutHistory: jest.fn(),
    storeRecordInWorkoutHistory: jest.fn(),
  };
});

import { PaperProvider } from "react-native-paper";
import { WORKOUT_TEMPLATE_REGISTRY } from "../../data/registry";
import { WorkoutPortal } from "./WorkoutPortal";

const mockSignOut = jest.fn();

describe("WorkoutPortal", () => {
  it("renders correctly", () => {
    render(
      <PaperProvider>
        <WorkoutPortal
          workoutTemplateRegistry={WORKOUT_TEMPLATE_REGISTRY}
          onSignOut={mockSignOut}
        />
      </PaperProvider>
    );

    expect(screen).toMatchSnapshot();
  });
});
