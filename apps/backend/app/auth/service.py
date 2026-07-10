from sqlalchemy.orm import Session

from app.auth.repository import UserRepository
from app.auth.security import hash_password
from app.auth.schemas import UserRegister
from app.models.user import User
from app.auth.security import verify_password, create_access_token


class AuthService:

    @staticmethod
    def register(db: Session, data: UserRegister):

        existing = UserRepository.get_by_email(db, data.email)

        if existing:
            raise ValueError("Email already registered")

        user = User(
            name=data.name,
            email=data.email,
            password_hash=hash_password(data.password)
        )

        return UserRepository.create(db, user)

    @staticmethod
    def login(db: Session, email: str, password: str):

        user = UserRepository.get_by_email(db, email)
        if not user:
            raise ValueError("Invalid email or password")

        if not verify_password(password, user.password_hash):
            raise ValueError("Invalid email or password")

        token = create_access_token(
            {"sub": str(user.id)}
        )

        return {
            "access_token": token,
            "token_type": "bearer"
        }