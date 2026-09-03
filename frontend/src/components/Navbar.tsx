'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Shield, Radio, Navigation, Eye, Cpu, AlertTriangle, PlayCircle, Bot, Database } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 text-white sticky top-0 z-50 px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                NagarFlow AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PROD v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Smart City Traffic Twin & Optimization</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center space-x-1 bg-slate-950/60 border border-slate-800/80 rounded-full px-3 py-1.5 text-xs font-medium">
          <Link href="/" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/map" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Navigation className="w-3.5 h-3.5 text-emerald-400" /><span>Live GIS Map</span>
          </Link>
          <Link href="/signals" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400" /><span>Signals</span>
          </Link>
          <Link href="/prediction" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-purple-400" /><span>AI Forecast</span>
          </Link>
          <Link href="/vision" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Eye className="w-3.5 h-3.5 text-amber-400" /><span>Vision CV</span>
          </Link>
          <Link href="/emergency" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /><span>Emergency</span>
          </Link>
          <Link href="/digital-twin" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <PlayCircle className="w-3.5 h-3.5 text-teal-400" /><span>Digital Twin</span>
          </Link>
          <Link href="/copilot" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Bot className="w-3.5 h-3.5 text-indigo-400" /><span>AI Copilot</span>
          </Link>
          <Link href="/adapters" className="px-3 py-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center space-x-1">
            <Database className="w-3.5 h-3.5 text-blue-400" /><span>Adapters</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-lg text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-semibold">Indore, MP</span>
          </div>
          <div className="flex items-center space-x-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" /><span>Officer Role</span>
          </div>
        </div>

      </div>
    </header>
  );
}
