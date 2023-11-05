import { SetType, WorkoutValueKey } from "@models/Workout/Core";

const mockAppendRowToGoogleSheet = jest.fn();

jest.mock("./sheetProvider", () => {
  return {
    SHEET_PROVIDER: {
      appendRowToGoogleSheet: mockAppendRowToGoogleSheet,
    },
  };
});


import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { WORKOUT_HISTORY_PROVIDER } from "./workoutHistoryProvider";

describe("WORKOUT_HISTORY_PROVIDER", () => {
  describe("appendRecordToWorkoutHistory", () => {
    it("appends the record to a sheet", () => {
      const accessToken = "foo.accessToken";
      const record: WorkoutHistoryRecord = {
        startTimestamp: new Date("2023-08-28"),
        elapsedTime: 1800000,
        exercises: [
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Warmup,
              "meters"
            ),
            value: "1000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Warmup,
              "time"
            ),
            value: "30:00",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "meters"
            ),
            value: "2000",
          },
          {
            key: WorkoutValueKey.createFromExercise(
              "rowing_machine",
              1,
              SetType.Working,
              "time"
            ),
            value: "60:00",
          },
        ],
      };

      WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
        accessToken,
        "rowing_machine",
        record
      );

      expect(mockAppendRowToGoogleSheet).toHaveBeenCalledWith(
        accessToken,
        "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o",
        "Rowing (Machine)",
        ["08/27/2023", "17:00", "30:00", "1000", "30:00", "2000", "60:00"]
      );
    });
  });
});
