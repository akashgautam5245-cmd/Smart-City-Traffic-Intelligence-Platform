from fastapi import APIRouter, HTTPException
from app.services.data_adapters.indore import IndoreLocalProvider
from app.services.data_adapters.amsterdam import AmsterdamProvider
from app.services.data_adapters.sweden import SwedenProvider
from app.services.data_adapters.finland import FinlandProvider
from app.services.data_adapters.datex2 import DATEX2Provider

router = APIRouter()
ADAPTERS = {"indore": IndoreLocalProvider(), "amsterdam": AmsterdamProvider(), "sweden": SwedenProvider(), "finland": FinlandProvider(), "datex2": DATEX2Provider()}

@router.get("/")
def get_available_adapters():
    return [{"id": key, "name": provider.provider_name, "country": provider.country} for key, provider in ADAPTERS.items()]

@router.get("/{adapter_id}/fetch")
def fetch_from_adapter(adapter_id: str):
    provider = ADAPTERS.get(adapter_id.lower())
    if not provider: raise HTTPException(status_code=404, detail="Adapter not found.")
    return {"adapter_id": adapter_id, "provider_name": provider.provider_name, "records": provider.fetch_records()}
