document.getElementById('resume').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;
            
            // Open a new tab for processing
            chrome.tabs.create({ url: chrome.runtime.getURL('process.html') }, function(tab) {
                // Send the file content to the newly opened tab
                chrome.tabs.sendMessage(tab.id, { fileContent: fileContent, fileName: file.name });
            });
        };

        reader.readAsArrayBuffer(file);
    }
});
