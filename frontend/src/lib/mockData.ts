import { Intersection, TrafficIncident, ForecastData, VisionFrameData, DigitalTwinBenchmark } from './types';

export const MOCK_INTERSECTIONS: Intersection[] = [
  { id: '1', code: 'IND-I12', name: 'Vijay Nagar Square', city: 'Indore', latitude: 22.7533, longitude: 75.8937, main_road: 'AB Road', cross_road: 'MR 10', status: 'ACTIVE', vehicle_count: 162, avg_speed_kmh: 24.5, avg_delay_sec: 52.0, queue_length_m: 48.0, occupancy_pct: 68.0, current_phase: 'NORTH_SOUTH_GREEN', signal_mode: 'AI_RECOMMENDATION', updated_at: new Date().toISOString() },
  { id: '2', code: 'IND-I14', name: 'Palasia Square', city: 'Indore', latitude: 22.7244, longitude: 75.8839, main_road: 'AB Road', cross_road: 'Race Course Road', status: 'ACTIVE', vehicle_count: 138, avg_speed_kmh: 28.0, avg_delay_sec: 41.5, queue_length_m: 34.0, occupancy_pct: 54.0, current_phase: 'EAST_WEST_GREEN', signal_mode: 'AI_RECOMMENDATION', updated_at: new Date().toISOString() },
  { id: '3', code: 'IND-I18', name: 'Geeta Bhawan Square', city: 'Indore', latitude: 22.7161, longitude: 75.8812, main_road: 'AB Road', cross_road: 'Kanchan Bagh Road', status: 'ACTIVE', vehicle_count: 115, avg_speed_kmh: 32.0, avg_delay_sec: 33.0, queue_length_m: 22.0, occupancy_pct: 42.0, current_phase: 'NORTH_SOUTH_GREEN', signal_mode: 'AI_RECOMMENDATION', updated_at: new Date().toISOString() },
  { id: '4', code: 'IND-I22', name: 'Navlakha Square', city: 'Indore', latitude: 22.7011, longitude: 75.8745, main_road: 'Ring Road', cross_road: 'AB Road', status: 'DEGRADED', vehicle_count: 185, avg_speed_kmh: 19.0, avg_delay_sec: 68.0, queue_length_m: 62.0, occupancy_pct: 82.0, current_phase: 'EAST_WEST_GREEN', signal_mode: 'MANUAL_OVERRIDE', updated_at: new Date().toISOString() },
  { id: '5', code: 'IND-I26', name: 'Bhanwarkuan Square', city: 'Indore', latitude: 22.6912, longitude: 75.8672, main_road: 'AB Road', cross_road: 'Bhanwarkuan Main Road', status: 'ACTIVE', vehicle_count: 174, avg_speed_kmh: 21.0, avg_delay_sec: 59.0, queue_length_m: 55.0, occupancy_pct: 76.0, current_phase: 'NORTH_SOUTH_GREEN', signal_mode: 'AI_RECOMMENDATION', updated_at: new Date().toISOString() },
  { id: '6', code: 'IND-I30', name: 'Radisson Square', city: 'Indore', latitude: 22.7485, longitude: 75.9038, main_road: 'Ring Road', cross_road: 'MR 9', status: 'ACTIVE', vehicle_count: 92, avg_speed_kmh: 38.5, avg_delay_sec: 24.0, queue_length_m: 15.0, occupancy_pct: 31.0, current_phase: 'NORTH_SOUTH_GREEN', signal_mode: 'AI_RECOMMENDATION', updated_at: new Date().toISOString() }
];

export const MOCK_INCIDENTS: TrafficIncident[] = [
  { id: 'inc-1', incident_code: 'INC-2026-882', title: 'Broken Down Commercial Truck', incident_type: 'STOPPED_VEHICLE', severity: 'HIGH', latitude: 22.7540, longitude: 75.8942, status: 'ACTIVE', confidence: 0.92, recommended_action: 'Dispatch Tow Truck & divert Northbound traffic to MR 10 East link.', created_at: new Date(Date.now() - 15 * 60000).toISOString() }
];

export const MOCK_FORECAST: ForecastData = {
  intersection_id: '1', intersection_name: 'Vijay Nagar Square',
  predictions: [
    { forecast_horizon_min: 5, predicted_volume: 170, predicted_speed: 23.8, predicted_congestion: 'HIGH', confidence: 0.97, timestamp: new Date(Date.now() + 5*60000).toISOString() },
    { forecast_horizon_min: 10, predicted_volume: 182, predicted_speed: 21.2, predicted_congestion: 'HIGH', confidence: 0.95, timestamp: new Date(Date.now() + 10*60000).toISOString() },
    { forecast_horizon_min: 15, predicted_volume: 198, predicted_speed: 18.5, predicted_congestion: 'SEVERE', confidence: 0.93, timestamp: new Date(Date.now() + 15*60000).toISOString() },
    { forecast_horizon_min: 30, predicted_volume: 215, predicted_speed: 15.1, predicted_congestion: 'SEVERE', confidence: 0.89, timestamp: new Date(Date.now() + 30*60000).toISOString() },
    { forecast_horizon_min: 60, predicted_volume: 140, predicted_speed: 29.4, predicted_congestion: 'MODERATE', confidence: 0.84, timestamp: new Date(Date.now() + 60*60000).toISOString() }
  ],
  model_version: 'XGBoost-Traffic-v2.1', evaluation_mae: 4.2, evaluation_rmse: 5.8, evaluation_r2: 0.94
};

export const MOCK_BENCHMARK: DigitalTwinBenchmark = {
  run_id: 'RUN-SUMO-892', scenario: 'PEAK_HOUR', simulation_engine: 'SUMO 1.18.0 TraCI Python API', intersections_simulated: 12,
  fixed_signal_scenario: { avg_delay_sec: 82.4, queue_length_m: 31.2, travel_time_min: 14.2, throughput_vph: 1420.0, avg_speed_kmh: 21.4, co2_emissions_g_km: 245.0 },
  ai_signal_scenario: { avg_delay_sec: 47.1, queue_length_m: 18.4, travel_time_min: 9.8, throughput_vph: 1890.0, avg_speed_kmh: 32.8, co2_emissions_g_km: 198.0 },
  improvements: { delay_reduction_pct: 42.8, queue_reduction_pct: 41.0, travel_time_saved_pct: 31.0, throughput_increase_pct: 33.1, co2_reduction_pct: 19.2 },
  verdict: 'NagarFlow AI Webster + RL optimization reduced arterial delay by 42.8% and decreased vehicle emissions by 19.2%.'
};

export const MOCK_VISION_FRAME: VisionFrameData = {
  camera_id: 'CAM-IND-12', timestamp: new Date().toISOString(), total_vehicles: 7,
  counts_by_class: { car: 2, bus: 1, truck: 1, 'auto-rickshaw': 1, motorcycle: 1, ambulance: 1 },
  avg_speed_kmh: 31.8, lane_occupancy_pct: 64.5, queue_length_m: 38.0,
  privacy_notice: 'Anonymous metadata extracted locally. No facial recognition or PII retained.',
  detections: [
    { class_name: 'car', confidence: 0.94, bbox: [120, 180, 240, 290], estimated_speed_kmh: 34.2 },
    { class_name: 'bus', confidence: 0.96, bbox: [400, 150, 580, 340], estimated_speed_kmh: 22.5 },
    { class_name: 'ambulance', confidence: 0.98, bbox: [310, 320, 440, 420], estimated_speed_kmh: 45.0 }
  ]
};
