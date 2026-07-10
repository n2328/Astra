from fastapi import FastAPI
from app.core.config import settings
from app.auth.router import router as auth_router
from app.conversations.router import router as conversation_router
from app.ai.router import router as ai_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)
app.include_router(conversation_router)
app.include_router(auth_router)
app.include_router(ai_router)

@app.get("/")
async def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "status": "running"
    }