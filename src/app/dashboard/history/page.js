"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Package, 
  Search, 
  LayoutList, 
  KanbanSquare, 
  Plus, 
  ArrowRight, 
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft
} from 'lucide-react';

// --- Dummy Data with Types for Coloring ---
const MOVE_DATA = [
  { id: 1, ref: 'WH/IN/0001', date: '2025-10-24', contact: 'Azure Interior', from: 'Vendor', to: 'WH/Stock', qty: '50 Units', product: 'Office Chair', status: 'Done', type: 'in' },
  { id: 2, ref: 'WH/OUT/0002', date: '2025-10-25', contact: 'Deco Addict', from: 'WH/Stock', to: 'Customer', qty: '10 Units', product: 'Corner Desk', status: 'Ready', type: 'out' },
  { id: 3, ref: 'WH/INT/0005', date: '2025-10-26', contact: 'Internal', from: 'WH/Stock', to: 'WH/Output', qty: '20 Units', product: 'Bolt Set (M4)', status: 'Waiting', type: 'internal' },
  { id: 4, ref: 'WH/IN/0003', date: '2025-10-27', contact: 'Gemini Furniture', from: 'Vendor', to: 'WH/Stock', qty: '100 kg', product: 'Steel Rods', status: 'Done', type: 'in' },
  { id: 5, ref: 'WH/OUT/0008', date: '2025-10-28', contact: 'Ready Mat', from: 'WH/Stock', to: 'Customer', qty: '5 Units', product: 'Conference Table', status: 'Draft', type: 'out' },
  { id: 6, ref: 'WH/OUT/0009', date: '2025-10-28', contact: 'Ready Mat', from: 'WH/Stock', to: 'Customer', qty: '12 Units', product: 'Lamp Shade', status: 'Draft', type: 'out' },
];

// --- Components ---

