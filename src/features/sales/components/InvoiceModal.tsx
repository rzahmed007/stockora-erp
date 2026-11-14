import { Printer, X } from 'lucide-react';
import { useSales } from '../context/useSales';
import { cn } from '@/lib/utils';

export function InvoiceModal() {
  const { selectedInvoice, closeInvoiceModal } = useSales();

  if (!selectedInvoice) return null;

  const isRetail = selectedInvoice.type === 'retail';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161B22] rounded-3xl border border-[#E5E7EB] dark:border-gray-800 shadow-2xl overflow-hidden my-8 text-left animate-in fade-in zoom-in-95 duration-200">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50/80 dark:bg-gray-850/80 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                isRetail
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                  : 'bg-[#003A41] text-white'
              )}
            >
              {isRetail ? 'Retail POS Slip' : 'Wholesale Tax Invoice'}
            </span>
            <span className="text-xs font-bold text-[#1D1B1A] dark:text-white">
              {selectedInvoice.invoiceNo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 shadow-2xs transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print Slip</span>
            </button>
            <button
              type="button"
              onClick={closeInvoiceModal}
              className="h-8 w-8 rounded-xl hover:bg-gray-200/60 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="p-6 sm:p-8 space-y-6 text-xs text-[#1D1B1A] dark:text-gray-200 printable-area">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[#003A41] text-white flex items-center justify-center font-bold text-sm">
                  S
                </div>
                <div>
                  <h2 className="text-lg font-extrabold tracking-tight text-[#003A41] dark:text-[#58AFB7]">
                    STOCKORA AGRI TRADING CO.
                  </h2>
                  <p className="text-[10px] text-gray-500">
                    APMC Market Yard Gate 2, Nashik • GSTIN: 27AABCS8891P1ZK
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-sm font-extrabold text-[#1D1B1A] dark:text-white">
                {selectedInvoice.invoiceNo}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Date: {selectedInvoice.date} • {selectedInvoice.time}
              </p>
              <p className="text-[10px] text-gray-400">
                Location: {selectedInvoice.locationName}
              </p>
            </div>
          </div>

          {/* Customer & Buyer Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-700/80 text-left">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Billed To
              </p>
              <p className="font-extrabold text-[#1D1B1A] dark:text-white text-sm">
                {selectedInvoice.customerName}
              </p>
              {selectedInvoice.customerCity && (
                <p className="text-gray-500 text-[11px]">{selectedInvoice.customerCity}</p>
              )}
              {selectedInvoice.customerPhone && (
                <p className="text-gray-500 text-[11px]">Tel: {selectedInvoice.customerPhone}</p>
              )}
            </div>

            <div className="sm:text-right space-y-1">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Payment & Order Info
              </p>
              <p className="font-semibold text-[11px]">
                Mode:{' '}
                <span className="capitalize font-bold text-[#003A41] dark:text-[#58AFB7]">
                  {selectedInvoice.paymentMethod.replace('_', ' ')}
                </span>
              </p>
              {selectedInvoice.dueDate && (
                <p className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  Credit Due Date: {selectedInvoice.dueDate}
                </p>
              )}
              {selectedInvoice.dispatchDetails?.vehicleNumber && (
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  Truck: {selectedInvoice.dispatchDetails.vehicleNumber}
                </p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-bold text-[10px] uppercase">
                  <th className="py-2 px-2">#</th>
                  <th className="py-2 px-2">Commodity Item</th>
                  <th className="py-2 px-2 text-center">Unit/Sacks</th>
                  <th className="py-2 px-2 text-center">Total Weight</th>
                  <th className="py-2 px-2 text-right">Rate</th>
                  <th className="py-2 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {selectedInvoice.items.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                    <td className="py-2.5 px-2 text-gray-400">{i + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-[#1D1B1A] dark:text-white">
                      {item.productName}
                      <span className="block text-[10px] text-gray-500 font-normal">
                        {item.variety}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center font-semibold">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {item.totalWeightKg.toLocaleString()} kg
                    </td>
                    <td className="py-2.5 px-2 text-right font-medium">
                      ₹{item.ratePerUnit.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                      ₹{item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Financial Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="text-[11px] text-gray-500 space-y-1 max-w-xs">
              <p className="font-semibold text-gray-700 dark:text-gray-300">Terms & Conditions:</p>
              <p>1. Certified weighing at Mandi APMC Bridge.</p>
              <p>2. Subject to local jurisdiction Nashik.</p>
              {selectedInvoice.notes && <p className="italic">Note: {selectedInvoice.notes}</p>}
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-right">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ₹{selectedInvoice.subtotal.toLocaleString()}
                </span>
              </div>

              {selectedInvoice.hamaliCharges > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Hamali Charges:</span>
                  <span className="font-semibold">
                    ₹{selectedInvoice.hamaliCharges.toLocaleString()}
                  </span>
                </div>
              )}

              {selectedInvoice.transportCharges > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Transport Freight:</span>
                  <span className="font-semibold">
                    ₹{selectedInvoice.transportCharges.toLocaleString()}
                  </span>
                </div>
              )}

              {selectedInvoice.taxAmount > 0 && (
                <div className="flex justify-between text-gray-500">
                  <span>Mandi Cess:</span>
                  <span className="font-semibold">₹{selectedInvoice.taxAmount.toLocaleString()}</span>
                </div>
              )}

              {selectedInvoice.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span className="font-semibold">
                    -₹{selectedInvoice.discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm font-extrabold text-[#1D1B1A] dark:text-white">
                <span>Grand Total:</span>
                <span className="text-base text-[#003A41] dark:text-[#58AFB7]">
                  ₹{selectedInvoice.grandTotal.toLocaleString()}
                </span>
              </div>

              <div className="pt-1 flex justify-between text-[11px] font-bold">
                <span className="text-gray-500">Amount Paid:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  ₹{selectedInvoice.amountPaid.toLocaleString()}
                </span>
              </div>

              {selectedInvoice.balanceDue > 0 && (
                <div className="flex justify-between text-[11px] font-bold text-amber-600 dark:text-amber-400">
                  <span>Udhar Balance Due:</span>
                  <span>₹{selectedInvoice.balanceDue.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Signature */}
          <div className="pt-6 border-t border-dashed border-gray-200 dark:border-gray-800 flex justify-between items-end text-[11px] text-gray-400">
            <div>
              <p>Generated by Stockora Agri-ERP</p>
              <p className="text-[10px]">Thank you for your business!</p>
            </div>
            <div className="text-right">
              <div className="h-8 w-28 border-b border-gray-300 dark:border-gray-700 ml-auto mb-1" />
              <p className="font-semibold text-gray-600 dark:text-gray-300">
                Authorized Signatory
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-gray-50/80 dark:bg-gray-850/80 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={closeInvoiceModal}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all active:scale-[0.99]"
          >
            <Printer className="h-4 w-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
