import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Plus, Minus, Folder } from 'lucide-react';
import { SidebarNavItem } from './sidebar.config';
import { cn } from '@/lib/utils';

interface SidebarMenuItemProps {
  item: SidebarNavItem;
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarMenuItem({
  item,
  isCollapsed,
  onItemClick,
}: SidebarMenuItemProps) {
  const location = useLocation();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Determine if this item or any of its children are currently active
  const isDirectActive = location.pathname === item.href;
  const isChildActive = Boolean(
    item.children?.some(
      (child) =>
        location.pathname === child.href ||
        (child.href !== '/' && location.pathname.startsWith(child.href))
    )
  );

  const isActive = isDirectActive || isChildActive;

  // Keep open if child is active or user expanded it
  const [isOpen, setIsOpen] = useState(isChildActive || false);

  // Sync open state when path changes
  React.useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const Icon = item.icon;

  if (isCollapsed) {
    // Collapsed rail view
    return (
      <div className="relative group flex justify-center py-1">
        <NavLink
          to={item.href}
          onClick={onItemClick}
          className={({ isActive: navActive }) =>
            cn(
              'h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200',
              navActive || isChildActive
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-800'
            )
          }
          title={item.title}
        >
          <Icon className="h-5 w-5" />
        </NavLink>

        {/* Hover Tooltip */}
        <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-[#1D1B1A] text-white text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-md">
          {item.title}
        </div>
      </div>
    );
  }

  // Expanded menu view - Faithfully structured after reference screenshot
  return (
    <div className="space-y-1">
      {hasChildren ? (
        // Expandable group header button
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
            isOpen || isActive
              ? 'bg-[#1D1B1A] dark:bg-white text-white dark:text-[#1D1B1A] shadow-xs'
              : 'text-[#1D1B1A] dark:text-gray-200 hover:bg-white/60 dark:hover:bg-gray-800/60'
          )}
        >
          <div className="flex items-center gap-3">
            <Icon
              className={cn(
                'h-5 w-5',
                isOpen || isActive
                  ? 'text-white dark:text-[#1D1B1A]'
                  : 'text-[#6B7280] dark:text-gray-400'
              )}
            />
            <span className="font-semibold text-sm tracking-tight">
              {item.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {item.badge && (
              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded-full',
                  isOpen || isActive
                    ? 'bg-white/20 text-white dark:bg-black/10 dark:text-[#1D1B1A]'
                    : 'bg-[#003A41] text-white'
                )}
              >
                {item.badge}
              </span>
            )}

            <span className="text-xs">
              {isOpen ? (
                <Minus className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </span>
          </div>
        </button>
      ) : (
        // Single link item
        <NavLink
          to={item.href}
          onClick={onItemClick}
          className={({ isActive: navActive }) =>
            cn(
              'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
              navActive
                ? 'bg-[#003A41] text-white shadow-xs font-semibold'
                : 'text-[#1D1B1A] dark:text-gray-200 hover:bg-white/70 dark:hover:bg-gray-800/70'
            )
          }
        >
          {({ isActive: navActive }) => (
            <>
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-5 w-5',
                    navActive
                      ? 'text-white'
                      : 'text-[#6B7280] dark:text-gray-400'
                  )}
                />
                <span className="tracking-tight">{item.title}</span>
              </div>

              {item.badge && (
                <span
                  className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    navActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#1D1B1A] text-white dark:bg-gray-800'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      )}

      {/* Nested Submenu Items with Vertical Connecting Tree Branch Line */}
      {hasChildren && isOpen && (
        <div className="relative ml-6 pl-4 border-l-2 border-[#D1D5DB] dark:border-gray-700 py-1.5 space-y-1 animate-in fade-in-50 duration-200">
          {item.children?.map((subItem) => {
            const isSubActive = location.pathname === subItem.href;

            return (
              <div key={subItem.href} className="relative">
                {/* Connecting branch indicator dot */}
                <div
                  className={cn(
                    'absolute -left-[21px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full',
                    isSubActive
                      ? 'bg-[#003A41] dark:bg-[#58AFB7]'
                      : 'bg-[#D1D5DB] dark:bg-gray-600'
                  )}
                />

                <NavLink
                  to={subItem.href}
                  onClick={onItemClick}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                    isSubActive
                      ? 'bg-white dark:bg-gray-800 text-[#1D1B1A] dark:text-white shadow-xs font-semibold'
                      : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white/40 dark:hover:bg-gray-800/40'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
                    <span>{subItem.title}</span>
                  </div>

                  {subItem.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-gray-200 dark:bg-gray-700 text-[#1D1B1A] dark:text-white">
                      {subItem.badge}
                    </span>
                  )}
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
