from typing import List, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from app.models.domain import TrafficIncident, Intersection

class IncidentEngine:
    def detect_anomalies(self, db: Session) -> List[Dict[str, Any]]:
        intersections = db.query(Intersection).all()
        anomalies = []
        for inter in intersections:
            anomaly_score = 0.1
            if inter.avg_speed_kmh < 15.0: anomaly_score += 0.4
            if inter.occupancy_pct > 80.0: anomaly_score += 0.3
            if inter.queue_length_m > 50.0: anomaly_score += 0.2
            anomaly_score = min(0.99, round(anomaly_score, 2))
            if anomaly_score >= 0.70:
                anomalies.append({
                    "intersection_id": inter.id, "intersection_code": inter.code, "intersection_name": inter.name,
                    "anomaly_score": anomaly_score, "speed_kmh": inter.avg_speed_kmh, "occupancy_pct": inter.occupancy_pct,
                    "queue_length_m": inter.queue_length_m, "detected_at": datetime.now(timezone.utc).isoformat(),
                    "recommended_action": f"Potential bottleneck/incident detected at {inter.name}."
                })
        return anomalies

    def get_all_incidents(self, db: Session) -> List[TrafficIncident]:
        return db.query(TrafficIncident).order_by(TrafficIncident.created_at.desc()).all()

    def update_incident_status(self, db: Session, incident_id: str, new_status: str) -> TrafficIncident:
        incident = db.query(TrafficIncident).filter(TrafficIncident.id == incident_id).first()
        if not incident: raise ValueError(f"Incident with ID {incident_id} not found.")
        incident.status = new_status.upper()
        if new_status.upper() == "RESOLVED": incident.resolved_at = datetime.now(timezone.utc)
        db.commit()
        db.refresh(incident)
        return incident

incident_engine = IncidentEngine()
