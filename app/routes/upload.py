# app/routes/upload.py

from fastapi import APIRouter, UploadFile, File
import os
from app.services.pdf_service import extract_text_from_pdf

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)

    return {
        "filename": file.filename,
        "text_preview": text[:500],  # sanity check
        "length": len(text)
    }