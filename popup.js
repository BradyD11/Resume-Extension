document.getElementById('resume').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Open a new tab
        chrome.tabs.create({ url: chrome.runtime.getURL('process.html') }, function(tab) {
            // Ensure the file data is passed after the tab is opened
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    chrome.tabs.sendMessage(tabId, { fileName: file.name });
                }
            });
        });
    }
});
