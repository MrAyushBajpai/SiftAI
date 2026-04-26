# app/services/prompt_service.py

def build_prompt(query: str, chunks: list[str]) -> str:
    context = "\n\n".join(chunks)

    return f"""
You are a strict document QA system.

Rules:
- Answer ONLY using the provided context
- Do NOT use outside knowledge
- If answer is missing, reply exactly: Not in document

Context:
{context}

Question:
{query}
"""