from sqlalchemy.orm import Session

from app.conversations.message_model import Message


class MessageRepository:

    @staticmethod
    def create(db: Session, message: Message):
        db.add(message)
        db.commit()
        db.refresh(message)
        return message

    @staticmethod
    def get_by_conversation(
        db: Session,
        conversation_id: int,
    ):
        return (
            db.query(Message)
            .filter(Message.conversation_id == conversation_id)
            .order_by(Message.created_at.asc())
            .all()
        )