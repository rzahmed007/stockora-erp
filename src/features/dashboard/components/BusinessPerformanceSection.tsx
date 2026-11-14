import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Banknote,
  CreditCard,
  Coins,
  ArrowRight,
} from 'lucide-react';
import { PerformanceKpi } from '../types/dashboard.types';
import { cn } from '@/lib/utils';

interface BusinessPerformanceSectionProps {
  kpis: PerformanceKpi[];
}

export function BusinessPerformanceSection({ kpis }: BusinessPerformanceSectionProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'kpi-total-sales':
        return TrendingUp;
      case 'kpi-cash-sales':
        return Banknote;
      case 'kpi-credit-sales':
        return CreditCard;
      case 'kpi-collections':
        return Coins;
      default:
        return TrendingUp;
    }
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
            Section 1: Business Performance & Revenue
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Real-time turnover, spot cash collections and wholesale Mandi Udhar expansion
          </p>
        </div>

        <Link
          to="/sales"
          className="text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>All Sales Register</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = getIcon(kpi.id);

          return (
            <Link
              key={kpi.id}
              to={kpi.actionUrl}
              className="group p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-bold text-[#6B7280] dark:text-gray-400 leading-tight">
                  {kpi.title}
                </span>

                <div className="h-9 w-9 rounded-xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Amount & Change */}
              <div className="mt-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-2xl font-extrabold tracking-tight text-[#1D1B1A] dark:text-white group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7] transition-colors">
                    {kpi.formattedAmount}
                  </p>

                  {/* Percentage Change Indicator */}
                  <div
                    className={cn(
                      'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold shrink-0',
                      kpi.isPositive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                    )}
                  >
                    {kpi.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>
                      {kpi.isPositive ? '+' : ''}
                      {kpi.percentChange}%
                    </span>
                  </div>
                </div>

                {/* Subtext Comparison with Previous Period */}
                <div className="flex items-center justify-between text-[11px] text-[#6B7280] dark:text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="truncate">
                    Prev: <strong>{kpi.formattedPreviousAmount}</strong> ({kpi.comparisonLabel})
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
