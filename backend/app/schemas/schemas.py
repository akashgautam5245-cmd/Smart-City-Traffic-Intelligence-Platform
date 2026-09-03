from datetime import datetime
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: Optional[str] = "TRAFFIC_OFFICER"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user: UserResponse

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class IntersectionResponse(BaseModel):
    id: str
    code: str
    name: str
    city: str
    latitude: float
    longitude: float
    main_road: str
    cross_road: str
    status: str
    vehicle_count: int
    avg_speed_kmh: float
    avg_delay_sec: float
    queue_length_m: float
    occupancy_pct: float
    current_phase: str
    signal_mode: str
    updated_at: datetime

    class Config:
        from_attributes = True

class SignalRecommendationResponse(BaseModel):
    id: str
    intersection_id: str
    current_phase: str
    recommended_phase: str
    green_duration_change_sec: int
    reason: str
    confidence: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class SignalActionRequest(BaseModel):
    recommendation_id: str
    action: str

class PredictionItem(BaseModel):
    forecast_horizon_min: int
    predicted_volume: int
    predicted_speed: float
    predicted_congestion: str
    confidence: float
    timestamp: datetime

class ForecastResponse(BaseModel):
    intersection_id: str
    intersection_name: str
    predictions: List[PredictionItem]
    model_version: str = "XGBoost-Traffic-v2.1"
    evaluation_mae: float = 4.2
    evaluation_rmse: float = 5.8
    evaluation_r2: float = 0.94

class VehicleDetection(BaseModel):
    class_name: str
    confidence: float
    bbox: List[int]
    estimated_speed_kmh: float

class VisionFrameResponse(BaseModel):
    frame_id: str
    timestamp: str
    total_vehicles: int
    counts_by_class: Dict[str, int]
    avg_speed_kmh: float
    lane_occupancy_pct: float
    queue_length_m: float
    detections: List[VehicleDetection]

class IncidentCreate(BaseModel):
    title: str
    incident_type: str
    severity: str
    latitude: float
    longitude: float
    recommended_action: Optional[str] = None

class IncidentResponse(BaseModel):
    id: str
    incident_code: str
    title: str
    incident_type: str
    severity: str
    latitude: float
    longitude: float
    status: str
    confidence: float
    recommended_action: Optional[str]
    created_at: datetime
    resolved_at: Optional[datetime]

    class Config:
        from_attributes = True

class EmergencyPriorityRequest(BaseModel):
    vehicle_code: str
    vehicle_type: str = "AMBULANCE"
    start_location: str
    destination: str
    current_lat: float
    current_lng: float

class EmergencyCorridorResponse(BaseModel):
    emergency_id: str
    vehicle_code: str
    route: List[Dict[str, Any]]
    controlled_intersections: List[str]
    estimated_normal_time_min: float
    estimated_priority_time_min: float
    time_saved_min: float
    green_corridor_active: bool

class RouteOptimizationRequest(BaseModel):
    origin: str
    destination: str
    origin_lat: float
    origin_lng: float
    dest_lat: float
    dest_lng: float

class SimulationRunRequest(BaseModel):
    scenario: str
    num_intersections: int = 12
    simulation_steps: int = 3600

class SimulationRunResponse(BaseModel):
    run_id: str
    scenario: str
    fixed_signal_metrics: Dict[str, float]
    ai_signal_metrics: Dict[str, float]
    improvements: Dict[str, float]
    timestamp: datetime

class CopilotQueryRequest(BaseModel):
    query: str

class CopilotQueryResponse(BaseModel):
    answer: str
    data_sources_cited: List[str]
    sql_tool_used: Optional[str]
    confidence: float

class DemoScenarioRequest(BaseModel):
    scenario: str
