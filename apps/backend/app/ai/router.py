from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.ai.schemas import ChatRequest, ChatResponse
from app.ai.service import AIService

from app.conversations.service import ConversationService
from app.conversations.message_service import MessageService
from app.conversations.message_schemas import MessageCreate

router = APIRouter(
    prefix="/chat",
    tags=["AI"],
)


@router.post("", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
):
    # Save user message
    MessageService.create(
        db,
        request.conversation_id,
        MessageCreate(
            role="user",
            content=request.message,
        ),
    )

    # Rename "New Chat" using the first message
    conversation = ConversationService.get_by_id(
        db,
        request.conversation_id,
    )

    if conversation and conversation.title == "New Chat":
        ConversationService.rename(
            db,
            request.conversation_id,
            request.message[:40],
        )

    # Generate AI response
    ai_response = AIService.chat(request.message)

    # Save assistant message
    MessageService.create(
        db,
        request.conversation_id,
        MessageCreate(
            role="assistant",
            content=ai_response,
        ),
    )

    return ChatResponse(
        response=ai_response
    )