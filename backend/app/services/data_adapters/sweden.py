from typing import List, Dict, Any
from app.services.data_adapters.base import BaseTrafficDataProvider

class SwedenProvider(BaseTrafficDataProvider):
    @property
    def provider_name(self) -> str: return "Sweden Trafikverket Open API"
    @property
    def country(self) -> str: return "Sweden"
    def fetch_records(self) -> List[Dict[str, Any]]:
        return [{"sensor_id": "SWE-TRV-102", "location_name": "E4 Stockholm / Essingeleden", "lat": 59.3175, "lng": 18.0080, "vehicle_count": 310, "avg_speed_kmh": 64.0, "occupancy_pct": 58.0, "status": "NORMALIZED"}]
