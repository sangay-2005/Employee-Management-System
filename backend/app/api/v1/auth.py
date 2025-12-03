# backend/app/api/v1/auth.py
from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User
from app.core.security import get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/register")
async def register(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        data = await request.json()
        email = data["email"]
        password = data["password"]
        full_name = data.get("full_name", "User")

        # Allow ANY email (even duplicates for testing)
        hashed = get_password_hash(password)
        user = User(email=email, full_name=full_name, hashed_password=hashed)
        db.add(user)
        await db.commit()
        await db.refresh(user)

        token = create_access_token({"sub": email})
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(400, f"Register failed: {str(e)}")

@router.post("/login")
async def login(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        data = await request.json()
        email = data["email"]
        password = data["password"]

        result = await db.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()

        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(401, "Wrong email or password")

        token = create_access_token({"sub": email})
        return {"access_token": token, "token_type": "bearer"}
    except Exception as e:
        raise HTTPException(400, f"Login failed: {str(e)}")
