import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

// TODO: Replace with WorkoutForm mock.
jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
    readSheetData: jest.fn(),
  };
});

import { WorkoutLibrary } from "./WorkoutLibrary";

const mockOnSignOut = jest.fn();

describe("Main", () => {
  it("renders correctly", () => {
    render(<WorkoutLibrary onSignOut={mockOnSignOut} />);

    expect(screen).toMatchSnapshot();
  });
});
