import { useState } from 'react';
import {
  PlusCircle,
  Truck,
  UserPlus,
  ArrowDownToLine,
  Receipt,
  CreditCard,
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
    title: 'Mandi Inward Entry',
    desc: 'Record auction lot / farmer purchase',
    icon: ArrowDownToLine,
    color: 'bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7]',
    route: '/purchases',
  },
  {
    id: 'add-customer',
    title: 'Add Wholesale Customer',
    desc: 'Register buyer & set credit limit',
    icon: UserPlus,
    color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400',
    route: '/customers',
  },
  {
    id: 'stock-transfer',
    title: 'Inter-Yard Stock Transfer',
    desc: 'Transfer sacks between Shop & Godown',
    icon: Truck,
    color: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400',
    route: '/inventory',
  },
  {
    id: 'record-expense',
    title: 'Daily Mandi Expense',
    desc: 'Hamali, transport & yard costs',
    icon: Receipt,
    color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    route: '/daily-closing',
  },
  {
    id: 'collect-credit',
    title: 'Receive Udhar Payment',
    desc: 'Log cash or bank NEFT receipt',
    icon: CreditCard,
    color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400',
    route: '/customer-credit',
  },
];

export function QuickActions() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const selectedAction = ACTIONS.find((a) => a.id === activeModal);

  return (
    <>
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
        <div className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
            Quick ERP Actions
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Frequent daily operations: billing, mandi entries, and stock transfers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
          {ACTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveModal(item.id)}
                className="p-3.5 rounded-xl bg-[#F8FAFC] dark:bg-gray-800/60 border border-[#E5E7EB] dark:border-gray-700/80 text-left hover:border-[#003A41] dark:hover:border-[#58AFB7] transition-all group flex flex-col justify-between"
              >
                <div
                  className={`h-9 w-9 rounded-xl ${item.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1D1B1A] dark:text-white leading-snug group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7]">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#6B7280] dark:text-gray-400 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Action Preview Dialog */}
      {selectedAction && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in-50 duration-150">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-9 w-9 rounded-xl ${selectedAction.color} flex items-center justify-center`}
                >
                  <selectedAction.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
                    {selectedAction.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">
                    Stockora ERP Fast Entry Workflow
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-xs text-[#6B7280] dark:text-gray-300 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Ready for transaction entry</span>
              </div>
              <p>
                This quick action provides rapid entry for <strong>{selectedAction.title}</strong> with auto-calculated mandi commissions, market yard taxes, and real-time inventory deduction.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-[#1D1B1A] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  navigate(selectedAction.route);
                }}
                className="px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-xs font-semibold text-white shadow-sm"
              >
                Proceed to Module
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

