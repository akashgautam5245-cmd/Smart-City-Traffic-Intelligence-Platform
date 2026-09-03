from typing import List, Dict, Any
from app.services.data_adapters.base import BaseTrafficDataProvider

class DATEX2Provider(BaseTrafficDataProvider):
    @property
    def provider_name(self) -> str: return "DATEX II European XML Feed"
    @property
    def country(self) -> str: return "EU Standard"
    def fetch_records(self) -> List[Dict[str, Any]]:
        return [{"sensor_id": "DATEX2-EU-991", "location_name": "A1 Westautobahn Vienna", "lat": 48.1980, "lng": 16.2800, "vehicle_count": 275, "avg_speed_kmh": 92.0, "occupancy_pct": 52.0, "status": "NORMALIZED"}]
