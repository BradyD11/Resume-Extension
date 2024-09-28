document.getElementById('resume-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const resumeFile = document.getElementById('resume-upload').files[0];
    const jobDescription = document.getElementById('job-description').value;

    if (resumeFile && jobDescription) {
        const reader = new FileReader();
        reader.onload = async function() {
            const resumeText = reader.result;
            const suggestions = await analyzeResume(resumeText, jobDescription);
            displayResults(suggestions);
        };
        reader.readAsText(resumeFile);
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
