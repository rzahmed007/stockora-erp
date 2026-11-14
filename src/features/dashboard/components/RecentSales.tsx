import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SaleTransaction } from '../types/dashboard.types';

interface RecentSalesProps {
  sales: SaleTransaction[];
}

export function RecentSales({ sales }: RecentSalesProps) {
  const getPaymentBadge = (type: SaleTransaction['paymentType']) => {
    switch (type) {
      case 'Cash':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400">
            Cash Spot
          </span>
        );
      case 'Credit':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400">
            Credit (Udhar)
          </span>
        );
      case 'Partial Payment':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400">
            Partial
          </span>
        );
    }
  };

  const getStatusBadge = (status: SaleTransaction['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Completed
          </span>
        );
      case 'Dispatched':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Dispatched
          </span>
        );
      case 'Pending Dispatch':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Loading
          </span>
        );
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
            Recent Sales Invoices
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Latest dispatched wholesale orders and spot cash mandi billing
          </p>
        </div>

        <Link
          to="/wholesale-sales"
          className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>View All Sales</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[#6B7280] dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-3">Invoice #</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Commodity</th>
              <th className="py-3 px-3">Quantity</th>
              <th className="py-3 px-3">Amount (₹)</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
            {sales.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#F8FAFC] dark:hover:bg-gray-800/40 transition-colors"
              >
                <td className="py-3.5 px-3 font-semibold text-[#003A41] dark:text-[#58AFB7]">
                  {item.invoiceNo}
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-[#1D1B1A] dark:text-white">
                    {item.customerName}
                  </div>
                  <div className="text-[10px] text-[#6B7280] dark:text-gray-400">
                    {item.customerCity}
                  </div>
                </td>
                <td className="py-3.5 px-3 font-medium text-[#1D1B1A] dark:text-gray-200">
                  {item.product}
                </td>
                <td className="py-3.5 px-3 text-[#6B7280] dark:text-gray-400">
                  {item.quantity}
                </td>
                <td className="py-3.5 px-3 font-bold text-[#1D1B1A] dark:text-white">
                  {item.amount}
                </td>
                <td className="py-3.5 px-3">{getPaymentBadge(item.paymentType)}</td>
                <td className="py-3.5 px-3">{getStatusBadge(item.status)}</td>
                <td className="py-3.5 px-3 text-right text-[11px] text-[#6B7280] dark:text-gray-400">
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
