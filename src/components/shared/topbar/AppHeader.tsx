import { Menu, Sun, Moon } from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { HeaderSearch } from './HeaderSearch';
import { HeaderNotifications } from './HeaderNotifications';
import { HeaderProfile } from './HeaderProfile';
import { useTheme } from '@/context';

interface AppHeaderProps {
  onOpenMobileSidebar?: () => void;
}

export function AppHeader({ onOpenMobileSidebar }: AppHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_4px_25px_rgba(0,0,0,0.03)] px-3.5 sm:px-6 py-2.5 sm:py-3 transition-all duration-200">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* Left Section: Mobile Menu Trigger + Breadcrumb Navigation */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-[#6B7280] hover:text-[#1D1B1A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Breadcrumbs />
        </div>

        {/* Center Section: Premium Global Search Bar */}
        <div className="hidden md:flex flex-1 justify-center max-w-[420px]">
          <HeaderSearch />
        </div>

        {/* Right Section: Theme Switcher + Notifications + Glassmorphic Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full bg-[#F4F6F8] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center justify-center text-[#6B7280] dark:text-gray-300 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white dark:hover:bg-gray-700 transition-all shadow-2xs"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-4.5 w-4.5" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-amber-400" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <HeaderNotifications />

          {/* Glassmorphic Profile */}
          <HeaderProfile />
        </div>
      </div>

      {/* Mobile Search Row (visible on small mobile screens below md) */}
      <div className="mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800 md:hidden flex justify-center">
        <HeaderSearch />
      </div>
    </header>
  );
}
