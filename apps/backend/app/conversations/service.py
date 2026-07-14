from sqlalchemy.orm import Session

from app.conversations.models import Conversation
from app.conversations.repository import ConversationRepository
from app.conversations.schemas import ConversationCreate


class ConversationService:

    @staticmethod
    def create(
        db: Session,
        user_id: int,
        data: ConversationCreate
    ):
        conversation = Conversation(
            title=data.title,
            user_id=user_id
        )

        return ConversationRepository.create(db, conversation)

    @staticmethod
    def get_all(
        db: Session,
        user_id: int
    ):
        return ConversationRepository.get_all_by_user(
            db,
            user_id,
        )

    @staticmethod
    def get_by_id(
        db: Session,
        conversation_id: int,
    ):
        return db.get(
            Conversation,
            conversation_id,
        )

    @staticmethod
    def rename(
        db: Session,
        conversation_id: int,
        title: str,
    ):
        conversation = db.get(
            Conversation,
            conversation_id,
        )

        if conversation:
            conversation.title = title
            db.commit()
            db.refresh(conversation)

        return conversation

    @staticmethod
    def delete(
        db: Session,
        conversation_id: int,
    ):
        conversation = db.get(
            Conversation,
            conversation_id,
        )

        if not conversation:
            return False

        db.delete(conversation)
        db.commit()

        return True