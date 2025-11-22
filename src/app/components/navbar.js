"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  ClipboardList, 
  Bell, 
  Search,
  Settings,
  AlertCircle,
  MoreHorizontal,
  CheckCircle2,
  Truck,
  BarChart3,
  Globe
} from 'lucide-react';
import { useI18n } from '@/app/components/i18n-provider'


const NavItem = ({ label, href = "/", icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${isActive 
          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </Link>
  );
};

// NavGroup - operations with submenus
const NavGroup = ({ label, icon: Icon, href, items = [] }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const opsRef = useRef(null);

  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  useEffect(() => {
    function handleClickOutside(e) {
      if (opsRef.current && !opsRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={opsRef}>
      <button
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${isActive ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}
        `}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
        <MoreHorizontal className="w-4 h-4 ml-1 text-slate-400" />
      </button>

      {open && (
        <div className="absolute mt-2 left-0 w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-lg py-2 z-50">
          {items.map((it) => {
            const itemActive = pathname === it.href || pathname?.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${itemActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'}`}
                onClick={() => setOpen(false)}
              >
                {it.icon && <it.icon className="w-4 h-4" />}
                <span>{it.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const { t, locale, setLocale, locales } = useI18n()
  // Notification dropdown state + refs
  const [open, setOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'info', title: 'New Receipt', desc: 'Steel Rods +100 kg', time: '10m' },
    { id: 2, type: 'warn', title: 'Low Stock', desc: 'Office Chairs below reorder', time: '1h' },
    { id: 3, type: 'alert', title: 'Damage Reported', desc: '3 kg broken steel rods', time: '2h' },
  ]);
  const wrapperRef = useRef(null);

  // Close on outside click & ESC (notification)
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const unreadCount = notifications.length; // static for now

  return (
      <header className="h-16 border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
        
        {/* Left: Logo & Main Nav */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
              <Package className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-slate-100 hidden md:block">StockSwift</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavItem label={t('dashboard')} icon={LayoutDashboard} href="/dashboard" />
            <NavGroup 
              label={t('operations')} 
              icon={ClipboardList} 
              href="/operations" 
              items={[
                { label: t('receipts'), href: '/dashboard/receipts', icon: Package },
                { label: t('delivery'), href: '/dashboard/delivery', icon: Truck },
                { label: t('adjustments'), href: '/dashboard/adjustments', icon: BarChart3 },
              ]}
            />
            <NavItem label={t('stock')} icon={Package} href="/stock" />
            <NavItem label={t('moveHistory')} icon={ArrowRightLeft} href="/dashboard/history" />
            <NavItem label={t('settings')} icon={Settings} href="/settings" />
          </nav>
        </div>

        {/* Right: Search & Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-slate-900 border border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 w-64 transition-colors"
            />
          </div>

          {/* Noti Button + Dropdown */}
          <div className="relative" ref={wrapperRef}>
            <button
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-haspopup="true"
              className="p-2 text-slate-400 hover:text-white relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[14px] h-3 px-[6px] rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-lg shadow-lg z-50 text-sm text-slate-300">
                <div className="p-3 border-b border-slate-800 flex justify-between items-center">
                  <div className="font-semibold text-white">Notifications</div>
                  <button
                    onClick={() => {/* static: no real clear */}}
                    className="text-xs text-slate-400 hover:text-white"
                    aria-label="Clear notifications"
                  >
                    Clear
                  </button>
                </div>

                <div className="max-h-64 overflow-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-3 py-3 hover:bg-slate-800/50 transition-colors border-b border-slate-800 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          {n.type === 'info' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          {n.type === 'warn' && <AlertCircle className="w-4 h-4 text-amber-400" />}
                          {n.type === 'alert' && <AlertCircle className="w-4 h-4 text-rose-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div className="font-medium text-white">{n.title}</div>
                            <div className="text-xs text-slate-500">{n.time}</div>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{n.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <div className="px-3 py-4 text-center text-slate-500">No notifications</div>
                  )}
                </div>

                <div className="p-3 border-t border-slate-800 text-center">
                  <Link href="/notifications" className="text-xs text-indigo-400 hover:text-indigo-300">View all</Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLocale(locale === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                aria-label={t('language')}
              >
                <Globe className="w-4 h-4" /> {locale.toUpperCase()}
              </button>
            </div>
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer">
              JD
            </div>
          </div>
        </div>
      </header>
  );
}
