# app/routes/upload.py

from fastapi import APIRouter, UploadFile, File
import os
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import embed_texts
from app.services.vector_store import VectorStore
from app.services import store_state

router = APIRouter()
vector_store = None

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)
    chunks = chunk_text(text)
    embeddings = embed_texts(chunks)

    store_state.vector_store = VectorStore(dim=len(embeddings[0]))
    store_state.vector_store.add(embeddings, chunks)

    return {
        "filename": file.filename,
        "num_chunks": len(chunks),
        "status": "indexed"
    }