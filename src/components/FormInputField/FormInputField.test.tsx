import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { FormInputField } from "./FormInputField";

const TEST_FIELD_HISTORY = {
  fieldName: "My field",
  historyRecords: [
    { datetime: new Date("2023-08-28"), fieldValue: "value4" },
    { datetime: new Date("2023-08-27"), fieldValue: "value3" },
    { datetime: new Date("2023-08-26"), fieldValue: "value2" },
    { datetime: new Date("2023-08-25"), fieldValue: "value1" },
  ]
};

describe("FormInputField", () => {
  it("renders correctly", () => {
    render(
      <FormInputField
        label="My field"
        placeholder="foobar"
        value=""
        fieldHistory={TEST_FIELD_HISTORY}
        onChangeText={() => {}}
        error={false}
      />
    );

    expect(screen).toMatchSnapshot();
  });

  it("renders field history", async () => {
    render(
      <FormInputField
        label="My field"
        placeholder="foobar"
        value=""
        fieldHistory={TEST_FIELD_HISTORY}
        onChangeText={() => {}}
        error={false}
      />
    );

    await act(() => {
      fireEvent.press(screen.getByText("History"));
    });

    expect(screen).toMatchSnapshot();
  });
});
