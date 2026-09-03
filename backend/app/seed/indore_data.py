from sqlalchemy.orm import Session
from app.models.domain import User, Intersection, TrafficSignal, TrafficIncident, EmergencyVehicle, SystemHealth
from app.core.security import get_password_hash

INDORE_INTERSECTIONS = [
    {"code": "IND-I12", "name": "Vijay Nagar Square", "city": "Indore", "latitude": 22.7533, "longitude": 75.8937, "main_road": "AB Road", "cross_road": "MR 10", "vehicle_count": 162, "avg_speed_kmh": 24.5, "avg_delay_sec": 52.0, "queue_length_m": 48.0, "occupancy_pct": 68.0, "current_phase": "NORTH_SOUTH_GREEN"},
    {"code": "IND-I14", "name": "Palasia Square", "city": "Indore", "latitude": 22.7244, "longitude": 75.8839, "main_road": "AB Road", "cross_road": "Race Course Road", "vehicle_count": 138, "avg_speed_kmh": 28.0, "avg_delay_sec": 41.5, "queue_length_m": 34.0, "occupancy_pct": 54.0, "current_phase": "EAST_WEST_GREEN"},
    {"code": "IND-I18", "name": "Geeta Bhawan Square", "city": "Indore", "latitude": 22.7161, "longitude": 75.8812, "main_road": "AB Road", "cross_road": "Kanchan Bagh Road", "vehicle_count": 115, "avg_speed_kmh": 32.0, "avg_delay_sec": 33.0, "queue_length_m": 22.0, "occupancy_pct": 42.0, "current_phase": "NORTH_SOUTH_GREEN"},
    {"code": "IND-I22", "name": "Navlakha Square", "city": "Indore", "latitude": 22.7011, "longitude": 75.8745, "main_road": "Ring Road", "cross_road": "AB Road", "vehicle_count": 185, "avg_speed_kmh": 19.0, "avg_delay_sec": 68.0, "queue_length_m": 62.0, "occupancy_pct": 82.0, "current_phase": "EAST_WEST_GREEN"},
    {"code": "IND-I26", "name": "Bhanwarkuan Square", "city": "Indore", "latitude": 22.6912, "longitude": 75.8672, "main_road": "AB Road", "cross_road": "Bhanwarkuan Main Road", "vehicle_count": 174, "avg_speed_kmh": 21.0, "avg_delay_sec": 59.0, "queue_length_m": 55.0, "occupancy_pct": 76.0, "current_phase": "NORTH_SOUTH_GREEN"},
    {"code": "IND-I30", "name": "Radisson Square", "city": "Indore", "latitude": 22.7485, "longitude": 75.9038, "main_road": "Ring Road", "cross_road": "MR 9", "vehicle_count": 92, "avg_speed_kmh": 38.5, "avg_delay_sec": 24.0, "queue_length_m": 15.0, "occupancy_pct": 31.0, "current_phase": "NORTH_SOUTH_GREEN"}
]

def seed_database(db: Session):
    if not db.query(User).filter(User.email == "officer@nagarflow.ai").first():
        users = [
            User(email="admin@nagarflow.ai", hashed_password=get_password_hash("Admin@123"), full_name="Indore Smart City Admin", role="SUPER_ADMIN"),
            User(email="officer@nagarflow.ai", hashed_password=get_password_hash("Officer@123"), full_name="Traffic Controller Sharma", role="TRAFFIC_OFFICER"),
            User(email="analyst@nagarflow.ai", hashed_password=get_password_hash("Analyst@123"), full_name="Urban Mobility Analyst", role="ANALYST")
        ]
        db.add_all(users)
        db.commit()

    if db.query(Intersection).count() == 0:
        for data in INDORE_INTERSECTIONS:
            intersection = Intersection(**data)
            db.add(intersection)
            db.flush()
            signal = TrafficSignal(intersection_id=intersection.id, phase_name=data["current_phase"], north_green_sec=48, south_green_sec=48, east_green_sec=28, west_green_sec=28, is_ai_controlled=True, confidence_score=0.94)
            db.add(signal)
        db.commit()

    if db.query(TrafficIncident).count() == 0:
        incident = TrafficIncident(
            incident_code="INC-2026-882", title="Broken Down Commercial Truck", incident_type="STOPPED_VEHICLE",
            severity="HIGH", latitude=22.7540, longitude=75.8942, status="ACTIVE", confidence=0.92,
            recommended_action="Dispatch Tow Truck & divert Northbound traffic to MR 10 East link."
        )
        db.add(incident)
        db.commit()

    if db.query(EmergencyVehicle).count() == 0:
        emergency = EmergencyVehicle(
            vehicle_code="AMB-IND-108", vehicle_type="AMBULANCE", start_location="Palasia Square", destination="Bombay Hospital, Vijay Nagar",
            current_lat=22.7250, current_lng=75.8842, priority_level="CRITICAL", status="IN_TRANSIT"
        )
        db.add(emergency)
        db.commit()

    components = ["API Core Server", "PostgreSQL + PostGIS", "Redis Event Bus", "YOLO Vision Service", "XGBoost Forecast Service", "SUMO Digital Twin Engine", "AI Traffic Cop LLM"]
    for comp in components:
        if not db.query(SystemHealth).filter(SystemHealth.component_name == comp).first():
            db.add(SystemHealth(component_name=comp, status="ONLINE", response_time_ms=8.5))
    db.commit()
