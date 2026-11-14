import { useState } from 'react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavigation } from './SidebarNavigation';
import { SidebarFooter } from './SidebarFooter';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function AppSidebar({
  isMobileOpen = false,
  onCloseMobile,
  className,
}: AppSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container with 60FPS fluid width transition */}
      <aside
        className={cn(
          'transition-[width] duration-300 ease-in-out z-30 shrink-0 select-none',
          // Desktop sizing
          'hidden lg:flex flex-col h-full',
          isCollapsed ? 'w-[76px]' : 'w-[270px]',
          // Mobile drawer
          isMobileOpen &&
            'fixed inset-y-0 left-0 w-[285px] flex p-3 lg:p-0 z-50',
          className
        )}
      >
        <div
          className={cn(
            'flex flex-col h-full w-full',
            'bg-[#F4F5F7] dark:bg-[#161B22]',
            'border border-[#E5E7EB] dark:border-gray-800',
            'rounded-3xl p-3 sm:p-3.5 shadow-xs transition-colors duration-200'
          )}
        >
          <SidebarHeader
            isCollapsed={isMobileOpen ? false : isCollapsed}
            onToggleCollapse={toggleCollapse}
            isMobile={isMobileOpen}
            onCloseMobile={onCloseMobile}
          />

          <SidebarNavigation
            isCollapsed={isMobileOpen ? false : isCollapsed}
            onItemClick={isMobileOpen ? onCloseMobile : undefined}
          />

          <SidebarFooter isCollapsed={isMobileOpen ? false : isCollapsed} />
        </div>
      </aside>
    </>
  );
}
