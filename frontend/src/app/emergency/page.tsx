'use client';

import React, { useState } from 'react';
import { Siren, Zap } from 'lucide-react';
import { api } from '@/lib/api';
import { EmergencyCorridor } from '@/lib/types';

export default function EmergencyPage() {
  const [corridor, setCorridor] = useState<EmergencyCorridor | null>(null);

  const handleTrigger = async () => {
    const res = await api.triggerEmergency("Palasia Square", "Bombay Hospital, Vijay Nagar");
    setCorridor(res);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">Emergency Vehicle Priority</h1></div>
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2"><Siren className="w-5 h-5 text-purple-400" /><span className="font-bold">Palasia → Vijay Nagar Corridor</span></div>
        <button onClick={handleTrigger} className="bg-purple-600 font-bold px-4 py-2 rounded text-xs flex items-center space-x-1"><Zap className="w-4 h-4" /><span>Trigger Corridor</span></button>
      </div>

      {corridor && (
        <div className="bg-slate-900 border border-purple-500/40 p-5 rounded-xl text-white text-xs space-y-2">
          <div>Corridor Active: <strong className="text-purple-400">{corridor.controlled_intersections.join(' → ')}</strong></div>
          <div>Time Saved: <strong className="text-emerald-400">{corridor.time_saved_min} minutes</strong></div>
        </div>
      )}
    </div>
  );
}
