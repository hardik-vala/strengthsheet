import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";
import { MOCK_SHEET_DATA } from "../../../test/fixtures/sheetData";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
    readSheetData: jest.fn().mockResolvedValue({
      range: "Sheet1!A1:A1",
      majorDimension: "ROWS",
      values: MOCK_SHEET_DATA,
    }),
  };
});

import { WorkoutLibrary } from "./WorkoutLibrary";

const mockOnSignOut = jest.fn();

describe("WorkoutLibrary", () => {
  it("renders correctly", () => {
    render(<WorkoutLibrary onSignOut={mockOnSignOut} />);

    expect(screen).toMatchSnapshot();
  });

  it("renders workout form when a workout is selected", async () => {
    render(<WorkoutLibrary onSignOut={mockOnSignOut} />);

    await act(() => {
      fireEvent.press(screen.getByText("Rower"));
    });

    expect(screen).toMatchSnapshot();
  });
});
