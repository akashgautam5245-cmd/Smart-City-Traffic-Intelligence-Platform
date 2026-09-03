'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu } from 'lucide-react';
import { ForecastData } from '@/lib/types';

interface PredictionChartProps {
  data: ForecastData;
}

export default function PredictionChart({ data }: PredictionChartProps) {
  const chartData = data.predictions.map((p) => ({
    horizon: `+${p.forecast_horizon_min}m`, volume: p.predicted_volume, speed: p.predicted_speed
  }));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2"><Cpu className="w-5 h-5 text-purple-400" /><h3 className="text-base font-bold text-white">AI Time-Series Forecast</h3></div>
        <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs px-2 py-0.5 rounded font-mono">R² = {data.evaluation_r2}</span>
      </div>

      <div className="h-[220px] w-full my-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="horizon" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }} />
            <Area type="monotone" dataKey="volume" stroke="#a855f7" strokeWidth={3} fill="#a855f7" fillOpacity={0.2} name="Vehicle Volume" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
