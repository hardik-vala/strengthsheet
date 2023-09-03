import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";

import { FormInputField } from "./FormInputField";

describe("FormInputField", () => {
  it("renders correctly", () => {
    const tree = render(
      <FormInputField
        label="My field"
        placeholder="foobar"
        value=""
        onChangeText={() => {}}
        error={false}
      />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
