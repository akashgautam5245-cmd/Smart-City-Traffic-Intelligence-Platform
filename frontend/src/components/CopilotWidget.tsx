'use client';

import React, { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { CopilotResponse } from '@/lib/types';
import { api } from '@/lib/api';

export default function CopilotWidget() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hello Traffic Controller. I am **NagarFlow AI Copilot**. I query PostgreSQL live telemetry directly to assist your traffic decision-making.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;
    const q = query; setQuery(''); setMessages(prev => [...prev, { sender: 'user', text: q }]); setLoading(true);
    try {
      const res: CopilotResponse = await api.askCopilot(q);
      setMessages(prev => [...prev, { sender: 'bot', text: res.answer }]);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col h-[520px]">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Bot className="w-5 h-5 text-indigo-400" /><h3 className="text-sm font-black text-white">AI Traffic Cop Copilot</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 my-4 pr-1 text-xs">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl ${m.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-200 border border-slate-800'}`}>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask AI Copilot..." className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs text-white" />
        <button onClick={handleSend} disabled={loading} className="bg-indigo-600 p-2 rounded text-white"><Send className="w-4 h-4" /></button>
      </div>
    </div>
  );
}
