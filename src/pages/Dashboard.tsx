import React from 'react';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  TrendingDown,
  Calendar
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { usePatientStore } from '../store/patientStore';
import { cn } from '../components/common';

const analyticsData = [
  { name: 'Jan', value: 400, admissions: 240 },
  { name: 'Feb', value: 300, admissions: 139 },
  { name: 'Mar', value: 200, admissions: 980 },
  { name: 'Apr', value: 278, admissions: 390 },
  { name: 'May', value: 189, admissions: 480 },
  { name: 'Jun', value: 239, admissions: 380 },
  { name: 'Jul', value: 349, admissions: 430 },
];

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-md">
    <div className="flex items-center justify-between pb-2">
      <span className="text-sm font-medium text-slate-500">{title}</span>
      <div className={cn("rounded-lg p-2 text-white", color)}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className={cn(
        "flex items-center text-xs font-semibold",
        change > 0 ? "text-emerald-600" : "text-rose-600"
      )}>
        {change > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
        {Math.abs(change)}%
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { patients } = usePatientStore();
  const criticalPatients = patients.filter(p => p.status === 'Critical').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hospital Overview</h1>
        <p className="text-slate-500">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Patients" 
          value="1,284" 
          change={12} 
          icon={Users} 
          color="bg-blue-600 shadow-blue-200 shadow-lg" 
        />
        <StatCard 
          title="Critical Status" 
          value={criticalPatients} 
          change={-5} 
          icon={Activity} 
          color="bg-rose-500 shadow-rose-200 shadow-lg" 
        />
        <StatCard 
          title="Avg. Waiting Time" 
          value="18m" 
          change={8} 
          icon={Clock} 
          color="bg-amber-500 shadow-amber-200 shadow-lg" 
        />
        <StatCard 
          title="Active Doctors" 
          value="48" 
          change={2} 
          icon={Users} 
          color="bg-emerald-500 shadow-emerald-200 shadow-lg" 
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <div className="col-span-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Patient Admissions Over Time</h2>
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
              <button className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">Weekly</button>
              <button className="px-3 py-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">Monthly</button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-6 text-lg font-bold text-slate-900">Recent Appointments</h2>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-10 flex-shrink-0 rounded-full bg-slate-100 p-2 text-slate-500">
                  <Calendar className="w-full h-full" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-semibold text-slate-900">Johnathan Doe</p>
                  <p className="truncate text-xs text-slate-500">Cardiac Monitoring - 10:30 AM</p>
                </div>
                <button className="text-slate-400 hover:text-slate-900">
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full rounded-xl border-t border-slate-100 pt-4 text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
            View all appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
