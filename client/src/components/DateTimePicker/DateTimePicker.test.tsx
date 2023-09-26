import { render } from "@testing-library/react-native";
import React from "react";

import { DateTimePicker } from "./DateTimePicker";

describe("DateTimePicker", () => {
  it("renders correctly", () => {
    const tree = render(
      <DateTimePicker
        label="My picker"
        testID="pickerTestId"
        value={new Date("2023-08-27")}
        isDate={true}
        onChange={() => {}}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
