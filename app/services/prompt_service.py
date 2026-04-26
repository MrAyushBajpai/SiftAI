# app/services/prompt_service.py

def build_prompt(query: str, chunks: list[str]) -> str:
    context = "\n\n".join(
        [f"[{i}] {c}" for i, c in enumerate(chunks)]
    )

    return f"""
You are a strict document QA system.

Rules:
- Answer ONLY from context
- Cite sources using [number]
- If missing, reply exactly: Not in document

Context:
{context}

Question:
{query}
"""