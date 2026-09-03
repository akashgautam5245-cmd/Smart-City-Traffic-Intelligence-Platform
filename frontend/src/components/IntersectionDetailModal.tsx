'use client';

import React, { useState } from 'react';
import { X, Check, Cpu } from 'lucide-react';
import { Intersection } from '@/lib/types';

interface ModalProps {
  intersection: Intersection | null;
  onClose: () => void;
}

export default function IntersectionDetailModal({ intersection, onClose }: ModalProps) {
  const [actionStatus, setActionStatus] = useState<string | null>(null);

  if (!intersection) return null;

  const handleApprove = () => {
    setActionStatus('APPROVED: Webster green timing updated (+12s NS green). Delay reduced by 34.2%.');
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-xl font-black text-emerald-400">{intersection.name}</span>
            <p className="text-xs text-slate-400 mt-1">Corridor: {intersection.main_road} × {intersection.cross_road}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-4 gap-3 my-5">
          <div className="bg-slate-950 p-3 rounded-xl"><span className="text-[11px] text-slate-400 block">Vehicles</span><span className="text-lg font-black">{intersection.vehicle_count}</span></div>
          <div className="bg-slate-950 p-3 rounded-xl"><span className="text-[11px] text-slate-400 block">Speed</span><span className="text-lg font-black text-cyan-400">{intersection.avg_speed_kmh} km/h</span></div>
          <div className="bg-slate-950 p-3 rounded-xl"><span className="text-[11px] text-slate-400 block">Queue</span><span className="text-lg font-black text-amber-400">{intersection.queue_length_m} m</span></div>
          <div className="bg-slate-950 p-3 rounded-xl"><span className="text-[11px] text-slate-400 block">Occupancy</span><span className="text-lg font-black text-purple-400">{intersection.occupancy_pct}%</span></div>
        </div>

        <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2"><Cpu className="w-5 h-5 text-emerald-400" /><span className="font-bold text-sm text-emerald-300">Webster AI Recommendation</span></div>
          <p className="text-xs text-slate-300 mt-2">Extend NS green duration by +12s to reduce queue by 37.6%.</p>
          {actionStatus ? (
            <div className="mt-3 bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs p-2.5 rounded">{actionStatus}</div>
          ) : (
            <button onClick={handleApprove} className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded text-xs flex items-center justify-center space-x-1">
              <Check className="w-4 h-4" /><span>Approve AI Timing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
