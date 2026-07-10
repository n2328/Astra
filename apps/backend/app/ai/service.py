from app.ai.mock_provider import MockProvider

class AIService:

    provider = MockProvider()

    @classmethod
    def chat(cls, message: str):

        messages = [
            {
                "role": "user",
                "content": message,
            }
        ]

        return cls.provider.chat(messages)