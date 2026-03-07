from dotenv import load_dotenv
load_dotenv()

from contextlib import asynccontextmanager
from fastapi import FastAPI
from dependencies import chroma_repository
from routers.index_router import index_router

SEED_URL = "https://df-serializer-service.onrender.com/competencies"


@asynccontextmanager
async def lifespan(app: FastAPI):
    chroma_repository.index_content_from_url(SEED_URL)
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(index_router)


@app.get("/")
def root():
    return "Hello World"
