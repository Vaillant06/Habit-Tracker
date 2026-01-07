from fastapi import APIRouter, Depends
from auth.dependency import current_user

router = APIRouter(
    prefix="/habits",
    tags=["Habits"]
)

@router.get("/test")
def test_habit_route(user = Depends(current_user)):
    return {"message": "Habits module working", "user": user.email}
