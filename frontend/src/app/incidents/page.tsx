'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { MOCK_INCIDENTS } from '@/lib/mockData';

export default function IncidentsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">Incident & Anomaly Management</h1></div>
      <div className="space-y-4">
        {MOCK_INCIDENTS.map((inc) => (
          <div key={inc.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white flex justify-between">
            <div>
              <div className="flex items-center space-x-2"><AlertTriangle className="w-5 h-5 text-rose-400" /><h3 className="font-bold">{inc.title}</h3></div>
              <p className="text-xs text-slate-400 mt-1">{inc.recommended_action}</p>
            </div>
            <button className="bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded text-xs">Resolve</button>
          </div>
        ))}
      </div>
    </div>
  );
}
