'use client';

import React, { useState } from 'react';
import { PlayCircle, CheckCircle2 } from 'lucide-react';
import { DigitalTwinBenchmark as BenchmarkType } from '@/lib/types';
import { api } from '@/lib/api';

interface DigitalTwinBenchmarkProps {
  initialData: BenchmarkType;
}

export default function DigitalTwinBenchmark({ initialData }: DigitalTwinBenchmarkProps) {
  const [data, setData] = useState<BenchmarkType>(initialData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRunSimulation = async () => {
    setLoading(true);
    try {
      const res = await api.runDigitalTwin('PEAK_HOUR');
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fixed = data.fixed_signal_scenario;
  const ai = data.ai_signal_scenario;
  const imp = data.improvements;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl text-white">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-black">SUMO Microscopic Digital Twin Benchmark</h2>
          <p className="text-xs text-slate-400">Corridor: AB Road Indore (12 Intersections)</p>
        </div>
        <button onClick={handleRunSimulation} disabled={loading} className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-black px-4 py-2 rounded text-xs flex items-center space-x-1">
          <PlayCircle className="w-4 h-4" /><span>{loading ? 'Running...' : 'Run Twin'}</span>
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-2.5 px-3">Metric</th><th className="py-2.5 px-3">Fixed Signals</th><th className="py-2.5 px-3">NagarFlow AI</th><th className="py-2.5 px-3 text-right">Improvement</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr><td className="py-2.5 px-3 font-semibold">Average Delay</td><td className="py-2.5 px-3">{fixed.avg_delay_sec} sec</td><td className="py-2.5 px-3 text-emerald-400 font-bold">{ai.avg_delay_sec} sec</td><td className="py-2.5 px-3 text-right text-emerald-400 font-bold">-{imp.delay_reduction_pct}%</td></tr>
            <tr><td className="py-2.5 px-3 font-semibold">Queue Length</td><td className="py-2.5 px-3">{fixed.queue_length_m} m</td><td className="py-2.5 px-3 text-emerald-400 font-bold">{ai.queue_length_m} m</td><td className="py-2.5 px-3 text-right text-emerald-400 font-bold">-{imp.queue_reduction_pct}%</td></tr>
            <tr><td className="py-2.5 px-3 font-semibold">Travel Time</td><td className="py-2.5 px-3">{fixed.travel_time_min} min</td><td className="py-2.5 px-3 text-emerald-400 font-bold">{ai.travel_time_min} min</td><td className="py-2.5 px-3 text-right text-emerald-400 font-bold">-{imp.travel_time_saved_pct}%</td></tr>
            <tr><td className="py-2.5 px-3 font-semibold">CO₂ Footprint</td><td className="py-2.5 px-3">{fixed.co2_emissions_g_km} g/km</td><td className="py-2.5 px-3 text-emerald-400 font-bold">{ai.co2_emissions_g_km} g/km</td><td className="py-2.5 px-3 text-right text-emerald-400 font-bold">-{imp.co2_reduction_pct}%</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
