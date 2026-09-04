import sys
from pathlib import Path

file_path = Path(__file__).resolve()
backend_dir = file_path.parents[1]
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.main import app