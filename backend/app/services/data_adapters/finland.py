from typing import List, Dict, Any
from app.services.data_adapters.base import BaseTrafficDataProvider

class FinlandProvider(BaseTrafficDataProvider):
    @property
    def provider_name(self) -> str: return "Fintraffic Digitraffic API"
    @property
    def country(self) -> str: return "Finland"
    def fetch_records(self) -> List[Dict[str, Any]]:
        return [{"sensor_id": "FIN-DIGI-501", "location_name": "Kehä I / Leppävaara Helsinki", "lat": 60.2180, "lng": 24.8120, "vehicle_count": 145, "avg_speed_kmh": 72.0, "occupancy_pct": 39.0, "status": "NORMALIZED"}]
