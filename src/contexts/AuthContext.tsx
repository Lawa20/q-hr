'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/auth';
import { validateCredentials, getUserByEmail } from '@/lib/mockUsers';
import { encodeJWT, decodeJWT } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  switchRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('qhr_token');
      const storedUser = localStorage.getItem('qhr_user');
      
      if (token && storedUser) {
        try {
          const payload = decodeJWT(token);
          if (payload) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } else {
            // Token expired, clear storage
            localStorage.removeItem('qhr_token');
            localStorage.removeItem('qhr_user');
          }
        } catch (error) {
          localStorage.removeItem('qhr_token');
          localStorage.removeItem('qhr_user');
        }
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const foundUser = validateCredentials(email, password);
      
      if (foundUser) {
        // Generate JWT token
        const token = encodeJWT({
          userId: foundUser.id,
          email: foundUser.email,
          role: foundUser.role
        });
        
        setUser(foundUser);
        if (typeof window !== 'undefined') {
          localStorage.setItem('qhr_user', JSON.stringify(foundUser));
          localStorage.setItem('qhr_token', token);
        }
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qhr_user');
      localStorage.removeItem('qhr_token');
    }
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('qhr_user', JSON.stringify(updatedUser));
      }
      
      // Update token with new role
      const token = encodeJWT({
        userId: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('qhr_token', token);
      }
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const canAccessRoute = (route: string): boolean => {
    if (!user) return false;
    
    const routePermissions: Record<string, string[]> = {
      '/': ['view_all', 'view_own'],
      '/attendance': ['view_attendance', 'edit_attendance'],
      '/leave-tracker': ['view_leave', 'edit_leave'],
      '/inbox': ['view_all', 'view_own'],
      '/payroll': ['view_payroll', 'edit_payroll'],
      '/more': ['view_all', 'view_own']
    };
    
    const requiredPermissions = routePermissions[route] || [];
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      switchRole, 
      hasPermission, 
      canAccessRoute 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
