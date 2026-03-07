import json

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dependencies import get_agent_service
from services.agent_service import AgentService

chat_router = APIRouter(prefix="/api/v1/chat")


class ChatRequest(BaseModel):
    message: str


@chat_router.post("/stream")
async def chat_stream(request: ChatRequest, agent_service: AgentService = Depends(get_agent_service)):
    chat_agent = agent_service.create_chat_agent()

    async def generate():
        async for event in chat_agent.astream_events(
            {"messages": [("human", request.message)]},
            version="v2",
        ):
            if event["event"] == "on_chat_model_stream":
                chunk = event["data"]["chunk"]
                if chunk.content:
                    yield f"data: {json.dumps(chunk.content)}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
