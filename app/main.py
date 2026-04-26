# app/main.py

from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()  # loads .env into environment

from app.routes import upload, query

app = FastAPI(title="SiftAI")

app.include_router(upload.router)
app.include_router(query.router)