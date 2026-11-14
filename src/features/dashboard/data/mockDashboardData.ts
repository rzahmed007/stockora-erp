import {
  TimeRange,
  DashboardLocationId,
  PerformanceKpi,
  FinancialPositionKpi,
  SalesChartDataPoint,
  InventoryCommodity,
  LocationSummary,
  BusinessAttentionAlert,
  RecentBusinessActivity,
  TopSellingProduct,
} from '../types/dashboard.types';
import { SaleRecord } from '@/features/sales/types/sales.types';

export const MOCK_LOCATIONS: LocationSummary[] = [
  {
    id: 'loc-shop',
    name: 'Main Mandi Shop (APMC #12)',
    type: 'Shop',
    address: 'APMC Market Yard Gate 2, Nashik',
    todaySales: '₹2,10,500',
    todayPurchases: '₹1,25,000',
    stockValue: '₹5,80,000',
    occupancyPercent: 88,
    activeCommodities: ['Onion', 'Garlic', 'Potato'],
  },
  {
    id: 'loc-warehouse',
    name: 'Shree Cold Storage (Hub #3)',
    type: 'Warehouse',
    address: 'MIDC Cold Chain Hub, Nashik',
    todaySales: '₹1,45,000',
    todayPurchases: '₹8,50,000',
    stockValue: '₹18,40,000',
    occupancyPercent: 74,
    activeCommodities: ['Nashik Onion', 'Agra Potato'],
  },
  {
    id: 'loc-godown',
    name: 'Central Godown (Depot 2)',
    type: 'Godown',
    address: 'Agra Highway Depot, Pimpalgaon',
    todaySales: '₹72,700',
    todayPurchases: '₹4,45,500',
    stockValue: '₹8,60,000',
    occupancyPercent: 62,
    activeCommodities: ['Potato Bulk', 'Garlic Bags'],
  },
];

export const MOCK_INVENTORY_COMMODITIES: InventoryCommodity[] = [
  {
    id: 'onion-nashik',
    name: 'Nashik Red Onion',
    variety: 'Puna Garva (Grade A Medium)',
    availableWeight: '42.5 Tons (425 Qtl)',
    sackCount: 850,
    weightPerSack: '50 kg / Sack',
    stockValue: '₹14,87,500',
    avgCostPerKg: '₹35.00/kg',
    status: 'normal',
    primaryLocation: 'Cold Storage Hub (Hub #3)',
  },
  {
    id: 'potato-agra',
    name: 'Agra Jyoti Potato',
    variety: 'Cold Storage Premium (45mm+)',
    availableWeight: '32.0 Tons (640 Qtl)',
    sackCount: 640,
    weightPerSack: '50 kg / Sack',
    stockValue: '₹7,68,000',
    avgCostPerKg: '₹24.00/kg',
    status: 'normal',
    primaryLocation: 'Central Godown (Depot 2)',
  },
  {
    id: 'garlic-mandsaur',
    name: 'Mandsaur Garlic',
    variety: 'Desi Pure White (Special Ek Kandi)',
    availableWeight: '11.0 Tons (220 Qtl)',
    sackCount: 220,
    weightPerSack: '50 kg / Sack',
    stockValue: '₹10,24,500',
    avgCostPerKg: '₹93.10/kg',
    status: 'low_stock',
    primaryLocation: 'Main Mandi Shop (APMC #12)',
  },
];

export const MOCK_TOP_SELLING_PRODUCTS: TopSellingProduct[] = [
  {
    id: 'prod-onion-nashik',
    name: 'Nashik Red Onion',
    variety: 'Puna Garva (Grade A Medium)',
    sacksSold: 280,
    weightSoldKg: 14000,
    revenue: 532000,
    cost: 490000, // ₹35/kg cost
    grossProfit: 42000,
    marginPercent: 7.9,
    stockRemainingSacks: 850,
  },
  {
    id: 'prod-potato-agra',
    name: 'Agra Jyoti Potato',
    variety: 'Cold Storage Premium (45mm+)',
    sacksSold: 190,
    weightSoldKg: 9500,
    revenue: 266000,
    cost: 228000, // ₹24/kg cost
    grossProfit: 38000,
    marginPercent: 14.3,
    stockRemainingSacks: 640,
  },
  {
    id: 'prod-garlic-mandsaur',
    name: 'Mandsaur Garlic',
    variety: 'Desi Pure White (Special Ek Kandi)',
    sacksSold: 45,
    weightSoldKg: 2250,
    revenue: 247500,
    cost: 209475, // ₹93.10/kg cost
    grossProfit: 38025,
    marginPercent: 15.4,
    stockRemainingSacks: 220,
  },
];

