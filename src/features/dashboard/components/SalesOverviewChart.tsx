import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { SalesChartDataPoint } from '../types/dashboard.types';
import {
  MOCK_SALES_CHART_WEEK,
  MOCK_SALES_CHART_MONTH,
} from '../data/mockDashboardData';
import { useTheme } from '@/context';

export function SalesOverviewChart() {
  const [chartRange, setChartRange] = useState<'7d' | '30d'>('7d');
  const { theme } = useTheme();

  const data: SalesChartDataPoint[] =
    chartRange === '7d' ? MOCK_SALES_CHART_WEEK : MOCK_SALES_CHART_MONTH;

  const totalPeriodSales = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalCashSales = data.reduce((acc, curr) => acc + curr.cashSales, 0);
  const totalCreditSales = data.reduce((acc, curr) => acc + curr.creditSales, 0);

  const formatCurrency = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)}L`;
    }
    return `₹${(val / 1000).toFixed(0)}k`;
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
              Sales Trends: Cash vs. Udhar (Credit)
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +14.8%
            </span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Total Revenue: ₹{(totalPeriodSales / 100000).toFixed(2)} Lakhs across selected timeline
          </p>
        </div>

        {/* Filters and Metric Summary */}
        <div className="flex items-center gap-3">
          <div className="p-1 rounded-xl bg-[#F4F6F8] dark:bg-gray-800 border border-[#E5E7EB] dark:border-gray-700 flex items-center text-xs font-semibold">
            <button
              type="button"
              onClick={() => setChartRange('7d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chartRange === '7d'
                  ? 'bg-white dark:bg-gray-700 text-[#003A41] dark:text-white shadow-2xs'
                  : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              onClick={() => setChartRange('30d')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chartRange === '30d'
                  ? 'bg-white dark:bg-gray-700 text-[#003A41] dark:text-white shadow-2xs'
                  : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A]'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>
      </div>

      {/* Metric Pills Row */}
      <div className="flex flex-wrap items-center gap-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#003A41] dark:bg-[#58AFB7]" />
          <span className="text-[#6B7280] dark:text-gray-400">Cash Sales:</span>
          <span className="font-bold text-[#1D1B1A] dark:text-white">
            ₹{(totalCashSales / 100000).toFixed(2)} Lakhs
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#3B82F6]" />
          <span className="text-[#6B7280] dark:text-gray-400">Credit (Udhar) Dispatched:</span>
          <span className="font-bold text-[#1D1B1A] dark:text-white">
            ₹{(totalCreditSales / 100000).toFixed(2)} Lakhs
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] sm:h-[320px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003A41" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#003A41" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="creditGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === 'dark' ? '#374151' : '#F1F5F9'}
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as SalesChartDataPoint;
                  return (
                    <div className="rounded-xl bg-[#1D1B1A] dark:bg-gray-900 text-white p-3 shadow-xl border border-gray-800 text-xs text-left space-y-1">
                      <p className="font-bold text-gray-200">
                        {label} ({item.date})
                      </p>
                      <div className="pt-1 space-y-0.5">
                        <p className="flex justify-between gap-4 text-emerald-400">
                          <span>Spot Cash:</span>
                          <span className="font-semibold">
                            ₹{item.cashSales.toLocaleString('en-IN')}
                          </span>
                        </p>
                        <p className="flex justify-between gap-4 text-blue-400">
                          <span>Credit (Udhar):</span>
                          <span className="font-semibold">
                            ₹{item.creditSales.toLocaleString('en-IN')}
                          </span>
                        </p>
                        <div className="border-t border-gray-700 pt-1 font-bold text-white flex justify-between">
                          <span>Total Day Sales:</span>
                          <span>₹{item.total.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              name="Cash Sales"
              dataKey="cashSales"
              stroke="#003A41"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#cashGrad)"
            />
            <Area
              type="monotone"
              name="Credit Sales"
              dataKey="creditSales"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#creditGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
