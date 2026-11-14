import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, ShoppingCart, Truck, Plus } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { useSales } from '../context/useSales';
import { InvoiceModal } from '../components/InvoiceModal';

export function SalesInvoicesPage() {
  const { sales, openInvoiceModal } = useSales();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = useMemo(() => {
    return sales.filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.invoiceNo.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q) ||
        s.paymentMethod.toLowerCase().includes(q)
      );
    });
  }, [sales, searchQuery]);

  return (
    <PageContainer>
      <PageHeader
        title="Sales Invoices Register"
        description="Official tax invoices, APMC mandi billing documents and counter POS receipts for GST and accounting."
        action={
          <Link
            to="/sales/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-sm transition-all active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Invoice</span>
          </Link>
        }
      />

      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs text-left space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice number, customer..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
            />
          </div>

          <span className="text-xs font-bold text-gray-500">
            {filteredInvoices.length} Total Invoices Generated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">Billed Customer</th>
                <th className="py-3 px-3">Taxable Value</th>
                <th className="py-3 px-3">Mandi Cess / Tax</th>
                <th className="py-3 px-3 text-right">Invoice Amount</th>
                <th className="py-3 px-3 text-center">Settlement Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40">
                  <td className="py-3 px-3 font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                    {inv.invoiceNo}
                  </td>
                  <td className="py-3 px-3 text-gray-500">{inv.date}</td>
                  <td className="py-3 px-3">
                    {inv.type === 'retail' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                        <ShoppingCart className="h-2.5 w-2.5" /> Retail POS
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-400">
                        <Truck className="h-2.5 w-2.5" /> Wholesale
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-bold text-[#1D1B1A] dark:text-white">
                    {inv.customerName}
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-600 dark:text-gray-300">
                    ₹{inv.subtotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-medium text-gray-600 dark:text-gray-300">
                    ₹{inv.taxAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                    ₹{inv.grandTotal.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {inv.balanceDue <= 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                        Fully Settled
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                        Udhar (Due ₹{inv.balanceDue.toLocaleString()})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => openInvoiceModal(inv)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-semibold text-[#003A41] dark:text-[#58AFB7] transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceModal />
    </PageContainer>
  );
}
