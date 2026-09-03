'use client';

import React from 'react';
import DigitalTwinBenchmark from '@/components/DigitalTwinBenchmark';
import { MOCK_BENCHMARK } from '@/lib/mockData';

export default function DigitalTwinPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">SUMO Digital Twin Benchmarking</h1></div>
      <DigitalTwinBenchmark initialData={MOCK_BENCHMARK} />
    </div>
  );
}
