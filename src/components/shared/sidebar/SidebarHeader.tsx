import { Link } from 'react-router-dom';
import { Sparkles, PanelLeftClose, PanelLeft, X } from 'lucide-react';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function SidebarHeader({
  isCollapsed,
  onToggleCollapse,
  isMobile = false,
  onCloseMobile,
}: SidebarHeaderProps) {
  if (isCollapsed && !isMobile) {
    // Perfectly centered collapsed rail layout - fixes logo clipping issue
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2.5 pb-4 pt-1 border-b border-[#E5E7EB]/70 dark:border-gray-800/80">
        <Link
          to="/dashboard"
          className="h-10 w-10 rounded-2xl bg-[#003A41] text-white flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-105 shrink-0"
          title="Stockora ERP Dashboard"
        >
          <Sparkles className="h-5 w-5 text-[#58AFB7]" />
        </Link>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-[#6B7280] hover:text-[#003A41] dark:text-gray-400 dark:hover:text-[#58AFB7] hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-2xs"
          title="Expand sidebar"
          aria-label="Expand sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Expanded layout
  return (
    <div className="flex items-center justify-between pb-4 pt-1 px-1 border-b border-[#E5E7EB]/70 dark:border-gray-800/80 w-full">
      <Link
        to="/dashboard"
        className="flex items-center gap-2.5 group overflow-hidden"
      >
        <div className="h-9 w-9 rounded-xl bg-[#003A41] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0">
          <Sparkles className="h-5 w-5 text-[#58AFB7]" />
        </div>

        <div className="flex flex-col text-left">
          <span className="text-base font-bold tracking-tight text-[#1D1B1A] dark:text-white leading-tight">
            STOCK<span className="text-[#003A41] dark:text-[#58AFB7]">ORA</span>
          </span>
          <span className="text-[10px] text-[#6B7280] dark:text-gray-400 font-medium">
            Agri-ERP v1.0
          </span>
        </div>
      </Link>

      {/* Collapse or Mobile Close Button */}
      {isMobile ? (
        <button
          type="button"
          onClick={onCloseMobile}
          className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1D1B1A] hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-[#6B7280] hover:text-[#1D1B1A] dark:text-gray-400 dark:hover:text-white hover:bg-gray-200/60 dark:hover:bg-gray-800 transition-colors"
          title="Collapse sidebar"
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
