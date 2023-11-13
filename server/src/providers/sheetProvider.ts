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

  async createSheet(
    accessToken: string,
    spreadsheetId: string,
    sheetName: string
  ): Promise<string> {
  
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
  
    const body = {
      requests: [{
        addSheet: {
          properties: {
            title: sheetName
          }
        }
      }]
    };
  
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
  
    if (!response.ok) {
      throw new Error(`Failed to add sheet with name: ${sheetName}`);
    }
  
    const result = await response.json();
    return result.replies[0].addSheet.properties.sheetId;
  }

  async sheetExists(
    accessToken: string,
    spreadsheetId: string,
    sheetId: string
  ): Promise<boolean> {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get spreadsheet metadata");
    }

    const spreadsheet = await response.json();

    return spreadsheet.sheets.some(
      (sheet: any) => sheet.properties.sheetId === sheetId
    );
  }
}

export const SHEET_PROVIDER = SheetProvider.getInstance();
