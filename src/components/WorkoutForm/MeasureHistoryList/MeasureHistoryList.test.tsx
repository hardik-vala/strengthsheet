import { act, fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { SetType, WorkoutValueKey } from "../../../models/Workout/Core";
import { MeasureHistoryList } from "./MeasureHistoryList";

const TEST_HISTORY = [
  {
    timestamp: new Date("2023-08-28"),
    measureKey: WorkoutValueKey.create(
      "some_exercise",
      1,
      SetType.Working,
      "some_measure"
    ),
    value: "value4",
  },
  {
    timestamp: new Date("2023-08-27"),
    measureKey: WorkoutValueKey.create(
      "some_exercise",
      1,
      SetType.Working,
      "some_measure"
    ),
    value: "value3",
  },
  {
    timestamp: new Date("2023-08-26"),
    measureKey: WorkoutValueKey.create(
      "some_exercise",
      1,
      SetType.Working,
      "some_measure"
    ),
    value: "value2",
  },
  {
    timestamp: new Date("2023-08-25"),
    measureKey: WorkoutValueKey.create(
      "some_exercise",
      1,
      SetType.Working,
      "some_measure"
    ),
    value: "value1",
  },
];

describe("MeasureHistoryList", () => {
  it("renders correctly", () => {
    render(<MeasureHistoryList measureHistory={TEST_HISTORY} />);

    expect(screen).toMatchSnapshot();
  });

  it("renders field history", async () => {
    render(<MeasureHistoryList measureHistory={TEST_HISTORY} />);

    await act(() => {
      fireEvent.press(screen.getByText("History"));
    });

    expect(screen).toMatchSnapshot();
  });
});
