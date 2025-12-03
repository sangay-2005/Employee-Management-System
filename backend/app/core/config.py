from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
from pydantic import AnyHttpUrl

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

    APP_NAME: str = "EmployeeMS"
    ENV: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api"
    JWT_SECRET: str = "changeme-in-prod"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    DATABASE_URL: str = "sqlite+aiosqlite:///./app.db"
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

settings = Settings()
