export interface Intersection {
  id: string;
  code: string;
  name: string;
  city: string;
  latitude: number;
  longitude: number;
  main_road: string;
  cross_road: string;
  status: 'ACTIVE' | 'DEGRADED' | 'OFFLINE';
  vehicle_count: number;
  avg_speed_kmh: number;
  avg_delay_sec: number;
  queue_length_m: number;
  occupancy_pct: number;
  current_phase: string;
  signal_mode: 'FIXED' | 'AI_RECOMMENDATION' | 'MANUAL_OVERRIDE' | 'EMERGENCY';
  updated_at: string;
}

export interface SignalRecommendation {
  id: string;
  intersection_id: string;
  current_phase: string;
  recommended_phase: string;
  green_duration_change_sec: number;
  reason: string;
  confidence: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export interface PredictionItem {
  forecast_horizon_min: number;
  predicted_volume: number;
  predicted_speed: number;
  predicted_congestion: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
  confidence: number;
  timestamp: string;
}

export interface ForecastData {
  intersection_id: string;
  intersection_name: string;
  predictions: PredictionItem[];
  model_version: string;
  evaluation_mae: number;
  evaluation_rmse: number;
  evaluation_r2: number;
}

export interface VehicleDetection {
  class_name: string;
  confidence: number;
  bbox: [number, number, number, number];
  estimated_speed_kmh: number;
}

export interface VisionFrameData {
  camera_id: string;
  timestamp: string;
  total_vehicles: number;
  counts_by_class: Record<string, number>;
  avg_speed_kmh: number;
  lane_occupancy_pct: number;
  queue_length_m: number;
  privacy_notice: string;
  detections: VehicleDetection[];
}

export interface TrafficIncident {
  id: string;
  incident_code: string;
  title: string;
  incident_type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  latitude: number;
  longitude: number;
  status: 'DETECTED' | 'VERIFIED' | 'ACTIVE' | 'RESOLVED';
  confidence: number;
  recommended_action: string;
  created_at: string;
}

export interface EmergencyCorridor {
  emergency_id: string;
  vehicle_code: string;
  vehicle_type: string;
  origin: string;
  destination: string;
  controlled_intersections: string[];
  estimated_normal_time_min: number;
  estimated_priority_time_min: number;
  time_saved_min: number;
  green_corridor_active: boolean;
  status: string;
}

export interface RouteOption {
  route_id: string;
  name: string;
  distance_km: number;
  normal_duration_min: number;
  current_traffic_duration_min: number;
  congestion_level: 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';
  co2_emissions_kg: number;
  recommendation_reason: string;
  is_recommended: boolean;
  waypoints: [number, number][];
}

export interface DigitalTwinBenchmark {
  run_id: string;
  scenario: string;
  simulation_engine: string;
  intersections_simulated: number;
  fixed_signal_scenario: {
    avg_delay_sec: number;
    queue_length_m: number;
    travel_time_min: number;
    throughput_vph: number;
    avg_speed_kmh: number;
    co2_emissions_g_km: number;
  };
  ai_signal_scenario: {
    avg_delay_sec: number;
    queue_length_m: number;
    travel_time_min: number;
    throughput_vph: number;
    avg_speed_kmh: number;
    co2_emissions_g_km: number;
  };
  improvements: {
    delay_reduction_pct: number;
    queue_reduction_pct: number;
    travel_time_saved_pct: number;
    throughput_increase_pct: number;
    co2_reduction_pct: number;
  };
  verdict: string;
}

export interface CopilotResponse {
  query: string;
  answer: string;
  data_sources_cited: string[];
  sql_tool_used: string;
  confidence: number;
}
