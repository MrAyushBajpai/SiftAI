from fastapi import FastAPI
from app.routes import upload

app = FastAPI(title="SiftAI")

app.include_router(upload.router)