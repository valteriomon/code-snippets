const ENV = setEnv([
  "SPREADSHEET_ID",
  "LAMBDA_ENDPOINT",
  "HACKERBOOK"
]);

function doGet(event) {
  const sheet = new Sheet(ENV.SPREADSHEET_ID);

  if (event.parameter.clean !== undefined) {
    sheet.clean();
    return buildResponse("Clean sheet!");
  }

  if(event.parameter.title !== undefined && event.parameter.url !== undefined) {
    sendToKindle(event.parameter.title, event.parameter.url);

    if(event.parameter.hn !== undefined && /^\d+$/.test(event.parameter.hn)) {

      const row = {
        id: event.parameter.hn,
        title: event.parameter.title,
        hackernews: "https://news.ycombinator.com/item?id=" + event.parameter.hn,
        hackerweb: "https://hackerweb.app/#/item/" + event.parameter.hn,
        hackerbook: ENV.HACKERBOOK + "?id=" + event.parameter.hn
      }

      sheet.addRow(row);
      return createOutput("Saved!");
    }
  }

  if(event.queryString == "" ) {
    return createOutput(sheet.getData());
  }
}

function sendToKindle(title, url) {
  title = encodeURIComponent(title);
  url = encodeURIComponent(url);
  UrlFetchApp.fetch(`${ENV.LAMBDA_ENDPOINT}?url=${url}&title=${title}`);
}

class Sheet {
  constructor(id) {
    this.id = id;
    this.sheet = this._getSheet();
  }

  _getSheet() {
    const spreadsheet = SpreadsheetApp.openById(this.id);
    return spreadsheet.getSheets()[0];
  }

  getData() {
    const range = this.sheet.getDataRange();
    return range.getValues();
  }

  addRow(row){
    this.sheet.appendRow(Object.values(row));
  }

  clean() {
    this.sheet.clear();
  }
}
