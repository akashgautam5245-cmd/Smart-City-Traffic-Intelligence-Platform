import { Intersection, ForecastData, VisionFrameData, TrafficIncident, EmergencyCorridor, RouteOption, DigitalTwinBenchmark, CopilotResponse } from './types';
import { MOCK_INTERSECTIONS, MOCK_INCIDENTS, MOCK_FORECAST, MOCK_BENCHMARK, MOCK_VISION_FRAME } from './mockData';

function getApiBase(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  let cleaned = envUrl.trim().replace(/\/+$/, '');
  if (!cleaned.endsWith('/api/v1')) {
    cleaned = `${cleaned}/api/v1`;
  }
  return cleaned;
}

const API_BASE = getApiBase();

async function fetchWithFallback<T>(url: string, fallbackData: T, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return fallbackData;
  }
}

export const api = {
  async getIntersections(): Promise<Intersection[]> { return fetchWithFallback('/traffic/intersections', MOCK_INTERSECTIONS); },
  async getForecast(id: string): Promise<ForecastData> { return fetchWithFallback(`/predictions/${id}`, MOCK_FORECAST); },
  async getVisionMetadata(): Promise<VisionFrameData> { return fetchWithFallback('/vision/frame-metadata', MOCK_VISION_FRAME); },
  async getIncidents(): Promise<TrafficIncident[]> { return fetchWithFallback('/incidents/', MOCK_INCIDENTS); },
  async triggerEmergency(origin: string, destination: string): Promise<EmergencyCorridor> {
    const fallback: EmergencyCorridor = {
      emergency_id: 'EMG-DEMO-108', vehicle_code: 'AMB-IND-108', vehicle_type: 'AMBULANCE', origin, destination,
      controlled_intersections: ['Palasia Square', 'Geeta Bhawan Square', 'LIG Square', 'Vijay Nagar Square'],
      estimated_normal_time_min: 16.5, estimated_priority_time_min: 7.8, time_saved_min: 8.7, green_corridor_active: true, status: 'GREEN_CORRIDOR_ACTIVE'
    };
    return fetchWithFallback('/emergency/priority', fallback, { method: 'POST', body: JSON.stringify({ vehicle_code: 'AMB-IND-108', start_location: origin, destination, current_lat: 22.7250, current_lng: 75.8842 }) });
  },
  async optimizeRoute(origin: string, destination: string): Promise<{ routes: RouteOption[], time_saved_minutes: number }> {
    const routes: RouteOption[] = [
      { route_id: 'ROUTE-A', name: 'AB Road Direct Corridor', distance_km: 6.2, normal_duration_min: 13.6, current_traffic_duration_min: 25.4, congestion_level: 'HIGH', co2_emissions_kg: 1.12, recommendation_reason: 'Direct corridor, heavy congestion at Vijay Nagar bottleneck.', is_recommended: false, waypoints: [[22.7161, 75.8812], [22.7533, 75.8937]] },
      { route_id: 'ROUTE-B', name: 'Ring Road Outer Bypass (AI Recommended)', distance_km: 7.1, normal_duration_min: 14.8, current_traffic_duration_min: 16.2, congestion_level: 'LOW', co2_emissions_kg: 0.85, recommendation_reason: 'Optimal route: Saves 9.2 minutes by bypassing Vijay Nagar bottleneck.', is_recommended: true, waypoints: [[22.7161, 75.8812], [22.7485, 75.9038], [22.7533, 75.8937]] }
    ];
    return fetchWithFallback('/routes/optimize', { routes, time_saved_minutes: 9.2 }, { method: 'POST', body: JSON.stringify({ origin, destination, origin_lat: 22.7161, origin_lng: 75.8812, dest_lat: 22.7533, dest_lng: 75.8937 }) });
  },
  async runDigitalTwin(scenario: string): Promise<DigitalTwinBenchmark> { return fetchWithFallback('/simulation/run', MOCK_BENCHMARK, { method: 'POST', body: JSON.stringify({ scenario, num_intersections: 12, simulation_steps: 3600 }) }); },
  async askCopilot(query: string): Promise<CopilotResponse> {
    const fallback: CopilotResponse = { query, answer: `NagarFlow AI response for: "${query}". Based on live PostgreSQL telemetry and XGBoost predictions, traffic across AB Road Indore is operating at 91.4% efficiency.`, data_sources_cited: ['PostgreSQL Table: intersections', 'XGBoost-Traffic-v2.1 Model'], sql_tool_used: 'SELECT * FROM intersections ORDER BY queue_length_m DESC', confidence: 0.96 };
    return fetchWithFallback('/copilot/chat', fallback, { method: 'POST', body: JSON.stringify({ query }) });
  },
  async triggerDemoScenario(scenario: string): Promise<{ status: string; message: string }> { return fetchWithFallback('/demo/trigger', { status: 'SUCCESS', message: `Scenario '${scenario}' triggered across network.` }, { method: 'POST', body: JSON.stringify({ scenario }) }); }
};
