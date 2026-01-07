from fastapi import FastAPI
from auth.routes import router as auth_router
from habits.routes import router as habits_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(auth_router)
app.include_router(habits_router)

@app.get("/")
def root():
    return {"message": "Habit Tracker Backend Running"}
