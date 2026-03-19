export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  status: 'Critical' | 'Stable' | 'Recovering';
  lastVisit: string;
  diagnosis: string;
  assignedDoctor: string;
  avatar?: string;
}

export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  role: 'doctor' | 'admin' | 'staff';
}

export interface AnalyticsData {
  name: string;
  patients: number;
  admissions: number;
}
