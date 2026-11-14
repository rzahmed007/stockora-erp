import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  ShoppingCart,
  Truck,
  Eye,
  CreditCard,
  Banknote,
  TrendingUp,
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { useSales } from '../context/useSales';
import { InvoiceModal } from '../components/InvoiceModal';
import { cn } from '@/lib/utils';

export function AllSalesPage() {
  const {
    sales,
    totalSalesToday,
    retailSalesToday,
    wholesaleSalesToday,
    todayCashCollected,
    todayUdharIncurred,
    openInvoiceModal,
  } = useSales();

  const [filterType, setFilterType] = useState<'all' | 'retail' | 'wholesale' | 'udhar'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered sales list
  const filteredSales = useMemo(() => {
    return sales.filter((sale) => {
      // Type match
      if (filterType === 'retail' && sale.type !== 'retail') return false;
      if (filterType === 'wholesale' && sale.type !== 'wholesale') return false;
      if (filterType === 'udhar' && sale.balanceDue <= 0) return false;

      // Query match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchInv = sale.invoiceNo.toLowerCase().includes(q);
      const matchCustomer = sale.customerName.toLowerCase().includes(q);
      const matchCity = sale.customerCity?.toLowerCase().includes(q);
      const matchItem = sale.items.some(
        (it) =>
          it.productName.toLowerCase().includes(q) || it.variety.toLowerCase().includes(q)
      );

      return matchInv || matchCustomer || matchCity || matchItem;
    });
  }, [sales, filterType, searchQuery]);

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader
        title="Sales Register & Invoices"
        description="Unified sales management across retail counter billing and wholesale mandi dispatches."
        action={
          <div className="flex items-center gap-2">
            <Link
              to="/sales/new?type=retail"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-[#1D1B1A] dark:text-white hover:bg-gray-50 shadow-2xs transition-colors"
            >
              <ShoppingCart className="h-3.5 w-3.5 text-emerald-600" />
              <span>Retail POS</span>
            </Link>

            <Link
              to="/sales/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-sm transition-all active:scale-[0.99]"
            >
              <Plus className="h-4 w-4" />
              <span>New Sale</span>
            </Link>
          </div>
        }
      />

      {/* Top Sales KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
        {/* KPI 1: Total Sales */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Total Sales (Today)
            </span>
            <div className="h-7 w-7 rounded-lg bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-[#1D1B1A] dark:text-white mt-1">
            ₹{totalSalesToday.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1">
            <span>Retail: ₹{retailSalesToday.toLocaleString()}</span>
            <span>•</span>
            <span>Wholesale: ₹{wholesaleSalesToday.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI 2: Cash Collected */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Cash & Spot Paid
            </span>
            <div className="h-7 w-7 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
              <Banknote className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
            ₹{todayCashCollected.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Cash, UPI & bank receipts settled</p>
        </div>

        {/* KPI 3: Udhar Incurred */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Credit / Udhar Incurred
            </span>
            <div className="h-7 w-7 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 flex items-center justify-center">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
            ₹{todayUdharIncurred.toLocaleString()}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Debited to customer Udhar ledger</p>
        </div>

        {/* KPI 4: Total Invoices */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Invoices Generated
            </span>
            <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
              <Truck className="h-3.5 w-3.5" />
            </div>
          </div>
          <p className="text-xl font-extrabold text-[#1D1B1A] dark:text-white mt-1">
            {sales.length} Bills
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            {sales.filter((s) => s.type === 'retail').length} Retail POS •{' '}
            {sales.filter((s) => s.type === 'wholesale').length} Wholesale
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 text-xs font-semibold overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All Sales (${sales.length})` },
            {
              id: 'retail',
              label: `Retail POS (${sales.filter((s) => s.type === 'retail').length})`,
            },
            {
              id: 'wholesale',
              label: `Wholesale (${sales.filter((s) => s.type === 'wholesale').length})`,
            },
            {
              id: 'udhar',
              label: `Udhar / Credit (${sales.filter((s) => s.balanceDue > 0).length})`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as typeof filterType)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150',
                filterType === tab.id
                  ? 'bg-white dark:bg-gray-900 text-[#003A41] dark:text-[#58AFB7] shadow-xs font-bold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-[#1D1B1A] dark:hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice, customer, item..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-[#1D1B1A] dark:text-white placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#003A41]/20"
          />
        </div>
      </div>

      {/* Sales Transactions Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-3">Customer / Buyer</th>
                <th className="py-3 px-3">Items & Qty</th>
                <th className="py-3 px-3">Payment Terms</th>
                <th className="py-3 px-3 text-right">Grand Total</th>
                <th className="py-3 px-3 text-right">Balance Due</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-gray-400">
                    No sales invoices found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="py-3 px-3 font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                      {sale.invoiceNo}
                    </td>

                    <td className="py-3 px-3">
                      {sale.type === 'retail' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          <ShoppingCart className="h-2.5 w-2.5" /> Retail POS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                          <Truck className="h-2.5 w-2.5" /> Wholesale
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-gray-500">
                      <div>{sale.date}</div>
                      <div className="text-[10px] text-gray-400">{sale.time}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-bold text-[#1D1B1A] dark:text-white">
                        {sale.customerName}
                      </div>
                      <div className="text-[10px] text-gray-500">{sale.customerCity}</div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-gray-700 dark:text-gray-300">
                        {sale.items.map((it) => it.productName).join(', ')}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {sale.items.reduce((acc, it) => acc + it.quantity, 0)}{' '}
                        {sale.items[0]?.unit || 'units'} (
                        {sale.items.reduce((acc, it) => acc + it.totalWeightKg, 0).toLocaleString()}{' '}
                        kg)
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="capitalize font-semibold text-gray-700 dark:text-gray-300">
                        {sale.paymentMethod.replace('_', ' ')}
                      </span>
                      {sale.dueDate && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400">
                          Due: {sale.dueDate}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                      ₹{sale.grandTotal.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 text-right font-bold">
                      {sale.balanceDue > 0 ? (
                        <span className="text-amber-600 dark:text-amber-400">
                          ₹{sale.balanceDue.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400">₹0 (Paid)</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="capitalize">{sale.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openInvoiceModal(sale)}
                          className="h-7 w-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                          title="View & Print Invoice"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Modal for Printable Preview */}
      <InvoiceModal />
    </PageContainer>
  );
}
