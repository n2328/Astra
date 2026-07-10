from app.ai.provider import AIProvider


class MockProvider(AIProvider):

    def chat(self, messages: list[dict]) -> str:
        user_message = messages[-1]["content"]

        return (
            "Hello! I'm Astra running in Mock Mode.\n\n"
            f"You said: {user_message}\n\n"
            "Everything in your backend is working correctly. "
            "Switch me to Gemini/OpenAI anytime."
        )