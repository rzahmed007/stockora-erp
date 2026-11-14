import { sidebarConfig } from './sidebar.config';
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
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
      {sidebarConfig.items.map((item) => (
        <SidebarMenuItem
          key={item.href}
          item={item}
          isCollapsed={isCollapsed}
          onItemClick={onItemClick}
        />
      ))}
    </nav>
  );
}
