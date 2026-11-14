import { useState } from 'react';
import {
  PlusCircle,
  Truck,
  ArrowDownToLine,
  Receipt,
  CreditCard,
  Calculator,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  {
    id: 'new-sale',
    title: 'New Sale',
    desc: 'Retail counter POS or wholesale mandi sale',
    icon: PlusCircle,
    color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    route: '/sales/new',
  },
  {
    id: 'new-purchase',
    title: 'New Purchase',
    desc: 'Mandi auction lot or farmer inward entry',
    icon: ArrowDownToLine,
    color: 'bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]',
    route: '/purchases',
  },
  {
    id: 'collect-credit',
    title: 'Receive Customer Payment',
    desc: 'Record cash, UPI or NEFT Udhar receipt',
    icon: CreditCard,
    color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
    route: '/customer-credit',
  },
  {
    id: 'record-expense',
    title: 'Add Expense',
    desc: 'Hamali, transport freight & yard charges',
    icon: Receipt,
    color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    route: '/daily-closing',
  },
  {
    id: 'stock-transfer',
    title: 'Stock Transfer',
    desc: 'Transfer sacks between Shop & Godowns',
    icon: Truck,
    color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
    route: '/inventory',
  },
  {
    id: 'daily-closing',
    title: 'Daily Closing',
    desc: 'Evening register & cash drawer reconciliation',
    icon: Calculator,
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
    route: '/daily-closing',
  },
];

export function QuickActions() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const selectedAction = ACTIONS.find((a) => a.id === activeModal);

  return (
    <>
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left">
        <div className="pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-[#1D1B1A] dark:text-white">
              Section 7: Quick Business Operations & Entries
            </h3>
            <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
              One-click shortcuts for counter operators, warehouse supervisors and business owners
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-3">
          {ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  if (action.route.startsWith('/')) {
                    navigate(action.route);
                  } else {
                    setActiveModal(action.id);
                  }
                }}
                className="group p-3 sm:p-3.5 rounded-xl border border-gray-200/80 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-850/50 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all duration-150 flex flex-col justify-between text-left select-none active:scale-[0.98]"
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-105 shrink-0 ${action.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#1D1B1A] dark:text-white group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7] transition-colors line-clamp-1">
                    {action.title}
                  </h4>
                  <p className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-0.5 line-clamp-1">
                    {action.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Action Modal Placeholder */}
      {activeModal && selectedAction && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161B22] rounded-3xl border border-[#E5E7EB] dark:border-gray-800 shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl ${selectedAction.color}`}>
                  <selectedAction.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
                    {selectedAction.title}
                  </h3>
                  <p className="text-xs text-gray-500">{selectedAction.desc}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300">
              <p className="font-semibold text-[#003A41] dark:text-[#58AFB7]">
                Quick Entry Mode
              </p>
              <p className="mt-1">
                You can complete this operation directly or navigate to the dedicated module for advanced bulk entries.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate(selectedAction.route);
                  setActiveModal(null);
                }}
                className="px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Open Form</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
