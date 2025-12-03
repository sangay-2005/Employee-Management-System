Employee Management System (FastAPI + React + Vite)

Overview
A fully integrated, copy-paste ready Employee Management System with:
- FastAPI backend (JWT auth, protected routes, CORS configured)
- React + Vite frontend (Axios with token, route protection, toast notifications)
- Docker Compose orchestration for local/dev

Prerequisites
- Python 3.10+
- Node.js 18+
- Docker (optional, for docker-compose flow)

Project Structure

employee-management-system/
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── .env
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md

Quick Start
Backend (local)
1) Create and activate venv
   - Windows:  python -m venv .venv && .venv\\Scripts\\activate
2) Install deps
   - pip install -r backend/requirements.txt
3) Run DB migrations (SQLite is used by default)
   - alembic upgrade head
4) Start API
   - uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir backend

Frontend (local)
1) Install deps
   - cd frontend && npm install
2) Run dev server
   - npm run dev
   Vite runs at http://localhost:5173

Docker Compose
- docker compose up --build
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

Environment
Backend .env (backend/.env):
- DATABASE_URL=sqlite+aiosqlite:///./app.db
- JWT_SECRET=changeme-in-prod
- JWT_ALGORITHM=HS256
- ACCESS_TOKEN_EXPIRE_MINUTES=60
- API_PREFIX=/api

Frontend: set VITE_API_BASE when needed, defaults to http://localhost:8000/api.

Notes
- Default auth flow uses email as username for OAuth2PasswordRequestForm.
- All employees and departments routes are protected by JWT.
- Toast notifications appear for success/error actions.
