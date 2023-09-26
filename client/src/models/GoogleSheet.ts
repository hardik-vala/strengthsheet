export type GoogleSheetDataValues = string[][];

export interface GoogleSheetData {
  range: string,
  majorDimension: string,
  values: GoogleSheetDataValues,
}