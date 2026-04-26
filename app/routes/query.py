# app/routes/query.py

from fastapi import APIRouter
from pydantic import BaseModel

from app.routes.upload import vector_store
from app.services.embedding_service import embed_texts
from app.services.prompt_service import build_prompt
from app.services import store_state
from app.services.llm_service import generate_answer

router = APIRouter()


class QueryRequest(BaseModel):
    query: str


@router.post("/query")
async def query_docs(req: QueryRequest):
    if store_state.vector_store is None:
        return {"error": "No document uploaded yet"}

    query_embedding = embed_texts([req.query])[0]
    results = store_state.vector_store.search(query_embedding, k=5)

    # extract only text for prompt
    chunks_text = [r["text"] for r in results]

    prompt = build_prompt(req.query, chunks_text)
    answer = generate_answer(prompt)

    return {
        "query": req.query,
        "answer": answer,
        "sources": results   # structured now
    }