export const MOCK_ATTENTION_ALERTS: BusinessAttentionAlert[] = [
  {
    id: 'alert-overdue-1',
    type: 'overdue_payment',
    title: 'Patel Brothers Wholesale (Surat)',
    description: 'Payment overdue by 18 days beyond Mandi credit terms',
    amount: '₹2,40,000',
    urgency: 'critical',
    actionUrl: '/customer-credit',
    actionText: 'Collect Udhar',
    meta: 'Risk Score: High • Last reminder sent 2 days ago',
  },
  {
    id: 'alert-lowstock-1',
    type: 'low_stock',
    title: 'Mandsaur Pure White Garlic',
    description: 'Available stock (220 sacks) below safety threshold of 350 sacks',
    amount: '-130 Sacks Deficit',
    urgency: 'critical',
    actionUrl: '/purchases',
    actionText: 'Procure Stock',
    meta: 'Primary yard: Shop #12 • Mandi arrivals dropping',
  },
  {
    id: 'alert-upcoming-1',
    type: 'upcoming_due',
    title: 'Kishan Trading Co. (Mumbai Vashi)',
    description: 'Wholesale lot credit due in 48 hours (20 Nov 2026)',
    amount: '₹1,85,000',
    urgency: 'warning',
    actionUrl: '/customer-credit',
    actionText: 'Send Reminder',
    meta: 'Credit limit used: 61% • Good payment history',
  },
  {
    id: 'alert-supplier-1',
    type: 'supplier_due',
    title: 'Lasalgaon Farmers Syndicate (Mandi Inward)',
    description: 'Auction lot payout balance due to farmer collective',
    amount: '₹1,45,000',
    urgency: 'warning',
    actionUrl: '/purchases',
    actionText: 'Review Bill',
    meta: 'Truck #MH-15-EG-4491 received yesterday',
  },
  {
    id: 'alert-closing-1',
    type: 'pending_closing',
    title: 'Main Mandi Shop #12 Counter Register',
    description: "Evening cash & UPI drawer reconciliation pending owner's verification",
    urgency: 'warning',
    actionUrl: '/daily-closing',
    actionText: 'Reconcile Closing',
    meta: 'Cash Drawer: ₹1,85,400 expected',
  },
  {
    id: 'alert-variance-1',
    type: 'closing_variance',
    title: 'Central Godown Depot 2 Closing',
    description: 'Cash drawer reconciled with zero discrepancy (₹0 variance)',
    amount: '₹0 Variance',
    urgency: 'info',
    actionUrl: '/daily-closing',
    actionText: 'View Audit Log',
    meta: 'Closing locked at 07:30 PM by Supervisor',
  },
];

export const MOCK_RECENT_ACTIVITIES: RecentBusinessActivity[] = [
  {
    id: 'act-1',
    dateTime: 'Today, 04:15 PM',
    type: 'sale',
    refNo: 'INV-2024-0891',
    entityName: 'Kishan Trading Co.',
    location: 'Shree Cold Storage Hub',
    amount: 216000,
    formattedAmount: '₹2,16,000',
    status: 'Dispatched',
    statusType: 'success',
  },
  {
    id: 'act-2',
    dateTime: 'Today, 03:50 PM',
    type: 'sale',
    refNo: 'POS-2024-1042',
    entityName: 'Walk-in Retail Buyer (Suresh)',
    location: 'Main Mandi Shop #12',
    amount: 500,
    formattedAmount: '₹500',
    status: 'Completed',
    statusType: 'success',
  },
  {
    id: 'act-3',
    dateTime: 'Today, 02:30 PM',
    type: 'collection',
    refNo: 'COL-2024-0091',
    entityName: 'National Supermart Supplies',
    location: 'Main Mandi Shop #12',
    amount: 95000,
    formattedAmount: '₹95,000',
    status: 'Verified',
    statusType: 'success',
  },
  {
    id: 'act-4',
    dateTime: 'Today, 01:15 PM',
    type: 'purchase',
    refNo: 'PUR-2024-0412',
    entityName: 'Lasalgaon Farmers Mandi Link',
    location: 'Shree Cold Storage Hub',
    amount: 640000,
    formattedAmount: '₹6,40,000',
    status: 'Completed',
    statusType: 'info',
  },
  {
    id: 'act-5',
    dateTime: 'Today, 11:45 AM',
    type: 'expense',
    refNo: 'EXP-2024-0341',
    entityName: 'Mandi Yard Hamali Union (400 Sacks)',
    location: 'Main Mandi Shop #12',
    amount: 12000,
    formattedAmount: '₹12,000',
    status: 'Verified',
    statusType: 'warning',
  },
  {
    id: 'act-6',
    dateTime: 'Today, 10:20 AM',
    type: 'transfer',
    refNo: 'TRF-2024-0105',
    entityName: 'Shop #12 → Central Godown (80 Sacks Potato)',
    location: 'Central Godown Depot 2',
    amount: 96000,
    formattedAmount: '₹96,000',
    status: 'In-Transit',
    statusType: 'info',
  },
];

