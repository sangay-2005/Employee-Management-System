from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, employees, departments
from app.db.session import engine
from app.db.base import Base
from app.models import user, employee, department   # VERY IMPORTANT

app = FastAPI()

# THIS CORS FIXES EVERYTHING
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],     # Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def create_tables():
    async with engine.begin() as conn:
        # Optional reset for testing: drop and recreate tables
        # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("DB ready - any email/password now works for register/login")

app.include_router(auth.router, prefix="/api/auth")
app.include_router(employees.router, prefix="/api/employees")
app.include_router(departments.router, prefix="/api/departments")

# Health routes for diagnostics
from fastapi.responses import JSONResponse

@app.get("/", include_in_schema=False)
async def root():
    return JSONResponse({"status": "ok", "docs": "/docs"})

@app.get("/api/ping", tags=["health"], include_in_schema=False)
async def ping():
    return {"pong": True}
