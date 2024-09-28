import spacy
print (spacy.__version__)
from rest_framework.views import APIView
from rest_framework.response import Response

nlp = spacy.load("en_core_web_md")

class AnalyzeResume(APIView):
    def post(self, request):
        resume_text = extract_text_from_resume(request.FILES['resume'])  # Use pdfplumber or similar tool
        job_description = request.data['jobDescription']
        
        # Perform analysis
        suggestions = analyze_resume(resume_text, job_description)
        return Response({"suggestions": suggestions})

def analyze_resume(resume_text, job_description):
    doc_resume = nlp(resume_text)
    doc_job = nlp(job_description)
    
    # Extract important entities
    resume_skills = [ent.text for ent in doc_resume.ents if ent.label_ == "SKILL"]
    job_skills = [ent.text for ent in doc_job.ents if ent.label_ == "SKILL"]
    
    # Find missing skills in the resume
    missing_skills = set(job_skills) - set(resume_skills)
    
    return {"missing_skills": list(missing_skills)}
