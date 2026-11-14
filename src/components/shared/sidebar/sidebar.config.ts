import {
  LayoutDashboard,
  Receipt,
  MapPin,
  Package,
  Boxes,
  ShoppingCart,
  Truck,
  Users,
  Route,
  HardHat,
  UserCheck,
  Landmark,
  Calculator,
  Coins,
  BarChart3,
  Bell,
  UserCog,
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

export const sidebarSections: SidebarSection[] = [
  // 1. CORE MANAGEMENT
  {
    id: 'core-management',
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
        title: 'Locations',
        href: '/locations',
        icon: MapPin,
      },
      {
        title: 'Products',
        href: '/products',
        icon: Package,
      },
    ],
  },

  // 2. OPERATIONS
  {
    id: 'operations',
    title: 'Operations',
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
        title: 'Purchases',
        href: '/purchases',
        icon: ShoppingCart,
        children: [
          { title: 'Mandi Inward', href: '/purchases' },
          { title: 'Farmer Purchases', href: '/purchases/farmers' },
          { title: 'Supplier Bills', href: '/purchases/bills' },
        ],
      },
      {
        title: 'Wholesale Sales',
        href: '/wholesale-sales',
        icon: Truck,
        badge: 'Live',
        children: [
          { title: 'All Invoices', href: '/wholesale-sales' },
          { title: 'New Sale Order', href: '/wholesale-sales/new' },
          { title: 'Dispatches', href: '/wholesale-sales/dispatches' },
        ],
      },
      {
        title: 'Customers',
        href: '/customers',
        icon: Users,
        badge: 'Udhar',
        children: [
          { title: 'Customer Directory', href: '/customers' },
          { title: 'Ledger / Udhar Book', href: '/customer-credit' },
          { title: 'Payments & Collections', href: '/customers/payments' },
        ],
      },
      {
        title: 'Transport',
        href: '/transport',
        icon: Route,
      },
      {
        title: 'Labour',
        href: '/labour',
        icon: HardHat,
      },
      {
        title: 'Employees',
        href: '/employees',
        icon: UserCheck,
      },
    ],
  },

  // 3. FINANCE & REPORTING
  {
    id: 'finance-reporting',
    title: 'Finance & Reporting',
    items: [
      {
        title: 'Accounting',
        href: '/accounting',
        icon: Landmark,
      },
      {
        title: 'Daily Closing',
        href: '/daily-closing',
        icon: Calculator,
      },
      {
        title: 'Expenses',
        href: '/expenses',
        icon: Coins,
      },
      {
        title: 'Reports & Analytics',
        href: '/reports',
        icon: BarChart3,
        children: [
          { title: 'Sales Reports', href: '/reports/sales' },
          { title: 'Stock Movement', href: '/reports/inventory' },
          { title: 'Profit & Loss (P&L)', href: '/reports/pnl' },
        ],
      },
    ],
  },

  // 4. SYSTEM
  {
    id: 'system',
    title: 'System',
    items: [
      {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
        badge: 3,
      },
      {
        title: 'Users & Administration',
        href: '/users',
        icon: UserCog,
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
        children: [
          { title: 'Business Profile', href: '/settings' },
          { title: 'Mandi Cess & Tax', href: '/settings/tax' },
          { title: 'Printers & Weighbridge', href: '/settings/hardware' },
        ],
      },
    ],
  },
];

// Flat items helper for backwards compatibility
export const sidebarConfig = {
  items: sidebarSections.flatMap((s) => s.items),
};
