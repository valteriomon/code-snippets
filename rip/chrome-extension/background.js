let m3u8 = 1, license = "", subtitle = "", currentTab = "", tabs = [];

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const url = details.url.toLowerCase();
        if(details.tabId > 0 && (url.includes("srt") || url.includes("m3u8?token=") || url.includes("license"))) {
            chrome.tabs.get(details.tabId, (tab) => {
                const pageTitle = sanitizeFilename(tab.title).replace(" - Free TV Shows _ Tubi", '');
                console.log(details.url, pageTitle, license, subtitle, m3u8, tabs)

                if (license != pageTitle && details.url.includes('license')) {
                    downloadStringAsFile(details.url, `${pageTitle} - license.txt`);
                    console.log("License downloaded")
                    license = pageTitle;
                }

                if (details.url.includes('.m3u8?token=')) {
                    if (tab.title != currentTab ) {
                        m3u8 = 1;
                        currentTab = tab.title;
                    }

                    if(m3u8 == 1) {
                        downloadStringAsFile(details.url, `${pageTitle} - master.txt`);
                    }

                    if(m3u8 == 2) {
                        chrome.downloads.download({
                            url: details.url,
                            filename: `${pageTitle} - pssh.m3u8`,
                        }, () => {});
                    }

                    m3u8++;
                }

                if (subtitle != pageTitle && details.url.includes("srt")) {
                    chrome.downloads.download({
                        url: details.url,
                        filename: `${pageTitle}.json`,
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.error('Failed to initiate download:', chrome.runtime.lastError);
                        }
                    });
                    console.log("Sub downloaded")
                    subtitle = pageTitle;
                }

            });
        }
    },
    {
        urls: ["<all_urls>"],
    },
    ["requestBody"]
);

function downloadStringAsFile(content, filename) {
    const dataUrl = 'data:text/plain;base64,' + btoa(content);
    chrome.downloads.download({ url: dataUrl, filename: filename }, () => {
        if (chrome.runtime.lastError) {
            console.error('Failed to initiate download:', chrome.runtime.lastError);
            return;
        }
    });
}

function sanitizeFilename(filename) {
    return filename.replace(/[<>:"\/\\|?*]/g, "_");
}

chrome.webNavigation.onCommitted.addListener((details) => {
    console.log(details)
    if (details.transitionType === 'reload') {
      m3u8 = 1;
      license = "";
      subtitle = "";
      currentTab = "";
      tabs = [];
      console.log('Page refreshed');
    }
  });