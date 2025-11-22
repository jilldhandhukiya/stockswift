import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  ArrowRightLeft, 
  ClipboardList, 
  Bell, 
  Search,
  Settings,
} from 'lucide-react';


const NavItem = ({ label, active = false, icon: Icon }) => (
  <button className={`
    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
    ${active 
      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
    }
  `}>
    {Icon && <Icon className="w-4 h-4" />}
    {label}
  </button>
);

export default function Navbar() {
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
            <NavItem label="Dashboard" icon={LayoutDashboard} active />
            <NavItem label="Operations" icon={ClipboardList} />
            <NavItem label="Stock" icon={Package} />
            <NavItem label="Move History" icon={ArrowRightLeft} />
            <NavItem label="Settings" icon={Settings} />
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
          <button className="p-2 text-slate-400 hover:text-white relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900"></span>
          </button>
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer">
            JD
          </div>
        </div>
      </header>
  );
}
