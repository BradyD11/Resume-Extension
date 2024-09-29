chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const fileContent = request.fileContent;
    const fileName = request.fileName;

    // Process the file content here (e.g., send to a server, analyze, etc.)
    console.log('Received file in background script:', fileName);

    // Send back a response (optional)
    sendResponse({ status: 'File processed successfully' });
});
