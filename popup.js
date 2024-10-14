document.getElementById('resume').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;  // Read file content
            const fileName = file.name;

            // Open a new tab and pass the file data to it
            chrome.tabs.create({ url: chrome.runtime.getURL('process.html') }, function(tab) {
                // Send the file content to the new tab
                chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
                    if (tabId === tab.id && changeInfo.status === 'complete') {
                        chrome.tabs.sendMessage(tabId, { fileContent: fileContent, fileName: fileName });
                    }
                });
            });
        };

        reader.readAsArrayBuffer(file);  // Read as ArrayBuffer for binary files like PDFs
    }
});
