chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const fileName = request.fileName;
    
    // Display the file name (you can later handle more complex logic)
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = `<h2>File: ${fileName}</h2>`;
});
