import { ShieldCheck } from 'lucide-react';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

export function SidebarFooter({ isCollapsed }: SidebarFooterProps) {
  if (isCollapsed) {
    return (
      <div className="pt-3 pb-1 border-t border-[#E5E7EB]/70 dark:border-gray-800/80 flex items-center justify-center">
        <div
          className="h-3 w-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 animate-pulse"
          title="Mandi Sync: Active (3 Branches Online)"
        />
      </div>
    );
  }

  return (
    <div className="pt-3 border-t border-[#E5E7EB]/70 dark:border-gray-800/80">
      <div className="p-3 rounded-2xl bg-white/80 dark:bg-gray-850/80 border border-[#E5E7EB]/50 dark:border-gray-700/50 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-[#1D1B1A] dark:text-white leading-tight">
              Mandi Sync Active
            </p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-0.5">
              3 Branches Connected
            </p>
          </div>
        </div>

        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </div>
  );
}
