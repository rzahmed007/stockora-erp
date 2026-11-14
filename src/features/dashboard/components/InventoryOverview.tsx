import { AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InventoryCommodity } from '../types/dashboard.types';

interface InventoryOverviewProps {
  commodities: InventoryCommodity[];
}

export function InventoryOverview({ commodities }: InventoryOverviewProps) {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
            Commodity Inventory Breakdown
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Real-time weight (Tons), sack counts & valuations across Onion, Garlic & Potato
          </p>
        </div>

        <Link
          to="/inventory"
          className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>All Stock</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {commodities.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-gray-800/60 border border-[#E5E7EB] dark:border-gray-700/80 flex flex-col justify-between hover:border-[#003A41]/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D1B1A] dark:text-white uppercase tracking-wider">
                  {item.name}
                </span>

                {item.status === 'low_stock' ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400">
                    <AlertTriangle className="h-3 w-3" /> Low Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> In Stock
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#6B7280] dark:text-gray-400 mt-1">
                {item.variety}
              </p>

              {/* Weight and Sacks */}
              <div className="mt-3 py-2 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[#6B7280] dark:text-gray-400 font-medium">
                    Available Weight
                  </p>
                  <p className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                    {item.availableWeight}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#6B7280] dark:text-gray-400 font-medium">
                    Sack Count
                  </p>
                  <p className="text-sm font-bold text-[#003A41] dark:text-[#58AFB7]">
                    {item.sackCount} Sacks
                  </p>
                </div>
              </div>
            </div>

            {/* Valuation and Location footer */}
            <div className="mt-3 pt-2.5 border-t border-gray-200/70 dark:border-gray-700 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#6B7280] dark:text-gray-400 block">
                  Stock Value
                </span>
                <span className="font-bold text-[#1D1B1A] dark:text-white">
                  {item.stockValue}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B7280] dark:text-gray-400 block">
                  Location
                </span>
                <span className="text-[11px] font-semibold text-[#6B7280] dark:text-gray-300">
                  {item.primaryLocation}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
