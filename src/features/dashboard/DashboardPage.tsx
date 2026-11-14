import { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { DashboardStats } from './components/DashboardStats';
import { SalesOverviewChart } from './components/SalesOverviewChart';
import { InventoryOverview } from './components/InventoryOverview';
import { LocationOverview } from './components/LocationOverview';
import { RecentSales } from './components/RecentSales';
import { CustomerCreditOverview } from './components/CustomerCreditOverview';
import { PurchaseOverview } from './components/PurchaseOverview';
import { LowStockAlerts } from './components/LowStockAlerts';
import { QuickActions } from './components/QuickActions';
import { TimeRange } from './types/dashboard.types';
import {
  MOCK_KPIS,
  MOCK_INVENTORY_COMMODITIES,
  MOCK_LOCATIONS,
  MOCK_RECENT_SALES,
  MOCK_CUSTOMER_CREDIT,
  MOCK_PURCHASES,
  MOCK_LOW_STOCK_ALERTS,
} from './data/mockDashboardData';

export function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12 text-left animate-in fade-in-50 duration-200">
      {/* 1. Dashboard Page Header */}
      <DashboardHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Quick Actions Bar */}
      <QuickActions />

      {/* 3. 6 Key Business KPI Metric Cards */}
      <DashboardStats metrics={MOCK_KPIS} />

      {/* 4. Sales Trends Chart (Cash vs Credit / Udhar) */}
      <SalesOverviewChart />

      {/* 5. Inventory Overview (Onion, Garlic, Potato) & Critical Low Stock Warnings */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <InventoryOverview commodities={MOCK_INVENTORY_COMMODITIES} />
        </div>
        <div className="xl:col-span-1">
          <LowStockAlerts alerts={MOCK_LOW_STOCK_ALERTS} />
        </div>
      </div>

      {/* 6. Yard & Locations Overview */}
      <LocationOverview locations={MOCK_LOCATIONS} />

      {/* 7. Recent Sales Transactions & Customer Credit (Udhar) Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <RecentSales sales={MOCK_RECENT_SALES} />
        </div>
        <div className="xl:col-span-5">
          <CustomerCreditOverview creditItems={MOCK_CUSTOMER_CREDIT} />
        </div>
      </div>

      {/* 8. Recent Mandi Inward Purchases */}
      <PurchaseOverview purchases={MOCK_PURCHASES} />
    </div>
  );
}

