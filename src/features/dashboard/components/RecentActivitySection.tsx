import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShoppingCart,
  Coins,
  Receipt,
  Truck,
  Eye,
} from 'lucide-react';
import { RecentBusinessActivity } from '../types/dashboard.types';
import { cn } from '@/lib/utils';

interface RecentActivitySectionProps {
  activities: RecentBusinessActivity[];
}

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  const [activityFilter, setActivityFilter] = useState<'all' | 'sale' | 'purchase' | 'collection' | 'expense' | 'transfer'>('all');

  const filteredActivities = useMemo(() => {
    if (activityFilter === 'all') return activities;
    return activities.filter((act) => act.type === activityFilter);
  }, [activities, activityFilter]);

  const getTypeBadge = (type: RecentBusinessActivity['type']) => {
    switch (type) {
      case 'sale':
        return {
          label: 'Sale Invoice',
          color: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
          icon: FileText,
        };
      case 'purchase':
        return {
          label: 'Purchase Bill',
          color: 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200 dark:border-blue-800',
          icon: ShoppingCart,
        };
      case 'collection':
        return {
          label: 'Udhar Receipt',
          color: 'bg-teal-50 text-teal-800 dark:bg-teal-950/70 dark:text-teal-400 border border-teal-200 dark:border-teal-800',
          icon: Coins,
        };
      case 'expense':
        return {
          label: 'Daily Expense',
          color: 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400 border border-amber-200 dark:border-amber-800',
          icon: Receipt,
        };
      case 'transfer':
        return {
          label: 'Stock Transfer',
          color: 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800',
          icon: Truck,
        };
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left space-y-4">
      {/* Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
            Section 6: Recent Business Transactions & Audit Feed
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Chronological audit log across sales, Mandi inward, customer receipts, expenses and transfers
          </p>
        </div>

        {/* Filter Pills */}
        <div className="p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 flex items-center text-xs font-semibold overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${activities.length})` },
            { id: 'sale', label: 'Sales' },
            { id: 'purchase', label: 'Purchases' },
            { id: 'collection', label: 'Collections' },
            { id: 'expense', label: 'Expenses' },
            { id: 'transfer', label: 'Transfers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivityFilter(tab.id as typeof activityFilter)}
              className={cn(
                'px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150',
                activityFilter === tab.id
                  ? 'bg-white dark:bg-[#161B22] text-[#003A41] dark:text-[#58AFB7] shadow-xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[10px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Date / Time</th>
              <th className="py-2.5 px-3">Transaction Type</th>
              <th className="py-2.5 px-3">Reference #</th>
              <th className="py-2.5 px-3">Customer / Supplier / Transporter</th>
              <th className="py-2.5 px-3">Operating Yard</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredActivities.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-400">
                  No activity found in selected category.
                </td>
              </tr>
            ) : (
              filteredActivities.map((act) => {
                const badge = getTypeBadge(act.type);
                const BIcon = badge.icon;

                return (
                  <tr key={act.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="py-3 px-3 text-gray-500 font-medium">
                      {act.dateTime}
                    </td>

                    <td className="py-3 px-3">
                      <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold', badge.color)}>
                        <BIcon className="h-3 w-3" />
                        <span>{badge.label}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                      {act.refNo}
                    </td>

                    <td className="py-3 px-3 font-bold text-[#1D1B1A] dark:text-white">
                      {act.entityName}
                    </td>

                    <td className="py-3 px-3 text-gray-600 dark:text-gray-400">
                      {act.location}
                    </td>

                    <td className="py-3 px-3 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                      {act.formattedAmount}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{act.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <Link
                        to={act.type === 'sale' ? '/sales' : act.type === 'purchase' ? '/purchases' : act.type === 'collection' ? '/customer-credit' : '/daily-closing'}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
