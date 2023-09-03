import { render } from "@testing-library/react-native";
import React from "react";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

// TODO: Replace with WorkoutForm mock.
jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
    readSheetValues: jest.fn(),
  };
});

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "./Main";

const mockOnSignOut = jest.fn();

describe("Main", () => {
  it("renders correctly", () => {
    const tree = render(
      <SafeAreaProvider>
        <Main onSignOut={mockOnSignOut} />
      </SafeAreaProvider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
