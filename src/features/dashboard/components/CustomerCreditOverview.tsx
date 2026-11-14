import { AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CustomerCreditItem } from '../types/dashboard.types';

interface CustomerCreditOverviewProps {
  creditItems: CustomerCreditItem[];
}

export function CustomerCreditOverview({
  creditItems,
}: CustomerCreditOverviewProps) {
  const totalOutstanding = creditItems.reduce(
    (acc, curr) => acc + curr.rawOutstanding,
    0
  );

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
              Customer Udhar & Credit Ledger
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400">
              ₹{(totalOutstanding / 100000).toFixed(2)} Lakhs Active
            </span>
          </div>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Top wholesale accounts with credit balances, payment deadlines and risk scores
          </p>
        </div>

        <Link
          to="/customers"
          className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>Full Udhar Book</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Credit List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800/80 mt-2">
        {creditItems.map((item) => (
          <div
            key={item.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 px-2 rounded-xl transition-colors"
          >
            {/* Customer Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                  {item.customerName}
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-gray-400">
                  • {item.city} ({item.phone})
                </span>
              </div>

              {/* Credit Limit Progress Bar */}
              <div className="flex items-center gap-3 text-[11px] text-[#6B7280] dark:text-gray-400">
                <span>
                  Credit Limit: <strong className="text-[#1D1B1A] dark:text-white">{item.creditLimit}</strong>
                </span>
                <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.limitUsedPercent > 90
                        ? 'bg-red-500'
                        : item.limitUsedPercent > 70
                        ? 'bg-amber-500'
                        : 'bg-[#003A41]'
                    }`}
                    style={{ width: `${item.limitUsedPercent}%` }}
                  />
                </div>
                <span>{item.limitUsedPercent}% used</span>
              </div>
            </div>

            {/* Outstanding & Due Date */}
            <div className="flex items-center justify-between sm:justify-end gap-4 text-right">
              <div>
                <span className="text-xs font-bold text-red-600 dark:text-red-400 block">
                  {item.outstandingAmount}
                </span>
                <span className="text-[10px] text-[#6B7280] dark:text-gray-400 flex items-center gap-1 sm:justify-end">
                  <Calendar className="h-3 w-3" /> Due: {item.dueDate}
                </span>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {item.status === 'Critical' ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Critical Overdue
                  </span>
                ) : item.status === 'Overdue' ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400">
                    Payment Due
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400">
                    In Good Standing
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
