import spacy
import pdfplumber
from rest_framework.views import APIView
from rest_framework.response import Response

nlp = spacy.load("en_core_web_md")

def extract_text_from_resume(file):
    """Extract text from a PDF resume file."""
    text = ""
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"  # Append text from each page
    return text.strip()  # Remove any extra whitespace

class AnalyzeResume(APIView):
    def post(self, request):
        # Extract text from the uploaded resume file
        resume_text = extract_text_from_resume(request.FILES['resume'])
        job_description = request.data['jobDescription']
        
        # Perform analysis
        suggestions = analyze_resume(resume_text, job_description)
        return Response({"suggestions": suggestions})

def analyze_resume(resume_text, job_description):
    """Analyze the resume text against the job description."""
    doc_resume = nlp(resume_text)
    doc_job = nlp(job_description)
    
    # Extract important entities
    resume_skills = [ent.text for ent in doc_resume.ents if ent.label_ == "SKILL"]
    job_skills = [ent.text for ent in doc_job.ents if ent.label_ == "SKILL"]
    
    # Find missing skills in the resume
    missing_skills = set(job_skills) - set(resume_skills)
    
    return {"missing_skills": list(missing_skills)}
