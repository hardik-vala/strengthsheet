import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

// TODO: Replace with WorkoutForm mock.
jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
    readSheetData: jest.fn(),
  };
});

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "./Main";

const mockOnSignOut = jest.fn();

describe("Main", () => {
  it("renders correctly", () => {
    render(
      <SafeAreaProvider>
        <Main onSignOut={mockOnSignOut} />
      </SafeAreaProvider>
    );

    expect(screen).toMatchSnapshot();
  });
});
