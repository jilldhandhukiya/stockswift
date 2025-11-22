"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Package, 
  User, 
  Bell, 
  Lock, 
  Building2, 
  Globe, 
  Save,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
  MapPin
} from 'lucide-react';

// --- UI Components ---

const SectionHeader = ({ title, description }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-white">{title}</h2>
    <p className="text-sm text-slate-500">{description}</p>
  </div>
);

const InputField = ({ label, type = "text", defaultValue, placeholder }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">{label}</label>
    <input 
      type={type} 
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
    />
  </div>
);

const ToggleSwitch = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-800/50 last:border-0">
    <span className="text-sm text-slate-300 font-medium">{label}</span>
    <button 
      onClick={onChange}
      className={`transition-colors duration-200 ${enabled ? 'text-indigo-500' : 'text-slate-600 hover:text-slate-500'}`}
    >
      {enabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
    </button>
  </div>
);

const NavTab = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all mb-1 ${
      active 
        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({ email: true, push: false, lowStock: true });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Head>
        <title>Settings | StockSwift</title>
      </Head>

      {/* --- Header --- */}
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
            <Link href="/settings" className="px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Settings</Link>
          </nav>
        </div>
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">JD</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* --- Sidebar Navigation --- */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">General</div>
                <NavTab icon={User} label="Account Profile" active={activeTab === 'account'} onClick={() => setActiveTab('account')} />
                <NavTab icon={Building2} label="Organization" active={activeTab === 'org'} onClick={() => setActiveTab('org')} />
              </div>
              
              <div>
                <div className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">System</div>
                <NavTab icon={MapPin} label="Warehouses" active={activeTab === 'warehouse'} onClick={() => setActiveTab('warehouse')} />
                <NavTab icon={Bell} label="Notifications" active={activeTab === 'notify'} onClick={() => setActiveTab('notify')} />
                <NavTab icon={Lock} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
              </div>
            </div>
          </aside>

          {/* --- Main Content Area --- */}
          <div className="flex-1 min-h-[600px]">
            
            {/* Tab: Account Profile */}
            {activeTab === 'account' && (
              <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader title="Profile Settings" description="Manage your personal information and role." />
                
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20">
                      JD
                    </div>
                    <div>
                      <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-4 rounded border border-slate-700 transition-colors">
                        Change Avatar
                      </button>
                      <div className="text-xs text-slate-500 mt-2">Recommended: 400x400px</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First Name" defaultValue="John" />
                    <InputField label="Last Name" defaultValue="Doe" />
                  </div>
                  <InputField label="Email Address" type="email" defaultValue="john.doe@stockswift.app" />
                  <InputField label="Role" defaultValue="Inventory Manager" />
                </div>
                
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-6 rounded-lg transition-all shadow-[0_0_15px_-5px_rgba(99,102,241,0.5)]">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Warehouses (Multi-warehouse Support) */}
            {activeTab === 'warehouse' && (
              <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-start mb-6">
                   <SectionHeader title="Warehouse Configuration" description="Manage physical locations and racking." />
                   <button className="flex items-center gap-2 text-xs bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 px-3 py-2 rounded-lg transition-colors">
                      <Plus className="w-3 h-3" /> Add Location
                   </button>
                </div>

                <div className="space-y-4">
                  {/* Warehouse Card 1 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center group hover:border-indigo-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-800 rounded-lg text-indigo-400">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Main Warehouse (HQ)</h3>
                        <p className="text-sm text-slate-500">San Francisco, CA • Primary Stock</p>
                        <div className="flex gap-2 mt-2">
                           <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                           <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">12 Racks</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Warehouse Card 2 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center group hover:border-indigo-500/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-slate-800 rounded-lg text-slate-400">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Production Floor</h3>
                        <p className="text-sm text-slate-500">Building B • WIP Storage</p>
                        <div className="flex gap-2 mt-2">
                           <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                           <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">4 Zones</span>
                        </div>
                      </div>
                    </div>
                     <button className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Notifications */}
            {activeTab === 'notify' && (
              <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SectionHeader title="Notifications" description="Control how you receive alerts." />
                
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                  <ToggleSwitch 
                    label="Email Alerts for Low Stock" 
                    enabled={notifications.lowStock} 
                    onChange={() => setNotifications({...notifications, lowStock: !notifications.lowStock})} 
                  />
                  <ToggleSwitch 
                    label="Daily Digest Report" 
                    enabled={notifications.email} 
                    onChange={() => setNotifications({...notifications, email: !notifications.email})} 
                  />
                  <ToggleSwitch 
                    label="Push Notifications (Mobile)" 
                    enabled={notifications.push} 
                    onChange={() => setNotifications({...notifications, push: !notifications.push})} 
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}