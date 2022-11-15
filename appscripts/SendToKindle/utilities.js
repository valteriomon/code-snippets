function getProperty(property) {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(property);
}

function setEnv(vars) {
  const env = {};
  vars.forEach((v) => {
    env[v] = getProperty(v);
  });
  return env;
}

function statusResponse(message, statusCode=200) {
  const response = {
    statusCode: statusCode,
    message: message
  }
  return createOutput(response);
}

function createOutput(content) {
  return ContentService.createTextOutput(JSON.stringify(content)).setMimeType(ContentService.MimeType.JSON);
}