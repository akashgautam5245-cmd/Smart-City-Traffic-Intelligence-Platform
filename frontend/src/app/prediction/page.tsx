'use client';

import React from 'react';
import PredictionChart from '@/components/PredictionChart';
import { MOCK_FORECAST } from '@/lib/mockData';

export default function PredictionPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">AI Time-Series Forecast</h1></div>
      <PredictionChart data={MOCK_FORECAST} />
    </div>
  );
}