// Historical Chart Data sets
export const MOCK_CHARTS_TODAY_VS_YESTERDAY: SalesChartDataPoint[] = [
  { day: '08:00 AM', date: 'Morning Opening', sales: 45000, purchases: 120000, cashSales: 35000, creditSales: 10000, collections: 15000, total: 45000 },
  { day: '10:00 AM', date: 'Mandi Auction Peak', sales: 95000, purchases: 240000, cashSales: 55000, creditSales: 40000, collections: 40000, total: 95000 },
  { day: '12:00 PM', date: 'Midday Trading', sales: 85000, purchases: 150000, cashSales: 40000, creditSales: 45000, collections: 25000, total: 85000 },
  { day: '02:00 PM', date: 'Outstation Dispatch', sales: 140000, purchases: 80000, cashSales: 30000, creditSales: 110000, collections: 35000, total: 140000 },
  { day: '04:00 PM', date: 'Evening Mandi Rush', sales: 110000, purchases: 50000, cashSales: 60000, creditSales: 50000, collections: 50000, total: 110000 },
  { day: '06:00 PM', date: 'Counter Closing', sales: 52000, purchases: 0, cashSales: 42000, creditSales: 10000, collections: 20000, total: 52000 },
];

export const MOCK_CHARTS_7_DAYS: SalesChartDataPoint[] = [
  { day: 'Mon', date: '08 Nov', sales: 360000, purchases: 310000, cashSales: 165000, creditSales: 195000, collections: 145000, total: 360000 },
  { day: 'Tue', date: '09 Nov', sales: 390000, purchases: 280000, cashSales: 180000, creditSales: 210000, collections: 160000, total: 390000 },
  { day: 'Wed', date: '10 Nov', sales: 380000, purchases: 340000, cashSales: 140000, creditSales: 240000, collections: 190000, total: 380000 },
  { day: 'Thu', date: '11 Nov', sales: 395000, purchases: 300000, cashSales: 210000, creditSales: 185000, collections: 155000, total: 395000 },
  { day: 'Fri', date: '12 Nov', sales: 465000, purchases: 410000, cashSales: 195000, creditSales: 270000, collections: 220000, total: 465000 },
  { day: 'Sat', date: '13 Nov', sales: 550000, purchases: 480000, cashSales: 240000, creditSales: 310000, collections: 260000, total: 550000 },
  { day: 'Sun', date: '14 Nov', sales: 527000, purchases: 390000, cashSales: 262000, creditSales: 265000, collections: 185000, total: 527000 },
];

export const MOCK_CHARTS_30_DAYS: SalesChartDataPoint[] = [
  { day: 'Week 1', date: '01 - 07 Nov', sales: 2570000, purchases: 2150000, cashSales: 1150000, creditSales: 1420000, collections: 1250000, total: 2570000 },
  { day: 'Week 2', date: '08 - 14 Nov', sales: 2968200, purchases: 2480000, cashSales: 1315400, creditSales: 1652800, collections: 1480000, total: 2968200 },
  { day: 'Week 3', date: '15 - 21 Nov', sales: 2760000, purchases: 2320000, cashSales: 1220000, creditSales: 1540000, collections: 1390000, total: 2760000 },
  { day: 'Week 4', date: '22 - 28 Nov', sales: 3190000, purchases: 2650000, cashSales: 1410000, creditSales: 1780000, collections: 1650000, total: 3190000 },
];

