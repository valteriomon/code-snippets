// ==UserScript==
// @name         Archived page shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Archived page shortcut
// @author       valteriomon
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.addEventListener('keyup', (event) => {
        if(event.ctrlKey && event.altKey && !event.shiftKey && event.key == "a") {
            window.location.href="https://archive.ph/?run=1&url="+window.location;
        }
    });
})();
