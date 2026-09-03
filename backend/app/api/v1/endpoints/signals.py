from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import SignalActionRequest
from app.services.optimization_engine import optimization_engine

router = APIRouter()

@router.post("/recommend/{intersection_id}")
def generate_recommendation(intersection_id: str, db: Session = Depends(get_db)):
    try: return optimization_engine.generate_recommendation(db, intersection_id)
    except ValueError as e: raise HTTPException(status_code=404, detail=str(e))

@router.post("/action")
def process_signal_action(payload: SignalActionRequest, db: Session = Depends(get_db)):
    try: return optimization_engine.process_recommendation_action(db, payload.recommendation_id, payload.action)
    except ValueError as e: raise HTTPException(status_code=404, detail=str(e))
