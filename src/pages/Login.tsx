import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button, Input } from '../components/common';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading, setError, loading, error } = useAuthStore();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      // Navigation is handled automatically by onAuthStateChanged in App.tsx
      navigate('/');
    } catch (err: any) {
      console.error('Login failed:', err);
      let message = 'Failed to log in. Please check your credentials.';
      
      // Detailed error handling for production
      switch (err.code) {
        case 'auth/user-not-found':
          message = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          message = 'The email address is invalid.';
          break;
        case 'auth/too-many-requests':
          message = 'Too many failed attempts. Try again later.';
          break;
      }
      
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="flex w-full max-w-[1200px] mx-auto items-center justify-center p-6 lg:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid w-full gap-8 bg-white shadow-2xl rounded-[40px] overflow-hidden lg:grid-cols-2 lg:min-h-[700px]"
        >
          {/* Left Side: Branding/Visual */}
          <div className="relative hidden bg-slate-900 p-12 lg:flex lg:flex-col lg:justify-between text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full -ml-32 -mb-32" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-10">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-lg shadow-blue-500/30 text-2xl">
                  H
                </div>
                <span className="text-2xl font-bold tracking-tight">Healios <span className="text-blue-500">SaaS</span></span>
              </div>
              <h1 className="text-4xl font-bold leading-tight mb-6">Built for Modern <br/><span className="text-blue-400 font-serif italic">Healthcare Excellence</span></h1>
              <p className="text-white/60 text-lg max-w-sm">Manage patients, departments, and analytics with precision and security.</p>
            </div>

            <div className="relative z-10 space-y-6">
              {[
                "Unified Patient Records Management",
                "Advanced Clinical Analytics Dashboard",
                "HIPAA Compliant Data Handling",
                "Real-time Collaboration Platform"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group transition-transform hover:translate-x-2">
                  <div className="bg-blue-600/20 p-1 rounded-full text-blue-400 group-hover:bg-blue-600 group-hover:text-white">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10 pt-10 border-t border-white/10 text-xs text-white/40 flex justify-between uppercase tracking-widest font-semibold">
              <span>© 2024 Healios Technologies Corp.</span>
              <span>v1.2.0</span>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="flex flex-col items-center justify-center p-8 lg:p-16">
            <div className="w-full max-w-[400px] space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                <p className="text-slate-500 mt-2">Log in to your healthcare portal access.</p>
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    label="Email Address"
                    placeholder="name@hospital.com"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    className="h-12 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide">Forgot password?</a>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                    error={errors.password?.message}
                    className="h-12 border-slate-200 focus:border-blue-500 rounded-xl"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700" 
                  isLoading={loading}
                >
                  Confirm and Log In
                </Button>
              </form>

              <div className="text-center text-sm text-slate-500">
                Don't have an account? <a href="#" className="font-bold text-blue-600 hover:underline">Contact your IT admin</a>
              </div>

              {/* Demo Credentials */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
                  Quick Access Demo
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setValue('email', 'test@gmail.com');
                    setValue('password', '123456');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all text-left group"
                >
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Test Account</p>
                    <p className="text-[11px] text-slate-500">test@gmail.com / 123456</p>
                  </div>
                  <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    AUTOFILL
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
