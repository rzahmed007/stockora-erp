import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/shared/sidebar/AppSidebar';
import { AppHeader } from '@/components/shared/topbar/AppHeader';

export function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] text-[#1D1B1A] dark:text-[#E6EDF3] flex p-3 sm:p-4 lg:p-5 gap-4 lg:gap-5 transition-colors duration-200">
      {/* Sidebar on the Left (with reference design styling & responsive drawer) */}
      <AppSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Application Area on the Right */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-hidden gap-4 sm:gap-5">
        {/* Floating FULL CURVED Header / Control Panel */}
        <AppHeader
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        {/* Scrollable Main ERP Content */}
        <main className="flex-1 overflow-y-auto px-1 pt-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
