from fastapi import APIRouter

from app.ai.schemas import ChatRequest, ChatResponse
from app.ai.service import AIService

router = APIRouter(
    prefix="/chat",
    tags=["AI"],
)


@router.post("", response_model=ChatResponse)
def chat(request: ChatRequest):

    response = AIService.chat(request.message)

    return ChatResponse(
        response=response
    )