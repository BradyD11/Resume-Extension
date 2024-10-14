chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const fileContent = request.fileContent;
    const fileName = request.fileName;

    // Display the file content or process it here
    document.getElementById('output').innerHTML = `
        <h2>File: ${fileName}</h2>
        <pre>${fileContent}</pre>
    `;
});
