import { render } from "@testing-library/react-native";
import React from "react";
import mockSafeAreaContext from "react-native-safe-area-context/jest/mock";

jest.mock("react-native-safe-area-context", () => mockSafeAreaContext);

import { Content } from "./App";

jest.mock("./src/components/WorkoutPortal/WorkoutPortal", () => {
  return {
    WorkoutPortal: jest.fn(() => <div>Mock WorkoutPortal</div>),
  };
});

jest.mock("./src/components/SignIn/SignIn", () => {
  return {
    SignIn: jest.fn(() => <div>Mock SignIn</div>),
  };
});

jest.mock("./src/services/authService", () => {
  return {
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
});

const mockOnSignIn = jest.fn();
const mockOnSignOut = jest.fn();

describe("Content", () => {
  it("renders sign in if the user hasn't signed in", () => {
    const tree = render(
      <Content user={null} onSignIn={mockOnSignIn} onSignOut={mockOnSignOut} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.children.length).toBe(1);
    expect(tree.children[0]).toEqual("Mock SignIn");
  });

  it("renders workout library if the user has signed in", () => {
    const tree = render(
      <Content user={{}} onSignIn={mockOnSignIn} onSignOut={mockOnSignOut} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree.children.length).toBe(1);
    expect(tree.children[0]).toEqual("Mock WorkoutPortal");
  });
});
