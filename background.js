let isEnabled = true;

const keyword = "bing.com";
const edgeUserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/604.1 Edg/111.0.100.0";

// This event is fired when a message is sent from either an extension process 
// or a content script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'toggle') {
        sendResponse({ enabled: isEnabled = !isEnabled });
    }
    if (request.type === 'isEnabled') {
        sendResponse({ enabled: isEnabled });
    }
});

chrome.webRequest.onBeforeSendHeaders.addListener(
    details => {
        if (isEnabled && details.url.includes(keyword)) {
            for (let header of details.requestHeaders) {
                if (header.name.toLowerCase() === "user-agent") {
                    header.value = edgeUserAgent;
                    break;
                }
            }
        }
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["<all_urls>"] },
    ["blocking", "requestHeaders"]
);
