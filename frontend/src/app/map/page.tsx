'use client';

import React, { useState } from 'react';
import LiveMap from '@/components/LiveMap';
import IntersectionDetailModal from '@/components/IntersectionDetailModal';
import { MOCK_INTERSECTIONS, MOCK_INCIDENTS } from '@/lib/mockData';
import { Intersection } from '@/lib/types';

export default function MapPage() {
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);

  return (
    <div className="space-y-4">
      <div><h1 className="text-xl font-black text-white">Indore GIS Real-Time Traffic Map</h1></div>
      <LiveMap intersections={MOCK_INTERSECTIONS} incidents={MOCK_INCIDENTS} onSelectIntersection={(inter) => setSelectedIntersection(inter)} />
      <IntersectionDetailModal intersection={selectedIntersection} onClose={() => setSelectedIntersection(null)} />
    </div>
  );
}
