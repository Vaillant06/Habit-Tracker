from fastapi import Request, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Session as UserSession, User

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("session_token")

    if not token:
        raise HTTPException(401, "Not authenticated")

    session = db.query(UserSession).filter_by(session_token=token).first()
    if not session:
        raise HTTPException(401, "Invalid session")

    return db.query(User).filter_by(id=session.user_id).first()
