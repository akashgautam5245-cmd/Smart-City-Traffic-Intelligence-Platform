'use client';

import React, { useState } from 'react';
import { Navigation, AlertTriangle, Radio, Siren } from 'lucide-react';
import { Intersection, TrafficIncident } from '@/lib/types';

interface LiveMapProps {
  intersections: Intersection[];
  incidents: TrafficIncident[];
  onSelectIntersection: (intersection: Intersection) => void;
}

export default function LiveMap({ intersections, incidents, onSelectIntersection }: LiveMapProps) {
  const [filter, setFilter] = useState<'ALL' | 'CONGESTION' | 'INCIDENTS' | 'EMERGENCY'>('ALL');

  const getCongestionColor = (occupancy: number) => {
    if (occupancy > 75) return 'bg-rose-500 text-rose-100 border-rose-400 ring-rose-500/40';
    if (occupancy > 50) return 'bg-amber-500 text-amber-100 border-amber-400 ring-amber-500/40';
    if (occupancy > 35) return 'bg-yellow-500 text-yellow-950 border-yellow-400 ring-yellow-500/40';
    return 'bg-emerald-500 text-emerald-950 border-emerald-400 ring-emerald-500/40';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col relative h-[520px]">
      <div className="bg-slate-950/80 backdrop-blur border-b border-slate-800 px-4 py-2.5 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Indore Smart GIS Traffic Layer</span>
        </div>
        <div className="flex items-center space-x-1.5 text-xs">
          {(['ALL', 'CONGESTION', 'INCIDENTS', 'EMERGENCY'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${filter === f ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>{f}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <svg className="absolute inset-0 w-full h-full stroke-slate-800/80 stroke-[4] pointer-events-none">
          <line x1="15%" y1="85%" x2="85%" y2="15%" stroke="#334155" strokeWidth="6" />
          <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#334155" strokeWidth="6" />
          <line x1="30%" y1="70%" x2="70%" y2="30%" stroke="#10b981" strokeWidth="4" strokeDasharray="8 4" className="animate-pulse" />
        </svg>

        {(filter === 'ALL' || filter === 'EMERGENCY') && (
          <div className="absolute left-[45%] top-[50%] z-20 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1 bg-purple-600 text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-lg animate-bounce">
            <Siren className="w-3.5 h-3.5" /><span>AMB-108 Corridor</span>
          </div>
        )}

        <div className="relative w-full h-full max-w-4xl max-h-[420px]">
          {intersections.map((inter, idx) => {
            const positions = [
              { left: '72%', top: '22%' }, { left: '48%', top: '44%' }, { left: '40%', top: '55%' },
              { left: '32%', top: '68%' }, { left: '24%', top: '78%' }, { left: '82%', top: '35%' }
            ];
            const pos = positions[idx % positions.length];
            const badgeColor = getCongestionColor(inter.occupancy_pct);

            return (
              <div key={inter.id} style={{ left: pos.left, top: pos.top }} onClick={() => onSelectIntersection(inter)} className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group">
                <div className="relative flex flex-col items-center">
                  <div className={`relative px-3 py-1 rounded-lg border shadow-xl flex items-center space-x-1.5 text-xs font-bold transition-all group-hover:scale-110 ${badgeColor}`}>
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    <span>{inter.name}</span>
                    <span className="text-[10px] opacity-90 px-1 py-0.2 rounded bg-black/30 font-mono">{inter.avg_delay_sec}s</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
