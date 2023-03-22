document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({type: 'getCurrentUrl'}, response => {
        document.getElementById('current-url').textContent = response.url;
    });
});