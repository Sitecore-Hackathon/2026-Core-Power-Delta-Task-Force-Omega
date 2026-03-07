from dotenv import load_dotenv
load_dotenv()

from contextlib import asynccontextmanager
from dependencies import chroma_repository
from routers.index_router import index_router
from routers.chat_router import chat_router

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

SEED_URL = "https://df-serializer-service.onrender.com/competencies"

@asynccontextmanager
async def lifespan(app: FastAPI):
    chroma_repository.index_content_from_url(SEED_URL)
    yield

app = FastAPI(lifespan=lifespan)

# Define allowed origins (replace with your frontend Render URL)
origins = [
    "https://two026-core-power-delta-task-force-omega.onrender.com",
    "http://two026-core-power-delta-task-force-omega.onrender.com",
    "http://localhost:5173",  # For local development
    "http://localhost:4173", # For local development (production preview)
    "http://localhost:3000" # optional: if you ever run Next.js locally
]

# Add the CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True, # Allows cookies/auth headers
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)

app.include_router(index_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return "Hello World"
