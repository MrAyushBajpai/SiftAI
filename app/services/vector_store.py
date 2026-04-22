# app/services/vector_store.py

import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatL2(dim)
        self.text_chunks = []

    def add(self, embeddings, chunks):
        self.index.add(np.array(embeddings).astype("float32"))
        self.text_chunks.extend(chunks)

    def search(self, query_embedding, k=5):
        distances, indices = self.index.search(
            np.array([query_embedding]).astype("float32"), k
        )
        results = [self.text_chunks[i] for i in indices[0]]
        return results