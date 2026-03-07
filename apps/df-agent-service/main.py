from contextlib import asynccontextmanager
from fastapi import FastAPI
from repositories.chroma import ChromaRepository

SEED_URL = "https://df-serializer-service.onrender.com/competencies"

chroma_repo = ChromaRepository()

@asynccontextmanager
async def lifespan(app: FastAPI):
    chroma_repo.index_content_from_url(SEED_URL)
    yield

app = FastAPI(lifespan=lifespan)


@app.get("/")
def root():
    return "Hello World"

@app.get("/search/{search_term}")
def search(search_term: str):
    return chroma_repo.search(search_term)
