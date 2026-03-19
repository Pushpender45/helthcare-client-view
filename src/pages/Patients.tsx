import React from 'react';
import { 
  Users, 
  Search, 
  LayoutGrid, 
  List, 
  UserPlus, 
  Filter,
  MoreVertical,
  ArrowRight
} from 'lucide-react';
import { usePatientStore } from '../store/patientStore';
import { cn, Button } from '../components/common';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }: { status: 'Critical' | 'Stable' | 'Recovering' | string }) => {
  const styles: Record<string, string> = {
    Critical: "bg-red-50 text-red-600 border-red-100",
    Stable: "bg-emerald-50 text-emerald-600 border-emerald-100",
    Recovering: "bg-blue-50 text-blue-600 border-blue-100",
  };
  
  const currentStyle = styles[status] || "bg-slate-50 text-slate-600 border-slate-100";

  return (
    <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", currentStyle)}>
      {status}
    </span>
  );
};

const PatientGrid = ({ patients }: { patients: any[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {patients.map((patient) => (
      <motion.div 
        layout
        key={patient.id}
        className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all hover:shadow-xl hover:ring-blue-500/20"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-12 overflow-hidden rounded-xl">
              <img src={patient.avatar} alt={patient.firstName} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{patient.firstName} {patient.lastName}</h3>
              <p className="text-xs text-slate-500">ID: PAT-{patient.id.padStart(4, '0')}</p>
            </div>
          </div>
          <button className="rounded-full p-1 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-100">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Status</span>
            <StatusBadge status={patient.status} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Diagnosis</span>
            <span className="text-slate-900 font-semibold truncate max-w-[150px]">{patient.diagnosis}</span>
          </div>
          <div className="flex items-center justify-between text-sm border-t border-slate-50 pt-4">
            <span className="text-slate-500 text-xs font-medium">Assigned to: <span className="text-slate-900">{patient.assignedDoctor}</span></span>
            <button className="flex items-center gap-1 text-blue-600 text-xs font-bold hover:underline">
              Details <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const PatientList = ({ patients }: { patients: any[] }) => (
  <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
    <table className="min-w-full divide-y divide-slate-100">
      <thead className="bg-slate-50/50">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Patient</th>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Diagnosis</th>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Doctor</th>
          <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 bg-white">
        {patients.map((patient) => (
          <tr key={patient.id} className="group hover:bg-slate-50 transition-colors">
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="size-8 overflow-hidden rounded-full ring-2 ring-slate-100">
                  <img src={patient.avatar} alt={patient.firstName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{patient.firstName} {patient.lastName}</div>
                  <div className="text-xs text-slate-500">{patient.email}</div>
                </div>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <StatusBadge status={patient.status} />
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm text-slate-900 font-medium">{patient.diagnosis}</div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
              <div className="text-sm text-slate-700">{patient.assignedDoctor}</div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-right">
              <button className="text-blue-600 hover:text-blue-900 font-bold text-xs uppercase transition-colors">
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Patients: React.FC = () => {
  const { viewMode, toggleViewMode, updateSearchTerm, getFilteredPatients } = usePatientStore();
  const patients = getFilteredPatients();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Patients</h1>
          <p className="text-slate-500 mt-1">Manage all patient records and medical histories in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="font-bold">
            <UserPlus className="w-4 h-4 mr-2" /> Add Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search patients by name, email or diagnosis..." 
            onChange={(e) => updateSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        
        <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
          <button 
            onClick={() => viewMode === 'list' && toggleViewMode()}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'grid' ? "bg-slate-100 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => viewMode === 'grid' && toggleViewMode()}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === 'list' ? "bg-slate-100 text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {patients.length > 0 ? (
        viewMode === 'grid' ? <PatientGrid patients={patients} /> : <PatientList patients={patients} />
      ) : (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <Users className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No patients found</h3>
          <p className="text-slate-500">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default Patients;
