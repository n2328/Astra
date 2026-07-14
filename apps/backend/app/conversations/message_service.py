from sqlalchemy.orm import Session

from app.conversations.message_model import Message
from app.conversations.message_repository import MessageRepository
from app.conversations.message_schemas import MessageCreate
from app.conversations.models import Conversation


class MessageService:

    @staticmethod
    def create(
        db: Session,
        conversation_id: int,
        data: MessageCreate,
    ):

        message = Message(
            conversation_id=conversation_id,
            role=data.role,
            content=data.content,
        )

        return MessageRepository.create(db, message)

    @staticmethod
    def get_messages(
        db: Session,
        conversation_id: int,
    ):
        return MessageRepository.get_by_conversation(
            db,
            conversation_id,
        )
    
    @staticmethod
    def rename(
     db: Session,
    conversation_id: int,
    title: str,
):
        conversation = db.get(Conversation, conversation_id)

        if conversation:
            conversation.title = title
            db.commit()
            db.refresh(conversation)

        return conversation