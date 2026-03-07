from fastapi import APIRouter, Depends
from dependencies import get_chroma_repository, get_agent_service
from repositories.chroma import ChromaRepository
from services.agent_service import AgentService

index_router = APIRouter(
    prefix="/api/v1/indexer"
)


@index_router.post("/reindex")
def reindex(chroma_repo: ChromaRepository = Depends(get_chroma_repository)):
    chroma_repo.index_content_from_url("https://df-serializer-service.onrender.com/competencies")
    return {"status": "reindexed"}


@index_router.get("/search/{search_term}")
def search(search_term: str, chroma_repo: ChromaRepository = Depends(get_chroma_repository)):
    return chroma_repo.search(search_term)


@index_router.post("/quiz/{competency_topic}")
def generate_quiz(competency_topic: str, agent: AgentService = Depends(get_agent_service)):
    return agent.generate_quiz(competency_topic)
