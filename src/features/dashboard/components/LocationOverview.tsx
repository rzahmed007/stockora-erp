import { Building, Warehouse, Store } from 'lucide-react';
import { LocationSummary } from '../types/dashboard.types';

interface LocationOverviewProps {
  locations: LocationSummary[];
}

export function LocationOverview({ locations }: LocationOverviewProps) {
  const getLocationIcon = (type: LocationSummary['type']) => {
    switch (type) {
      case 'Shop':
        return <Store className="h-4 w-4 text-[#003A41] dark:text-[#58AFB7]" />;
      case 'Warehouse':
        return <Warehouse className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'Godown':
        return <Building className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
            Yard & Location Operations
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Real-time turnover, purchases, and capacity occupancy across Mandi Shop, Cold Storage & Godown
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-gray-800/60 border border-[#E5E7EB] dark:border-gray-700/80 flex flex-col justify-between hover:border-[#003A41]/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                    {getLocationIcon(loc.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                      {loc.name}
                    </h4>
                    <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                      {loc.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mt-3.5">
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <span className="text-[10px] text-[#6B7280] dark:text-gray-400 block font-medium">
                    Today Sales
                  </span>
                  <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                    {loc.todaySales}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                  <span className="text-[10px] text-[#6B7280] dark:text-gray-400 block font-medium">
                    Today Inward
                  </span>
                  <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                    {loc.todayPurchases}
                  </span>
                </div>
              </div>

              {/* Stock Value & Occupancy */}
              <div className="mt-3">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="text-[#6B7280] dark:text-gray-400">
                    Yard Space Occupancy
                  </span>
                  <span className="font-bold text-[#1D1B1A] dark:text-white">
                    {loc.occupancyPercent}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#003A41] dark:bg-[#58AFB7]"
                    style={{ width: `${loc.occupancyPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Total Stock valuation */}
            <div className="mt-3 pt-2.5 border-t border-gray-200/70 dark:border-gray-700 flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                Current Holding Value:
              </span>
              <span className="font-bold text-[#003A41] dark:text-[#58AFB7]">
                {loc.stockValue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
