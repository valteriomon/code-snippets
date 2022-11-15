var SEND_TO_KINDLE_URL = "";
var CLIPPINGS_SAVER_URL = "";

var CLIPPINGS_PATH;
var HACKERWEB_PATH;
if (navigator.vendor == "Apple Inc.") {
    HACKERWEB_PATH = "file:///mnt/us//documents//hackerweb.html";
    CLIPPINGS_PATH = "file:///mnt/us//documents//My Clippings.txt";
} else {
    CLIPPINGS_PATH = "http://localhost/My Clippings.txt";
}
