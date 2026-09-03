'use client';

import React from 'react';
import { Activity, Gauge, Clock, AlertTriangle, Siren, Leaf } from 'lucide-react';
import { Intersection, TrafficIncident } from '@/lib/types';

interface KpiCardsProps {
  intersections: Intersection[];
  incidents: TrafficIncident[];
}

export default function KpiCards({ intersections, incidents }: KpiCardsProps) {
  const totalVehicles = intersections.reduce((sum, i) => sum + i.vehicle_count, 0);
  const avgSpeed = intersections.length ? (intersections.reduce((sum, i) => sum + i.avg_speed_kmh, 0) / intersections.length).toFixed(1) : '28.5';
  const avgDelay = intersections.length ? (intersections.reduce((sum, i) => sum + i.avg_delay_sec, 0) / intersections.length).toFixed(1) : '42.0';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">Intersections</span><Activity className="w-4 h-4 text-emerald-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">{intersections.length || 6} Monitored</div><p className="text-[11px] text-emerald-400 font-semibold mt-0.5">{totalVehicles} Detected</p></div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">Avg Speed</span><Gauge className="w-4 h-4 text-cyan-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">{avgSpeed} <span className="text-xs font-normal text-slate-400">km/h</span></div><p className="text-[11px] text-cyan-400 font-semibold mt-0.5">+14% vs Baseline</p></div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">Avg Delay</span><Clock className="w-4 h-4 text-amber-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">{avgDelay} <span className="text-xs font-normal text-slate-400">sec</span></div><p className="text-[11px] text-emerald-400 font-semibold mt-0.5">-42.8% AI Reduction</p></div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">Incidents</span><AlertTriangle className="w-4 h-4 text-rose-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">1 <span className="text-xs font-normal text-slate-400">Active</span></div><p className="text-[11px] text-rose-400 font-semibold mt-0.5">High Severity Bottleneck</p></div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">Emergency Corridor</span><Siren className="w-4 h-4 text-purple-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">1 <span className="text-xs font-normal text-slate-400">Corridor</span></div><p className="text-[11px] text-purple-400 font-semibold mt-0.5">8.7 min Time Saved</p></div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex flex-col justify-between">
        <div className="flex items-center justify-between"><span className="text-xs text-slate-400 font-medium">CO₂ Saved</span><Leaf className="w-4 h-4 text-teal-400" /></div>
        <div className="mt-2"><div className="text-xl font-black text-white">4,280 <span className="text-xs font-normal text-slate-400">kg</span></div><p className="text-[11px] text-teal-400 font-semibold mt-0.5">-19.2% Emissions Impact</p></div>
      </div>
    </div>
  );
}