const StatusBadge = ({ status, type }) => {
  // "In event should be green, Out moves should be red"
  let colorClass = "bg-slate-500/10 text-slate-400 border-slate-500/20"; // Default

  if (status === 'Done') {
     if (type === 'in') colorClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
     else if (type === 'out') colorClass = "bg-rose-500/10 text-rose-400 border-rose-500/20";
     else colorClass = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
  } else if (status === 'Ready') {
     colorClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  } else if (status === 'Draft') {
     colorClass = "bg-slate-500/10 text-slate-400 border-slate-500/20 dashed border";
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${colorClass}`}>
      {status}
    </span>
  );
};

const TypeIcon = ({ type }) => {
  if (type === 'in') return <ArrowDownToLine className="w-4 h-4 text-emerald-500" />;
  if (type === 'out') return <ArrowUpFromLine className="w-4 h-4 text-rose-500" />;
  return <ArrowRightLeft className="w-4 h-4 text-indigo-500" />;
};

export default function MoveHistoryPage() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredData = MOVE_DATA.filter(item => 
    item.ref.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Head>
        <title>Move History | StockSwift</title>
      </Head>

      {/* --- Top Navigation (Consistent with Dashboard) --- */}
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
            <Link href="/operations" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Operations</Link>
            <Link href="/products" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Products</Link>
            <button className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Move History</button>
            <Link href="/settings" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Settings</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
           <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Control Bar (Search, View Toggle, New) --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Move History</h1>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)] transition-all">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">NEW</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             {/* Search Box */}
             <div className="relative flex-1 md:w-80 group">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search Reference or Contact..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                />
             </div>

             {/* View Toggle */}
             <div className="flex bg-slate-900 rounded-lg border border-slate-800 p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('kanban')}
                  className={`p-1.5 rounded ${viewMode === 'kanban' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <KanbanSquare className="w-4 h-4" />
                </button>
             </div>
          </div>
        </div>

        {viewMode === 'list' ? (
          /* --- LIST VIEW --- */
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-slate-950 border-b border-slate-800 text-xs uppercase font-semibold text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Reference</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">From <span className="mx-1 text-slate-700">→</span> To</th>
                    <th className="px-6 py-4 text-right">Quantity</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                      
                      {/* Reference Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <TypeIcon type={item.type} />
                          <div>
                            <div className="font-mono text-xs font-bold text-white">{item.ref}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{item.product}</div>
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <Calendar className="w-3.5 h-3.5 text-slate-600" />
                           <span>{item.date}</span>
                         </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <User className="w-3.5 h-3.5 text-slate-600" />
                           <span className="text-slate-300 font-medium">{item.contact}</span>
                        </div>
                      </td>

                      {/* From -> To (Creative Visual) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs">
                          <span className={`px-2 py-1 rounded border ${item.from === 'Vendor' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                            {item.from}
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-600" />
                          <span className={`px-2 py-1 rounded border ${item.to === 'Customer' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
                            {item.to}
                          </span>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-6 py-4 text-right font-mono text-white font-medium">
                        {item.qty}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={item.status} type={item.type} />
                      </td>

                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                        No moves found matching &quot;{searchTerm}&quot;
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/50 flex justify-between items-center text-xs text-slate-500">
               <span>Showing 1-6 of 142 records</span>
               <div className="flex gap-2">
                 <button className="px-3 py-1 rounded border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors">Prev</button>
                 <button className="px-3 py-1 rounded border border-slate-800 hover:bg-slate-800 hover:text-white transition-colors">Next</button>
               </div>
            </div>
          </div>
        ) : (
          /* --- KANBAN VIEW --- */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4">
            
            {/* Column: Draft */}
            <div className="min-w-[300px]">
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider">Draft / Waiting</h3>
                <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded text-xs">3</span>
              </div>
              <div className="space-y-3">
                {filteredData.filter(i => i.status === 'Draft' || i.status === 'Waiting').map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-slate-600 cursor-pointer transition-all group shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                       <div className="font-mono text-xs text-slate-500">{item.ref}</div>
                       <StatusBadge status={item.status} type={item.type} />
                    </div>
                    <div className="text-white font-bold mb-1">{item.product}</div>
                    <div className="text-sm text-slate-400 mb-4">{item.contact}</div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <TypeIcon type={item.type} />
                        {item.qty}
                      </div>
                      <div className="text-xs text-slate-600">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Ready */}
            <div className="min-w-[300px]">
              <div className="flex items-center justify-between mb-4 px-2">
                 <h3 className="font-bold text-amber-500/80 uppercase text-xs tracking-wider">Ready</h3>
                 <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-xs">1</span>
              </div>
              <div className="space-y-3">
                {filteredData.filter(i => i.status === 'Ready').map(item => (
                  <div key={item.id} className="bg-slate-900 border border-amber-500/20 p-4 rounded-xl hover:border-amber-500/50 cursor-pointer transition-all group shadow-sm hover:shadow-md">
                    <div className="flex justify-between items-start mb-3">
                       <div className="font-mono text-xs text-slate-500">{item.ref}</div>
                       <StatusBadge status={item.status} type={item.type} />
                    </div>
                    <div className="text-white font-bold mb-1">{item.product}</div>
                    <div className="text-sm text-slate-400 mb-4">{item.contact}</div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                       <div className="flex items-center gap-2 text-xs text-slate-500">
                        <TypeIcon type={item.type} />
                        {item.qty}
                      </div>
                      <div className="text-xs text-slate-600">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Done */}
            <div className="min-w-[300px]">
              <div className="flex items-center justify-between mb-4 px-2">
                 <h3 className="font-bold text-emerald-500/80 uppercase text-xs tracking-wider">Done</h3>
                 <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-xs">2</span>
              </div>
              <div className="space-y-3">
                {filteredData.filter(i => i.status === 'Done').map(item => (
                  <div key={item.id} className="bg-slate-900 border border-emerald-500/10 p-4 rounded-xl hover:border-emerald-500/40 cursor-pointer transition-all group opacity-80 hover:opacity-100">
                    <div className="flex justify-between items-start mb-3">
                       <div className="font-mono text-xs text-slate-500">{item.ref}</div>
                       <StatusBadge status={item.status} type={item.type} />
                    </div>
                    <div className="text-white font-bold mb-1">{item.product}</div>
                    <div className="text-sm text-slate-400 mb-4">{item.contact}</div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                       <div className="flex items-center gap-2 text-xs text-slate-500">
                        <TypeIcon type={item.type} />
                        {item.qty}
                      </div>
                      <div className="text-xs text-slate-600">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}