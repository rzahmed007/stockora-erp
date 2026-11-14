import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PurchaseItem } from '../types/dashboard.types';

interface PurchaseOverviewProps {
  purchases: PurchaseItem[];
}

export function PurchaseOverview({ purchases }: PurchaseOverviewProps) {
  const getStatusBadge = (status: PurchaseItem['status']) => {
    switch (status) {
      case 'Received':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400">
            Unloaded & Verified
          </span>
        );
      case 'In-Transit':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400">
            Truck In-Transit
          </span>
        );
      case 'Quality Check':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400">
            Mandi Grading
          </span>
        );
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-[0_2px_15px_rgba(0,0,0,0.02)] text-left">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
            Recent Inward Mandi Purchases
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-gray-400 mt-0.5">
            Direct farmer lots, APMC auction procurements, and cold storage inward consignments
          </p>
        </div>

        <Link
          to="/purchases"
          className="text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] hover:underline inline-flex items-center gap-1"
        >
          <span>All Purchases</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-[#6B7280] dark:text-gray-400 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-3 px-3">PO Number</th>
              <th className="py-3 px-3">Supplier / Mandi</th>
              <th className="py-3 px-3">Commodity</th>
              <th className="py-3 px-3">Quantity</th>
              <th className="py-3 px-3">Total (₹)</th>
              <th className="py-3 px-3">Destination Yard</th>
              <th className="py-3 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
            {purchases.map((po) => (
              <tr
                key={po.id}
                className="hover:bg-[#F8FAFC] dark:hover:bg-gray-800/40 transition-colors"
              >
                <td className="py-3.5 px-3 font-semibold text-[#003A41] dark:text-[#58AFB7]">
                  {po.purchaseNo}
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-[#1D1B1A] dark:text-white">
                    {po.supplierName}
                  </div>
                  <div className="text-[10px] text-[#6B7280] dark:text-gray-400">
                    {po.mandiLocation}
                  </div>
                </td>
                <td className="py-3.5 px-3 font-medium text-[#1D1B1A] dark:text-gray-200">
                  {po.product}
                </td>
                <td className="py-3.5 px-3 text-[#6B7280] dark:text-gray-400">
                  {po.quantity}
                </td>
                <td className="py-3.5 px-3 font-bold text-[#1D1B1A] dark:text-white">
                  {po.totalAmount}
                </td>
                <td className="py-3.5 px-3 text-[#6B7280] dark:text-gray-400 font-medium">
                  {po.destinationLocation}
                </td>
                <td className="py-3.5 px-3 text-right">
                  {getStatusBadge(po.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
