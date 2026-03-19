import { create } from 'zustand';
import type { Patient } from '../types';

interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
  searchTerm: string;
  setPatients: (patients: Patient[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleViewMode: () => void;
  updateSearchTerm: (term: string) => void;
  getFilteredPatients: () => Patient[];
}

// Mock Patient Data
const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234-567-8901',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    status: 'Stable',
    lastVisit: '2024-11-12',
    diagnosis: 'General Health Checkup',
    assignedDoctor: 'Dr. Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: '2',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    phone: '+1 345-678-9012',
    dateOfBirth: '1992-08-22',
    gender: 'Female',
    status: 'Critical',
    lastVisit: '2024-11-15',
    diagnosis: 'Pneumonia',
    assignedDoctor: 'Dr. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.b@example.com',
    phone: '+1 456-789-0123',
    dateOfBirth: '1970-02-10',
    gender: 'Male',
    status: 'Recovering',
    lastVisit: '2024-11-10',
    diagnosis: 'Hip Replacement Surgery',
    assignedDoctor: 'Dr. Emily Brooks',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Jones',
    email: 'emily.j@example.com',
    phone: '+1 567-890-1234',
    dateOfBirth: '1988-12-05',
    gender: 'Female',
    status: 'Stable',
    lastVisit: '2024-11-14',
    diagnosis: 'Hypertension Management',
    assignedDoctor: 'Dr. Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: '5',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.m@example.com',
    phone: '+1 678-901-2345',
    dateOfBirth: '1965-03-25',
    gender: 'Male',
    status: 'Critical',
    lastVisit: '2024-11-15',
    diagnosis: 'Myocardial Infarction',
    assignedDoctor: 'Dr. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
  }
];

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: MOCK_PATIENTS,
  loading: false,
  error: null,
  viewMode: 'grid',
  searchTerm: '',
  setPatients: (patients) => set({ patients }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),
  updateSearchTerm: (term) => set({ searchTerm: term }),
  getFilteredPatients: () => {
    const { patients, searchTerm } = get();
    if (!searchTerm) return patients;
    const lowerTerm = searchTerm.toLowerCase();
    return patients.filter((p) => 
      p.firstName.toLowerCase().includes(lowerTerm) || 
      p.lastName.toLowerCase().includes(lowerTerm) || 
      p.email.toLowerCase().includes(lowerTerm) ||
      p.diagnosis.toLowerCase().includes(lowerTerm)
    );
  }
}));
