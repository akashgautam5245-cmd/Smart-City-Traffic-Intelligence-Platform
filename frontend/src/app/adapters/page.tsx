'use client';

import React from 'react';

export default function AdaptersPage() {
  const adapters = [
    { id: 'indore', name: 'Indore Smart City IoT Feed', country: 'India' },
    { id: 'amsterdam', name: 'Amsterdam Open Data (NDW)', country: 'Netherlands' },
    { id: 'sweden', name: 'Sweden Trafikverket Open API', country: 'Sweden' },
    { id: 'datex2', name: 'DATEX II European XML Feed', country: 'EU Standard' }
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">Pluggable Traffic Data Ingestion Adapters</h1></div>
      <div className="grid grid-cols-2 gap-4">
        {adapters.map((ad) => (
          <div key={ad.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-white">
            <div className="font-bold">{ad.name}</div>
            <div className="text-xs text-slate-400 mt-1">Country: {ad.country}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
