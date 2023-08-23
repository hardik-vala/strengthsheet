import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { SheetError } from "./sheetError";

export async function readSheetValues(spreadsheetId: string) {
  const authTokens = await GoogleSignin.getTokens();

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

  const headers = {
    Authorization: `Bearer ${authTokens.accessToken}`,
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new SheetError(`Failed to read spreadsheet: ${JSON.stringify(response)}`); 
  }
  
  const data = await response.json();

  return data;
}

export async function appendToGoogleSheet(spreadsheetId: string, inputValues: string[]) {
  const authTokens = await GoogleSignin.getTokens();

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:A1:append?valueInputOption=RAW`;

  const headers = {
    Authorization: `Bearer ${authTokens.accessToken}`,
  };

  const body = {
    range: "Sheet1!A1:A1",
    majorDimension: "ROWS",
    values: [inputValues],
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new SheetError(`Submit to sheet failed: ${JSON.stringify(response)}`);
  }
}