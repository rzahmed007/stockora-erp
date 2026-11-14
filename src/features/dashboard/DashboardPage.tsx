import { useState, useMemo } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { BusinessPerformanceSection } from './components/BusinessPerformanceSection';
import { FinancialPositionSection } from './components/FinancialPositionSection';
import { InventoryPurchasesSection } from './components/InventoryPurchasesSection';
import { PerformanceChartsSection } from './components/PerformanceChartsSection';
import { BusinessAttentionSection } from './components/BusinessAttentionSection';
import { RecentActivitySection } from './components/RecentActivitySection';
import { QuickActions } from './components/QuickActions';
import { TimeRange, DashboardLocationId } from './types/dashboard.types';
import { getDashboardOverviewData } from './data/mockDashboardData';
import { useSales } from '@/features/sales';

export function DashboardPage() {
  const { sales } = useSales();

  // Dashboard Filters
  const [locationId, setLocationId] = useState<DashboardLocationId>('all');
  const [timeRange, setTimeRange] = useState<TimeRange>('today');
  const [customStartDate, setCustomStartDate] = useState('2026-11-01');
  const [customEndDate, setCustomEndDate] = useState('2026-11-15');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleCustomDatesChange = (start: string, end: string) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
  };

  // Dynamically compute all dashboard sections using location filter, time range, and actual live sales state
  const dashboardData = useMemo(() => {
    return getDashboardOverviewData(locationId, timeRange, sales);
  }, [locationId, timeRange, sales]);

  return (
    <div className="space-y-7 pb-16 text-left animate-in fade-in duration-200">
      {/* DASHBOARD HEADER: Executive Overview, Location Selector, Period Selector, Refresh & Export */}
      <DashboardHeader
        locationId={locationId}
        onLocationChange={setLocationId}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        onCustomDatesChange={handleCustomDatesChange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* SECTION 7: QUICK BUSINESS ACTIONS */}
      <QuickActions />

      {/* SECTION 1: BUSINESS PERFORMANCE (Sales, Cash, Udhar, Collections with Prior Period Comparisons) */}
      <BusinessPerformanceSection kpis={dashboardData.performanceKpis} />

      {/* SECTION 2: FINANCIAL POSITION (Receivables, Payables, Cash in Hand, Bank, Gross & Net Profit, Closing Status) */}
      <FinancialPositionSection kpis={dashboardData.financialPositionKpis} />

      {/* SECTION 4: BUSINESS PERFORMANCE CHARTS (Sales vs Purchases, Cash vs Udhar, Collections Trend) */}
      <PerformanceChartsSection
        chartData={dashboardData.chartData}
        timeRange={timeRange}
      />

      {/* SECTION 3: INVENTORY & PURCHASES (Purchases, Valuation, Stock, Low Stock Alerts, Top Products & Matrix) */}
      <InventoryPurchasesSection
        purchaseAmount={dashboardData.purchaseAmount}
        inventoryValuation={dashboardData.inventoryValuation}
        totalStockTons={dashboardData.totalStockTons}
        totalStockSacks={dashboardData.totalStockSacks}
        topSellingProducts={dashboardData.topSellingProducts}
        commodities={dashboardData.commodities}
      />

      {/* SECTION 5: BUSINESS ATTENTION (Owner's Action Center for Overdues, Deficits & Variances) */}
      <BusinessAttentionSection alerts={dashboardData.attentionAlerts} />

      {/* SECTION 6: RECENT BUSINESS ACTIVITY (Sales Invoices, Purchases, Collections, Expenses, Transfers) */}
      <RecentActivitySection activities={dashboardData.recentActivities} />
    </div>
  );
}
