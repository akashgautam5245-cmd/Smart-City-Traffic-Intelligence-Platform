import random
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.domain import Intersection, TrafficIncident, EmergencyVehicle

class TrafficEngine:
    def get_live_intersections(self, db: Session) -> List[Intersection]:
        return db.query(Intersection).all()

    def get_intersection_by_id(self, db: Session, intersection_id: str) -> Intersection:
        return db.query(Intersection).filter(Intersection.id == intersection_id).first()

    def apply_demo_scenario(self, db: Session, scenario: str) -> Dict[str, Any]:
        intersections = db.query(Intersection).all()
        result_message = f"Applied scenario '{scenario}' across Indore network."

        if scenario == "TRAFFIC_SPIKE":
            for inter in intersections:
                inter.vehicle_count = int(inter.vehicle_count * 1.85)
                inter.avg_speed_kmh = max(8.0, inter.avg_speed_kmh * 0.45)
                inter.avg_delay_sec = inter.avg_delay_sec * 1.95
                inter.queue_length_m = inter.queue_length_m * 2.1
                inter.occupancy_pct = min(98.0, inter.occupancy_pct * 1.7)
            result_message = "Traffic spike triggered (+85% vehicle count, severe delay spike at Vijay Nagar & Navlakha)."

        elif scenario == "ACCIDENT":
            vijay = db.query(Intersection).filter(Intersection.code == "IND-I12").first()
            if vijay:
                vijay.vehicle_count = 240
                vijay.avg_speed_kmh = 9.2
                vijay.avg_delay_sec = 110.0
                vijay.queue_length_m = 125.0
                vijay.occupancy_pct = 94.0

        elif scenario == "NORMAL":
            for inter in intersections:
                inter.vehicle_count = random.randint(90, 150)
                inter.avg_speed_kmh = round(random.uniform(28.0, 38.0), 1)
                inter.avg_delay_sec = round(random.uniform(22.0, 38.0), 1)

        db.commit()
        return {"status": "SUCCESS", "scenario": scenario, "message": result_message}

traffic_engine = TrafficEngine()
