from sqlalchemy.orm import Session

from app.conversations.models import Conversation


class ConversationRepository:

    @staticmethod
    def create(db: Session, conversation: Conversation):
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        return conversation

    @staticmethod
    def get_all_by_user(db: Session, user_id: int):
        return (
            db.query(Conversation)
            .filter(Conversation.user_id == user_id)
            .all()
        )