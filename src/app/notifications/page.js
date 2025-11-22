"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Search,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

/**
 * Notification Page — simple, static UI with basic interactions:
 * - Filter (All, Unread, Alerts)
 * - Search
 * - Mark read / remove individual notification
 * - Clear All
 *
 * Theme and styling align with components from dashboard page.
 */

const IconForType = ({ type }) => {
  if (type === "info") return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (type === "warn") return <AlertCircle className="w-4 h-4 text-amber-400" />;
  if (type === "alert") return <AlertCircle className="w-4 h-4 text-rose-400" />;
  return <Bell className="w-4 h-4 text-slate-400" />;
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState("all"); // all | unread | alert
  const [query, setQuery] = useState("");

  const [items, setItems] = useState([
    { id: 1, type: "info", title: "New Receipt", desc: "Steel Rods +100 kg", time: "10m", read: false },
    { id: 2, type: "warn", title: "Low Stock", desc: "Office Chairs below reorder", time: "1h", read: false },
    { id: 3, type: "alert", title: "Damage Reported", desc: "3 kg broken steel rods", time: "2h", read: true },
    { id: 4, type: "info", title: "Stock Adjusted", desc: "Validated: Steel Frames +20", time: "6h", read: true },
  ]);

  const unreadCount = items.filter((i) => !i.read).length;

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (filter === "unread" && i.read) return false;
      if (filter === "alert" && i.type !== "alert") return false;
      if (query.trim().length > 0) {
        const q = query.toLowerCase();
        return i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q);
      }
      return true;
    });
  }, [items, filter, query]);

  function toggleRead(id) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, read: !i.read } : i)));
  }

  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearAll() {
    setItems([]);
  }

  function markAllRead() {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Bell className="w-6 h-6 text-indigo-400" />
              Notifications
              <span className="ml-2 text-sm px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{unreadCount} unread</span>
            </h1>
            <p className="text-sm text-slate-400 mt-1">Recent system messages and alerts.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notifications..."
                className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 w-64"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium"
              >
                Mark All Read
              </button>

              <button
                onClick={clearAll}
                className="px-3 py-2 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium"
                title="Clear all notifications"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          {/* Filters */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "all" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "unread" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter("alert")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === "alert" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                Alerts
              </button>
            </div>

            <div className="text-xs text-slate-400">Showing {filtered.length} items</div>
          </div>

          {/* List */}
          <div className="divide-y divide-slate-800/50">
            {filtered.length === 0 && (
              <div className="py-10 text-center text-slate-500">No notifications</div>
            )}

            {filtered.map((n) => (
              <div key={n.id} className={`flex items-start gap-4 p-3 hover:bg-slate-800/30 transition-colors ${!n.read ? "bg-slate-900/30" : ""}`}>
                <div className="mt-1">
                  <IconForType type={n.type} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-semibold text-white">{n.title}</div>
                        {!n.read && <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">New</span>}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{n.desc}</div>
                    </div>

                    <div className="text-xs text-slate-500 whitespace-nowrap">{n.time}</div>
                  </div>

                  <div className="flex items-center gap-3 mt-3 text-xs">
                    <button
                      onClick={() => toggleRead(n.id)}
                      className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                    >
                      {n.read ? "Mark Unread" : "Mark Read"}
                    </button>
                    <button
                      onClick={() => remove(n.id)}
                      className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-rose-400 hover:bg-slate-700 flex items-center gap-2"
                    >
                      <Trash2 className="w-3 h-3" /> Dismiss
                    </button>
                    <button className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 flex items-center gap-2">
                      <MoreHorizontal className="w-3 h-3" /> Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer: quick actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-slate-500">Actions</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFilter("all")} className="text-xs text-slate-400 hover:text-white">Reset Filter</button>
              <Link href="/dashboard" className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs">Return to Dashboard</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}