#include <WiFi.h>
#include <HTTPClient.h>

const int pingInterval = 1800000;
const char* ssid = "SSID";
const char* password = "PASS";
const String url = "https://hc-ping.com/ENDPOINT";

void setup() {
  Serial.begin(115200);
  delay(100);
  connect();
}

void connect() {
  WiFi.begin(ssid, password, 6);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }
}

void ping() {
  HTTPClient http;
  http.useHTTP10(true);
  http.begin(url);
  http.GET();
  String result = http.getString();
  http.end();
  Serial.println(result);
}

void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connect();
  }
  ping();
  delay(pingInterval);
}