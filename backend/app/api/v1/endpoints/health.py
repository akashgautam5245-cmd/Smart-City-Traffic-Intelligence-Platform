from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import SystemHealth

router = APIRouter()

@router.get("/")
def get_system_health(db: Session = Depends(get_db)):
    health_records = db.query(SystemHealth).all()
    return {"status": "HEALTHY", "timestamp": "2026-09-04T02:20:00Z", "components": health_records}
