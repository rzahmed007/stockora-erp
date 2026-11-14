import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, BarChart3, PieChart, Layers } from 'lucide-react';
import { SalesChartDataPoint, TimeRange } from '../types/dashboard.types';
import { formatCompactINR, formatINR } from '../data/mockDashboardData';
import { useTheme } from '@/context';
import { cn } from '@/lib/utils';

interface PerformanceChartsSectionProps {
  chartData: SalesChartDataPoint[];
  timeRange: TimeRange;
}

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xl text-left text-xs space-y-1">
        <p className="font-bold text-[#1D1B1A] dark:text-white pb-1 border-b border-gray-100 dark:border-gray-800">
          {label}
        </p>
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-gray-500">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-[#1D1B1A] dark:text-white">
              ₹{Number(entry.value || 0).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function PerformanceChartsSection({ chartData, timeRange }: PerformanceChartsSectionProps) {
  const [activeChartTab, setActiveChartTab] = useState<'sales_vs_purchases' | 'cash_vs_credit' | 'collections'>('sales_vs_purchases');
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const totalSalesInChart = chartData.reduce((acc, curr) => acc + curr.sales, 0);
  const totalPurchasesInChart = chartData.reduce((acc, curr) => acc + curr.purchases, 0);
  const totalCashInChart = chartData.reduce((acc, curr) => acc + curr.cashSales, 0);
  const totalCreditInChart = chartData.reduce((acc, curr) => acc + curr.creditSales, 0);
  const totalCollectionsInChart = chartData.reduce((acc, curr) => acc + curr.collections, 0);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left space-y-5">
      {/* Chart Header with Tab Switching */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
              Section 4: Visual Business Trends & Cash Flow
            </h2>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Real-time APMC
            </span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            <span className="font-semibold text-[#003A41] dark:text-[#58AFB7] uppercase tracking-wider text-[10px] mr-2">
              [{timeRange}]
            </span>
            {activeChartTab === 'sales_vs_purchases' &&
              `Sales Turnover: ${formatINR(totalSalesInChart)} • Procurement: ${formatINR(totalPurchasesInChart)}`}
            {activeChartTab === 'cash_vs_credit' &&
              `Spot Cash: ${formatINR(totalCashInChart)} (48%) • Udhar Credit: ${formatINR(totalCreditInChart)} (52%)`}
            {activeChartTab === 'collections' &&
              `Total Debt Recovered: ${formatINR(totalCollectionsInChart)} across timeline`}
          </p>
        </div>

        {/* Chart View Segmented Tabs */}
        <div className="p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 flex items-center text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveChartTab('sales_vs_purchases')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5',
              activeChartTab === 'sales_vs_purchases'
                ? 'bg-white dark:bg-[#161B22] text-[#003A41] dark:text-[#58AFB7] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Sales vs. Purchases</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveChartTab('cash_vs_credit')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5',
              activeChartTab === 'cash_vs_credit'
                ? 'bg-white dark:bg-[#161B22] text-[#003A41] dark:text-[#58AFB7] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            <PieChart className="h-3.5 w-3.5" />
            <span>Cash vs. Udhar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveChartTab('collections')}
            className={cn(
              'px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5',
              activeChartTab === 'collections'
                ? 'bg-white dark:bg-[#161B22] text-[#003A41] dark:text-[#58AFB7] shadow-xs font-bold'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Collections Trend</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeChartTab === 'sales_vs_purchases' ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003A41" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#003A41" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="purchasesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#2D333B' : '#F1F5F9'} />
              <XAxis dataKey="day" stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCompactINR} />
              <Tooltip content={<CustomChartTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area type="monotone" name="Sales Revenue" dataKey="sales" stroke="#003A41" strokeWidth={2.5} fillOpacity={1} fill="url(#salesGrad)" />
              <Area type="monotone" name="Purchases (Procurement)" dataKey="purchases" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#purchasesGrad)" />
            </AreaChart>
          ) : activeChartTab === 'cash_vs_credit' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#2D333B' : '#F1F5F9'} />
              <XAxis dataKey="day" stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCompactINR} />
              <Tooltip content={<CustomChartTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Bar name="Cash Sales (Spot)" dataKey="cashSales" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
              <Bar name="Udhar Credit Sales" dataKey="creditSales" stackId="a" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#2D333B' : '#F1F5F9'} />
              <XAxis dataKey="day" stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? '#8B949E' : '#94A3B8'} fontSize={11} tickLine={false} axisLine={false} tickFormatter={formatCompactINR} />
              <Tooltip content={<CustomChartTooltip />} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" name="Customer Collections (₹)" dataKey="collections" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" name="Credit Granted (₹)" dataKey="creditSales" stroke="#F59E0B" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
