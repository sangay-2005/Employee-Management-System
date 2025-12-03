from sqlalchemy import select
from fastapi import HTTPException

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate
from app.db.session import AsyncSession

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    existing_user = await db.execute(select(User).where(User.email == user.email))
    if existing_user.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, full_name=user.full_name, hashed_password=hashed_password)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def authenticate_user(db: AsyncSession, email: str, password: str) -> User:
    user_result = await db.execute(select(User).where(User.email == email))
    user = user_result.scalar_one_or_none()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return user
