import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Clock, ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { useSales } from '../context/useSales';

export function SalesOrdersPage() {
  const { orders } = useSales();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      o.orderNo.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.destinationMandi.toLowerCase().includes(q)
    );
  });

  return (
    <PageContainer>
      <PageHeader
        title="Sales Orders (B2B Booking)"
        description="Track confirmed wholesale forward contracts, booked lots and scheduled mandi dispatches."
        action={
          <Link
            to="/sales/new?type=wholesale"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-sm transition-all active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            <span>Create Wholesale Order</span>
          </Link>
        }
      />

      {/* Orders Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order #, customer, mandi..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
            />
          </div>

          <span className="text-xs font-bold text-gray-500">
            {filteredOrders.length} Sales Orders Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Order #</th>
                <th className="py-3 px-3">Booking Date</th>
                <th className="py-3 px-3">Customer Buyer</th>
                <th className="py-3 px-3">Destination Mandi</th>
                <th className="py-3 px-3">Commodity & Sacks</th>
                <th className="py-3 px-3 text-right">Order Value</th>
                <th className="py-3 px-3 text-right">Advance Received</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40">
                  <td className="py-3 px-3 font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                    {ord.orderNo}
                  </td>
                  <td className="py-3 px-3 text-gray-500">{ord.date}</td>
                  <td className="py-3 px-3 font-bold text-[#1D1B1A] dark:text-white">
                    {ord.customerName}
                  </td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-300">
                    {ord.destinationMandi}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      {ord.items.map((it) => `${it.quantity} ${it.unit} ${it.productName}`).join(', ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                    ₹{ord.totalAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{ord.advanceReceived.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      <Clock className="h-3 w-3" /> Confirmed
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      to={`/sales/new?type=wholesale`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#003A41] dark:text-[#58AFB7] hover:underline"
                    >
                      <span>Dispatch</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
