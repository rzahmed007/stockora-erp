import { Calendar, Download, RefreshCw, Sparkles } from 'lucide-react';
import { TimeRange } from '../types/dashboard.types';

interface DashboardHeaderProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({
  timeRange,
  onTimeRangeChange,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
      {/* Title & Description */}
      <div className="text-left space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1B1A] dark:text-white">
            Business Overview
          </h1>
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]">
            <Sparkles className="h-3 w-3" /> Live Mandi Rates
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400">
          Monitor your sales, inventory, purchases and business performance across all yards.
        </p>
      </div>

      {/* Action Controls: Time Range Selector + Export + Refresh */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Time Filter Pills Container */}
        <div className="p-1 rounded-2xl bg-white dark:bg-gray-850 border border-[#E5E7EB] dark:border-gray-800 shadow-2xs inline-flex items-center">
          <button
            type="button"
            onClick={() => onTimeRangeChange('today')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              timeRange === 'today'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            }`}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('week')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              timeRange === 'week'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('month')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              timeRange === 'month'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            }`}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('custom')}
            className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              timeRange === 'custom'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            }`}
          >
            <Calendar className="h-3 w-3" />
            Custom
          </button>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-9 w-9 rounded-xl bg-white dark:bg-gray-850 border border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white flex items-center justify-center transition-all shadow-2xs hover:bg-gray-50 dark:hover:bg-gray-800"
          title="Refresh Data"
          aria-label="Refresh Data"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-[#003A41]' : ''}`}
          />
        </button>

        {/* Export Report Action */}
        <button
          type="button"
          className="h-9 px-3.5 rounded-xl bg-white dark:bg-gray-850 border border-[#E5E7EB] dark:border-gray-800 text-xs font-semibold text-[#1D1B1A] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 shadow-2xs"
        >
          <Download className="h-3.5 w-3.5 text-[#6B7280] dark:text-gray-400" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

