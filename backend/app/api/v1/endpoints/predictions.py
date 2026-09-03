from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import ForecastResponse
from app.services.prediction_engine import prediction_engine

router = APIRouter()

@router.get("/{intersection_id}", response_model=ForecastResponse)
def get_forecast(intersection_id: str, db: Session = Depends(get_db)):
    try: return prediction_engine.forecast_for_intersection(db, intersection_id)
    except ValueError as e: raise HTTPException(status_code=404, detail=str(e))
