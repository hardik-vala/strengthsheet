import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { format } from "date-fns";
import React from "react";

import { WorkoutForm } from "./WorkoutForm";

jest.useFakeTimers().setSystemTime(new Date("2023-08-27"));

jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
    readSheetValues: jest.fn(),
  };
});

import {
  appendToGoogleSheet,
  readSheetValues,
} from "../../services/sheetService";

describe("WorkoutForm", () => {
  it("renders correctly", () => {
    const tree = render(<WorkoutForm />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders error style when time input is invalid", async () => {
    render(<WorkoutForm />).toJSON();

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("30:00"), "foo");
    });

    expect(screen).toMatchSnapshot();
  });

  it("renders error style when distance input is invalid", async () => {
    render(<WorkoutForm />).toJSON();

    await act(() => {
      fireEvent.changeText(screen.getByPlaceholderText("5000m"), "-1");
    });

    expect(screen).toMatchSnapshot();
  });

  it("appends the text input to a spreadsheet upon submission", async () => {
    render(<WorkoutForm />);

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
});
