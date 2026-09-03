'use client';

import React from 'react';
import { Eye, Shield, Video } from 'lucide-react';
import { VisionFrameData } from '@/lib/types';

interface VisionAnalyzerProps {
  data: VisionFrameData;
}

export default function VisionAnalyzer({ data }: VisionAnalyzerProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center space-x-2"><Eye className="w-5 h-5 text-amber-400" /><h3 className="text-base font-bold text-white">YOLOv8 + ByteTrack Perception</h3></div>
        <div className="flex items-center space-x-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded text-xs"><Video className="w-3.5 h-3.5" /><span>30 FPS</span></div>
      </div>

      <div className="relative w-full h-[240px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
        <div className="absolute top-3 left-3 bg-black/70 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400">LIVE CAM-IND-12</div>
        <div className="text-center text-xs text-slate-400">
          <div className="text-lg font-bold text-amber-400">{data.total_vehicles} Vehicles Detected</div>
          <div className="mt-1">Avg Speed: {data.avg_speed_kmh} km/h | Queue: {data.queue_length_m} m</div>
        </div>
      </div>
    </div>
  );
}
