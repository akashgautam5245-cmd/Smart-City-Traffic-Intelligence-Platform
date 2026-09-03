import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default="TRAFFIC_OFFICER")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)

class Intersection(Base):
    __tablename__ = "intersections"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    city = Column(String(100), default="Indore")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    main_road = Column(String(255), nullable=False)
    cross_road = Column(String(255), nullable=False)
    status = Column(String(50), default="ACTIVE")
    
    vehicle_count = Column(Integer, default=0)
    avg_speed_kmh = Column(Float, default=35.0)
    avg_delay_sec = Column(Float, default=45.0)
    queue_length_m = Column(Float, default=25.0)
    occupancy_pct = Column(Float, default=40.0)
    current_phase = Column(String(50), default="NORTH_SOUTH_GREEN")
    signal_mode = Column(String(50), default="AI_RECOMMENDATION")
    
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    signals = relationship("TrafficSignal", back_populates="intersection", cascade="all, delete-orphan")
    readings = relationship("TrafficReading", back_populates="intersection", cascade="all, delete-orphan")

class TrafficSignal(Base):
    __tablename__ = "traffic_signals"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    intersection_id = Column(String(36), ForeignKey("intersections.id"), nullable=False)
    phase_name = Column(String(50), default="NORTH_SOUTH_GREEN")
    north_green_sec = Column(Integer, default=45)
    south_green_sec = Column(Integer, default=45)
    east_green_sec = Column(Integer, default=25)
    west_green_sec = Column(Integer, default=25)
    is_ai_controlled = Column(Boolean, default=True)
    confidence_score = Column(Float, default=0.92)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    intersection = relationship("Intersection", back_populates="signals")

class RoadSegment(Base):
    __tablename__ = "road_segments"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    start_lat = Column(Float, nullable=False)
    start_lng = Column(Float, nullable=False)
    end_lat = Column(Float, nullable=False)
    end_lng = Column(Float, nullable=False)
    speed_limit_kmh = Column(Float, default=50.0)
    capacity_vph = Column(Integer, default=2000)
    current_volume = Column(Integer, default=850)
    current_speed = Column(Float, default=32.0)
    congestion_level = Column(String(50), default="MODERATE")
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

class TrafficReading(Base):
    __tablename__ = "traffic_readings"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    intersection_id = Column(String(36), ForeignKey("intersections.id"), nullable=False)
    timestamp = Column(DateTime, default=utc_now, index=True)
    north_count = Column(Integer, default=0)
    south_count = Column(Integer, default=0)
    east_count = Column(Integer, default=0)
    west_count = Column(Integer, default=0)
    avg_speed = Column(Float, default=30.0)
    queue_length = Column(Float, default=20.0)
    occupancy_pct = Column(Float, default=35.0)

    intersection = relationship("Intersection", back_populates="readings")

class TrafficIncident(Base):
    __tablename__ = "traffic_incidents"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    incident_code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    incident_type = Column(String(50), nullable=False)
    severity = Column(String(50), default="HIGH")
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    status = Column(String(50), default="DETECTED")
    confidence = Column(Float, default=0.88)
    recommended_action = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=utc_now)
    resolved_at = Column(DateTime, nullable=True)

class EmergencyVehicle(Base):
    __tablename__ = "emergency_vehicles"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    vehicle_code = Column(String(50), unique=True, index=True, nullable=False)
    vehicle_type = Column(String(50), default="AMBULANCE")
    start_location = Column(String(255), nullable=False)
    destination = Column(String(255), nullable=False)
    current_lat = Column(Float, nullable=False)
    current_lng = Column(Float, nullable=False)
    priority_level = Column(String(50), default="CRITICAL")
    status = Column(String(50), default="IN_TRANSIT")
    created_at = Column(DateTime, default=utc_now)

class TrafficPrediction(Base):
    __tablename__ = "traffic_predictions"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    intersection_id = Column(String(36), ForeignKey("intersections.id"), nullable=False)
    forecast_horizon_min = Column(Integer, nullable=False)
    predicted_volume = Column(Integer, nullable=False)
    predicted_speed = Column(Float, nullable=False)
    predicted_congestion = Column(String(50), nullable=False)
    confidence = Column(Float, default=0.91)
    timestamp = Column(DateTime, default=utc_now)

class SignalRecommendation(Base):
    __tablename__ = "signal_recommendations"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    intersection_id = Column(String(36), ForeignKey("intersections.id"), nullable=False)
    current_phase = Column(String(50), nullable=False)
    recommended_phase = Column(String(50), nullable=False)
    green_duration_change_sec = Column(Integer, default=10)
    reason = Column(Text, nullable=False)
    confidence = Column(Float, default=0.94)
    status = Column(String(50), default="PENDING")
    created_at = Column(DateTime, default=utc_now)

class SimulationRun(Base):
    __tablename__ = "simulation_runs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    scenario_name = Column(String(255), nullable=False)
    mode = Column(String(50), default="SUMO_BENCHMARK")
    avg_delay_before = Column(Float, nullable=False)
    avg_delay_after = Column(Float, nullable=False)
    queue_before = Column(Float, nullable=False)
    queue_after = Column(Float, nullable=False)
    travel_time_before = Column(Float, nullable=False)
    travel_time_after = Column(Float, nullable=False)
    co2_before = Column(Float, nullable=False)
    co2_after = Column(Float, nullable=False)
    improvement_pct = Column(Float, nullable=False)
    created_at = Column(DateTime, default=utc_now)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_email = Column(String(255), nullable=False)
    action = Column(String(255), nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=utc_now)

class SystemHealth(Base):
    __tablename__ = "system_health"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    component_name = Column(String(100), unique=True, nullable=False)
    status = Column(String(50), default="ONLINE")
    response_time_ms = Column(Float, default=12.5)
    last_checked = Column(DateTime, default=utc_now, onupdate=utc_now)
