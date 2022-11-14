const SPREADSHEET_ID = "";

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheets()[0];
}

function doGet(event) {
    if(event.queryString == "" ) {
      return createOutput(getData());
    }

    if (event.parameter.clean !== undefined) {
      getSheet().clear();
      return createOutput({msg: "Clean sheet!"});
    }

    const row = {
      id: event.parameter.hn,
      title: event.parameter.title,
      hackernews: "https://news.ycombinator.com/item?id=" + event.parameter.hn,
      hackerweb: "https://hackerweb.app/#/item/" + event.parameter.hn
    }
    addToSpreadsheet(row);
    return createOutput({msg: "Row added!"});
}

function createOutput(content){
  return ContentService.createTextOutput(JSON.stringify(content)).setMimeType(ContentService.MimeType.JSON); 
}

function addToSpreadsheet(row){
  const sheet = getSheet();
  sheet.appendRow(Object.values(row));
}

function getData() {
  const range = getSheet().getDataRange();
  return range.getValues();
}
