import { fireEvent, render, screen } from "@testing-library/react-native";
import { format } from "date-fns";
import React from "react";

import { Main } from "./Main";

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

const mockOnSignOut = jest.fn();

describe("Main", () => {
  it("appends the text input to a spreadsheet upon submission", () => {
    render(<Main onSignOut={mockOnSignOut} />);

    fireEvent.changeText(screen.getByPlaceholderText("e.g. 30:00"), "foo");
    fireEvent.changeText(screen.getByPlaceholderText("e.g. 5000m"), "bar");
    fireEvent.press(screen.getByText("Submit"));

    expect(appendToGoogleSheet).toHaveBeenCalledWith(
      "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o",
      [
        format(new Date(), "MM/dd/yyyy"),
        format(new Date(), "HH:mm"),
        "foo",
        "bar",
      ]
    );
  });
});
