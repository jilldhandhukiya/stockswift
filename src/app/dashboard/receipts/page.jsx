"use client"
import React, { useMemo, useState } from "react";
import Navbar from "../../components/navbar";
import { Search, Calendar, MoreHorizontal, Eye, List } from 'lucide-react';
import { useRouter } from 'next/navigation';

const sampleRows = [
  { id: "1", reference: "WH/IN/0001", from: "vendor", to: "WH/Stock1", contact: "Azure Integrations", schedule: "2025-11-22", status: "Ready" },
  { id: "2", reference: "WH/IN/0002", from: "vendor", to: "WH/Stock1", contact: "Clever Aardvark", schedule: "2025-11-25", status: "Pending" },
  { id: "3", reference: "WH/OUT/0003", from: "customer", to: "WH/Stock2", contact: "Productive Bat", schedule: "2025-11-30", status: "Done" },
  { id: "4", reference: "WH/IN/0004", from: "vendor", to: "WH/Main", contact: "Neon Fox", schedule: "2025-12-02", status: "Ready" },
  { id: "5", reference: "WH/IN/0005", from: "partner", to: "WH/Secondary", contact: "Green Finch", schedule: "2025-12-05", status: "Pending" },
  { id: "6", reference: "WH/OUT/0006", from: "customer", to: "WH/Main", contact: "Blue Heron", schedule: "2025-12-10", status: "Done" },
  { id: "7", reference: "WH/IN/0007", from: "vendor", to: "WH/Stock1", contact: "Crimson Orca", schedule: "2025-12-12", status: "Ready" },
  { id: "8", reference: "WH/IN/0008", from: "vendor", to: "WH/Overflow", contact: "Silver Lynx", schedule: "2025-12-18", status: "Pending" },
  { id: "9", reference: "WH/OUT/0009", from: "customer", to: "WH/Dispatch", contact: "Golden Toad", schedule: "2025-12-22", status: "Done" },
  { id: "10", reference: "WH/IN/0010", from: "partner", to: "WH/Stock3", contact: "Velvet Ant", schedule: "2026-01-04", status: "Ready" },
];

function StatusBadge({ status }) {
  const base = "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold";
  if (status === "Ready") return <span className={`${base} bg-emerald-600 text-black`}>{status}</span>;
  if (status === "Done") return <span className={`${base} bg-indigo-500 text-white`}>{status}</span>;
  return <span className={`${base} bg-amber-400 text-black`}>{status}</span>;
}

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-600 to-emerald-500 text-white font-bold text-sm shadow-sm">
      {initials}
    </div>
  );
}

