# app/services/chunk_service.py

import tiktoken
from typing import List

# use cl100k_base (works for GPT-4 / most modern models)
encoding = tiktoken.get_encoding("cl100k_base")


def chunk_text(text: str, chunk_size: int = 700, overlap: int = 100) -> List[str]:
    tokens = encoding.encode(text)

    chunks = []
    start = 0

    while start < len(tokens):
        end = start + chunk_size
        chunk_tokens = tokens[start:end]

        chunk_text = encoding.decode(chunk_tokens)
        chunks.append(chunk_text)

        start += chunk_size - overlap  # sliding window

    return chunks