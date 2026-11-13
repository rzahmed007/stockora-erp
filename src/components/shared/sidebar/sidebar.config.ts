export interface SidebarNavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  disabled?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarConfig {
  items: SidebarNavItem[];
}

export const sidebarConfig: SidebarConfig = {
  items: [],
};

