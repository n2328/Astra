from pydantic import BaseModel, Field
from datetime import datetime


class ConversationCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)


class ConversationResponse(BaseModel):
    id: int
    title: str
    user_id: int

    class Config:
        from_attributes = True