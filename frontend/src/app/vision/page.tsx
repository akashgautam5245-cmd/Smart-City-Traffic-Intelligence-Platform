'use client';

import React from 'react';
import VisionAnalyzer from '@/components/VisionAnalyzer';
import { MOCK_VISION_FRAME } from '@/lib/mockData';

export default function VisionPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">Computer Vision Perception</h1></div>
      <VisionAnalyzer data={MOCK_VISION_FRAME} />
    </div>
  );
}
