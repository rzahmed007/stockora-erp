import { ShoppingCart, Truck, Zap, ShieldCheck } from 'lucide-react';
import { SalesType } from '../types/sales.types';
import { cn } from '@/lib/utils';

interface SalesTypeSelectorProps {
  selectedType: SalesType;
  onChange: (type: SalesType) => void;
}

export function SalesTypeSelector({ selectedType, onChange }: SalesTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 select-none">
      {/* Option 1: Retail POS */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange('retail')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange('retail');
          }
        }}
        className={cn(
          'relative p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-hidden',
          selectedType === 'retail'
            ? 'bg-white dark:bg-[#161B22] border-[#003A41] dark:border-[#58AFB7] ring-2 ring-[#003A41]/15 shadow-md'
            : 'bg-white/60 dark:bg-[#161B22]/60 border-[#E5E7EB] dark:border-gray-800 hover:bg-white dark:hover:bg-[#161B22] hover:border-gray-300'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-11 w-11 rounded-xl flex items-center justify-center transition-colors',
                selectedType === 'retail'
                  ? 'bg-[#003A41] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              )}
            >
              <ShoppingCart className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
                  Retail Sale
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Counter POS
                </span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                Fast counter billing for walk-in buyers & spot retail customers
              </p>
            </div>
          </div>

          <div
            className={cn(
              'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              selectedType === 'retail'
                ? 'border-[#003A41] dark:border-[#58AFB7] bg-[#003A41] dark:bg-[#58AFB7]'
                : 'border-gray-300 dark:border-gray-600'
            )}
          >
            {selectedType === 'retail' && (
              <div className="h-2 w-2 rounded-full bg-white dark:bg-[#161B22]" />
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80 text-[11px] text-[#4B5563] dark:text-gray-400">
          <span className="inline-flex items-center gap-1 font-medium">
            <Zap className="h-3 w-3 text-amber-500" /> Instant Slip
          </span>
          <span>•</span>
          <span>Barcode & Quick Search</span>
          <span>•</span>
          <span>Cash / UPI / QR</span>
        </div>
      </div>

      {/* Option 2: Wholesale Sale */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onChange('wholesale')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onChange('wholesale');
          }
        }}
        className={cn(
          'relative p-4 sm:p-5 rounded-2xl border text-left cursor-pointer transition-all duration-200 focus:outline-hidden',
          selectedType === 'wholesale'
            ? 'bg-white dark:bg-[#161B22] border-[#003A41] dark:border-[#58AFB7] ring-2 ring-[#003A41]/15 shadow-md'
            : 'bg-white/60 dark:bg-[#161B22]/60 border-[#E5E7EB] dark:border-gray-800 hover:bg-white dark:hover:bg-[#161B22] hover:border-gray-300'
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'h-11 w-11 rounded-xl flex items-center justify-center transition-colors',
                selectedType === 'wholesale'
                  ? 'bg-[#003A41] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              )}
            >
              <Truck className="h-5 w-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
                  Wholesale Sale
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  B2B Mandi
                </span>
              </div>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
                Bulk commodity orders, registered buyer accounts & Udhar credit
              </p>
            </div>
          </div>

          <div
            className={cn(
              'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors',
              selectedType === 'wholesale'
                ? 'border-[#003A41] dark:border-[#58AFB7] bg-[#003A41] dark:bg-[#58AFB7]'
                : 'border-gray-300 dark:border-gray-600'
            )}
          >
            {selectedType === 'wholesale' && (
              <div className="h-2 w-2 rounded-full bg-white dark:bg-[#161B22]" />
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/80 text-[11px] text-[#4B5563] dark:text-gray-400">
          <span className="inline-flex items-center gap-1 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-500" /> Credit / Udhar Ledger
          </span>
          <span>•</span>
          <span>Sacks & Quintal Weighing</span>
          <span>•</span>
          <span>Dispatch & Gate Pass</span>
        </div>
      </div>
    </div>
  );
}

