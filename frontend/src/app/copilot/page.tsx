'use client';

import React from 'react';
import CopilotWidget from '@/components/CopilotWidget';

export default function CopilotPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-black text-white">AI Traffic Cop Copilot</h1></div>
      <CopilotWidget />
    </div>
  );
}
