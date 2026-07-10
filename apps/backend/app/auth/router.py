from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.schemas import UserLogin, Token

from app.auth.schemas import UserRegister, UserResponse
from app.auth.service import AuthService
from app.database.dependencies import get_db

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    try:
        return AuthService.register(db, user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/login", response_model=Token)
def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    try:
        return AuthService.login(
            db,
            credentials.email,
            credentials.password,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e)
        )  