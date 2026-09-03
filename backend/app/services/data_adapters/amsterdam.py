from typing import List, Dict, Any
from app.services.data_adapters.base import BaseTrafficDataProvider

class AmsterdamProvider(BaseTrafficDataProvider):
    @property
    def provider_name(self) -> str: return "Amsterdam Open Data (NDW Traffic Feed)"
    @property
    def country(self) -> str: return "Netherlands"
    def fetch_records(self) -> List[Dict[str, Any]]:
        return [{"sensor_id": "AMS-NDW-8041", "location_name": "S100 Stadhouderskade / Weteringschans", "lat": 52.3590, "lng": 4.8875, "vehicle_count": 84, "avg_speed_kmh": 42.0, "occupancy_pct": 32.0, "status": "NORMALIZED"}]
