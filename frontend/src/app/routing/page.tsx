'use client';

import React, { useState } from 'react';
import { Navigation } from 'lucide-react';
import { api } from '@/lib/api';
import { RouteOption } from '@/lib/types';

export default function RoutingPage() {
  const [routes, setRoutes] = useState<RouteOption[]>([]);

  const handleSearch = async () => {
    const res = await api.optimizeRoute("Geeta Bhawan", "Vijay Nagar");
    setRoutes(res.routes);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">Intelligent Multi-Route Navigation</h1></div>
      <button onClick={handleSearch} className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded text-xs">Find Routes</button>

      <div className="grid grid-cols-2 gap-4">
        {routes.map((rt) => (
          <div key={rt.route_id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white space-y-2">
            <div className="font-bold">{rt.name}</div>
            <div className="text-xs text-slate-400">Duration: <strong className="text-emerald-400">{rt.current_traffic_duration_min} min</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
}
