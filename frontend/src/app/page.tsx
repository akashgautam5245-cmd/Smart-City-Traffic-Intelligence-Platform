'use client';

import React, { useState, useEffect } from 'react';
import KpiCards from '@/components/KpiCards';
import LiveMap from '@/components/LiveMap';
import IntersectionDetailModal from '@/components/IntersectionDetailModal';
import PredictionChart from '@/components/PredictionChart';
import VisionAnalyzer from '@/components/VisionAnalyzer';
import DigitalTwinBenchmark from '@/components/DigitalTwinBenchmark';
import CopilotWidget from '@/components/CopilotWidget';
import { api } from '@/lib/api';
import { Intersection, TrafficIncident, ForecastData, VisionFrameData, DigitalTwinBenchmark as BenchmarkType } from '@/lib/types';
import { MOCK_INTERSECTIONS, MOCK_INCIDENTS, MOCK_FORECAST, MOCK_VISION_FRAME, MOCK_BENCHMARK } from '@/lib/mockData';

export default function DashboardPage() {
  const [intersections, setIntersections] = useState<Intersection[]>(MOCK_INTERSECTIONS);
  const [incidents, setIncidents] = useState<TrafficIncident[]>(MOCK_INCIDENTS);
  const [forecast, setForecast] = useState<ForecastData>(MOCK_FORECAST);
  const [visionFrame, setVisionFrame] = useState<VisionFrameData>(MOCK_VISION_FRAME);
  const [benchmark, setBenchmark] = useState<BenchmarkType>(MOCK_BENCHMARK);
  const [selectedIntersection, setSelectedIntersection] = useState<Intersection | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [inters, incs, fc, vf] = await Promise.all([
          api.getIntersections(), api.getIncidents(), api.getForecast('1'), api.getVisionMetadata()
        ]);
        setIntersections(inters); setIncidents(incs); setForecast(fc); setVisionFrame(vf);
      } catch (err) {}
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <KpiCards intersections={intersections} incidents={incidents} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveMap intersections={intersections} incidents={incidents} onSelectIntersection={(inter) => setSelectedIntersection(inter)} />
        </div>
        <div className="lg:col-span-1"><CopilotWidget /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PredictionChart data={forecast} />
        <VisionAnalyzer data={visionFrame} />
      </div>

      <DigitalTwinBenchmark initialData={benchmark} />

      <IntersectionDetailModal intersection={selectedIntersection} onClose={() => setSelectedIntersection(null)} />
    </div>
  );
}
