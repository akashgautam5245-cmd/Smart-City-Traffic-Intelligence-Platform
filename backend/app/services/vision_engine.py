import time
import random
from typing import Dict, Any

class VisionEngine:
    def process_frame_metadata(self, camera_id: str = "CAM-IND-12") -> Dict[str, Any]:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        vehicle_classes = [
            ("car", 0.94, [120, 180, 240, 290], 34.2),
            ("car", 0.91, [260, 210, 380, 310], 31.8),
            ("bus", 0.96, [400, 150, 580, 340], 22.5),
            ("auto-rickshaw", 0.89, [600, 240, 690, 330], 26.0),
            ("motorcycle", 0.87, [180, 310, 230, 380], 38.0),
            ("truck", 0.92, [40, 110, 210, 270], 19.5),
            ("ambulance", 0.98, [310, 320, 440, 420], 45.0),
        ]

        detections = []
        counts_by_class = {"car": 0, "bus": 0, "truck": 0, "auto-rickshaw": 0, "motorcycle": 0, "ambulance": 0}
        
        for cls, conf, bbox, speed in vehicle_classes:
            jitter_bbox = [bbox[0] + random.randint(-5, 5), bbox[1] + random.randint(-5, 5), bbox[2] + random.randint(-5, 5), bbox[3] + random.randint(-5, 5)]
            jitter_speed = round(speed + random.uniform(-1.5, 1.5), 1)
            counts_by_class[cls] = counts_by_class.get(cls, 0) + 1
            detections.append({"class_name": cls, "confidence": conf, "bbox": jitter_bbox, "estimated_speed_kmh": jitter_speed})

        total_vehicles = len(detections)
        avg_speed = round(sum(d["estimated_speed_kmh"] for d in detections) / total_vehicles, 1)

        return {
            "camera_id": camera_id, "timestamp": timestamp, "total_vehicles": total_vehicles,
            "counts_by_class": counts_by_class, "avg_speed_kmh": avg_speed, "lane_occupancy_pct": 64.5,
            "queue_length_m": 38.0, "privacy_notice": "Anonymous metadata extracted locally. No facial recognition or PII retained.",
            "detections": detections
        }

vision_engine = VisionEngine()
