import { Link } from 'react-router-dom';
import {
  Boxes,
  ShoppingCart,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Scale,
  Sparkles,
} from 'lucide-react';
import { TopSellingProduct, InventoryCommodity } from '../types/dashboard.types';
import { formatINR } from '../data/mockDashboardData';
import { cn } from '@/lib/utils';

interface InventoryPurchasesSectionProps {
  purchaseAmount: number;
  inventoryValuation: number;
  totalStockTons: string;
  totalStockSacks: number;
  topSellingProducts: TopSellingProduct[];
  commodities: InventoryCommodity[];
}

export function InventoryPurchasesSection({
  purchaseAmount,
  inventoryValuation,
  totalStockTons,
  totalStockSacks,
  topSellingProducts,
  commodities,
}: InventoryPurchasesSectionProps) {
  return (
    <div className="space-y-4 text-left">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
            Section 3: Inventory Valuation & Mandi Procurement
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Physical stock valuation across 3 yards, farmer inward lots and product margin performance
          </p>
        </div>

        <Link
          to="/inventory"
          className="text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>Inventory Hub</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Today's Purchases */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Procurement & Purchases
            </p>
            <p className="text-xl font-extrabold text-[#1D1B1A] dark:text-white mt-0.5">
              {formatINR(purchaseAmount)}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">3 Mandi auction lots received</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShoppingCart className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2: Inventory Value */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Total Stock Valuation
            </p>
            <p className="text-xl font-extrabold text-[#003A41] dark:text-[#58AFB7] mt-0.5">
              {formatINR(inventoryValuation)}
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">At weighted landing cost</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center shrink-0">
            <Boxes className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Available Stock */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Available Physical Stock
            </p>
            <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {totalStockTons} Tons
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">{totalStockSacks.toLocaleString()} total sacks (Bori)</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Scale className="h-5 w-5" />
          </div>
        </div>

        {/* Card 4: Low Stock Alerts */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Stock Reorder Warnings
            </p>
            <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
              2 Commodities
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">Mandsaur Garlic & Small Onion</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Grid: Top Selling Products & Product-wise Stock Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Top Selling Commodities (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#003A41] dark:text-[#58AFB7]" />
                <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                  Top Selling Commodities & Margins
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                Live Margin
              </span>
            </div>

            <div className="space-y-3 mt-3">
              {topSellingProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200/60 dark:border-gray-700/60 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#1D1B1A] dark:text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-gray-500">{p.variety}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                      <span>{p.sacksSold} Sacks sold</span>
                      <span>•</span>
                      <span>{p.stockRemainingSacks} Sacks in yard</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="font-extrabold text-[#1D1B1A] dark:text-white">
                      {formatINR(p.revenue)}
                    </p>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      <TrendingUp className="h-3 w-3" /> +{p.marginPercent}% Margin
                    </span>
                    <p className="text-[10px] text-gray-400">Profit: {formatINR(p.grossProfit)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/sales"
            className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline flex items-center justify-between"
          >
            <span>View Full Product Sales Analysis</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Right: Product-wise Stock & Sales Summary Table (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                Commodity Stock & Landing Cost Matrix
              </h3>
              <span className="text-xs text-gray-500">3 Mandi Hubs</span>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[10px] uppercase tracking-wider">
                    <th className="py-2 px-2">Commodity</th>
                    <th className="py-2 px-2 text-center">Yard Sacks</th>
                    <th className="py-2 px-2">Available Weight</th>
                    <th className="py-2 px-2">Landing Cost</th>
                    <th className="py-2 px-2 text-right">Stock Valuation</th>
                    <th className="py-2 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {commodities.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                      <td className="py-2.5 px-2">
                        <div className="font-bold text-[#1D1B1A] dark:text-white">{c.name}</div>
                        <div className="text-[10px] text-gray-400">{c.primaryLocation}</div>
                      </td>

                      <td className="py-2.5 px-2 text-center font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                        {c.sackCount}
                      </td>

                      <td className="py-2.5 px-2 font-medium text-gray-700 dark:text-gray-300">
                        {c.availableWeight}
                      </td>

                      <td className="py-2.5 px-2 font-semibold text-gray-600 dark:text-gray-400">
                        {c.avgCostPerKg}
                      </td>

                      <td className="py-2.5 px-2 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                        {c.stockValue}
                      </td>

                      <td className="py-2.5 px-2 text-center">
                        <span
                          className={cn(
                            'text-[9px] font-bold px-2 py-0.5 rounded-full',
                            c.status === 'low_stock'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                          )}
                        >
                          {c.status === 'low_stock' ? 'Low Stock' : 'Optimal'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link
            to="/inventory"
            className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline flex items-center justify-between"
          >
            <span>View All Stock Transfer & Yard Logs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
