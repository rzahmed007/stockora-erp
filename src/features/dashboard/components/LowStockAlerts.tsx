import { AlertTriangle, ArrowRight, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LowStockAlertItem } from '../types/dashboard.types';

interface LowStockAlertsProps {
  alerts: LowStockAlertItem[];
}

export function LowStockAlerts({ alerts }: LowStockAlertsProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex items-center justify-between pb-3.5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-[#1D1B1A] dark:text-white">
              Critical Low Stock Warnings
            </h3>
            <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
              Commodities fallen below safety buffer in active sales counters
            </p>
          </div>
        </div>

        <Link
          to="/inventory"
          className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline hidden sm:inline-flex items-center gap-1"
        >
          <span>Inventory Hub</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-3 pt-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                  {alert.productName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400 uppercase">
                  {alert.urgency}
                </span>
              </div>
              <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-0.5">
                {alert.variety} • Location: <strong className="text-[#1D1B1A] dark:text-gray-200">{alert.location}</strong>
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 block">
                  {alert.availableStock}
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                  Min Safe: {alert.minimumThreshold} ({alert.deficit})
                </span>
              </div>

              <Link
                to="/inventory"
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-amber-200 dark:border-amber-900/50 text-xs font-semibold text-[#1D1B1A] dark:text-white hover:bg-amber-100/50 transition-colors flex items-center gap-1.5 shadow-2xs shrink-0"
              >
                <RefreshCcw className="h-3 w-3 text-amber-700" />
                <span>Indent / Transfer</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

