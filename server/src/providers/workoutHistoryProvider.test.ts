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
import { MongoClient } from "mongodb";
import { WorkoutHistoryProvider } from "./workoutHistoryProvider";

const SPREADSHEET_ID = "1-wL-dRJYZkZ-uVpoBSuGeSFEzg_ZWVKFwLTv8RgbX7o";

const mockConnect = jest.fn();
const mockDb = jest.fn();
const mockUsersCollection = jest.fn();
const mockWorkoutHistoryCollection = jest.fn();

MongoClient.prototype.connect = mockConnect;
MongoClient.prototype.db = mockDb;
mockDb.mockImplementation(() => ({
  collection: jest
    .fn()
    .mockImplementation((name) =>
      name === "users" ? mockUsersCollection() : mockWorkoutHistoryCollection()
    ),
}));
mockUsersCollection.mockReturnValue({
  findOne: jest.fn().mockResolvedValue({
    spreadsheetId: SPREADSHEET_ID,
  }),
});
mockWorkoutHistoryCollection.mockReturnValue({
  findOne: jest.fn().mockResolvedValue({
    history: {
      rowing_machine: {
        workoutKey: "rowing_machine",
        sheetId: "Rowing (Machine)",
        sheetHeader: [
          "Date",
          "Start Time",
          "Elapsed Time",
          "rowing_machine:1:2:meters",
          "rowing_machine:1:2:time",
          "rowing_machine:1:3:meters",
          "rowing_machine:1:3:time",
        ],
        records: [
          {
            startTimestamp: "08/25/2023 20:04",
            elapsedTime: 1800000,
            exercises: [
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "meters"
                ),
                value: "1000",
              },
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "time"
                ),
                value: "00:30:00",
              },
            ],
          },
          {
            startTimestamp: "08/25/2023 20:04",
            elapsedTime: 1800000,
            exercises: [
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "meters"
                ),
                value: "1000",
              },
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "time"
                ),
                value: "00:30:00",
              },
            ],
          },
          {
            startTimestamp: "08/29/2023 21:19",
            elapsedTime: 1800000,
            exercises: [
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
                value: "00:31:00",
              },
            ],
          },
          {
            startTimestamp: "08/29/2023 21:20",
            elapsedTime: 1800000,
            exercises: [
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "meters"
                ),
                value: "3000",
              },
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "time"
                ),
                value: "00:32:00",
              },
            ],
          },
          {
            startTimestamp: "09/02/2023 21:10",
            elapsedTime: 1800000,
            exercises: [
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "meters"
                ),
                value: "4000",
              },
              {
                key: WorkoutValueKey.createFromExercise(
                  "rowing_machine",
                  1,
                  SetType.Working,
                  "time"
                ),
                value: "00:33:00",
              },
            ],
          },
        ],
      },
    },
  }),
  updateOne: jest.fn().mockResolvedValue({}),
});

jest.mock("mongodb", () => {
  return { MongoClient: jest.fn(() => MongoClient.prototype) };
});

const ACCESS_TOKEN = "foo.accessToken";
const USER = {
  email: "fitleo824@gmail.com",
  googleId: "112354883135997385001",
  googleIdToken: ACCESS_TOKEN,
  name: "Leo Fit",
};
const WORKOUT_KEY = "rowing_machine";
const WORKOUT_DISPLAY_NAME = "Rowing (Machine)";
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

describe("WorkoutHistoryProvider", () => {
  let workoutHistoryProvider: WorkoutHistoryProvider;

  beforeEach(async () => {
    workoutHistoryProvider = new WorkoutHistoryProvider(new MongoClient(""));
    mockCreateSheet.mockClear();
    mockConnect.mockClear();
    mockDb.mockClear();
    mockUsersCollection.mockClear();
    mockWorkoutHistoryCollection.mockClear();
  });

  describe("appendRecordToWorkoutHistory", () => {
    it("appends the record to a new sheet if the sheet doesn't already exist", async () => {
      mockSheetExists.mockResolvedValueOnce(false);

      await workoutHistoryProvider.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        USER,
        WORKOUT_KEY,
        WORKOUT_DISPLAY_NAME,
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

      await workoutHistoryProvider.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        USER,
        WORKOUT_KEY,
        WORKOUT_DISPLAY_NAME,
        RECORD
      );

      expect(mockSheetExists).toHaveBeenCalled();
      expect(mockCreateSheet).not.toHaveBeenCalled();
      expect(mockAppendRowsToGoogleSheet).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        SPREADSHEET_ID,
        SHEET_ID,
        [["08/27/2023", "17:00", "30:00", "1000", "30:00", "2000", "60:00"]]
      );
    });

    it("appends to the spreadsheet of a different user", async () => {
      mockSheetExists.mockResolvedValueOnce(false);

      await workoutHistoryProvider.appendRecordToWorkoutHistory(
        ACCESS_TOKEN,
        {
          email: "hardikvala24@gmail.com",
          googleId: "108369507806083237863",
          googleIdToken: "other.foo.AccessToken",
          name: "Hardik Vala",
        },
        WORKOUT_KEY,
        WORKOUT_DISPLAY_NAME,
        RECORD
      );

      expect(mockSheetExists).toHaveBeenCalled();
      expect(mockCreateSheet).toHaveBeenCalledTimes(1);
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
  });
});
