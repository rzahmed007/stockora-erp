export type TimeRange = 'today' | 'week' | 'month' | 'custom';

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  numericValue: number;
  change: string;
  isPositive: boolean;
  subtext: string;
  badge?: string;
}

export interface SalesChartDataPoint {
  day: string;
  date: string;
  cashSales: number;
  creditSales: number;
  total: number;
}

export interface InventoryCommodity {
  id: string;
  name: string;
  variety: string;
  availableWeight: string; // e.g. "34.5 Ton (345 Qtl)"
  sackCount: number; // e.g. 690 Bori
  weightPerSack: string; // "50 kg / Sack"
  stockValue: string; // e.g. "₹12,40,000"
  avgCostPerKg: string; // e.g. "₹35.90/kg"
  status: 'normal' | 'low_stock' | 'surplus';
  primaryLocation: string;
}

export interface LocationSummary {
  id: string;
  name: string;
  type: 'Shop' | 'Warehouse' | 'Godown';
  address: string;
  todaySales: string;
  todayPurchases: string;
  stockValue: string;
  occupancyPercent: number;
  activeCommodities: string[];
}

export interface SaleTransaction {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerCity: string;
  product: string;
  quantity: string;
  amount: string;
  rawAmount: number;
  paymentType: 'Cash' | 'Credit' | 'Partial Payment';
  status: 'Completed' | 'Pending Dispatch' | 'Dispatched';
  date: string;
  time: string;
}

export interface CustomerCreditItem {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  outstandingAmount: string;
  rawOutstanding: number;
  creditLimit: string;
  limitUsedPercent: number;
  lastPaymentDate: string;
  dueDate: string;
  status: 'Current' | 'Overdue' | 'Critical';
}

export interface PurchaseItem {
  id: string;
  purchaseNo: string;
  supplierName: string;
  mandiLocation: string;
  product: string;
  quantity: string;
  totalAmount: string;
  destinationLocation: string;
  status: 'Received' | 'In-Transit' | 'Quality Check';
  date: string;
}

export interface LowStockAlertItem {
  id: string;
  productName: string;
  variety: string;
  availableStock: string;
  minimumThreshold: string;
  location: string;
  deficit: string;
  urgency: 'Critical' | 'Warning';
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  actionUrl?: string;
}

