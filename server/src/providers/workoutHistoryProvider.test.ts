import { SetType, WorkoutValueKey } from "@models/Workout/Core";

const mockAppendRowsToGoogleSheet = jest.fn();
const mockCreateSheet = jest.fn();
const mockSheetExists = jest.fn();

jest.mock("./sheetProvider", () => {
  return {
    SHEET_PROVIDER: {
      appendRowsToGoogleSheet: mockAppendRowsToGoogleSheet,
      createSheet: mockCreateSheet,
      sheetExists: mockSheetExists,
    },
  };
});

import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { WORKOUT_HISTORY_PROVIDER } from "./workoutHistoryProvider";

const ACCESS_TOKEN = "foo.accessToken";
const USER = {
  email: "fitleo824@gmail.com",
  googleId: "112354883135997385001",
  googleIdToken: ACCESS_TOKEN,
  name: "Leo Fit",
};
const SPREADSHEET_ID = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";
const WORKOUT_KEY = "rowing_machine";
const SHEET_ID = "Rowing (Machine)";
const RECORD: WorkoutHistoryRecord = {
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

describe("WORKOUT_HISTORY_PROVIDER", () => {
  describe("appendRecordToWorkoutHistory", () => {
    it("appends the record to a new sheet if the sheet doesn't already exist", async () => {
      mockSheetExists.mockResolvedValueOnce(false);

      await WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        USER,
        WORKOUT_KEY,
        RECORD
      );

      expect(mockSheetExists).toHaveBeenCalled();
      expect(mockCreateSheet).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        SPREADSHEET_ID,
        SHEET_ID
      );
      expect(mockAppendRowsToGoogleSheet).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        SPREADSHEET_ID,
        SHEET_ID,
        [
          [
            "Date",
            "Start Time",
            "Elapsed Time",
            "Rowing (Machine) : Set 1 (Warmup) : meters",
            "Rowing (Machine) : Set 1 (Warmup) : time",
            "Rowing (Machine) : Set 1 (Working) : meters",
            "Rowing (Machine) : Set 1 (Working) : time",
          ],
          ["08/27/2023", "17:00", "30:00", "1000", "30:00", "2000", "60:00"],
        ]
      );
    });

    it("appends the record to an existing sheet", async () => {
      mockSheetExists.mockResolvedValueOnce(true);

      await WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        USER,
        WORKOUT_KEY,
        RECORD
      );

      expect(mockSheetExists).toHaveBeenCalled();
      expect(mockCreateSheet).toHaveBeenCalledTimes(1);
      expect(mockAppendRowsToGoogleSheet).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        SPREADSHEET_ID,
        SHEET_ID,
        [["08/27/2023", "17:00", "30:00", "1000", "30:00", "2000", "60:00"]]
      );
    });

    it("appends to the spreadsheet of a different user", async () => {
      mockSheetExists.mockResolvedValueOnce(true);

      await WORKOUT_HISTORY_PROVIDER.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        {
          email: "hardikvala24@gmail.com",
          googleId: "108369507806083237863",
          googleIdToken: "other.foo.AccessToken",
          name: "Hardik Vala",
        },
        WORKOUT_KEY,
        RECORD
      );

      expect(mockSheetExists).toHaveBeenCalled();
      expect(mockCreateSheet).toHaveBeenCalledTimes(1);
      expect(mockAppendRowsToGoogleSheet).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        "TEMPORARY",
        SHEET_ID,
        [["08/27/2023", "17:00", "30:00", "1000", "30:00", "2000", "60:00"]]
      );
    });
  });
});
