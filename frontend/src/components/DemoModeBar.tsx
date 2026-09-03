'use client';

import React, { useState } from 'react';
import { Play, Sparkles, AlertOctagon, CloudRain, Siren, Zap, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';

interface DemoModeBarProps {
  onScenarioTriggered?: (scenario: string) => void;
}

export default function DemoModeBar({ onScenarioTriggered }: DemoModeBarProps) {
  const [activeScenario, setActiveScenario] = useState<string>('NORMAL');
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scenarios = [
    { id: 'NORMAL', label: 'Normal Traffic', icon: CheckCircle2, color: 'hover:border-emerald-500 text-emerald-400' },
    { id: 'TRAFFIC_SPIKE', label: 'Traffic Spike', icon: Zap, color: 'hover:border-amber-500 text-amber-400' },
    { id: 'ACCIDENT', label: 'Accident', icon: AlertOctagon, color: 'hover:border-rose-500 text-rose-400' },
    { id: 'HEAVY_RAIN', label: 'Heavy Rain', icon: CloudRain, color: 'hover:border-blue-500 text-blue-400' },
    { id: 'EMERGENCY_VEHICLE', label: 'Emergency Vehicle', icon: Siren, color: 'hover:border-cyan-500 text-cyan-400' },
    { id: 'PEAK_HOUR', label: 'Peak Hour', icon: Sparkles, color: 'hover:border-purple-500 text-purple-400' }
  ];

  const handleTrigger = async (id: string) => {
    setLoading(true);
    setActiveScenario(id);
    try {
      const res = await api.triggerDemoScenario(id);
      setToastMessage(res.message);
      if (onScenarioTriggered) onScenarioTriggered(id);
      setTimeout(() => setToastMessage(null), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 border-b border-slate-800/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase">
          <div className="flex items-center space-x-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-md">
            <Play className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>Demo Scenario Controller</span>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-1.5">
          {scenarios.map((sc) => {
            const Icon = sc.icon;
            const isActive = activeScenario === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => handleTrigger(sc.id)}
                disabled={loading}
                className={`flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  isActive
                    ? 'bg-slate-800 border-slate-600 text-white font-semibold ring-1 ring-emerald-500/50'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 ' + sc.color
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {toastMessage && (
        <div className="max-w-7xl mx-auto mt-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
          <span>{toastMessage}</span>
          <span className="text-[10px] text-emerald-400/80 font-mono">Live Telemetry Updated</span>
        </div>
      )}
    </div>
  );
}
