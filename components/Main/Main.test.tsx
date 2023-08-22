import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { Main } from "./Main";

jest.mock("../../services/sheetService", () => {
  return {
    appendToGoogleSheet: jest.fn(),
  };
});

import { appendToGoogleSheet } from "../../services/sheetService";

const mockOnSignOut = jest.fn();

describe("Main", () => {
  it("appends the text input to a spreadsheet upon submission", () => {
    render(<Main onSignOut={mockOnSignOut} />);

    fireEvent.changeText(screen.getByPlaceholderText("Type here"), "foobar");
    fireEvent.press(screen.getByText("Submit"));

    expect(appendToGoogleSheet).toHaveBeenCalledWith(
      "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o",
      "foobar"
    );
  });
});
