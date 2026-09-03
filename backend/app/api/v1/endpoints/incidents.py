from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import IncidentCreate, IncidentResponse
from app.models.domain import TrafficIncident
from app.services.incident_engine import incident_engine

router = APIRouter()

@router.get("/", response_model=List[IncidentResponse])
def get_incidents(db: Session = Depends(get_db)):
    return incident_engine.get_all_incidents(db)

@router.patch("/{incident_id}/status", response_model=IncidentResponse)
def update_status(incident_id: str, status: str = Query(...), db: Session = Depends(get_db)):
    try: return incident_engine.update_incident_status(db, incident_id, status)
    except ValueError as e: raise HTTPException(status_code=404, detail=str(e))
