import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import DemoModeBar from '@/components/DemoModeBar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NagarFlow AI — Smart City Traffic Platform',
  description: 'AI-Powered Intelligent Urban Traffic Management & Digital Twin Platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <DemoModeBar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">{children}</main>
      </body>
    </html>
  );
}
