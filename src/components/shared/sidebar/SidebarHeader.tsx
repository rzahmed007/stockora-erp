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
  return (
    <div className="flex items-center justify-between pb-4 pt-2 px-1 border-b border-[#E5E7EB]/70 dark:border-gray-800/80">
      {/* Brand & Sparkle Logo - Matches reference screenshot */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2.5 group overflow-hidden"
      >
        <div className="h-9 w-9 rounded-xl bg-[#003A41] text-white flex items-center justify-center shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0">
          <Sparkles className="h-5 w-5 text-[#58AFB7]" />
        </div>

        {!isCollapsed && (
          <div className="flex flex-col text-left">
            <span className="text-base font-bold tracking-tight text-[#1D1B1A] dark:text-white leading-tight">
              STOCK<span className="text-[#003A41] dark:text-[#58AFB7]">ORA</span>
            </span>
            <span className="text-[10px] text-[#6B7280] dark:text-gray-400 font-medium">
              Agri-ERP v1.0
            </span>
          </div>
        )}
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
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      )}
    </div>
  );
}
