# app/services/prompt_service.py

def build_prompt(query: str, chunks: list[str]) -> str:
    context = "\n\n".join(chunks)

    prompt = f"""
Answer ONLY from the given context.
If answer is not present, say "Not in document".

Context:
{context}

Question:
{query}
"""
    return prompt