document.getElementById('resume').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        // Read the file here or perform your logic
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const resumeText = e.target.result; // This is the text from the file
            console.log(resumeText); // For debugging, see the contents of the resume
            // You can now send this to your server or process it
        };

        // Assuming you're reading a text-based file like PDF or DOCX
        reader.readAsText(file); // Use the appropriate method based on file type
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
