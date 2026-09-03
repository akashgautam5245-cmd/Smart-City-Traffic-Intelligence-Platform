from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import DemoScenarioRequest
from app.services.traffic_engine import traffic_engine

router = APIRouter()

@router.post("/trigger")
def trigger_demo_scenario(payload: DemoScenarioRequest, db: Session = Depends(get_db)):
    return traffic_engine.apply_demo_scenario(db, payload.scenario.upper())
