document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({type: 'isEnabled'}, response => {
        document.getElementById('toggle').textContent = response.enabled;
    });
    document.getElementById('toggle').addEventListener('click', () => {
        chrome.runtime.sendMessage({type: 'toggle'}, response => {
            document.getElementById('toggle').textContent = response.enabled;
        });
    });
});