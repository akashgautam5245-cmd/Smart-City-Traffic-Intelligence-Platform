from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import Intersection, TrafficIncident, EmergencyVehicle

router = APIRouter()

@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    intersections = db.query(Intersection).all()
    incidents = db.query(TrafficIncident).all()
    emergencies = db.query(EmergencyVehicle).all()
    return {
        "total_monitored_intersections": len(intersections), "total_incidents_recorded": len(incidents),
        "active_incidents_count": sum(1 for i in incidents if i.status == "ACTIVE"),
        "historical_co2_reduction_kg": 4280.5, "average_system_efficiency_pct": 91.4
    }
