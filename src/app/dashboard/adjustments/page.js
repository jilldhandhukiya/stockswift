"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Package, 
  ClipboardCheck, 
  Search, 
  Filter, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Save,
  X,
  History,
  ArrowRight,
  Scale,
  FileWarning
} from 'lucide-react';

// --- Dummy Data ---
const ADJUSTMENT_HISTORY = [
  { id: 1, ref: 'ADJ/2025/004', date: '2025-10-28', product: 'Steel Rods (10mm)', location: 'WH/Stock', systemQty: 150, countedQty: 147, diff: -3, reason: 'Damaged', status: 'Applied', valueChange: '-₹1,500' },
  { id: 2, ref: 'ADJ/2025/003', date: '2025-10-25', product: 'Office Chair', location: 'WH/Stock', systemQty: 45, countedQty: 45, diff: 0, reason: 'Routine Count', status: 'Applied', valueChange: '₹0' },
  { id: 3, ref: 'ADJ/2025/002', date: '2025-10-20', product: 'Monitor Arm', location: 'WH/Output', systemQty: 10, countedQty: 11, diff: 1, reason: 'Found Item', status: 'Applied', valueChange: '+₹1,200' },
];

const DRAFT_COUNTS = [
  { id: 101, product: 'Conference Table', location: 'WH/Stock', systemQty: 8, countedQty: null },
  { id: 102, product: 'Ergo Chair', location: 'WH/Stock', systemQty: 12, countedQty: 10 },
];

// --- Components ---

const KPICard = ({ label, value, subtext, icon: Icon, color }) => {
  const styles = {
    rose: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    indigo: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  };
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-start justify-between">
      <div>
        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</div>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-slate-500">{subtext}</div>
      </div>
      <div className={`p-3 rounded-lg ${styles[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};

export default function AdjustmentsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Head>
        <title>Stock Adjustments | StockSwift</title>
      </Head>

      {/* --- Header Navigation --- */}
      <header className="h-16 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Package className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-100 hidden md:block">StockSwift</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/dashboard" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Dashboard</Link>
            <Link href="/operations" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Operations</Link>
            <Link href="/stock" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Stock</Link>
          </nav>
        </div>
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Inventory Adjustments</h1>
            <p className="text-slate-500 text-sm">Reconcile physical stock with system records. Correct discrepancies.</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-all">
              <History className="w-4 h-4" /> History Log
            </button>
            <button 
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)] transition-all"
            >
              <ClipboardCheck className="w-4 h-4" /> Start New Count
            </button>
          </div>
        </div>

        {/* --- KPIs --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard 
            label="Net Variance (Mo)" 
            value="- ₹1,240" 
            subtext="Value lost due to discrepancies" 
            icon={Scale} 
            color="rose" 
          />
          <KPICard 
            label="Pending Counts" 
            value="2" 
            subtext="Draft adjustments awaiting review" 
            icon={FileWarning} 
            color="indigo" 
          />
          <KPICard 
            label="Accuracy Rate" 
            value="98.4%" 
            subtext="Based on last 50 checks" 
            icon={CheckCircle2} 
            color="emerald" 
          />
        </div>

        {/* --- "New Count" Form (Conditional Panel) --- */}
        {isCreating && (
          <div className="mb-8 bg-slate-900 border border-indigo-500/30 rounded-xl p-6 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-indigo-400" /> New Physical Count
              </h3>
              <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase">Product</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-white focus:border-indigo-500 outline-none">
                  <option>Select Product...</option>
                  <option>Steel Rods (10mm)</option>
                  <option>Office Desk</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase">Location</label>
                 <select className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-white focus:border-indigo-500 outline-none">
                  <option>WH/Stock</option>
                  <option>WH/Output</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase">Count Date</label>
                 <input type="date" className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-white focus:border-indigo-500 outline-none" />
              </div>
            </div>

            {/* Count Table Input */}
            <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden mb-6">
              <table className="w-full text-sm text-left text-slate-400">
                <thead className="bg-slate-900/50 text-xs uppercase font-bold text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Theoretical (System)</th>
                    <th className="px-4 py-3 w-32">Real Count</th>
                    <th className="px-4 py-3">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr>
                    <td className="px-4 py-3 text-white">Steel Rods (10mm)</td>
                    <td className="px-4 py-3">150 Units</td>
                    <td className="px-4 py-3">
                      <input type="number" placeholder="0" className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white text-center focus:border-indigo-500 outline-none" />
                    </td>
                    <td className="px-4 py-3 text-slate-600">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setIsCreating(false)} className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium">Cancel</button>
              <button className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20">Apply Adjustment</button>
            </div>
          </div>
        )}

        {/* --- Main List: Adjustment History --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
             <h3 className="font-bold text-white text-lg">Adjustment History</h3>
             <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search Ref or Product..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:border-indigo-500 outline-none"
                />
             </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Product / Location</th>
                  <th className="px-6 py-4 text-center">System Qty</th>
                  <th className="px-6 py-4 text-center">Counted</th>
                  <th className="px-6 py-4 text-center">Diff</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {ADJUSTMENT_HISTORY.map((item) => {
                  // Visual Logic for Difference
                  const isNegative = item.diff < 0;
                  const isPositive = item.diff > 0;
                  const diffColor = isNegative ? 'text-rose-400' : (isPositive ? 'text-emerald-400' : 'text-slate-500');
                  const diffBg = isNegative ? 'bg-rose-500/10' : (isPositive ? 'bg-emerald-500/10' : 'bg-slate-800/50');

                  return (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-white text-xs">{item.ref}</td>
                      <td className="px-6 py-4 text-xs">{item.date}</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-200">{item.product}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {item.location}</div>
                      </td>
                      <td className="px-6 py-4 text-center">{item.systemQty}</td>
                      <td className="px-6 py-4 text-center font-bold text-white">{item.countedQty}</td>
                      
                      {/* Difference Column */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${diffColor} ${diffBg}`}>
                          {item.diff > 0 ? `+${item.diff}` : item.diff}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <span className="px-2 py-1 border border-slate-700 rounded text-slate-400">{item.reason}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Applied
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}