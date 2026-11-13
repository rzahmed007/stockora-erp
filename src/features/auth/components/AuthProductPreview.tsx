import {
  Boxes,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

export function AuthProductPreview() {
  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* Top Floating Mini Badge - Inspired by reference design */}
      <div className="absolute -top-5 left-2 sm:left-4 z-20 hidden sm:flex items-center gap-2.5">
        <div className="h-11 w-11 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#003A41]">
          <Boxes className="h-5 w-5" />
        </div>
        <div className="w-7 h-1 rounded-full bg-[#003A41]/70" />
      </div>

      {/* Main Floating ERP Preview Card */}
      <div className="relative z-10 w-full rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_20px_45px_rgba(0,58,65,0.09)] p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,58,65,0.12)]">
        {/* Card Header with segmented navigation tabs */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#F1F5F9]">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#F4F6F8] text-xs font-medium">
            <span className="px-3 py-1.5 rounded-lg bg-white text-[#003A41] font-semibold shadow-sm flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Inventory Hub
            </span>
            <span className="px-3 py-1.5 text-[#6B7280] hidden sm:inline-block">
              Wholesale POS
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="h-3 w-3 text-emerald-600" />
            <span>Multi-Branch Live</span>
          </div>
        </div>

        {/* ERP Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 my-3.5">
          {/* Total Stock Metric */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E9EEF2]">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[11px] font-medium">Total Stock Value</span>
              <Boxes className="h-3.5 w-3.5 text-[#003A41]" />
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold text-[#1D1B1A]">
                $1,428,950
              </span>
              <span className="text-[10px] font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3" />
                +12.4%
              </span>
            </div>
          </div>

          {/* Total Sales Metric */}
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E9EEF2]">
            <div className="flex items-center justify-between text-[#6B7280]">
              <span className="text-[11px] font-medium">Wholesale Sales</span>
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-base sm:text-lg font-bold text-[#1D1B1A]">
                $384,120
              </span>
              <span className="text-[10px] font-medium text-[#6B7280]">
                4.2k orders
              </span>
            </div>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[11px] text-[#6B7280] px-1">
            <span className="font-semibold text-[#1D1B1A]">Recent Movement</span>
            <span className="text-[10px] text-[#003A41] font-medium">Auto-synced</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E9EEF2] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                TR
              </div>
              <div className="text-left">
                <p className="font-medium text-[#1D1B1A] leading-tight text-xs">
                  Bulk Shipment #TR-8821
                </p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">
                  Warehouse A → Metro Mart
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#1D1B1A] text-xs">+$14,200</p>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md mt-0.5">
                Completed
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E9EEF2] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-100/70 text-blue-800 flex items-center justify-center font-bold text-[10px]">
                IV
              </div>
              <div className="text-left">
                <p className="font-medium text-[#1D1B1A] leading-tight text-xs">
                  Invoice #IV-4091
                </p>
                <p className="text-[10px] text-[#6B7280] mt-0.5">
                  Apex Distributions • Wholesale
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-[#1D1B1A] text-xs">$8,450</p>
              <span className="inline-flex items-center gap-1 text-[9px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-md mt-0.5">
                <Clock className="h-2.5 w-2.5" />
                In Transit
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Feature Tags (Mirroring reference image chips) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-3.5 mt-3 border-t border-[#F1F5F9] text-[11px] text-[#6B7280]">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#1D1B1A] font-medium">
            <Boxes className="h-3 w-3 text-[#003A41]" />
            14.8k SKUs
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F1F5F9]">
            <CreditCard className="h-3 w-3" />
            Credit Control
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F1F5F9] hidden sm:inline-flex">
            <Layers className="h-3 w-3" />
            Batch & Expiry
          </span>
        </div>
      </div>

      {/* Bottom Floating Mini Badge - Inspired by reference design */}
      <div className="absolute -bottom-5 right-2 sm:right-6 z-20 hidden sm:flex items-center gap-2.5">
        <div className="w-7 h-1 rounded-full bg-[#003A41]/70" />
        <div className="h-11 w-11 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center font-bold text-[#003A41] text-sm">
          ERP
        </div>
      </div>
    </div>
  );
}

