from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, Session as UserSession
from schemas import UserCreate, UserLogin, UserOut
from .utils import hash_password, verify_password, generate_session_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=UserOut)
def register(user: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(User).filter_by(email=user.email).first()
    if exists:
        raise HTTPException(400, "Email already taken")
    
    exists_username = db.query(User).filter_by(username=user.username).first()
    if exists_username:
        raise HTTPException(400, "Username already taken")

    new_user = User(username=user.username, email=user.email, password=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter_by(email=user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(401, "Invalid credentials")

    token = generate_session_token()
    session = UserSession(user_id=db_user.id, session_token=token)

    db.add(session)
    db.commit()

    response.set_cookie("session_token", token, httponly=True)

    return {"message": "Login successful"}

@router.post("/logout")
def logout(request: Request, response: Response, db: Session = Depends(get_db)):
    token = request.cookies.get("session_token")

    if token:
        db.query(UserSession).filter_by(session_token=token).delete()
        db.commit()

    response.delete_cookie("session_token")
    return {"message": "Logged out"}
