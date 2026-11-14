import { useState } from 'react';
import {
  Calendar,
  Download,
  RefreshCw,
  Sparkles,
  MapPin,
  ChevronDown,
  Check,
  FileSpreadsheet,
} from 'lucide-react';
import { TimeRange, DashboardLocationId } from '../types/dashboard.types';
import { MOCK_LOCATIONS } from '../data/mockDashboardData';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  locationId: DashboardLocationId;
  onLocationChange: (loc: DashboardLocationId) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  customStartDate: string;
  customEndDate: string;
  onCustomDatesChange: (start: string, end: string) => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function DashboardHeader({
  locationId,
  onLocationChange,
  timeRange,
  onTimeRangeChange,
  customStartDate,
  customEndDate,
  onCustomDatesChange,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showCustomDateModal, setShowCustomDateModal] = useState(false);
  const [showExportToast, setShowExportToast] = useState(false);

  const selectedLocationName =
    locationId === 'all'
      ? 'All Locations (3 Yards)'
      : MOCK_LOCATIONS.find((l) => l.id === locationId)?.name || 'Selected Yard';

  const handleExport = () => {
    setShowExportToast(true);
    setTimeout(() => {
      setShowExportToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-gray-100 dark:border-gray-800 text-left">
      {/* Title & Location Context */}
      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1B1A] dark:text-white">
            Business Overview
          </h1>

          {/* Location Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLocationMenu(!showLocationMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161B22] text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:bg-gray-50 shadow-2xs transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{selectedLocationName}</span>
              <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
            </button>

            {showLocationMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLocationMenu(false)}
                />
                <div className="absolute left-0 top-full mt-1.5 w-64 p-1.5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xl z-50 space-y-1 animate-in fade-in-50 zoom-in-95">
                  <button
                    type="button"
                    onClick={() => {
                      onLocationChange('all');
                      setShowLocationMenu(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors',
                      locationId === 'all'
                        ? 'bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <span>🏢 All Locations (Consolidated)</span>
                    {locationId === 'all' && <Check className="h-3.5 w-3.5" />}
                  </button>

                  {MOCK_LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => {
                        onLocationChange(loc.id as DashboardLocationId);
                        setShowLocationMenu(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors',
                        locationId === loc.id
                          ? 'bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                    >
                      <div>
                        <p>{loc.name}</p>
                        <p className="text-[10px] text-gray-400 font-normal">{loc.type}</p>
                      </div>
                      {locationId === loc.id && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <Sparkles className="h-3 w-3" /> Live APMC Feed
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400">
          Complete executive overview of onion, potato and garlic trading, finances, stock and cash closing.
        </p>
      </div>

      {/* Action Controls: Time Range Selector + Refresh + Export */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Time Filter Pills Container */}
        <div className="p-1 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-2xs inline-flex items-center">
          <button
            type="button"
            onClick={() => onTimeRangeChange('today')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              timeRange === 'today'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('yesterday')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              timeRange === 'yesterday'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            Yesterday
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('week')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              timeRange === 'week'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => onTimeRangeChange('month')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              timeRange === 'month'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            This Month
          </button>
          <button
            type="button"
            onClick={() => {
              onTimeRangeChange('custom');
              setShowCustomDateModal(true);
            }}
            className={cn(
              'inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
              timeRange === 'custom'
                ? 'bg-[#003A41] text-white shadow-xs'
                : 'text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
            )}
          >
            <Calendar className="h-3 w-3" />
            <span>Custom</span>
          </button>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="h-9 w-9 rounded-xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 text-[#6B7280] dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white flex items-center justify-center transition-all shadow-2xs hover:bg-gray-50 dark:hover:bg-gray-800"
          title="Refresh Dashboard Data"
          aria-label="Refresh Dashboard Data"
        >
          <RefreshCw
            className={cn('h-4 w-4', isRefreshing && 'animate-spin text-[#003A41]')}
          />
        </button>

        {/* Export Report Action */}
        <button
          type="button"
          onClick={handleExport}
          className="h-9 px-3.5 rounded-xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 text-xs font-bold text-[#1D1B1A] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </button>
      </div>

      {/* Export Toast Notification */}
      {showExportToast && (
        <div className="fixed bottom-5 right-5 z-50 p-3 rounded-2xl bg-[#003A41] text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3">
          <FileSpreadsheet className="h-4 w-4" />
          <span>Generating executive business report for {selectedLocationName}...</span>
        </div>
      )}

      {/* Custom Date Range Modal */}
      {showCustomDateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white dark:bg-[#161B22] rounded-3xl border border-[#E5E7EB] dark:border-gray-800 shadow-2xl p-5 space-y-4 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#003A41] dark:text-[#58AFB7]" />
                <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                  Custom Date Range
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCustomDateModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-400 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => onCustomDatesChange(e.target.value, customEndDate)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#1D1B1A] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-400 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => onCustomDatesChange(customStartDate, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[#1D1B1A] dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCustomDateModal(false)}
                className="px-4 py-2 rounded-xl bg-[#003A41] text-white text-xs font-bold hover:bg-[#002d33]"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
