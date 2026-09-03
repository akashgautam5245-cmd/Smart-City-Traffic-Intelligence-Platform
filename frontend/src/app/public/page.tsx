'use client';

import React, { useState } from 'react';
import { Navigation } from 'lucide-react';
import { api } from '@/lib/api';
import { RouteOption } from '@/lib/types';

export default function PublicAppPage() {
  const [origin, setOrigin] = useState('Palasia Square');
  const [destination, setDestination] = useState('Vijay Nagar Square');
  const [routes, setRoutes] = useState<RouteOption[]>([]);

  const handleNavigate = async () => {
    const res = await api.optimizeRoute(origin, destination);
    setRoutes(res.routes);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center"><h1 className="text-2xl font-black text-white">NagarFlow Citizen Navigation</h1></div>
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-white space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="bg-slate-950 border border-slate-800 p-2 rounded text-xs" />
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="bg-slate-950 border border-slate-800 p-2 rounded text-xs" />
        </div>
        <button onClick={handleNavigate} className="w-full bg-emerald-500 text-slate-950 font-black py-2 rounded text-xs flex items-center justify-center space-x-1"><Navigation className="w-4 h-4" /><span>Search Routes</span></button>
      </div>

      {routes.map((rt) => (
        <div key={rt.route_id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white">
          <div className="font-bold">{rt.name} ({rt.current_traffic_duration_min} min)</div>
          <p className="text-xs text-slate-400 mt-1">{rt.recommendation_reason}</p>
        </div>
      ))}
    </div>
  );
}
