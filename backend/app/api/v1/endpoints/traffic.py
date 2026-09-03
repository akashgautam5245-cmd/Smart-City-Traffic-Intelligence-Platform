from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.schemas import IntersectionResponse
from app.services.traffic_engine import traffic_engine

router = APIRouter()

@router.get("/intersections", response_model=List[IntersectionResponse])
def get_intersections(db: Session = Depends(get_db)):
    return traffic_engine.get_live_intersections(db)

@router.get("/intersections/{intersection_id}", response_model=IntersectionResponse)
def get_intersection_by_id(intersection_id: str, db: Session = Depends(get_db)):
    inter = traffic_engine.get_intersection_by_id(db, intersection_id)
    if not inter: raise HTTPException(status_code=404, detail="Intersection not found.")
    return inter
