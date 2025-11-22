"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Package, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  AlertTriangle, 
  CheckCircle2,
  SlidersHorizontal,
  ArrowUpDown,
  Edit3,
  Save,
  X
} from 'lucide-react';

// --- Dummy Data ---
const INVENTORY_DATA = [
  { id: 1, name: 'Office Desk (Standard)', sku: 'FURN-001', category: 'Furniture', cost: 3000, onHand: 50, reserved: 5, reorderPoint: 10, image: '🪑' },
  { id: 2, name: 'Ergo Chair', sku: 'FURN-002', category: 'Furniture', cost: 4500, onHand: 12, reserved: 12, reorderPoint: 15, image: '💺' },
  { id: 3, name: 'Steel Rods (10mm)', sku: 'MAT-004', category: 'Raw Material', cost: 500, onHand: 150, reserved: 0, reorderPoint: 50, image: '🏗️' },
  { id: 4, name: 'Monitor Arm', sku: 'ACC-023', category: 'Accessories', cost: 1200, onHand: 4, reserved: 0, reorderPoint: 5, image: '🖥️' },
  { id: 5, name: 'Conference Table', sku: 'FURN-005', category: 'Furniture', cost: 15000, onHand: 8, reserved: 2, reorderPoint: 2, image: '🤝' },
];

// --- Components ---

const StatBadge = ({ value, label, color }) => (
  <div className={`flex flex-col px-4 py-2 rounded-lg border ${color}`}>
    <span className="text-xs uppercase font-bold opacity-70 mb-1">{label}</span>
    <span className="text-lg font-bold">{value}</span>
  </div>
);

const StockProgressBar = ({ current, max, isLow }) => {
  const percentage = Math.min((current / (max * 2)) * 100, 100); // Visual scale
  return (
    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState(0);

  // Calculate "Free to Use"
  const calculateFree = (item) => item.onHand - item.reserved;

  // Toggle Quick Edit
  const startEdit = (item) => {
    setEditingId(item.id);
    setTempStock(item.onHand);
  };

  const saveEdit = () => {
    // Here you would make an API call to update stock
    // Logic: Create an Inventory Adjustment [cite: 77-84]
    setEditingId(null);
    alert(`Stock Updated! New On Hand: ${tempStock}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Head>
        <title>Stock Inventory | StockSwift</title>
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
            <Link href="/operations" className="px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">Operations</Link>
            <button className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Products / Stock</button>
          </nav>
        </div>
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Page Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Current Stock</h1>
            <p className="text-slate-500 text-sm">Manage inventory levels, unit costs, and availability across warehouses.</p>
          </div>
          
          {/* Quick Stats Summary */}
          <div className="flex gap-3">
            <StatBadge value="₹ 2.4M" label="Total Value" color="bg-emerald-900/20 border-emerald-800 text-emerald-400" />
            <StatBadge value="2 Items" label="Low Stock" color="bg-rose-900/20 border-rose-800 text-rose-400" />
          </div>
        </div>

        {/* --- Control Bar --- */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-t-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-96 group">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search Product Name or SKU..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-all">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)] transition-all">
              <Plus className="w-4 h-4" /> New Product
            </button>
          </div>
        </div>

        {/* --- Stock Table --- */}
        <div className="bg-slate-900 border border-slate-800 border-t-0 rounded-b-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
              <thead className="bg-slate-950 text-xs uppercase font-semibold text-slate-500 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4 text-right">Per Unit Cost</th>
                  <th className="px-6 py-4 text-center">On Hand</th>
                  <th className="px-6 py-4 text-center">Reserved</th>
                  <th className="px-6 py-4 text-center text-emerald-400">Free to Use</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {INVENTORY_DATA.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
                  const isLowStock = item.onHand <= item.reorderPoint;
                  const isEditing = editingId === item.id;

                  return (
                    <tr key={item.id} className={`group transition-colors ${isEditing ? 'bg-indigo-900/10' : 'hover:bg-slate-800/30'}`}>
                      
                      {/* Product Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-xl border border-slate-700">
                            {item.image}
                          </div>
                          <div>
                            <div className="font-bold text-slate-200">{item.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-mono text-slate-500 bg-slate-950 px-1.5 rounded border border-slate-800">{item.sku}</span>
                              <span className="text-[10px] text-slate-500 uppercase border border-slate-700 px-1.5 rounded-full">{item.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Cost Column */}
                      <td className="px-6 py-4 text-right font-mono text-slate-300">
                        ₹ {item.cost.toLocaleString()}
                      </td>

                      {/* On Hand Column (With Update Logic) */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col items-center justify-center gap-1">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => setTempStock(s => Math.max(0, s - 1))} className="w-6 h-6 bg-slate-800 rounded hover:bg-rose-500 hover:text-white">-</button>
                              <span className="font-bold text-white w-8 text-center">{tempStock}</span>
                              <button onClick={() => setTempStock(s => s + 1)} className="w-6 h-6 bg-slate-800 rounded hover:bg-emerald-500 hover:text-white">+</button>
                            </div>
                          ) : (
                            <>
                              <span className={`text-base font-bold ${isLowStock ? 'text-rose-400' : 'text-white'}`}>
                                {item.onHand}
                              </span>
                              <StockProgressBar current={item.onHand} max={item.reorderPoint * 3} isLow={isLowStock} />
                            </>
                          )}
                        </div>
                      </td>

                      {/* Reserved Column */}
                      <td className="px-6 py-4 text-center">
                        <span className="text-slate-500 font-mono">{item.reserved}</span>
                      </td>

                      {/* Free to Use Column (Calculated) */}
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-lg font-bold text-emerald-400">
                            {calculateFree(item)}
                          </span>
                          {calculateFree(item) === 0 && (
                            <span className="text-[10px] text-rose-500 font-bold uppercase">Stockout</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setEditingId(null)} className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700">
                              <X className="w-4 h-4" />
                            </button>
                            <button onClick={saveEdit} className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-500/20">
                              <Save className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => startEdit(item)}
                            className="text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/10 px-3 py-1.5 rounded-md transition-all"
                          >
                            Update
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* Empty State */}
            {INVENTORY_DATA.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
              <div className="py-12 flex flex-col items-center text-slate-500">
                <Package className="w-12 h-12 mb-4 opacity-20" />
                <p>No products found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}