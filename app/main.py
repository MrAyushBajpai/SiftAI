from fastapi import FastAPI
from app.routes import upload, query

app = FastAPI(title="SiftAI")

app.include_router(upload.router)
app.include_router(query.router)