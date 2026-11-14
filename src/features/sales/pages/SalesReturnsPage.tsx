import { useState } from 'react';
import { Plus, RotateCcw, Search, CheckCircle } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { useSales } from '../context/useSales';

export function SalesReturnsPage() {
  const { returns, sales, products, createSalesReturn } = useSales();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Return creation form state
  const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(sales[0]?.invoiceNo || '');
  const [reason, setReason] = useState<
    'Weight Shortage' | 'Spoiled / Rotten' | 'Quality Mismatch' | 'Cancelled Order'
  >('Quality Mismatch');
  const [refundMethod, setRefundMethod] = useState<'cash' | 'credit_note' | 'udhar_reversal'>(
    'udhar_reversal'
  );
  const [returnQuantity, setReturnQuantity] = useState<number>(5);
  const [refundAmount, setRefundAmount] = useState<number>(8750);
  const [restockItem, setRestockItem] = useState<boolean>(true);

  const matchedSale = sales.find((s) => s.invoiceNo === selectedInvoiceNo);

  const handleCreateReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedSale) return;

    createSalesReturn({
      type: matchedSale.type,
      invoiceNo: matchedSale.invoiceNo,
      customerId: matchedSale.customerId,
      customerName: matchedSale.customerName,
      items: [
        {
          id: `ret-it-${Date.now()}`,
          productId: matchedSale.items[0]?.productId || products[0].id,
          productName: matchedSale.items[0]?.productName || products[0].name,
          variety: matchedSale.items[0]?.variety || products[0].variety,
          unit: matchedSale.items[0]?.unit || 'sack',
          quantity: returnQuantity,
          totalWeightKg: returnQuantity * (matchedSale.items[0]?.weightPerUnitKg || 50),
          ratePerUnit: matchedSale.items[0]?.ratePerUnit || 1750,
          taxPercent: 0,
          discount: 0,
          total: refundAmount,
        },
      ],
      totalRefundAmount: refundAmount,
      refundMethod,
      reason,
      restocked: restockItem,
      status: 'processed',
    });

    setIsModalOpen(false);
  };

  const filteredReturns = returns.filter((r) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.returnNo.toLowerCase().includes(q) ||
      r.invoiceNo.toLowerCase().includes(q) ||
      r.customerName.toLowerCase().includes(q) ||
      r.reason.toLowerCase().includes(q)
    );
  });

  return (
    <PageContainer>
      <PageHeader
        title="Sales Returns & Reversals"
        description="Manage commodity returns, Mandi weight shortages, credit note reversals and inventory restocking."
        action={
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-sm transition-all active:scale-[0.99]"
          >
            <Plus className="h-4 w-4" />
            <span>Record Return / Credit Note</span>
          </button>
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
              placeholder="Search return #, invoice, buyer..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
            />
          </div>

          <span className="text-xs font-bold text-gray-500">
            {filteredReturns.length} Return Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Return Note #</th>
                <th className="py-3 px-3">Orig. Invoice #</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Customer / Buyer</th>
                <th className="py-3 px-3">Returned Commodity</th>
                <th className="py-3 px-3">Reason</th>
                <th className="py-3 px-3 text-right">Refund Amount</th>
                <th className="py-3 px-3">Settlement</th>
                <th className="py-3 px-3 text-center">Restocked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredReturns.map((ret) => (
                <tr key={ret.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40">
                  <td className="py-3 px-3 font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                    {ret.returnNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-600 dark:text-gray-300">
                    {ret.invoiceNo}
                  </td>
                  <td className="py-3 px-3 text-gray-500">{ret.date}</td>
                  <td className="py-3 px-3 font-bold text-[#1D1B1A] dark:text-white">
                    {ret.customerName}
                  </td>
                  <td className="py-3 px-3">
                    {ret.items.map((it) => `${it.quantity} ${it.unit} ${it.productName}`).join(', ')}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                      {ret.reason}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-extrabold text-rose-600 dark:text-rose-400">
                    -₹{ret.totalRefundAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 capitalize font-semibold text-gray-700 dark:text-gray-300">
                    {ret.refundMethod.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-3 text-center">
                    {ret.restocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                        <CheckCircle className="h-3 w-3" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400">
                        Damaged / No
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Return Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#161B22] rounded-3xl border border-[#E5E7EB] dark:border-gray-800 shadow-xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center">
                  <RotateCcw className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-[#1D1B1A] dark:text-white">
                  Record Sales Return
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateReturn} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">
                  Select Original Invoice
                </label>
                <select
                  value={selectedInvoiceNo}
                  onChange={(e) => setSelectedInvoiceNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-semibold text-[#1D1B1A] dark:text-white"
                >
                  {sales.map((s) => (
                    <option key={s.id} value={s.invoiceNo}>
                      {s.invoiceNo} — {s.customerName} (₹{s.grandTotal.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Return Quantity (Sacks / Kg)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={returnQuantity}
                    onChange={(e) => setReturnQuantity(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Refund / Reversal Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Return Reason
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value as typeof reason)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="Quality Mismatch">Quality Mismatch</option>
                    <option value="Weight Shortage">Weight Shortage</option>
                    <option value="Spoiled / Rotten">Spoiled / Rotten</option>
                    <option value="Cancelled Order">Cancelled Order</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-600 dark:text-gray-300 mb-1">
                    Refund Mode
                  </label>
                  <select
                    value={refundMethod}
                    onChange={(e) => setRefundMethod(e.target.value as typeof refundMethod)}
                    className="w-full px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  >
                    <option value="udhar_reversal">Udhar Reversal (Deduct Outstanding)</option>
                    <option value="cash">Spot Cash Refund</option>
                    <option value="credit_note">Issue Credit Note</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1D1B1A] dark:text-white">Restock Commodity</p>
                  <p className="text-[10px] text-gray-500">
                    Add returned weight back to inventory yard stock
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={restockItem}
                  onChange={(e) => setRestockItem(e.target.checked)}
                  className="rounded text-[#003A41] h-4 w-4"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#003A41] text-white text-xs font-bold hover:bg-[#002d33]"
                >
                  Confirm & Process Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
