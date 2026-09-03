from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.domain import User
from app.schemas.schemas import UserCreate, UserResponse, Token, LoginRequest

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_in.email).first()
    if db_user: raise HTTPException(status_code=400, detail="User already exists.")
    user = User(email=user_in.email, hashed_password=get_password_hash(user_in.password), full_name=user_in.full_name, role=user_in.role or "TRAFFIC_OFFICER")
    db.add(user); db.commit(); db.refresh(user)
    return user

@router.post("/login", response_model=Token)
def login_user(login_in: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_in.email).first()
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password.")
    token = create_access_token(subject=user.id, role=user.role)
    return {"access_token": token, "token_type": "bearer", "role": user.role, "user": user}
