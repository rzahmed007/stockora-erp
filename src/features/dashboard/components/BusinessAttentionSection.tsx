import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Clock,
  Boxes,
  Building,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { BusinessAttentionAlert } from '../types/dashboard.types';
import { cn } from '@/lib/utils';

interface BusinessAttentionSectionProps {
  alerts: BusinessAttentionAlert[];
}

export function BusinessAttentionSection({ alerts }: BusinessAttentionSectionProps) {
  const getIcon = (type: BusinessAttentionAlert['type']) => {
    switch (type) {
      case 'overdue_payment':
        return ShieldAlert;
      case 'low_stock':
        return Boxes;
      case 'upcoming_due':
        return Clock;
      case 'supplier_due':
        return Building;
      case 'pending_closing':
        return AlertTriangle;
      case 'closing_variance':
        return CheckCircle2;
      default:
        return DollarSign;
    }
  };

  const getUrgencyBadge = (urgency: BusinessAttentionAlert['urgency']) => {
    switch (urgency) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
      case 'info':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
          <div>
            <h2 className="text-base font-extrabold text-[#1D1B1A] dark:text-white">
              Section 5: Business Attention & Action Center
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">
              Immediate operational matters requiring owner verification, supplier payment, or customer recovery
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-gray-500">
          {alerts.length} Items Require Action
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert) => {
          const Icon = getIcon(alert.type);

          return (
            <div
              key={alert.id}
              className={cn(
                'p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between text-left shadow-2xs',
                alert.urgency === 'critical'
                  ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                  : alert.urgency === 'warning'
                  ? 'bg-amber-50/30 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60'
                  : 'bg-white dark:bg-[#161B22] border-[#E5E7EB] dark:border-gray-800'
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      'text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider',
                      getUrgencyBadge(alert.urgency)
                    )}
                  >
                    {alert.urgency} Action
                  </span>

                  {alert.amount && (
                    <span className="text-xs font-extrabold text-[#1D1B1A] dark:text-white">
                      {alert.amount}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2.5 mt-2.5">
                  <div
                    className={cn(
                      'h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                      alert.urgency === 'critical'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                        : alert.urgency === 'warning'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1D1B1A] dark:text-white leading-tight">
                      {alert.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 leading-normal">
                      {alert.description}
                    </p>
                  </div>
                </div>

                {alert.meta && (
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2.5 pt-2 border-t border-gray-200/50 dark:border-gray-800/80">
                    {alert.meta}
                  </p>
                )}
              </div>

              <div className="mt-3.5 pt-2 flex justify-end">
                <Link
                  to={alert.actionUrl}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:bg-gray-50 dark:hover:bg-gray-800 shadow-2xs transition-colors"
                >
                  <span>{alert.actionText}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

