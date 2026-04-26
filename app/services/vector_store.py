# app/services/vector_store.py

import faiss
import numpy as np

class VectorStore:
    def __init__(self, dim: int):
        self.index = faiss.IndexFlatL2(dim)
        self.text_chunks = []
        self.ids = []

    def add(self, embeddings, chunks):
        start_id = len(self.text_chunks)

        self.index.add(np.array(embeddings).astype("float32"))

        for i, chunk in enumerate(chunks):
            self.text_chunks.append(chunk)
            self.ids.append(start_id + i)

    def search(self, query_embedding, k=5):
        distances, indices = self.index.search(
            np.array([query_embedding]).astype("float32"), k
        )

        results = []
        for idx in indices[0]:
            results.append({
                "id": self.ids[idx],
                "text": self.text_chunks[idx]
            })

        return results