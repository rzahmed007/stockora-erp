import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { sidebarSections } from './sidebar.config';
import { SidebarMenuItem } from './SidebarMenuItem';

interface SidebarNavigationProps {
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarNavigation({
  isCollapsed,
  onItemClick,
}: SidebarNavigationProps) {
  const location = useLocation();

  // Find which parent module matches the current route
  const getActiveParentHref = useCallback((): string | null => {
    for (const section of sidebarSections) {
      for (const item of section.items) {
        if (item.children && item.children.length > 0) {
          const isMatch = item.children.some(
            (child) =>
              location.pathname === child.href ||
              (child.href !== '/' && location.pathname.startsWith(child.href))
          );
          if (isMatch) return item.href;
        }
      }
    }
    return null;
  }, [location.pathname]);

  // Behavior: Only ONE primary module should be expanded at a time
  const [openModuleHref, setOpenModuleHref] = useState<string | null>(() =>
    getActiveParentHref()
  );

  // Sync open module when route changes
  useEffect(() => {
    const activeHref = getActiveParentHref();
    if (activeHref) {
      setOpenModuleHref(activeHref);
    }
  }, [getActiveParentHref]);

  const handleToggle = (href: string) => {
    setOpenModuleHref((prev) => (prev === href ? null : href));
  };

  return (
    <nav className="py-2 space-y-4">
      {sidebarSections.map((section, idx) => (
        <div key={section.id} className="space-y-1">
          {/* Section title (visible when expanded) */}
          {!isCollapsed && (
            <div className="px-3 pb-1 pt-1 flex items-center justify-between text-[10px] font-bold tracking-wider uppercase text-[#9CA3AF] dark:text-gray-500">
              <span>{section.title}</span>
            </div>
          )}

          {/* Section divider in collapsed mode */}
          {isCollapsed && idx > 0 && (
            <div className="w-8 mx-auto my-2 border-t border-gray-200 dark:border-gray-800" />
          )}

          {/* Nav Items */}
          <div className="space-y-1">
            {section.items.map((item) => (
              <SidebarMenuItem
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                isOpen={openModuleHref === item.href}
                onToggle={() => handleToggle(item.href)}
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
