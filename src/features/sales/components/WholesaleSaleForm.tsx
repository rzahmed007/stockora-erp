import { useState, useMemo } from 'react';
import {
  User,
  Plus,
  Trash2,
  Truck,
  CheckCircle,
  AlertTriangle,
  Receipt,
  FileText,
  Building2,
  CreditCard,
  Banknote,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useSales } from '../context/useSales';
import { SaleItem, PaymentMethod } from '../types/sales.types';
import { cn } from '@/lib/utils';

export function WholesaleSaleForm() {
  const { products, customers, createSale, createSalesOrder, openInvoiceModal } = useSales();

  // Customer Selection
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');

  // Line items state
  const [items, setItems] = useState<SaleItem[]>([
    {
      id: `ws-item-${Date.now()}`,
      productId: products[0]?.id || '',
      productName: products[0]?.name || '',
      variety: products[0]?.variety || '',
      unit: 'sack',
      quantity: 50,
      weightPerUnitKg: 50,
      totalWeightKg: 2500,
      ratePerUnit: products[0]?.wholesalePricePerSack || 1750,
      taxPercent: 0,
      discount: 0,
      total: (products[0]?.wholesalePricePerSack || 1750) * 50,
    },
  ]);

  // Mandi & Additional Charges
  const [hamaliRatePerSack, setHamaliRatePerSack] = useState<number>(30); // ₹30/sack
  const [includeHamali, setIncludeHamali] = useState<boolean>(true);
  const [transportCharges, setTransportCharges] = useState<number>(2000);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [applyMandiCess, setApplyMandiCess] = useState<boolean>(false); // APMC Cess 1.05%

  // Payment configuration
  const [paymentType, setPaymentType] = useState<'cash' | 'udhar' | 'partial'>('udhar');
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [creditDueDays, setCreditDueDays] = useState<number>(15);

  // Dispatch details (Collapsible)
  const [showDispatchSection, setShowDispatchSection] = useState<boolean>(true);
  const [vehicleNumber, setVehicleNumber] = useState('MH-15-EG-4491');
  const [driverName, setDriverName] = useState('Sanjay Shinde');
  const [driverPhone, setDriverPhone] = useState('+91 98231 11200');
  const [transporterName, setTransporterName] = useState('Nashik Golden Roadways');
  const [destinationMandi, setDestinationMandi] = useState('Mumbai Vashi APMC Yard');
  const [biltyNumber, setBiltyNumber] = useState('LR-9921');
  const [notes, setNotes] = useState('');

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected customer details
  const selectedCustomer = useMemo(
    () => customers.find((c) => c.id === selectedCustomerId),
    [customers, selectedCustomerId]
  );

  // Line item manipulation
  const addItemLine = () => {
    const firstProduct = products[0];
    if (!firstProduct) return;

    setItems((prev) => [
      ...prev,
      {
        id: `ws-item-${Date.now()}-${Math.random()}`,
        productId: firstProduct.id,
        productName: firstProduct.name,
        variety: firstProduct.variety,
        unit: 'sack',
        quantity: 20,
        weightPerUnitKg: firstProduct.weightPerSackKg,
        totalWeightKg: 20 * firstProduct.weightPerSackKg,
        ratePerUnit: firstProduct.wholesalePricePerSack,
        taxPercent: 0,
        discount: 0,
        total: 20 * firstProduct.wholesalePricePerSack,
      },
    ]);
  };

  const removeItemLine = (index: number) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItemProduct = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const totalWeightKg = it.quantity * product.weightPerSackKg;
        return {
          ...it,
          productId: product.id,
          productName: product.name,
          variety: product.variety,
          weightPerUnitKg: product.weightPerSackKg,
          totalWeightKg,
          ratePerUnit: product.wholesalePricePerSack,
          total: it.quantity * product.wholesalePricePerSack,
        };
      })
    );
  };

  const updateItemQuantity = (index: number, sacks: number) => {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        const totalWeightKg = sacks * (it.weightPerUnitKg || 50);
        return {
          ...it,
          quantity: sacks,
          totalWeightKg,
          total: sacks * it.ratePerUnit,
        };
      })
    );
  };

  const updateItemRate = (index: number, rate: number) => {
    setItems((prev) =>
      prev.map((it, i) => {
        if (i !== index) return it;
        return {
          ...it,
          ratePerUnit: rate,
          total: it.quantity * rate,
        };
      })
    );
  };

  // Totals calculations
  const totalSacks = useMemo(
    () => items.reduce((acc, it) => acc + it.quantity, 0),
    [items]
  );

  const totalWeightKg = useMemo(
    () => items.reduce((acc, it) => acc + it.totalWeightKg, 0),
    [items]
  );

  const totalWeightQuintals = useMemo(
    () => (totalWeightKg / 100).toFixed(1),
    [totalWeightKg]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.total, 0),
    [items]
  );

  const hamaliTotal = useMemo(
    () => (includeHamali ? totalSacks * hamaliRatePerSack : 0),
    [includeHamali, totalSacks, hamaliRatePerSack]
  );

  const mandiCess = useMemo(
    () => (applyMandiCess ? Math.round(subtotal * 0.0105) : 0),
    [applyMandiCess, subtotal]
  );

  const grandTotal = useMemo(() => {
    return Math.max(
      0,
      subtotal + hamaliTotal + transportCharges + mandiCess - discountAmount
    );
  }, [subtotal, hamaliTotal, transportCharges, mandiCess, discountAmount]);

  // Payment Breakdown
  const amountPaid = useMemo(() => {
    if (paymentType === 'cash') return grandTotal;
    if (paymentType === 'partial') return Math.min(advanceAmount, grandTotal);
    return 0; // udhar
  }, [paymentType, grandTotal, advanceAmount]);

  const balanceDue = useMemo(
    () => Math.max(0, grandTotal - amountPaid),
    [grandTotal, amountPaid]
  );

  // Credit Limit Check
  const newOutstandingAfterSale = useMemo(() => {
    if (!selectedCustomer) return 0;
    return selectedCustomer.outstandingBalance + balanceDue;
  }, [selectedCustomer, balanceDue]);

  const exceedsCreditLimit = useMemo(() => {
    if (!selectedCustomer) return false;
    return newOutstandingAfterSale > selectedCustomer.creditLimit;
  }, [selectedCustomer, newOutstandingAfterSale]);

  // Format Due Date
  const dueDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + creditDueDays);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }, [creditDueDays]);

  // Handle Generate Invoice & Dispatch
  const handleGenerateInvoice = () => {
    if (!selectedCustomer || items.length === 0) return;
    setIsSubmitting(true);

    const paymentMethod: PaymentMethod =
      paymentType === 'cash'
        ? 'cash'
        : paymentType === 'partial'
        ? 'partial'
        : 'udhar_credit';

    const saleRecord = createSale({
      type: 'wholesale',
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerCity: selectedCustomer.city,
      items,
      subtotal,
      taxAmount: mandiCess,
      discountAmount,
      hamaliCharges: hamaliTotal,
      transportCharges,
      roundOff: 0,
      grandTotal,
      paymentMethod,
      amountPaid,
      balanceDue,
      dueDate: balanceDue > 0 ? dueDateStr : undefined,
      status: 'dispatched',
      dispatchDetails: {
        vehicleNumber,
        driverName,
        driverPhone,
        transporterName,
        destinationMandi,
        biltyNumber,
        hamaliCharges: hamaliTotal,
      },
      locationId: 'loc-warehouse',
      locationName: 'Shree Cold Storage (Hub #3)',
      notes: notes || undefined,
    });

    setIsSubmitting(false);
    setSuccessMessage(`Wholesale Invoice ${saleRecord.invoiceNo} dispatched successfully!`);
    openInvoiceModal(saleRecord);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  // Handle Save as Sales Order (without immediate stock dispatch)
  const handleSaveSalesOrder = () => {
    if (!selectedCustomer || items.length === 0) return;
    setIsSubmitting(true);

    const order = createSalesOrder({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerCity: selectedCustomer.city,
      expectedDispatchDate: dueDateStr,
      items,
      totalAmount: grandTotal,
      advanceReceived: amountPaid,
      balanceDue,
      status: 'confirmed',
      destinationMandi,
      dispatchVehicle: vehicleNumber,
    });

    setIsSubmitting(false);
    setSuccessMessage(`Sales Order ${order.orderNo} created successfully!`);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-5 text-left">
      {/* 1. Customer Selection & Credit Status Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                Wholesale Buyer Account
              </h3>
              <p className="text-[11px] text-[#6B7280] dark:text-gray-400">
                Registered mandi traders, outstation buyers & commission agents
              </p>
            </div>
          </div>

          {/* Customer Dropdown */}
          <div className="w-full sm:w-80">
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#003A41]/20"
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.city})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Customer Credit Ledger Banner */}
        {selectedCustomer && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200/80 dark:border-gray-700/80">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500">Credit Limit</p>
              <p className="text-sm font-extrabold text-[#1D1B1A] dark:text-white mt-0.5">
                ₹{selectedCustomer.creditLimit.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500">
                Current Outstanding (Udhar)
              </p>
              <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                ₹{selectedCustomer.outstandingBalance.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500">Available Credit</p>
              <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                ₹{Math.max(0, selectedCustomer.creditLimit - selectedCustomer.outstandingBalance).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500">Credit Health</p>
              <div className="mt-0.5">
                {selectedCustomer.outstandingBalance > selectedCustomer.creditLimit * 0.8 ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                    <AlertTriangle className="h-3 w-3" /> Near Limit
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle className="h-3 w-3" /> Good Standing
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Warning if exceeds credit limit */}
        {exceedsCreditLimit && balanceDue > 0 && (
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center gap-2.5 text-xs text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>
              <strong>Credit Warning:</strong> Adding ₹{balanceDue.toLocaleString()} Udhar will
              push total outstanding (₹{newOutstandingAfterSale.toLocaleString()}) beyond buyer limit
              (₹{selectedCustomer?.creditLimit.toLocaleString()}).
            </span>
          </div>
        )}
      </div>

      {/* 2. Commodity Line Items Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
              Commodity & Bulk Sacks Order
            </h3>
            <p className="text-[11px] text-gray-500">
              Total Weight: {totalWeightKg.toLocaleString()} kg ({totalWeightQuintals} Quintals) • {totalSacks} Sacks
            </p>
          </div>

          <button
            type="button"
            onClick={addItemLine}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] text-xs font-bold hover:bg-[#003A41]/20 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Commodity</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-2">Commodity / Variety</th>
                <th className="py-2.5 px-2 w-28">Sacks (Bori)</th>
                <th className="py-2.5 px-2 w-24">Weight/Sack</th>
                <th className="py-2.5 px-2 w-28">Total Kg</th>
                <th className="py-2.5 px-2 w-32">Rate (₹/Sack)</th>
                <th className="py-2.5 px-2 text-right w-32">Amount</th>
                <th className="py-2.5 px-2 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                  <td className="py-2.5 px-2">
                    <select
                      value={item.productId}
                      onChange={(e) => updateItemProduct(idx, e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-[#1D1B1A] dark:text-white"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} - {p.variety}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-2.5 px-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItemQuantity(idx, parseInt(e.target.value) || 0)}
                      className="w-full px-2 py-1.5 text-xs font-bold text-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    />
                  </td>

                  <td className="py-2.5 px-2">
                    <span className="text-gray-500 font-medium">
                      {item.weightPerUnitKg || 50} kg
                    </span>
                  </td>

                  <td className="py-2.5 px-2 font-bold text-[#1D1B1A] dark:text-white">
                    {item.totalWeightKg.toLocaleString()} kg
                  </td>

                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">₹</span>
                      <input
                        type="number"
                        min="0"
                        value={item.ratePerUnit}
                        onChange={(e) => updateItemRate(idx, parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      />
                    </div>
                  </td>

                  <td className="py-2.5 px-2 text-right font-extrabold text-[#1D1B1A] dark:text-white">
                    ₹{item.total.toLocaleString()}
                  </td>

                  <td className="py-2.5 px-2 text-center">
                    <button
                      type="button"
                      disabled={items.length <= 1}
                      onClick={() => removeItemLine(idx)}
                      className="text-gray-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
                      title="Delete line"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Mandi Handling & Dispatch Logistics (Collapsible) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs space-y-4">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowDispatchSection(!showDispatchSection)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 flex items-center justify-center">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                Dispatch, Vehicle & Mandi Charges
              </h3>
              <p className="text-[11px] text-gray-500">
                Lorry number, Hamali (loading), transporter & destination yard
              </p>
            </div>
          </div>

          <button type="button" className="text-gray-500 hover:text-gray-700">
            {showDispatchSection ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {showDispatchSection && (
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-4">
            {/* Vehicle & Logistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Vehicle / Truck No.
                </label>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="e.g. MH-15-EG-4491"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Sanjay Shinde"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Driver Mobile
                </label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="e.g. +91 98231 11200"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Transporter Company
                </label>
                <input
                  type="text"
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  placeholder="e.g. Nashik Golden Roadways"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Bilty / LR Number
                </label>
                <input
                  type="text"
                  value={biltyNumber}
                  onChange={(e) => setBiltyNumber(e.target.value)}
                  placeholder="e.g. LR-9921"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">
                  Destination APMC Yard
                </label>
                <input
                  type="text"
                  value={destinationMandi}
                  onChange={(e) => setDestinationMandi(e.target.value)}
                  placeholder="e.g. Mumbai Vashi Yard"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
                />
              </div>
            </div>

            {/* Charges Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                    Hamali (Labour Handling)
                  </label>
                  <input
                    type="checkbox"
                    checked={includeHamali}
                    onChange={(e) => setIncludeHamali(e.target.checked)}
                    className="rounded text-[#003A41]"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">₹</span>
                  <input
                    type="number"
                    disabled={!includeHamali}
                    value={hamaliRatePerSack}
                    onChange={(e) => setHamaliRatePerSack(parseFloat(e.target.value) || 0)}
                    className="w-16 px-1.5 py-0.5 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                  />
                  <span className="text-[10px] text-gray-500">/sack = ₹{hamaliTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">
                  Transport Freight Charge
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">₹</span>
                  <input
                    type="number"
                    value={transportCharges}
                    onChange={(e) => setTransportCharges(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-0.5 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                    APMC Mandi Cess (1.05%)
                  </label>
                  <input
                    type="checkbox"
                    checked={applyMandiCess}
                    onChange={(e) => setApplyMandiCess(e.target.checked)}
                    className="rounded text-[#003A41]"
                  />
                </div>
                <p className="text-xs font-bold text-[#1D1B1A] dark:text-white">
                  ₹{mandiCess.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Payment Terms & Financial Summary */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
          Payment Terms & Invoice Settlement
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Payment Mode Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400">
              Payment Settlement Terms
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'udhar', label: 'Udhar (Credit)', icon: CreditCard },
                { id: 'cash', label: 'Full Cash / Spot', icon: Banknote },
                { id: 'partial', label: 'Partial Advance', icon: Building2 },
              ].map((term) => {
                const TIcon = term.icon;
                const active = paymentType === term.id;
                return (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => setPaymentType(term.id as 'cash' | 'udhar' | 'partial')}
                    className={cn(
                      'flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold border transition-all',
                      active
                        ? 'bg-[#003A41] text-white border-[#003A41] shadow-xs'
                        : 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                    )}
                  >
                    <TIcon className="h-4 w-4 mb-1" />
                    <span>{term.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Conditional fields based on payment type */}
            {paymentType === 'udhar' && (
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Credit Due In:</span>
                  <select
                    value={creditDueDays}
                    onChange={(e) => setCreditDueDays(parseInt(e.target.value) || 15)}
                    className="px-2 py-1 rounded-md text-xs font-bold border border-blue-300 dark:border-blue-700 bg-white dark:bg-gray-900"
                  >
                    <option value={7}>7 Days (Mandi Spot)</option>
                    <option value={15}>15 Days (Fortnightly)</option>
                    <option value={30}>30 Days (Monthly)</option>
                  </select>
                </div>
                <p className="text-[11px] opacity-80">
                  Payment Due Date: <strong>{dueDateStr}</strong>. Entire balance of{' '}
                  <strong>₹{grandTotal.toLocaleString()}</strong> will be debited to{' '}
                  {selectedCustomer?.name}&apos;s Udhar Ledger.
                </p>
              </div>
            )}

            {paymentType === 'partial' && (
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-900 dark:text-amber-300">
                    Advance Amount Paid Now:
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">₹</span>
                    <input
                      type="number"
                      value={advanceAmount || ''}
                      onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="w-28 px-2 py-1 text-xs font-bold border border-amber-300 dark:border-amber-700 rounded-md bg-white dark:bg-gray-900"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-[11px] text-amber-800 dark:text-amber-400">
                  <span>Balance Credited to Udhar:</span>
                  <span className="font-bold">₹{balanceDue.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Breakdown Summary */}
          <div className="p-4 rounded-xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Commodity Subtotal</span>
              <span className="font-bold text-[#1D1B1A] dark:text-white">
                ₹{subtotal.toLocaleString()}
              </span>
            </div>

            {hamaliTotal > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Hamali Loading ({totalSacks} sacks)</span>
                <span className="font-semibold">₹{hamaliTotal.toLocaleString()}</span>
              </div>
            )}

            {transportCharges > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">Transport / Freight</span>
                <span className="font-semibold">₹{transportCharges.toLocaleString()}</span>
              </div>
            )}

            {mandiCess > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-500">APMC Mandi Tax / Cess</span>
                <span className="font-semibold">₹{mandiCess.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Discount Allowance</span>
              <div className="flex items-center gap-1">
                <span className="text-gray-400">-₹</span>
                <input
                  type="number"
                  min="0"
                  value={discountAmount || ''}
                  onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  className="w-20 text-right px-1.5 py-0.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-bold text-gray-500 mb-1">
                Notes & Terms / Gate Pass Instructions
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Weighbridge slip attached, Hamali paid by buyer..."
                className="w-full px-2.5 py-1 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
              />
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm font-extrabold text-[#1D1B1A] dark:text-white">
              <span>Grand Total</span>
              <span className="text-lg text-[#003A41] dark:text-[#58AFB7]">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <div className="pt-2 border-t border-dashed border-gray-200 dark:border-gray-700 flex justify-between text-[11px]">
              <span className="text-gray-500">Paid Now:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                ₹{amountPaid.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-[11px]">
              <span className="text-gray-500">Balance into Udhar Book:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                ₹{balanceDue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          {successMessage && (
            <div className="mr-auto p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            type="button"
            disabled={isSubmitting || items.length === 0}
            onClick={handleSaveSalesOrder}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-[#1D1B1A] dark:text-white text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Save as Sales Order</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting || items.length === 0}
            onClick={handleGenerateInvoice}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#003A41] hover:bg-[#002d33] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          >
            <Receipt className="h-4 w-4" />
            <span>🚛 Generate Tax Invoice & Dispatch</span>
          </button>
        </div>
      </div>
    </div>
  );
}
