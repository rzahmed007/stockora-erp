import { Link } from 'react-router-dom';
import {
  Landmark,
  Wallet,
  Receipt,
  PieChart,
  DollarSign,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { FinancialPositionKpi } from '../types/dashboard.types';
import { cn } from '@/lib/utils';

interface FinancialPositionSectionProps {
  kpis: FinancialPositionKpi[];
}

export function FinancialPositionSection({ kpis }: FinancialPositionSectionProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'fp-customer-outstanding':
        return AlertCircle;
      case 'fp-supplier-outstanding':
        return Building;
      case 'fp-cash-in-hand':
        return Wallet;
      case 'fp-bank-balance':
        return Landmark;
      case 'fp-expenses':
        return Receipt;
      case 'fp-gross-profit':
        return PieChart;
      case 'fp-net-profit':
        return TrendingUp;
      case 'fp-daily-closing':
        return CheckCircle2;
      default:
        return DollarSign;
    }
  };

  const getBadgeClass = (type?: FinancialPositionKpi['badgeType']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'warning':
        return 'bg-amber-50 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'danger':
        return 'bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
      case 'info':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
            Section 2: Financial Position & Real Profitability
          </h2>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Certified accounting metrics, live drawer cash, bank balances, audited gross & net margins
          </p>
        </div>

        <Link
          to="/accounting"
          className="text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>Ledger & Accounting</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kpis.map((kpi) => {
          const Icon = getIcon(kpi.id);

          return (
            <Link
              key={kpi.id}
              to={kpi.actionUrl}
              className="group p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold text-[#6B7280] dark:text-gray-400 leading-tight">
                    {kpi.title}
                  </span>

                  <div className="h-7 w-7 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center shrink-0 group-hover:bg-[#003A41] group-hover:text-white transition-colors">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>

                <p className="text-lg font-extrabold text-[#1D1B1A] dark:text-white mt-1">
                  {kpi.formattedAmount}
                </p>

                <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                  {kpi.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                {kpi.badge && (
                  <span
                    className={cn(
                      'text-[9px] font-bold px-2 py-0.5 rounded-full',
                      getBadgeClass(kpi.badgeType)
                    )}
                  >
                    {kpi.badge}
                  </span>
                )}

                <span className="text-[10px] font-bold text-[#003A41] dark:text-[#58AFB7] group-hover:underline ml-auto">
                  {kpi.actionLabel || 'Details →'}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

