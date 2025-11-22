"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownToLine, 
  Truck, 
  ArrowRightLeft, 
  ClipboardList, 
  Settings, 
  Bell, 
  Search,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  DollarSign,
  MapPin,
  MoreHorizontal
} from 'lucide-react';

// --- 1. Premium KPI Card Component ---

const KPICard = ({ label, value, subtext, icon: Icon, trend, trendColor, color }) => {
  const colorStyles = {
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorStyles[color] || colorStyles.indigo}`}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trendColor === 'green' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {trendColor === 'green' ? <TrendingUp className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
        <div className="text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">{value}</div>
        <div className="text-xs text-slate-500">{subtext}</div>
      </div>
    </div>
  );
};

// --- 2. Action Card with Linking ---

const ActionCard = ({ title, href, primaryLabel, primaryCount, lateCount, waitingCount, scheduledCount, colorTheme }) => {
  const themes = {
    emerald: {
      border: "hover:border-emerald-500/50",
      btn: "bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)]",
      text: "text-emerald-400",
      iconBg: "bg-emerald-500/10 text-emerald-500"
    },
    blue: {
      border: "hover:border-blue-500/50",
      btn: "bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)]",
      text: "text-blue-400",
      iconBg: "bg-blue-500/10 text-blue-500"
    },
    indigo: {
      border: "hover:border-indigo-500/50",
      btn: "bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]",
      text: "text-indigo-400",
      iconBg: "bg-indigo-500/10 text-indigo-500"
    },
    amber: {
      border: "hover:border-amber-500/50",
      btn: "bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_-5px_rgba(245,158,11,0.4)]",
      text: "text-amber-400",
      iconBg: "bg-amber-500/10 text-amber-500"
    }
  };

  const t = themes[colorTheme] || themes.blue;

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-6 transition-all duration-300 ${t.border} group relative overflow-hidden flex flex-col justify-between h-full`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <h3 className={`text-lg font-bold ${t.text}`}>{title}</h3>
        <div className={`p-2 rounded-lg ${t.iconBg}`}>
          <ClipboardList className="w-5 h-5" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        {/* Main Button (Wrapped in Link) */}
        <Link href={href} className={`flex-1 ${t.btn} rounded-lg p-4 flex justify-between items-center group-hover:scale-[1.02] transition-transform text-white cursor-pointer`}>
          <div>
            <div className="text-3xl font-bold">{primaryCount}</div>
            <div className="text-sm font-medium opacity-90">{primaryLabel}</div>
          </div>
          <ChevronRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>

        {/* Stats */}
        <div className="flex flex-col justify-center gap-2 min-w-[120px]">
          {lateCount > 0 && (
             <div className="flex justify-between items-center text-sm">
               <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">Late</span>
               <span className="text-white font-bold">{lateCount}</span>
             </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 text-xs">Waiting</span>
            <span className="text-amber-400 font-bold">{waitingCount}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 text-xs">Scheduled</span>
            <span className="text-slate-200 font-bold">{scheduledCount}</span>
          </div>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-slate-800 to-transparent rounded-full opacity-20 pointer-events-none" />
    </div>
  );
};

// --- 3. Simple SVG Area Chart (No external libs) ---

const StockTrendChart = () => (
  <div className="relative h-48 w-full">
    {/* Grid Lines */}
    <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-600">
      <div className="border-b border-slate-800/50 w-full h-0"></div>
      <div className="border-b border-slate-800/50 w-full h-0"></div>
      <div className="border-b border-slate-800/50 w-full h-0"></div>
      <div className="border-b border-slate-800/50 w-full h-0"></div>
    </div>
    
    {/* The SVG Line/Area */}
    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Path: Smooth curve simulation */}
      <path 
        d="M0,100 C50,80 100,120 150,90 C200,60 250,80 300,50 C350,20 400,40 450,10 L450,192 L0,192 Z" 
        fill="url(#gradient)" 
        className="w-full"
      />
      <path 
        d="M0,100 C50,80 100,120 150,90 C200,60 250,80 300,50 C350,20 400,40 450,10" 
        fill="none" 
        stroke="#6366f1" 
        strokeWidth="3" 
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    {/* Tooltip Simulation */}
    <div className="absolute top-[20%] right-[20%] bg-slate-800 text-xs px-2 py-1 rounded border border-slate-700 shadow-lg text-white">
      $842k
    </div>
  </div>
);


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Navbar />
    
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- 1. NEW KPI Grid Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard 
            label="Total SKU" 
            value="1,204" 
            subtext="Across all categories" 
            icon={Package} 
            color="indigo"
            trend="+12 New" 
            trendColor="green"
          />
          <KPICard 
            label="Total Value" 
            value="$842,000" 
            subtext="Current inventory asset" 
            icon={DollarSign} 
            color="emerald"
            trend="+5.2%" 
            trendColor="green"
          />
          <KPICard 
            label="Low Stock" 
            value="12 Items" 
            subtext="Reorder point reached" 
            icon={AlertCircle} 
            color="rose"
            trend="Urgent" 
            trendColor="red"
          />
          <KPICard 
            label="Locations" 
            value="4" 
            subtext="Main, B, C, Floor" 
            icon={MapPin} 
            color="amber"
          />
        </div>

        {/* --- 2. Action Cards Grid --- */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Operations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
          <ActionCard 
            title="Receipts"
            href="/dashboard/receipts"
            primaryLabel="To Process"
            primaryCount={4}
            lateCount={1}
            waitingCount={0}
            scheduledCount={6}
            colorTheme="emerald"
          />
          <ActionCard 
            title="Delivery Orders"
            href="/dashboard/delivery"
            primaryLabel="To Deliver"
            primaryCount={4}
            lateCount={1}
            waitingCount={2}
            scheduledCount={6}
            colorTheme="blue"
          />
          <ActionCard 
            title="Stock Adjustments"
            href="/dashboard/adjustments"
            primaryLabel="To Verify"
            primaryCount={2}
            lateCount={2}
            waitingCount={0}
            scheduledCount={0}
            colorTheme="amber"
          />
        </div>

        {/* --- 3. NEW Graphs & Analytics Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left: Stock Value Trend Chart */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Inventory Value Trend</h3>
                <p className="text-sm text-slate-500">Last 30 Days Movement</p>
              </div>
              <select className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 outline-none">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>
            {/* Chart Container */}
            <StockTrendChart />
          </div>

          {/* Right: Category Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Top Categories</h3>
              <MoreHorizontal className="w-5 h-5 text-slate-500 cursor-pointer" />
            </div>
            
            <div className="space-y-6">
              {/* Item 1 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Raw Material (Steel)</span>
                  <span className="text-white font-bold">45%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[45%]"></div>
                </div>
              </div>

              {/* Item 2 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Finished Goods</span>
                  <span className="text-white font-bold">30%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[30%]"></div>
                </div>
              </div>

              {/* Item 3 */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Components</span>
                  <span className="text-white font-bold">15%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[15%]"></div>
                </div>
              </div>
              
              {/* Item 4 */}
               <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300 font-medium">Others</span>
                  <span className="text-white font-bold">10%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 w-[10%]"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}