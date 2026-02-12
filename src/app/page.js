"use client";
import React from 'react';
import { 
  LayoutDashboard, 
  Box, 
  ArrowRightLeft, 
  Truck, 
  BarChart3, 
  ShieldCheck, 
  Search,
  AlertCircle,
  CheckCircle2,
  MoreHorizontal,
  Smartphone,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumCard = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/30 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

const PrimaryButton = ({ children }) => (
  <button className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] flex items-center gap-2">
    {children}
  </button>
);

const SecondaryButton = ({ children }) => (
  <button className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-all border border-slate-700">
    {children}
  </button>
);

const Badge = ({ text, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colors[color]}`}>
      {text}
    </span>
  );
};

// --- Main Page ---

export default function StockSwiftLanding() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-400 font-sans selection:bg-indigo-500/30">

      {/* --- Navbar --- */}
      <nav className="fixed w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Box className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-100 tracking-tight">
              StockSwift
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</a>
            <a href="#features" className="hover:text-indigo-400 transition-colors">Modules</a>
            <a href="#mobile" className="hover:text-indigo-400 transition-colors">Mobile</a>
          </div>

          <div className="flex gap-4">
            <button   onClick={() => (window.location.href = "/login")} className="text-sm font-medium hover:text-white transition-colors">Sign In</button>
            <button onClick={() => (window.location.href = "/signup")} className="px-4 py-2 rounded bg-slate-100 text-slate-900 text-sm font-bold hover:bg-white transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-white">
              Precision <span className="text-indigo-500">Inventory</span> <br />
              Without the Chaos.
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Replace manual registers and scattered Excel sheets with a centralized, real-time stock ledger. 
              Designed for Managers and Warehouse Staff.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <PrimaryButton>Access Dashboard <ArrowRightLeft className="w-4 h-4" /></PrimaryButton>
              <SecondaryButton>View Documentation</SecondaryButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 2: The Dashboard (Refined with Dummy Data) --- */}
      <section id="dashboard" className="py-20 bg-[#020617] relative">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Live Operations Snapshot</h2>
            <p className="mt-2 text-slate-400">Real-time KPIs and dynamic filtering by warehouse location.</p>
          </div>

          {/* THE MOCKUP UI */}
          <div className="rounded-xl border border-slate-700 bg-[#0f172a] shadow-2xl overflow-hidden">
            {/* Mockup Header */}
            <div className="h-12 border-b border-slate-700 flex items-center px-4 justify-between bg-slate-900">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
                <div className="h-4 w-[1px] bg-slate-700 mx-2" />
                <div className="text-xs font-mono text-slate-500">stockswift.app/dashboard</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-slate-400">Warehouse: <span className="text-white font-medium">Main Store</span></div>
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs">JM</div>
              </div>
            </div>

            {/* Mockup Body */}
            <div className="flex min-h-[500px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 hidden md:flex flex-col gap-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-2">Menu</div>
                {['Dashboard', 'Products', 'Receipts', 'Deliveries', 'Transfers', 'Adjustments'].map((item, i) => (
                  <div key={item} className={`px-3 py-2 rounded-lg text-sm font-medium cursor-pointer ${i === 0 ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                    {item}
                  </div>
                ))}
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 md:p-8 bg-[#0f172a]">
                
                {/* Search & Filter Bar */}
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-white">Overview</h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                      <input type="text" placeholder="Search SKU..." className="bg-slate-800 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 w-48" />
                    </div>
                  </div>
                </div>

                {/* KPI Cards [cite: 17-21] */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-slate-400 text-xs font-medium">Total Products</div>
                    <div className="text-2xl font-bold text-white mt-1">1,240</div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 relative overflow-hidden">
                    <div className="text-red-400 text-xs font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Low Stock
                    </div>
                    <div className="text-2xl font-bold text-white mt-1">12</div>
                    <div className="absolute right-0 top-0 h-full w-1 bg-red-500" />
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-amber-400 text-xs font-medium">Pending Receipts</div>
                    <div className="text-2xl font-bold text-white mt-1">5</div>
                  </div>
                   <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="text-emerald-400 text-xs font-medium">Ready Deliveries</div>
                    <div className="text-2xl font-bold text-white mt-1">8</div>
                  </div>
                </div>

                {/* Data Table: Recent Operations [cite: 61, 69, 91] */}
                <div className="bg-slate-800/30 rounded-xl border border-slate-700 overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-white">Recent Movements</h4>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
                  </div>
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-xs uppercase font-medium text-slate-500">
                      <tr>
                        <th className="px-6 py-3">Reference</th>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Operation</th>
                        <th className="px-6 py-3">Qty</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">WH/IN/00142</td>
                        <td className="px-6 py-4 text-white">Steel Rods (10mm)</td>
                        <td className="px-6 py-4 text-emerald-400">Vendor Receipt</td>
                        <td className="px-6 py-4 text-white font-medium">+100 kg</td>
                        <td className="px-6 py-4"><Badge text="Done" color="emerald" /></td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">WH/OUT/0089</td>
                        <td className="px-6 py-4 text-white">Office Chairs</td>
                        <td className="px-6 py-4 text-amber-400">Delivery Order</td>
                        <td className="px-6 py-4 text-white font-medium">-20 Units</td>
                        <td className="px-6 py-4"><Badge text="Picking" color="amber" /></td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">WH/INT/0022</td>
                        <td className="px-6 py-4 text-white">Steel Frames</td>
                        <td className="px-6 py-4 text-indigo-400">Transfer (Store -&gt; Floor)</td>
                        <td className="px-6 py-4 text-white font-medium">50 Units</td>
                        <td className="px-6 py-4"><Badge text="Ready" color="indigo" /></td>
                      </tr>
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs">WH/ADJ/0004</td>
                        <td className="px-6 py-4 text-white">Steel Rods (10mm)</td>
                        <td className="px-6 py-4 text-red-400">Damaged / Adjustment</td>
                        <td className="px-6 py-4 text-white font-medium">-3 kg</td>
                        <td className="px-6 py-4"><Badge text="Done" color="emerald" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 3: Modular Features --- */}
      <section id="features" className="py-24 bg-[#020617] border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PremiumCard className="p-8">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400">
                <Truck />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Receipts & Deliveries</h3>
              <p className="text-sm leading-relaxed">
                Validate incoming goods to automatically increase stock, and validate outgoing shipments to decrease it. [cite: 53-67]
              </p>
            </PremiumCard>

            <PremiumCard className="p-8">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 text-emerald-400">
                <ArrowRightLeft />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Internal Transfers</h3>
              <p className="text-sm leading-relaxed">
                Move stock from Main Warehouse to Production Floor. The system logs the location change without affecting total value. [cite: 70-76]
              </p>
            </PremiumCard>

            <PremiumCard className="p-8">
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-6 text-amber-400">
                <BarChart3 />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Stock Adjustments</h3>
              <p className="text-sm leading-relaxed">
                Reconcile physical counts with recorded stock instantly. The ledger updates automatically to reflect reality. [cite: 78-84]
              </p>
            </PremiumCard>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 4: Comparison (Chaos vs Control) --- */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">Why switch from Excel?</h2>
            <p className="mt-4 text-slate-400">The difference between guessing and knowing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* The Old Way */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-900 to-slate-900 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-xl opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <FileSpreadsheet className="text-red-500" />
                  <h3 className="text-xl font-bold text-white">Manual Registers</h3>
                </div>
                <ul className="space-y-4 text-slate-400">
                  <li className="flex gap-3 items-center"><span className="text-red-500">×</span> Decentralized & Scattered data</li>
                  <li className="flex gap-3 items-center"><span className="text-red-500">×</span> Hard to track warehouse racking</li>
                  <li className="flex gap-3 items-center"><span className="text-red-500">×</span> Zero real-time low-stock alerts</li>
                </ul>
              </div>
            </div>

            {/* The StockSwift Way */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-2xl opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-slate-900 border border-indigo-500/30 p-8 rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">StockSwift Digital Ledger</h3>
                </div>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Centralized &quot;Single Source of Truth&quot;</li>
                  <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Granular location tracking (Rack A -&gt; B)</li>
                  <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Automated reordering rules</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION 5: Warehouse Mobility --- */}
      <section id="mobile" className="py-24 bg-[#020617] relative border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
               <Badge text="For Warehouse Staff" color="amber" />
               <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-6">
                 Built for the Floor. <br />
                 <span className="text-indigo-500">Not just the Desk.</span>
               </h2>
               <p className="text-slate-400 leading-relaxed mb-8">
                 Warehouse staff perform transfers, picking, shelving, and counting on their feet. StockSwift is fully responsive for tablets and mobile devices.(Comming Soon: Dedicated Mobile App!)
               </p>
               <div className="grid grid-cols-2 gap-6">
                 <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                   <Smartphone className="w-8 h-8 text-slate-300 mb-3" />
                   <h4 className="font-bold text-white">Mobile Picking</h4>
                   <p className="text-xs text-slate-500 mt-1">Scan items directly at the shelf.</p>
                 </div>
                 <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                   <AlertCircle className="w-8 h-8 text-slate-300 mb-3" />
                   <h4 className="font-bold text-white">Instant Alerts</h4>
                   <p className="text-xs text-slate-500 mt-1">Notify managers of damaged stock immediately.</p>
                 </div>
               </div>
            </div>
            
            {/* Abstract Mobile Visualization */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-64 h-[500px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20" />
                
                {/* Mobile Screen Content */}
                <div className="p-6 pt-12 space-y-4">
                  <div className="h-20 bg-indigo-600 rounded-xl p-4 text-white">
                    <div className="text-xs opacity-70">To Pick</div>
                    <div className="font-bold text-lg">Order #89</div>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-amber-500">
                      <div className="text-xs text-slate-400">Rack A-12</div>
                      <div className="text-sm font-bold text-white">Steel Frames</div>
                    </div>
                    <div className="p-3 bg-slate-800 rounded-lg border-l-4 border-slate-600 opacity-50">
                      <div className="text-xs text-slate-400">Rack B-04</div>
                      <div className="text-sm font-bold text-white">Nuts & Bolts</div>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <button className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold text-sm">Validate Pick</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#020617] border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Box className="w-5 h-5" />
            <span className="font-bold text-slate-300">StockSwift</span>
          </div>
          <div>© 2025 StockSwift. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
