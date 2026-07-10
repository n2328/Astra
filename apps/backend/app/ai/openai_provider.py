from openai import OpenAI

from app.ai.provider import AIProvider
from app.core.config import settings


class OpenAIProvider(AIProvider):

    def __init__(self):
        self.client = OpenAI(
            api_key=settings.OPENAI_API_KEY
        )

    def chat(self, messages):

        response = self.client.chat.completions.create(
            model=settings.OPENAI_MODEL,
            messages=messages,
        )

        return response.choices[0].message.content