import { convertToDateObj } from "@common/utils";
import { CIRCUIT_REGISTRY, EXERCISE_REGISTRY } from "@data/registry";
import { User } from "@models/User";
import { WorkoutValueKey, getSetTypeDisplayName } from "@models/Workout/Core";
import { WorkoutHistoryRecord } from "@models/Workout/WorkoutHistory";
import { format as formatDate } from "date-fns";
import * as dotenv from "dotenv";
import { Db, MongoClient } from "mongodb";
import { SHEET_PROVIDER } from "./sheetProvider";

const SHEET_DATE_COLUMN_TITLE = "Date";
const SHEET_START_TIME_COLUMN_TITLE = "Start Time";
const SHEET_ELAPSED_TIME_COLUMN_TITLE = "Elapsed Time";

dotenv.config();

interface WorkoutHistoryTableRow {
  workoutKey: string;
  sheetId: string;
  sheetHeader: string[];
  records: WorkoutHistoryRecord[];
}

export class WorkoutHistoryProvider {
  private static instance: WorkoutHistoryProvider;
  private client: MongoClient;
  private db: Db;

  private constructor(client: MongoClient) {
    this.client = client;
    this.db = client.db(process.env.MONGO_DATABASE);
  }

  private static async connectToMongoServer(): Promise<MongoClient> {
    const connString = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_SERVER}`;
    const client = new MongoClient(connString);
    await client.connect();
    return client;
  }

  static async getInstance(): Promise<WorkoutHistoryProvider> {
    if (!WorkoutHistoryProvider.instance) {
      const client = await WorkoutHistoryProvider.connectToMongoServer();
      WorkoutHistoryProvider.instance = new WorkoutHistoryProvider(client);
    }

    return WorkoutHistoryProvider.instance;
  }

  async appendRecordToWorkoutHistory(
    accessToken: string,
    user: User,
    workoutKey: string,
    record: WorkoutHistoryRecord
  ): Promise<void> {
    const dbUser = await this.fetchUser(user);
    if (!dbUser) {
      throw new Error(`Unrecognized user: ${user.googleId}`);
    }

    const spreadsheetId = dbUser.spreadsheetId;
    const workoutHistoryTableRowSer = await this.fetchWorkoutHistory(
      user,
      workoutKey
    );
    if (!workoutHistoryTableRowSer) {
      throw new Error("Could not fetch workout history");
    }
    const workoutHistoryTableRow = deserializeWorkoutHistoryTableRow(
      workoutHistoryTableRowSer
    );

    const sheetRows: string[][] = [];

    const sheetExists = await SHEET_PROVIDER.sheetExists(
      accessToken,
      spreadsheetId,
      workoutHistoryTableRow.sheetId
    );
    if (!sheetExists) {
      await SHEET_PROVIDER.createSheet(
        accessToken,
        spreadsheetId,
        workoutHistoryTableRow.sheetId
      );

      workoutHistoryTableRow.sheetHeader = buildSheetHeader(record);

      sheetRows.push(buildSheetHeaderForDisplay(record));
    }

    workoutHistoryTableRow.records.push(record);

    const workoutHistoryCollection = this.db.collection("workoutHistory");
    await workoutHistoryCollection.updateOne(
      { userId: user.googleId },
      {
        $set: {
          [`history.${workoutKey}`]: serializeWorkoutHistoryTableRow(
            workoutHistoryTableRow
          ),
        },
      }
    );

    const sheetRow = serializeRecordAsSheetRow(
      workoutHistoryTableRow.sheetHeader,
      record
    );
    sheetRows.push(sheetRow);

    SHEET_PROVIDER.appendRowsToGoogleSheet(
      accessToken,
      spreadsheetId,
      workoutHistoryTableRow.sheetId,
      sheetRows
    );
  }

  async fetchWorkoutHistory(
    user: User,
    workoutKey: string
  ): Promise<WorkoutHistoryTableRow> {
    let workoutHistorySer;
    try {
      const workoutHistoryCollection = this.db.collection("workoutHistory");
      workoutHistorySer = await workoutHistoryCollection.findOne({
        userId: user.googleId,
      });
    } catch (error) {
      console.error("Error fetching workout history:", error);
      throw error;
    }

    if (workoutHistorySer) {
      return workoutHistorySer.history[workoutKey];
    }

    return null;
  }

  private async fetchUser(user: User) {
    let dbUser;
    try {
      const usersCollection = this.db.collection("users");
      dbUser = await usersCollection.findOne({
        userId: user.googleId,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }

    return dbUser;
  }
}

function buildSheetHeader(record: WorkoutHistoryRecord): string[] {
  return [
    SHEET_DATE_COLUMN_TITLE,
    SHEET_START_TIME_COLUMN_TITLE,
    SHEET_ELAPSED_TIME_COLUMN_TITLE,
  ].concat(record.exercises.map((e) => workoutValueKeyToString(e.key)));
}

function buildSheetHeaderForDisplay(record: WorkoutHistoryRecord): string[] {
  return [
    SHEET_DATE_COLUMN_TITLE,
    SHEET_START_TIME_COLUMN_TITLE,
    SHEET_ELAPSED_TIME_COLUMN_TITLE,
  ].concat(record.exercises.map((e) => workoutValueKeyToHeaderTitle(e.key)));
}

function workoutValueKeyToHeaderTitle(key: WorkoutValueKey): string {
  const exerciseName = EXERCISE_REGISTRY[key.exerciseKey].displayName;

  let s = `${exerciseName} : Set ${key.setIndex} (${getSetTypeDisplayName(
    key.setType
  )}) : ${key.measureKey}`;

  if (key.circuitKey) {
    const circuitName = CIRCUIT_REGISTRY[key.circuitKey].displayName;
    s = `${circuitName} : ${s}`;
  }

  return s;
}

function serializeRecordAsSheetRow(
  sheetHeader: string[],
  record: WorkoutHistoryRecord
): string[] {
  const dateStr = formatDate(record.startTimestamp, "MM/dd/yyyy");
  const startTimeStr = formatDate(record.startTimestamp, "HH:mm");
  const elapsedTime = getFormattedTime(record.elapsedTime);

  const rowMap: { [k: string]: string } = {
    [SHEET_DATE_COLUMN_TITLE]: dateStr,
    [SHEET_START_TIME_COLUMN_TITLE]: startTimeStr,
    [SHEET_ELAPSED_TIME_COLUMN_TITLE]: elapsedTime,
  };

  record.exercises.forEach(
    (e) => (rowMap[workoutValueKeyToString(e.key)] = e.value)
  );

  const sheetRow = [];
  for (let h of sheetHeader) {
    if (h in rowMap) {
      sheetRow.push(rowMap[h]);
    } else {
      console.error();
    }
  }

  return sheetRow;
}

function getFormattedTime(ms: number) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 60000);

  const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${paddedSeconds}`;
}

function workoutValueKeyToString(key: WorkoutValueKey): string {
  let s = `${key.exerciseKey}:${key.setIndex}:${key.setType.toString()}:${
    key.measureKey
  }`;

  if (key.circuitKey) {
    s = `${key.circuitKey}:${s}`;
  }

  return s;
}

function serializeWorkoutHistoryTableRow(row: WorkoutHistoryTableRow) {
  return {
    ...row,
    records: row.records.map((record) => ({
      ...record,
      startTimestamp: formatDate(record.startTimestamp, "MM/dd/yyyy HH:mm"),
    })),
  };
}

function deserializeWorkoutHistoryTableRow(row: any) {
  return {
    ...row,
    records: row.records.map(deserializeWorkoutHistoryRecord),
  };
}

export function deserializeWorkoutHistoryRecord(record: any) {
  return {
    ...record,
    startTimestamp: convertToDateObj(record.startTimestamp),
  };
}
