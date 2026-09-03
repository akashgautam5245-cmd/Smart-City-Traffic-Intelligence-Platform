'use client';

import React, { useState } from 'react';
import { Radio, ShieldAlert, Cpu, Check } from 'lucide-react';
import { MOCK_INTERSECTIONS } from '@/lib/mockData';

export default function SignalsPage() {
  const [selectedInterId, setSelectedInterId] = useState(MOCK_INTERSECTIONS[0].id);
  const selectedInter = MOCK_INTERSECTIONS.find(i => i.id === selectedInterId) || MOCK_INTERSECTIONS[0];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center space-x-2"><Radio className="w-5 h-5 text-cyan-400" /><span>Adaptive Signal Split Control</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          {MOCK_INTERSECTIONS.map((inter) => (
            <div key={inter.id} onClick={() => setSelectedInterId(inter.id)} className={`p-4 rounded-xl border cursor-pointer ${selectedInterId === inter.id ? 'bg-slate-900 border-cyan-500' : 'bg-slate-950 border-slate-800'}`}>
              <div className="font-bold text-sm text-white">{inter.name}</div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 text-white">
          <h2 className="text-lg font-black">{selectedInter.name} Signal Controller</h2>
          <div className="bg-slate-950 border border-cyan-500/40 p-4 rounded-xl space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm"><Cpu className="w-4 h-4" /><span>Webster AI Split Recommendation</span></div>
            <p className="text-xs text-slate-300">Extend NS green timing by +12s to lower delay by 34.2%.</p>
            <button className="w-full bg-cyan-500 text-slate-950 font-black py-2 rounded text-xs">Approve Signal Timing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
