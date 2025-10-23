'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import SectionHeader from './SectionHeader';
import MobileNavigation from './MobileNavigation';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  // Determine current section based on pathname
  const getCurrentSection = (pathname: string) => {
    if (pathname === '/') return 'home';
    if (pathname === '/self-service') return 'self-service';
    if (pathname === '/leave-tracker') return 'leave-tracker';
    if (pathname === '/attendance') return 'attendance';
    if (pathname === '/inbox') return 'inbox';
    if (pathname === '/more') return 'more';
    return 'home'; // default fallback
  };

  // Memoize section details to prevent unnecessary re-renders
  const sectionDetails = useMemo(() => {
    if (pathname === '/') return { section: 'home', title: t.dashboard, subtitle: t.welcomeBack };
    if (pathname === '/self-service') return { section: 'self-service', title: t.selfService, subtitle: 'Manage your profile and requests' };
    if (pathname === '/employees') return { section: 'employees', title: 'Employees', subtitle: 'Manage your team members' };
    if (pathname === '/departments') return { section: 'departments', title: 'Departments', subtitle: 'Department structure and teams' };
    if (pathname === '/leave-tracker') return { section: 'leave-tracker', title: t.leaveTracker, subtitle: 'Request and track your time off' };
    if (pathname === '/attendance') return { section: 'attendance', title: t.attendance, subtitle: 'Check in and out with GPS tracking' };
    if (pathname === '/inbox') return { section: 'inbox', title: t.inbox, subtitle: 'Messages and notifications' };
    if (pathname === '/more') return { section: 'more', title: t.more, subtitle: 'Additional HR tools and utilities' };
    if (pathname === '/settings') return { section: 'home', title: 'Settings', subtitle: 'Manage your account settings' };
    return { section: 'home', title: t.dashboard, subtitle: t.welcomeBack }; // default fallback
  }, [pathname, t.dashboard, t.welcomeBack, t.selfService, t.leaveTracker, t.attendance, t.inbox, t.more]);

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => {
            console.log('Sidebar toggle clicked, current state:', sidebarCollapsed);
            setSidebarCollapsed(!sidebarCollapsed);
          }} 
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Persistent Header */}
        <SectionHeader 
          section={sectionDetails.section} 
          title={sectionDetails.title} 
          subtitle={sectionDetails.subtitle}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </div>
  );
}
