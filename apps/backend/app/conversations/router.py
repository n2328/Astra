from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.database.dependencies import get_db
from app.conversations.schemas import (
    ConversationCreate,
    ConversationResponse,
)
from app.conversations.service import ConversationService
from app.conversations.message_service import MessageService
from app.conversations.message_schemas import (
    MessageCreate,
    MessageResponse,
)

router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"],
)


@router.post(
    "",
    response_model=ConversationResponse,
)
def create_conversation(
    data: ConversationCreate,
    db: Session = Depends(get_db),
):
    return ConversationService.create(
        db,
        user_id=1,  # Temporary
        data=data,
    )


@router.get(
    "",
    response_model=list[ConversationResponse],
)
def get_conversations(
    db: Session = Depends(get_db),
):
    return ConversationService.get_all(
        db,
        user_id=1,  # Temporary
    )

@router.post(
    "/{conversation_id}/messages",
    response_model=MessageResponse,
)
def create_message(
    conversation_id: int,
    data: MessageCreate,
    db: Session = Depends(get_db),
):
    return MessageService.create(
        db,
        conversation_id,
        data,
    )

@router.get(
    "/{conversation_id}/messages",
    response_model=list[MessageResponse],
)
def get_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    return MessageService.get_messages(
        db,
        conversation_id,
    )

@router.delete("/{conversation_id}")
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
):
    deleted = ConversationService.delete(
        db,
        conversation_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "message": "Conversation deleted"
    }

@router.patch("/{conversation_id}")
def rename_conversation(
    conversation_id: int,
    data: ConversationCreate,
    db: Session = Depends(get_db),
):
    return ConversationService.rename(
        db,
        conversation_id,
        data.title,
    )