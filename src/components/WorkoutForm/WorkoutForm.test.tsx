import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { format } from "date-fns";
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

import { WorkoutForm } from "./WorkoutForm";

import { appendToGoogleSheet } from "../../services/sheetService";

describe("WorkoutForm", () => {
  let onBack;

  beforeEach(() => {
    onBack = jest.fn();
  });

  it("renders correctly", async () => {
    render(<WorkoutForm onBack={onBack} />);

    expect(screen).toMatchSnapshot();
  });

  it("renders error style when time input is invalid", async () => {
    render(<WorkoutForm onBack={onBack} />);

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("30:00"), "foo");
    });

    expect(screen).toMatchSnapshot();
  });

  it("renders error style when distance input is invalid", async () => {
    render(<WorkoutForm onBack={onBack} />);

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("5000m"), "-1");
    });

    expect(screen).toMatchSnapshot();
  });

  it("appends the text input to a spreadsheet upon submission", async () => {
    render(<WorkoutForm onBack={onBack} />);

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("30:00"), "45:00");
      fireEvent.changeText(screen.getByPlaceholderText("5000m"), "10000m");
    });

    await act(() => {
      fireEvent.press(screen.getByText("Save"));
    });

    expect(appendToGoogleSheet).toHaveBeenCalledWith(
      "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o",
      [
        format(new Date(), "MM/dd/yyyy"),
        format(new Date(), "HH:mm"),
        "45:00",
        "10000m",
      ]
    );
  });

  it("Calls onBack after performing back action", async () => {
    render(<WorkoutForm onBack={onBack} />);

    await act(() => {
      fireEvent.press(screen.getByTestId("back-action"));
    });

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
