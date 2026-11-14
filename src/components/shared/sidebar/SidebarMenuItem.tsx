import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Plus, Minus, Folder, ChevronRight } from 'lucide-react';
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

  // Check if any child route is active
  const isChildActive = Boolean(
    item.children?.some(
      (child) =>
        location.pathname === child.href ||
        (child.href !== '/' && location.pathname.startsWith(child.href))
    )
  );

  // Keep open if child is active or user clicked open
  const [isOpen, setIsOpen] = useState(isChildActive || false);

  // Auto-expand if user navigates to a child route
  React.useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const Icon = item.icon;

  // 1. Collapsed Rail View with Smooth Hover Flyout Card
  if (isCollapsed) {
    return (
      <div className="relative group flex justify-center py-1">
        <NavLink
          to={item.href}
          onClick={onItemClick}
          className={({ isActive: navActive }) =>
            cn(
              'h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-200 select-none',
              navActive || isChildActive
                ? 'bg-[#003A41] text-white shadow-sm ring-2 ring-[#003A41]/20 scale-105'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 hover:scale-105'
            )
          }
          title={item.title}
        >
          <Icon className="h-5 w-5" />
        </NavLink>

        {/* Hover Popover Flyout Menu (Smooth transition, shows children if any) */}
        <div className="absolute left-full ml-3 top-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 ease-out z-50">
          <div className="w-52 p-2.5 rounded-2xl bg-white dark:bg-gray-900 border border-[#E5E7EB] dark:border-gray-800 shadow-xl text-left space-y-1">
            {/* Popover Header */}
            <div className="px-2 py-1.5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                {item.title}
              </span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Child Links if applicable */}
            {hasChildren ? (
              <div className="pt-1 space-y-0.5">
                {item.children?.map((sub) => {
                  const subActive = location.pathname === sub.href;
                  return (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      onClick={onItemClick}
                      className={cn(
                        'flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors',
                        subActive
                          ? 'bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] font-semibold'
                          : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      <span>{sub.title}</span>
                      <ChevronRight className="h-3 w-3 text-[#9CA3AF]" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                to={item.href}
                onClick={onItemClick}
                className="block px-2.5 py-1.5 rounded-xl text-xs font-medium text-[#003A41] dark:text-[#58AFB7] hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Go to {item.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Expanded Sidebar View with 60FPS Accordion Animation
  return (
    <div className="space-y-1">
      {hasChildren ? (
        // Expandable parent button
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 select-none group',
            isOpen || isChildActive
              ? 'bg-[#1D1B1A] dark:bg-white text-white dark:text-[#1D1B1A] shadow-sm'
              : 'text-[#1D1B1A] dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800'
          )}
        >
          <div className="flex items-center gap-3">
            <Icon
              className={cn(
                'h-5 w-5 transition-transform duration-200 group-hover:scale-105',
                isOpen || isChildActive
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
                  isOpen || isChildActive
                    ? 'bg-white/20 text-white dark:bg-black/10 dark:text-[#1D1B1A]'
                    : 'bg-[#003A41] text-white'
                )}
              >
                {item.badge}
              </span>
            )}

            <span
              className={cn(
                'h-5 w-5 rounded-md flex items-center justify-center transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            >
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
              'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 select-none group',
              navActive
                ? 'bg-[#003A41] text-white shadow-sm font-semibold'
                : 'text-[#1D1B1A] dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800'
            )
          }
        >
          {({ isActive: navActive }) => (
            <>
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-5 w-5 transition-transform duration-200 group-hover:scale-105',
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
                      : 'bg-[#1D1B1A] text-white dark:bg-gray-700'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      )}

      {/* Accordion Animation for Submenu Items */}
      {hasChildren && (
        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isOpen
              ? 'grid-rows-[1fr] opacity-100'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          )}
        >
          <div className="overflow-hidden">
            <div className="relative ml-6 pl-4 border-l-2 border-[#CBD5E1] dark:border-gray-700 py-1.5 space-y-1">
              {item.children?.map((subItem) => {
                const isSubActive = location.pathname === subItem.href;

                return (
                  <div key={subItem.href} className="relative">
                    {/* Connecting branch indicator dot */}
                    <div
                      className={cn(
                        'absolute -left-[21px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200',
                        isSubActive
                          ? 'bg-[#003A41] dark:bg-[#58AFB7] ring-2 ring-[#003A41]/20 scale-125'
                          : 'bg-[#CBD5E1] dark:bg-gray-600'
                      )}
                    />

                    <NavLink
                      to={subItem.href}
                      onClick={onItemClick}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                        isSubActive
                          ? 'bg-white dark:bg-gray-800 text-[#1D1B1A] dark:text-white shadow-xs font-semibold'
                          : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60'
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
          </div>
        </div>
      )}
    </div>
  );
}