export const MOCK_SALES_CHART_WEEK = MOCK_CHARTS_7_DAYS;
export const MOCK_SALES_CHART_MONTH = MOCK_CHARTS_30_DAYS;

// Helper to format currency
export function formatINR(val: number): string {
  if (Math.abs(val) >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(val) >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

export function formatCompactINR(val: number): string {
  if (Math.abs(val) >= 100000) {
    return `₹${(val / 100000).toFixed(1)}L`;
  }
  if (Math.abs(val) >= 1000) {
    return `₹${(val / 1000).toFixed(0)}k`;
  }
  return `₹${val.toLocaleString('en-IN')}`;
}

// Comprehensive Live Dashboard Computation Function
export function getDashboardOverviewData(
  locationId: DashboardLocationId,
  timeRange: TimeRange,
  salesFromContext: SaleRecord[] = []
) {
  // Location factor for scaling metrics when an individual location is selected
  const locMultiplier =
    locationId === 'all'
      ? 1
      : locationId === 'loc-shop'
      ? 0.45
      : locationId === 'loc-warehouse'
      ? 0.35
      : 0.2; // godown

  // Time multiplier and labels
  let timeMultiplier = 1;
  let comparisonLabel = 'vs. yesterday';

  if (timeRange === 'today') {
    timeMultiplier = 1;
    comparisonLabel = 'vs. yesterday';
  } else if (timeRange === 'yesterday') {
    timeMultiplier = 0.94;
    comparisonLabel = 'vs. day before';
  } else if (timeRange === 'week') {
    timeMultiplier = 6.2;
    comparisonLabel = 'vs. last week';
  } else if (timeRange === 'month' || timeRange === 'custom') {
    timeMultiplier = 26.5;
    comparisonLabel = 'vs. last month';
  }

  // 1. Sales from context or seed baseline
  const baseSalesAmount = 527000 * locMultiplier * timeMultiplier;
  const contextSalesAmount = salesFromContext.reduce((acc, s) => acc + s.grandTotal, 0);
  const totalSales = Math.round(baseSalesAmount + (locationId === 'all' ? contextSalesAmount : contextSalesAmount * locMultiplier));

  const totalSalesPrev = Math.round(totalSales * 0.88); // +13.6% increase
  const salesChangePercent = Number((((totalSales - totalSalesPrev) / totalSalesPrev) * 100).toFixed(1));

  // Cash vs Credit breakdown
  const cashSales = Math.round(totalSales * 0.48);
  const cashSalesPrev = Math.round(totalSalesPrev * 0.44);
  const cashChangePercent = Number((((cashSales - cashSalesPrev) / cashSalesPrev) * 100).toFixed(1));

  const creditSales = totalSales - cashSales;
  const creditSalesPrev = totalSalesPrev - cashSalesPrev;
  const creditChangePercent = Number((((creditSales - creditSalesPrev) / creditSalesPrev) * 100).toFixed(1));

  // Customer collections (cash/bank debt recovered)
  const customerCollections = Math.round(creditSales * 0.72);
  const customerCollectionsPrev = Math.round(creditSalesPrev * 0.65);
  const collectionsChangePercent = Number(
    (((customerCollections - customerCollectionsPrev) / customerCollectionsPrev) * 100).toFixed(1)
  );

  // SECTION 1: PERFORMANCE KPIS
  const performanceKpis: PerformanceKpi[] = [
    {
      id: 'kpi-total-sales',
      title: 'Total Sales',
      amount: totalSales,
      formattedAmount: formatINR(totalSales),
      previousAmount: totalSalesPrev,
      formattedPreviousAmount: formatINR(totalSalesPrev),
      comparisonLabel,
      percentChange: salesChangePercent,
      isPositive: salesChangePercent >= 0,
      badge: 'Live Billing',
      actionUrl: '/sales',
    },
    {
      id: 'kpi-cash-sales',
      title: 'Cash Sales (Spot Liquidity)',
      amount: cashSales,
      formattedAmount: formatINR(cashSales),
      previousAmount: cashSalesPrev,
      formattedPreviousAmount: formatINR(cashSalesPrev),
      comparisonLabel,
      percentChange: cashChangePercent,
      isPositive: cashChangePercent >= 0,
      badge: 'Cash & UPI',
      actionUrl: '/sales',
    },
    {
      id: 'kpi-credit-sales',
      title: 'Credit (Udhar) Sales',
      amount: creditSales,
      formattedAmount: formatINR(creditSales),
      previousAmount: creditSalesPrev,
      formattedPreviousAmount: formatINR(creditSalesPrev),
      comparisonLabel,
      percentChange: creditChangePercent,
      isPositive: creditChangePercent <= 15, // High credit expansion flagged
      badge: 'B2B Udhar',
      actionUrl: '/sales',
    },
    {
      id: 'kpi-collections',
      title: 'Customer Collections',
      amount: customerCollections,
      formattedAmount: formatINR(customerCollections),
      previousAmount: customerCollectionsPrev,
      formattedPreviousAmount: formatINR(customerCollectionsPrev),
      comparisonLabel,
      percentChange: collectionsChangePercent,
      isPositive: collectionsChangePercent >= 0,
      badge: 'Debt Recovered',
      actionUrl: '/customer-credit',
    },
  ];

  // SECTION 2: FINANCIAL POSITION (With proper Cost of Goods Sold & Profit calculations)
  // COGS is calculated based on commodity landing costs (~88% of wholesale revenue)
  const cogsAmount = Math.round(totalSales * 0.884);
  const grossProfit = Math.max(0, totalSales - cogsAmount);
  const grossMarginPercent = Number(((grossProfit / totalSales) * 100).toFixed(1));

  // Operating Expenses (Hamali labour + transport freight + mandi electricity & yard rent)
  const periodExpenses = Math.round(totalSales * 0.045);
  const netProfit = Math.max(0, grossProfit - periodExpenses);
  const netMarginPercent = Number(((netProfit / totalSales) * 100).toFixed(1));

  const customerOutstanding = Math.round(645000 * locMultiplier);
  const supplierOutstanding = Math.round(412000 * locMultiplier);
  const cashInHand = Math.round(235000 * locMultiplier);
  const bankBalance = Math.round(1480000 * locMultiplier);

  const financialPositionKpis: FinancialPositionKpi[] = [
    {
      id: 'fp-customer-outstanding',
      title: 'Customer Outstanding (Udhar)',
      amount: customerOutstanding,
      formattedAmount: formatINR(customerOutstanding),
      subtitle: '18 Active wholesale accounts',
      badge: '₹1.85L Overdue >15d',
      badgeType: 'warning',
      actionUrl: '/customer-credit',
      actionLabel: 'Udhar Book →',
    },
    {
      id: 'fp-supplier-outstanding',
      title: 'Supplier Outstanding (Payables)',
      amount: supplierOutstanding,
      formattedAmount: formatINR(supplierOutstanding),
      subtitle: 'Farmer auction lots & mandi cess',
      badge: '3 Bills due soon',
      badgeType: 'neutral',
      actionUrl: '/purchases',
      actionLabel: 'Payables →',
    },
    {
      id: 'fp-cash-in-hand',
      title: 'Cash in Hand (Counter Drawers)',
      amount: cashInHand,
      formattedAmount: formatINR(cashInHand),
      subtitle: 'Physical cash across shop registers',
      badge: 'Drawer Verified',
      badgeType: 'success',
      actionUrl: '/daily-closing',
      actionLabel: 'Cash Closing →',
    },
    {
      id: 'fp-bank-balance',
      title: 'Bank Balance (APMC Current A/c)',
      amount: bankBalance,
      formattedAmount: formatINR(bankBalance),
      subtitle: 'HDFC & SBI Mandi Branches',
      badge: 'Real-time Sync',
      badgeType: 'info',
      actionUrl: '/accounting',
      actionLabel: 'Accounts →',
    },
    {
      id: 'fp-expenses',
      title: "Today's Operating Expenses",
      amount: periodExpenses,
      formattedAmount: formatINR(periodExpenses),
      subtitle: 'Hamali, transport & yard charges',
      badge: 'Labour & Logistics',
      badgeType: 'neutral',
      actionUrl: '/daily-closing',
      actionLabel: 'Log Expense →',
    },
    {
      id: 'fp-gross-profit',
      title: 'Gross Profit (Sales - COGS)',
      amount: grossProfit,
      formattedAmount: formatINR(grossProfit),
      subtitle: `Certified Gross Margin: ${grossMarginPercent}%`,
      badge: `+${grossMarginPercent}% Margin`,
      badgeType: 'success',
      actionUrl: '/reports',
      actionLabel: 'P&L Statement →',
    },
    {
      id: 'fp-net-profit',
      title: 'Net Profit (After Expenses)',
      amount: netProfit,
      formattedAmount: formatINR(netProfit),
      subtitle: `Net Business Return: ${netMarginPercent}%`,
      badge: 'Audited Return',
      badgeType: 'success',
      actionUrl: '/reports',
      actionLabel: 'View Net P&L →',
    },
    {
      id: 'fp-daily-closing',
      title: 'Daily Closing Status',
      amount: 0,
      formattedAmount: 'Reconciled',
      subtitle: 'Shop #12: Verified • Godown: ₹0 Var',
      badge: 'Closing Verified',
      badgeType: 'success',
      actionUrl: '/daily-closing',
      actionLabel: 'Closing Report →',
    },
  ];

  // SECTION 3: INVENTORY & PURCHASES
  const purchaseAmount = Math.round(totalSales * 0.78);
  const inventoryValuation = Math.round(3280000 * locMultiplier);
  const totalStockTons = (85.5 * locMultiplier).toFixed(1);
  const totalStockSacks = Math.round(1710 * locMultiplier);

  // SECTION 4: CHARTS
  let chartData: SalesChartDataPoint[] = [];
  if (timeRange === 'today') {
    chartData = MOCK_CHARTS_TODAY_VS_YESTERDAY.map((pt) => ({
      ...pt,
      sales: Math.round(pt.sales * locMultiplier),
      purchases: Math.round(pt.purchases * locMultiplier),
      cashSales: Math.round(pt.cashSales * locMultiplier),
      creditSales: Math.round(pt.creditSales * locMultiplier),
      collections: Math.round(pt.collections * locMultiplier),
    }));
  } else if (timeRange === 'yesterday' || timeRange === 'week') {
    chartData = MOCK_CHARTS_7_DAYS.map((pt) => ({
      ...pt,
      sales: Math.round(pt.sales * locMultiplier),
      purchases: Math.round(pt.purchases * locMultiplier),
      cashSales: Math.round(pt.cashSales * locMultiplier),
      creditSales: Math.round(pt.creditSales * locMultiplier),
      collections: Math.round(pt.collections * locMultiplier),
    }));
  } else {
    chartData = MOCK_CHARTS_30_DAYS.map((pt) => ({
      ...pt,
      sales: Math.round(pt.sales * locMultiplier),
      purchases: Math.round(pt.purchases * locMultiplier),
      cashSales: Math.round(pt.cashSales * locMultiplier),
      creditSales: Math.round(pt.creditSales * locMultiplier),
      collections: Math.round(pt.collections * locMultiplier),
    }));
  }

  // Filter activities and alerts by location if individual yard selected
  const recentActivities = MOCK_RECENT_ACTIVITIES.filter((act) => {
    if (locationId === 'all') return true;
    if (locationId === 'loc-shop') return act.location.includes('Shop');
    if (locationId === 'loc-warehouse') return act.location.includes('Storage') || act.location.includes('Warehouse');
    if (locationId === 'loc-godown') return act.location.includes('Godown');
    return true;
  });

  const attentionAlerts = MOCK_ATTENTION_ALERTS.filter((al) => {
    if (locationId === 'all') return true;
    if (locationId === 'loc-shop') return !al.meta?.includes('Godown');
    if (locationId === 'loc-warehouse') return !al.meta?.includes('Shop #12');
    if (locationId === 'loc-godown') return !al.meta?.includes('Shop #12');
    return true;
  });

  return {
    performanceKpis,
    financialPositionKpis,
    purchaseAmount,
    inventoryValuation,
    totalStockTons,
    totalStockSacks,
    chartData,
    attentionAlerts,
    recentActivities,
    topSellingProducts: MOCK_TOP_SELLING_PRODUCTS,
    commodities: MOCK_INVENTORY_COMMODITIES,
    locations: MOCK_LOCATIONS,
  };
}
