import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { cn } from '../components/common';
import { motion, AnimatePresence } from 'framer-motion';

const SidebarLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-lg hover:bg-white/10",
        isActive ? "bg-white/20 text-white shadow-lg" : "text-white/70 hover:text-white"
      )
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
    { to: '/patients', icon: <Users className="w-5 h-5" />, label: 'Patients' },
    { to: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transition-transform duration-300 lg:static lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col p-4">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30">
              H
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Healios <span className="text-blue-500">SaaS</span></span>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <SidebarLink key={item.to} {...item} />
            ))}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-100 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
            <div className="mt-4 flex items-center gap-3 px-4">
              <div className="size-10 rounded-full bg-slate-700 ring-2 ring-blue-500/20" />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-white">{user?.displayName || 'Dr. Pushpender'}</span>
                <span className="truncate text-[10px] text-white/50">{user?.email || 'admin@healios.com'}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-72 transition-all focus-within:ring-2 focus-within:ring-blue-500/30">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2 text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 transition-colors group">
              <Bell className="w-5 h-5 group-hover:text-blue-600" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="size-px h-6 bg-slate-200" />
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-slate-700 md:block">Pushpender Kumar</span>
              <div className="size-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                PK
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
