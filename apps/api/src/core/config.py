from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///./sidewalk.db"
    SECRET_KEY: str = "default-dev-secret-key-change-in-production-min-32-chars"

    ENVIRONMENT: str = "development"
    API_VERSION: str = "0.1.0"
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8081"]
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRES_MINUTES: int = 1440
    LOGIN_MAX_ATTEMPTS: int = 5
    LOGIN_LOCKOUT_MINUTES: int = 15
    LOG_LEVEL: str = "INFO"

    RATE_LIMIT_DEFAULT: str = "200/minute"
    RATE_LIMIT_LOGIN: str = "10/minute"
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
