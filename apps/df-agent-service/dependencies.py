from repositories.chroma import ChromaRepository
from services.agent_service import AgentService

chroma_repository = ChromaRepository()
_agent_service = None


def get_chroma_repository():
    return chroma_repository


def get_agent_service():
    global _agent_service
    if _agent_service is None:
        _agent_service = AgentService(chroma_repository)
    return _agent_service
