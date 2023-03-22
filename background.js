let currentUrl;

function updateCurrentUrl() {
    chrome.tabs.query({ active: true }, tabs => {
        currentUrl = tabs[0].url;
    });
}

// This event is fired when a tab is updated 
// e.g., when the user navigates to a new link or refreshes the page
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        updateCurrentUrl();
    }
});

// This event is fired when a tab is activated 
// e.g., when the user switches to a different tab.
chrome.tabs.onActivated.addListener(activeInfo => {
    updateCurrentUrl();
});

// This event is fired when a message is sent from either an extension process 
// or a content script.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getCurrentUrl') {
        sendResponse({ url: currentUrl });
    }
});