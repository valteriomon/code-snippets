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

function buildResponse(statusCode, message) {
  const response = {
    statusCode: statusCode,
    message: message
  }
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}