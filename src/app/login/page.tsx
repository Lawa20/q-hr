'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Logo from '@/assets/logo/Logo';

export default function LoginPage() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');
 
 const { login, user } = useAuth();
 const router = useRouter();

 useEffect(() => {
 if (user) {
 router.push('/');
 }
 }, [user, router]);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsLoading(true);
 setError('');

 const success = await login(email, password);
 
 if (success) {
 router.push('/');
 } else {
 setError('Invalid email or password');
 }
 
 setIsLoading(false);
 };

 const demoCredentials = [
 { role: 'Admin', email: 'admin@qhr.com', password: 'admin123' },
 { role: 'HR Manager', email: 'hr@qhr.com', password: 'hr123' },
 { role: 'Manager', email: 'manager@qhr.com', password: 'manager123' },
 { role: 'Supervisor', email: 'supervisor@qhr.com', password: 'supervisor123' },
 { role: 'Finance', email: 'finance@qhr.com', password: 'finance123' },
 { role: 'Employee', email: 'employee@qhr.com', password: 'employee123' },
 ];

 return (
 <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 className="max-w-md w-full space-y-8"
 >
 <div className="text-center">
 <motion.div
 initial={{ scale: 0.8 }}
 animate={{ scale: 1 }}
 transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
 className="flex justify-center mb-6"
 >
 <Logo size="lg" showText={true} />
 </motion.div>
 <h2 className="text-3xl font-extrabold text-gray-900">
 Welcome to Q HR
 </h2>
 <p className="text-gray-600 mt-2">
 Sign in to your account to continue
 </p>
 </div>

 <motion.form
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.3 }}
 className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-xl"
 onSubmit={handleSubmit}
 >
 {error && (
 <motion.div
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md"
 >
 {error}
 </motion.div>
 )}

 <div className="space-y-4">
 <div>
 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
 Email address
 </label>
 <input
 id="email"
 name="email"
 type="email"
 autoComplete="email"
 required
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
 placeholder="Enter your email"
 />
 </div>

 <div>
 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
 Password
 </label>
 <div className="mt-1 relative">
 <input
 id="password"
 name="password"
 type={showPassword ? 'text' : 'password'}
 autoComplete="current-password"
 required
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
 placeholder="Enter your password"
 />
 <button
 type="button"
 onClick={() => setShowPassword(!showPassword)}
 className="absolute inset-y-0 right-0 pr-3 flex items-center"
 >
 {showPassword ? (
 <EyeSlashIcon className="h-5 w-5 text-gray-400" />
 ) : (
 <EyeIcon className="h-5 w-5 text-gray-400" />
 )}
 </button>
 </div>
 </div>
 </div>

 <motion.button type="submit"
 disabled={isLoading}
 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isLoading ? 'Signing in...' : 'Sign in'}
 </motion.button>
 </motion.form>

 {/* Demo Credentials */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.5 }}
 className="bg-white p-6 rounded-xl shadow-lg"
 >
 <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Credentials</h3>
 <div className="space-y-2">
 {demoCredentials.map((cred, index) => (
 <motion.div
 key={cred.role}
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.6 + index * 0.1 }}
 className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
 >
 <div>
 <span className="font-medium text-gray-900">{cred.role}</span>
 <p className="text-sm text-gray-600">{cred.email}</p>
 </div>
 <button
 onClick={() => {
 setEmail(cred.email);
 setPassword(cred.password);
 }}
 className="text-blue-600 hover:text-blue-800 text-sm font-medium"
 >
 Use
 </button>
 </motion.div>
 ))}
 </div>
 </motion.div>
 </motion.div>
 </div>
 );
}