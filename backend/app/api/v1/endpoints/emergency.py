from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import EmergencyPriorityRequest, EmergencyCorridorResponse
from app.services.emergency_engine import emergency_engine

router = APIRouter()

@router.post("/priority", response_model=EmergencyCorridorResponse)
def trigger_emergency_priority(payload: EmergencyPriorityRequest, db: Session = Depends(get_db)):
    return emergency_engine.trigger_green_corridor(db, vehicle_code=payload.vehicle_code, origin=payload.start_location, destination=payload.destination)
