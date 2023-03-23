document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ type: 'isEnabled' }, response => {
        document.getElementById('status').textContent = getStatusMessage(response.enabled);
        document.getElementById('toggle').textContent = getCTAText(response.enabled);
    });
    document.getElementById('toggle').addEventListener('click', () => {
        chrome.runtime.sendMessage({ type: 'toggle' }, response => {
            document.getElementById('status').textContent = getStatusMessage(response.enabled);
            document.getElementById('toggle').textContent = getCTAText(response.enabled);
        });
    });
});

function getCTAText(status) {
    return status ? 'Disable' : 'Enable';
}

function getStatusMessage(status) {
    return status ? 'Enabled' : 'Disabled';
}