import { render, screen } from "@testing-library/react-native";
import React from "react";

import App from "./App";

jest.mock("./components/Main/Main", () => {
  return {
    Main: jest.fn(() => <div>Mock Main</div>),
  };
});

jest.mock("./components/SignIn/SignIn", () => {
  return {
    SignIn: jest.fn(() => <div>Mock SignIn</div>),
  };
});

jest.mock("./services/authService", () => {
  return {
    signIn: jest.fn(() => {}),
    signOut: jest.fn(() => {}),
  };
});

describe("App", () => {
  it("renders sign in if the user hasn't signed in", () => {
    const tree = render(<App />).toJSON();

    expect(tree.children.length).toBe(1);
    expect(tree.children[0].children[0]).toEqual("Mock SignIn");
  });
});
