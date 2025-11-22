"use client";

import React, { useState, useEffect } from 'react';
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

// Runtime inventory data fetched from API


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
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState(0);
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name:'', sku:'', category:'', cost:'', onHand:'', reorderPoint:'', image:'' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (categoryFilter) params.set('category', categoryFilter)
      const res = await fetch('/api/items?' + params.toString())
      const data = await res.json()
      if (res.ok) {
        setItems(data.items)
        setCategories(data.categories)
      } else {
        setError(data.message || 'Failed to load items')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, categoryFilter])

  const handleCreateChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const submitCreate = async (e) => {
    e.preventDefault()
    setError(''); setSuccess(''); setCreating(true)
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          sku: form.sku,
          category: form.category,
          cost: Number(form.cost),
          onHand: Number(form.onHand || 0),
          reorderPoint: Number(form.reorderPoint || 0),
          image: form.image
        })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess('Product created')
        setCreateOpen(false)
        setForm({ name:'', sku:'', category:'', cost:'', onHand:'', reorderPoint:'', image:'' })
        fetchItems()
      } else {
        setError(data.message || 'Create failed')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setCreating(false)
    }
  }

  // Calculate "Free to Use"
  const calculateFree = (item) => item.onHand - item.reserved;

  // Toggle Quick Edit
  const startEdit = (item) => {
    setEditingId(item.id);
    setTempStock(item.onHand);
  };

  const saveEdit = async () => {
    const id = editingId
    try {
      const res = await fetch('/api/items/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onHand: Number(tempStock) })
      })
      const data = await res.json()
      if (res.ok) {
        setSuccess('Stock updated')
        setItems(items.map(it => it.id === id ? data.item : it))
      } else {
        setError(data.message || 'Update failed')
      }
    } catch (e) {
      setError('Network error')
    } finally {
      setEditingId(null)
    }
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
            <div className="flex items-center gap-2">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-300">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c.name} value={c.name}>{c.name} ({c.count})</option>)}
              </select>
              <button onClick={() => { setCategoryFilter(''); setSearchTerm(''); }} className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs rounded-lg">Reset</button>
            </div>
            <button onClick={() => setCreateOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_-3px_rgba(79,70,229,0.4)] transition-all">
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
                {items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => {
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
                {items.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && !loading && (
              <div className="py-12 flex flex-col items-center text-slate-500">
                <Package className="w-12 h-12 mb-4 opacity-20" />
                <p>No products found matching &quot;{searchTerm}&quot;</p>
              </div>
            )}
                {loading && (
                  <div className="py-12 text-center text-slate-500">Loading...</div>
                )}
          </div>
        </div>

        {/* Create Product Modal */}
        {createOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl p-6 relative">
              <button onClick={() => setCreateOpen(false)} className="absolute top-3 right-3 text-slate-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-bold text-white mb-4">New Product</h2>
              {error && <div className="mb-3 text-sm text-rose-400">{error}</div>}
              {success && <div className="mb-3 text-sm text-emerald-400">{success}</div>}
              <form onSubmit={submitCreate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400">Name</label>
                    <input name="name" value={form.name} onChange={handleCreateChange} required className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">SKU</label>
                    <input name="sku" value={form.sku} onChange={handleCreateChange} required className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm uppercase" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Category</label>
                    <input name="category" value={form.category} onChange={handleCreateChange} required className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Cost</label>
                    <input name="cost" type="number" min="0" value={form.cost} onChange={handleCreateChange} required className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">On Hand</label>
                    <input name="onHand" type="number" min="0" value={form.onHand} onChange={handleCreateChange} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Reorder Point</label>
                    <input name="reorderPoint" type="number" min="0" value={form.reorderPoint} onChange={handleCreateChange} className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-slate-400">Emoji / Image</label>
                    <input name="image" value={form.image} onChange={handleCreateChange} placeholder="🪑" className="mt-1 w-full bg-slate-800 border border-slate-700 rounded px-2 py-2 text-sm" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setCreateOpen(false)} className="px-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded hover:bg-slate-700">Cancel</button>
                  <button disabled={creating} className="px-4 py-2 text-sm bg-indigo-600 rounded text-white font-semibold disabled:opacity-50">
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Toast Messages */}
        {(error || success) && (
          <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {error && <div className="px-4 py-2 bg-rose-600/20 border border-rose-600/40 text-rose-300 text-sm rounded">{error}</div>}
            {success && <div className="px-4 py-2 bg-emerald-600/20 border border-emerald-600/40 text-emerald-300 text-sm rounded">{success}</div>}
          </div>
        )}

      </main>
    </div>
  );
}