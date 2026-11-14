import {
  TrendingUp,
  ShoppingCart,
  Boxes,
  Users,
  Banknote,
  Receipt,
  ArrowUpRight,
} from 'lucide-react';
import { KpiMetric } from '../types/dashboard.types';

interface DashboardStatsProps {
  metrics: KpiMetric[];
}

export function DashboardStats({ metrics }: DashboardStatsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'total-sales':
        return <TrendingUp className="h-4.5 w-4.5 text-[#003A41] dark:text-[#58AFB7]" />;
      case 'total-purchases':
        return <ShoppingCart className="h-4.5 w-4.5 text-[#003A41] dark:text-[#58AFB7]" />;
      case 'inventory-value':
        return <Boxes className="h-4.5 w-4.5 text-[#003A41] dark:text-[#58AFB7]" />;
      case 'customer-credit':
        return <Users className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400" />;
      case 'today-cash':
        return <Banknote className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />;
      case 'today-credit':
        return <Receipt className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" />;
      default:
        return <TrendingUp className="h-4.5 w-4.5 text-[#003A41]" />;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 sm:gap-4">
      {metrics.map((kpi) => (
        <div
          key={kpi.id}
          className="p-4 sm:p-4.5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-md hover:border-[#003A41]/20 flex flex-col justify-between text-left group"
        >
          {/* Header Row: Title and Icon */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#6B7280] dark:text-gray-400 truncate">
              {kpi.title}
            </span>
            <div className="h-8 w-8 rounded-xl bg-[#F4F6F8] dark:bg-gray-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {getIcon(kpi.id)}
            </div>
          </div>

          {/* Metric Amount Value */}
          <div className="mt-3">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1B1A] dark:text-white">
              {kpi.value}
            </h3>
          </div>

          {/* Subtext and Trend Indicator */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px]">
            <span className="text-[#6B7280] dark:text-gray-400 truncate max-w-[120px]">
              {kpi.subtext}
            </span>

            {kpi.change && (
              <span
                className={`font-semibold shrink-0 flex items-center ${
                  kpi.isPositive
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {kpi.isPositive && <ArrowUpRight className="h-3 w-3 mr-0.5" />}
                {kpi.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

