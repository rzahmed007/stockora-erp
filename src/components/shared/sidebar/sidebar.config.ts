import {
  LayoutDashboard,
  Boxes,
  Truck,
  Receipt,
  ShoppingCart,
  Users,
  Building,
  MapPin,
  Calculator,
  BarChart3,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface SidebarSubItem {
  title: string;
  href: string;
  badge?: string | number;
}

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
  children?: SidebarSubItem[];
}

export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarNavItem[];
}

// User specified exact ordering:
// Upper section: Dashboard, Retail POS, Suppliers, Daily Closing, Reports & P&L
// Lower section: Parent and child modules (Inventory, Wholesale Sales, Purchases, Customers & Credit, Locations, Settings)
export const sidebarSections: SidebarSection[] = [
  {
    id: 'primary-direct',
    title: 'Core Management',
    items: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Retail POS',
        href: '/retail-pos',
        icon: Receipt,
      },
      {
        title: 'Suppliers',
        href: '/suppliers',
        icon: Building,
      },
      {
        title: 'Daily Closing',
        href: '/daily-closing',
        icon: Calculator,
      },
      {
        title: 'Reports & P&L',
        href: '/reports',
        icon: BarChart3,
      },
    ],
  },
  {
    id: 'operations-modules',
    title: 'Operations & Modules',
    items: [
      {
        title: 'Inventory',
        href: '/inventory',
        icon: Boxes,
        badge: '3 Alert',
        children: [
          { title: 'Stock Overview', href: '/inventory' },
          { title: 'Onion Stock', href: '/inventory/onion' },
          { title: 'Garlic Stock', href: '/inventory/garlic' },
          { title: 'Potato Stock', href: '/inventory/potato' },
          { title: 'Stock Transfers', href: '/inventory/transfers' },
        ],
      },
      {
        title: 'Wholesale Sales',
        href: '/wholesale-sales',
        icon: Truck,
        children: [
          { title: 'All Invoices', href: '/wholesale-sales' },
          { title: 'New Sale Order', href: '/wholesale-sales/new' },
          { title: 'Dispatches', href: '/wholesale-sales/dispatches' },
        ],
      },
      {
        title: 'Purchases',
        href: '/purchases',
        icon: ShoppingCart,
        children: [
          { title: 'Mandi Inward', href: '/purchases' },
          { title: 'Supplier Bills', href: '/purchases/bills' },
        ],
      },
      {
        title: 'Customers & Credit',
        href: '/customers',
        icon: Users,
        badge: 'Udhar',
        children: [
          { title: 'Customer Directory', href: '/customers' },
          { title: 'Udhar Ledger', href: '/customer-credit' },
        ],
      },
      {
        title: 'Locations',
        href: '/locations',
        icon: MapPin,
        children: [
          { title: 'Shop (Mandi Yard)', href: '/locations/shop' },
          { title: 'Cold Storage Hub', href: '/locations/warehouse' },
          { title: 'Central Godown', href: '/locations/godown' },
        ],
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
      },
    ],
  },
];

// Flat items helper for backwards compatibility
export const sidebarConfig = {
  items: sidebarSections.flatMap((s) => s.items),
};
