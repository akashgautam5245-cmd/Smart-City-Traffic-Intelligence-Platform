from abc import ABC, abstractmethod
from typing import List, Dict, Any

class BaseTrafficDataProvider(ABC):
    @property
    @abstractmethod
    def provider_name(self) -> str: pass

    @property
    @abstractmethod
    def country(self) -> str: pass

    @abstractmethod
    def fetch_records(self) -> List[Dict[str, Any]]: pass
