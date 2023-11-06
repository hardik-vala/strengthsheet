class SheetProvider {
  private static instance: SheetProvider;

  private constructor() {}

  static getInstance() {
    if (!SheetProvider.instance) {
      SheetProvider.instance = new SheetProvider();
    }

    return SheetProvider.instance;
  }

  async appendRowToGoogleSheet(
    accessToken: string,
    spreadsheetId: string,
    sheetId: string,
    row: string[]
  ): Promise<void> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId}!A1:A1:append?valueInputOption=USER_ENTERED`;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const body = {
      range: `${sheetId}!A1:A1`,
      majorDimension: "ROWS",
      values: [row],
    };

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(
        `Appending to spreadsheet failed: ${JSON.stringify(response)}`
      );
    }
  }
}

export const SHEET_PROVIDER = SheetProvider.getInstance();
