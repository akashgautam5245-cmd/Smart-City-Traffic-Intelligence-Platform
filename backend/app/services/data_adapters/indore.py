from typing import List, Dict, Any
from app.services.data_adapters.base import BaseTrafficDataProvider

class IndoreLocalProvider(BaseTrafficDataProvider):
    @property
    def provider_name(self) -> str: return "Indore Smart City IoT Feed"
    @property
    def country(self) -> str: return "India"
    def fetch_records(self) -> List[Dict[str, Any]]:
        return [{"sensor_id": "IND-S-102", "location_name": "Vijay Nagar Square", "lat": 22.7533, "lng": 75.8937, "vehicle_count": 162, "avg_speed_kmh": 24.5, "occupancy_pct": 68.0, "status": "NORMALIZED"}]
