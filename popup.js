document.getElementById('resume').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result; // This is the file content (PDF, DOC, etc.)
            // Send the file content to the background script
            chrome.runtime.sendMessage({ fileContent: fileContent, fileName: file.name }, function(response) {
                console.log('File sent to background script:', response.status);
            });
        };

        reader.readAsArrayBuffer(file); // or readAsText depending on the file type
    }
});
async function analyzeResume(resumeText, jobDescription) {
    // Call your backend API to analyze the resume
    const response = await fetch('http://<your-api-url>/analyze/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            resume: resumeText,
            jobDescription: jobDescription,
        }),
    });

    const data = await response.json();
    return data.suggestions;
}

function displayResults(suggestions) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2>Suggestions:</h2>';
    suggestions.forEach(suggestion => {
        resultsDiv.innerHTML += `<p>${suggestion}</p>`;
    });
}
