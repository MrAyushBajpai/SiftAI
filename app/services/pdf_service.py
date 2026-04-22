# app/services/pdf_service.py

from pypdf import PdfReader

def extract_text_from_pdf(file_path: str) -> str:
    reader = PdfReader(file_path)
    text = []

    for page in reader.pages:
        content = page.extract_text()
        if content:
            text.append(content)

    return "\n".join(text)