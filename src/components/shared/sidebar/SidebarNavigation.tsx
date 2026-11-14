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
  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
      {sidebarSections.map((section, idx) => (
        <div key={section.id} className="space-y-1">
          {/* Subtle section label when expanded */}
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
                onItemClick={onItemClick}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
