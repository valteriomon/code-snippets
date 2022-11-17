const ENV = setEnv([
  "SPREADSHEET_ID",
  "HACKERBOOK",
  "P2K_URL",
  "FROM_EMAIL",
  "TO_EMAIL"
]);

function doGet(event) {
  const sheet = new Sheet(ENV.SPREADSHEET_ID);

  if (event.parameter.clean !== undefined) {
    sheet.clean();
    return respond("Clean sheet!").text();
  }

  if(event.parameter.title !== undefined && event.parameter.url !== undefined) {
    let response;

    if(sendToKindle(event.parameter.title, event.parameter.url)) {
      if(event.parameter.newwindow !== undefined) {
        response = respond('<html><head></head><body><h1>Sent to kindle!</h1><body></html>').html();
      } else {
        response = respond('(function(){console.log("Sent to kindle!")})()').js();
      }

      if(event.parameter.hn !== undefined && /^\d+$/.test(event.parameter.hn)) {
        const row = {
          id: event.parameter.hn,
          title: event.parameter.title,
          hackernews: "https://news.ycombinator.com/item?id=" + event.parameter.hn,
          hackerweb: "https://hackerweb.app/#/item/" + event.parameter.hn,
          hackerbook: ENV.HACKERBOOK + "?id=" + event.parameter.hn
        }
        sheet.addRow(row);
      }
    } else {
      response = respond("Push to kindle failed.", 500).json();
    }
    return response;
  }

  return respond(sheet.getData()).json();
}

function doPost(event) {
  const body = event.postData.contents;
  try {
    const data = JSON.parse(body);
    if(data.items) {
        const article = data.items[0];
        sendToKindle(article.title, article.canonical[0].href);
    }
  } catch(e) {
    Logger.log(e);
  }
}

function sendToKindle(title, url) {
  url = encodeURIComponent(url);
  const options = {
    'method': 'POST',
    'payload': {
      'email': ENV.TO_EMAIL,
      'from': ENV.FROM_EMAIL,
      'title': title
    }
  };
  const response = UrlFetchApp.fetch(`${ENV.P2K_URL}/send.php?context=send&url=${url}`, options);
  return /Sent\!/.test(response);
}
