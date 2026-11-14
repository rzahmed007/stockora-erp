import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/shared/sidebar/AppSidebar';
import { AppHeader } from '@/components/shared/topbar/AppHeader';

export function AppLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F8FAFC] dark:bg-[#0D1117] text-[#1D1B1A] dark:text-[#E6EDF3] flex p-3 sm:p-4 lg:p-5 gap-4 lg:gap-5 transition-colors duration-200">
      {/* Sidebar on the Left (Fixed & Static UI - never scrolls with dashboard) */}
      <AppSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Application Area on the Right */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden gap-4 sm:gap-5">
        {/* Floating FULL CURVED Header / Control Panel (Fixed topbar) */}
        <div className="shrink-0">
          <AppHeader
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          />
        </div>

        {/* Scrollable Main ERP Content (Only this container scrolls independently!) */}
        <main className="flex-1 overflow-y-auto px-1 pt-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
