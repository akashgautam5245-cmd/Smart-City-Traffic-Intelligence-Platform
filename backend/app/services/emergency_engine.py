from typing import Dict, Any
from sqlalchemy.orm import Session
from app.models.domain import EmergencyVehicle, Intersection

class EmergencyEngine:
    def trigger_green_corridor(self, db: Session, vehicle_code: str, origin: str, destination: str) -> Dict[str, Any]:
        emergency = db.query(EmergencyVehicle).filter(EmergencyVehicle.vehicle_code == vehicle_code).first()
        if not emergency:
            emergency = EmergencyVehicle(
                vehicle_code=vehicle_code, vehicle_type="AMBULANCE", start_location=origin,
                destination=destination, current_lat=22.7244, current_lng=75.8839, status="IN_TRANSIT"
            )
            db.add(emergency)
            db.commit()
            db.refresh(emergency)

        corridor_intersections = [
            {"code": "IND-I14", "name": "Palasia Square", "signal_action": "GREEN_WAVE_NORTH_SOUTH"},
            {"code": "IND-I18", "name": "Geeta Bhawan Square", "signal_action": "GREEN_WAVE_NORTH_SOUTH"},
            {"code": "IND-I34", "name": "LIG Square", "signal_action": "GREEN_WAVE_NORTH_SOUTH"},
            {"code": "IND-I12", "name": "Vijay Nagar Square", "signal_action": "GREEN_WAVE_NORTH_SOUTH"},
        ]

        for item in corridor_intersections:
            inter = db.query(Intersection).filter(Intersection.code == item["code"]).first()
            if inter:
                inter.signal_mode = "EMERGENCY"
                inter.current_phase = "NORTH_SOUTH_GREEN"
                inter.avg_delay_sec = 12.0

        db.commit()
        return {
            "emergency_id": emergency.id, "vehicle_code": emergency.vehicle_code, "vehicle_type": emergency.vehicle_type,
            "origin": origin, "destination": destination, "controlled_intersections": [item["name"] for item in corridor_intersections],
            "corridor_details": corridor_intersections, "estimated_normal_time_min": 16.5, "estimated_priority_time_min": 7.8,
            "time_saved_min": 8.7, "green_corridor_active": True, "status": "GREEN_CORRIDOR_ACTIVE"
        }

emergency_engine = EmergencyEngine()
