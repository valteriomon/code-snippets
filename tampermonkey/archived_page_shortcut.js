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
        console.log(event)
        if(event.altKey && event.shiftKey) {
            if(event.key == "A") {
                window.location.href="https://archive.ph/?run=1&url="+window.location;
            } else if(event.key == "X") {
                window.location.href='https://hackerweb.app/#/item/'+(new URL(window.location)).searchParams.get('id');
            }
        }
    });
})();