export default function ReceiptsPage() {
  const router = useRouter();
  const [rows, setRows] = useState(sampleRows);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilters, setStatusFilters] = useState({ Ready:true, Pending:true, Done:true });
  const [viewMode, setViewMode] = useState('list');
  const [bulkOpen, setBulkOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(r => {
      if (!statusFilters[r.status]) return false;
      if (!q) return true;
      return (
        r.reference.toLowerCase().includes(q) ||
        r.contact.toLowerCase().includes(q) ||
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q)
      );
    });
  }, [rows, query, statusFilters]);

  function handleExport() {
    const cols = ['Reference','From','To','Contact','Schedule','Status'];
    const csv = [cols.join(',')].concat(filteredRows.map(r => [r.reference,r.from,r.to,`"${r.contact}"`,r.schedule,r.status].join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'receipts.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleDelete(id) {
    setRows(prev => prev.filter(r => r.id !== id));
    setOpenMenu(null);
  }

  function handleNew() {
    router.push('/dashboard/receipts/new');
  }

  function handleViewReceipt(id) {
    router.push(`/dashboard/receipts/${id}`);
  }

  function handleEditOpen(row) {
    setEditData(row);
    setEditModalOpen(true);
    setOpenMenu(null);
  }

  function handleEditSave() {
    if (editData) {
      setRows(prev => prev.map(r => r.id === editData.id ? editData : r));
      setEditModalOpen(false);
      setEditData(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-indigo-500/30">
      <Navbar />

      <main className="relative max-w-7xl mx-auto px-6 py-10">
        {/* Decorative accents */}
        <div className="absolute pointer-events-none -z-10 inset-0">
          <div className="hidden lg:block absolute right-0 top-6 w-48 h-48 rounded-full bg-gradient-to-br from-indigo-800 to-emerald-600 opacity-10 blur-3xl" />
          <div className="hidden lg:block absolute left-0 bottom-12 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-600 to-indigo-800 opacity-6 blur-3xl" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={handleNew} className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold px-3 py-1 rounded-md shadow-[0_12px_40px_-14px_rgba(16,185,129,0.45)]">New Receipt</button>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Receipts</h1>
            <span className="text-slate-500 ml-2">• List view</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg">
              <Search className="w-4 h-4 text-slate-400" />
              <input value={query} onChange={e=>setQuery(e.target.value)} className="w-72 bg-transparent outline-none text-slate-300 text-sm" placeholder="Search reference, contact..." />
            </div>

            <div className="relative">
              <button onClick={()=>setFiltersOpen(v=>!v)} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-md hover:bg-slate-700 transition">Filters</button>
              {filtersOpen && (
                <div className="absolute right-0 mt-2 w-[320px] bg-slate-900 border border-slate-800 rounded-md p-4 shadow-xl z-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-slate-200 font-semibold">Filters</div>
                    <button onClick={()=>{setFiltersOpen(false)}} className="text-xs text-slate-400 hover:text-white">Close</button>
                  </div>

                  <div className="mb-3">
                    <label className="text-xs text-slate-400 block mb-2">Contact</label>
                    <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-2 py-1 rounded-md">
                      <Search className="w-4 h-4 text-slate-400" />
                      <input
                        placeholder="Search contact..."
                        value={''}
                        onChange={()=>{}}
                        className="bg-transparent outline-none text-slate-300 text-sm w-full"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-2">Status</div>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(statusFilters).map(k => {
                        const active = !!statusFilters[k];
                        const base = 'px-3 py-1 rounded-full text-sm font-semibold transition';
                        const cls = active
                          ? (k==='Ready' ? base + ' bg-emerald-600 text-black' : k==='Done' ? base + ' bg-indigo-500 text-white' : base + ' bg-amber-400 text-black')
                          : base + ' bg-slate-800 text-slate-300 border border-slate-700';
                        return (
                          <button
                            key={k}
                            aria-pressed={active}
                            onClick={() => setStatusFilters(s => ({ ...s, [k]: !s[k] }))}
                            className={cls}
                          >
                            {k}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-2">Schedule</div>
                    <div className="flex gap-2">
                      <input type="date" className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-sm text-slate-300" />
                      <input type="date" className="bg-slate-800 border border-slate-700 rounded-md px-2 py-1 text-sm text-slate-300" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setStatusFilters({ Ready:true, Pending:true, Done:true })}
                      className="text-sm px-3 py-1 rounded bg-transparent border border-slate-800 text-slate-400 hover:text-white"
                    >Reset</button>
                    <div className="flex gap-2">
                      <button onClick={()=>setFiltersOpen(false)} className="text-sm px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700">Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 p-1 rounded-md">
              <button onClick={()=>setViewMode('list')} className={`p-2 rounded-md ${viewMode==='list'?'text-white':'text-slate-400 hover:text-white'}`}><List className="w-4 h-4" /></button>
              <button onClick={()=>setViewMode('kanban')} className={`p-2 rounded-md ${viewMode==='kanban'?'text-white':'text-slate-400 hover:text-white'}`}><Eye className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">Receipts list</h2>
              <p className="text-sm text-slate-500">Recent and scheduled receipts — click a row for details</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={handleExport} className="text-sm text-slate-400 hover:text-white px-3 py-1 rounded-md">Export</button>
              <button onClick={()=>setBulkOpen(true)} className="text-sm text-slate-400 hover:text-white px-3 py-1 rounded-md">Bulk actions</button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-fixed">
              <colgroup>
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
                <col className="w-2/6" />
                <col className="w-1/6" />
                <col className="w-1/6" />
              </colgroup>
              <thead>
                <tr className="text-left bg-slate-900/60 backdrop-blur-sm">
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">Reference</th>
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">From</th>
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">To</th>
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">Contact</th>
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">Schedule date</th>
                  <th className="text-slate-400 text-xs font-semibold uppercase tracking-wider px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r, i) => (
                  <tr 
                    key={r.id} 
                    onClick={() => handleViewReceipt(r.id)}
                    className={`transition-all duration-200 ${i % 2 === 0 ? 'bg-slate-900/10' : ''} hover:bg-slate-800/50 cursor-pointer`}
                  >
                    <td className="px-4 py-4 font-semibold text-white whitespace-nowrap">{r.reference}</td>
                    <td className="px-4 py-4 text-slate-300 whitespace-nowrap capitalize">{r.from}</td>
                    <td className="px-4 py-4 text-slate-300 whitespace-nowrap">{r.to}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={r.contact} />
                        <div>
                          <div className="text-sm font-medium text-slate-200">{r.contact}</div>
                          <div className="text-xs text-slate-500">{r.from} • {r.to}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400 whitespace-nowrap">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-slate-200 font-medium">{r.schedule}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-3">
                        <StatusBadge status={r.status} />
                        <div className="relative">
                          <button onClick={()=>setOpenMenu(openMenu===r.id?null:r.id)} className="p-2 text-slate-400 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"><MoreHorizontal className="w-4 h-4" /></button>
                          {openMenu===r.id && (
                            <div className="absolute right-0 mt-2 w-44 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl z-50 flex flex-col py-2">
                              <button onClick={()=>{handleViewReceipt(r.id); setOpenMenu(null);}} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition">View</button>
                              <button onClick={()=>handleEditOpen(r)} className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition">Edit</button>
                              <button onClick={()=>handleDelete(r.id)} className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-slate-800 transition">Delete</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {bulkOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 w-96">
              <h3 className="text-lg font-bold text-white mb-2">Bulk actions</h3>
              <p className="text-sm text-slate-400 mb-4">This is a placeholder for bulk actions (select rows then apply).</p>
              <div className="flex justify-end gap-2">
                <button onClick={()=>setBulkOpen(false)} className="px-3 py-1 rounded bg-slate-800 border border-slate-700">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModalOpen && editData && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-slate-900 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Edit Receipt</h2>
                <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleEditSave(); }} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Reference</label>
                  <input 
                    value={editData.reference}
                    onChange={(e) => setEditData({...editData, reference: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">From</label>
                    <input 
                      value={editData.from}
                      onChange={(e) => setEditData({...editData, from: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">To</label>
                    <input 
                      value={editData.to}
                      onChange={(e) => setEditData({...editData, to: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Contact</label>
                  <input 
                    value={editData.contact}
                    onChange={(e) => setEditData({...editData, contact: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Schedule Date</label>
                    <input 
                      type="date"
                      value={editData.schedule}
                      onChange={(e) => setEditData({...editData, schedule: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Status</label>
                    <select 
                      value={editData.status}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none"
                    >
                      <option>Ready</option>
                      <option>Pending</option>
                      <option>Done</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
