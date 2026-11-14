import React, { useState, useMemo } from 'react';
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  Receipt,
  QrCode,
  CreditCard,
  Banknote,
  Coins,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import { useSales } from '../context/useSales';
import { SaleItem, PaymentMethod } from '../types/sales.types';
import { cn } from '@/lib/utils';

export function RetailSaleForm() {
  const { products, createSale, openInvoiceModal } = useSales();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [barcodeInput, setBarcodeInput] = useState('');

  // Cart state
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [customerPhone, setCustomerPhone] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [cashTendered, setCashTendered] = useState<number>(0);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Barcode quick scan
  const handleBarcodeScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    const found = products.find(
      (p) => p.barcode === barcodeInput.trim() || p.id === barcodeInput.trim()
    );
    if (found) {
      addToCart(found.id);
      setBarcodeInput('');
    }
  };

  // Cart Actions
  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalWeightKg: item.totalWeightKg + 1,
                total: (item.quantity + 1) * item.ratePerUnit,
              }
            : item
        );
      }

      const newItem: SaleItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        productId: product.id,
        productName: product.name,
        variety: product.variety,
        unit: 'kg',
        quantity: 1,
        totalWeightKg: 1,
        ratePerUnit: product.retailPricePerKg,
        taxPercent: 0,
        discount: 0,
        total: product.retailPricePerKg,
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQty,
              totalWeightKg: newQty,
              total: Math.round(newQty * item.ratePerUnit),
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountAmount(0);
    setCashTendered(0);
    setCustomerName('Walk-in Customer');
    setCustomerPhone('');
    setNotes('');
  };

  // Calculations
  const subtotal = useMemo(
    () => cart.reduce((acc, it) => acc + it.total, 0),
    [cart]
  );

  const grandTotal = useMemo(
    () => Math.max(0, subtotal - discountAmount),
    [subtotal, discountAmount]
  );

  const changeDue = useMemo(() => {
    if (paymentMethod !== 'cash' || cashTendered <= grandTotal) return 0;
    return cashTendered - grandTotal;
  }, [paymentMethod, cashTendered, grandTotal]);

  // Set Cash Presets
  const handleCashPreset = (amount: number) => {
    setCashTendered(amount);
  };

  // Handle Checkout / Invoice Creation
  const handleCompleteSale = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const saleRecord = createSale({
      type: 'retail',
      customerName: customerName.trim() || 'Walk-in Customer',
      customerPhone: customerPhone.trim() || undefined,
      customerCity: 'Counter Shop #12',
      items: cart,
      subtotal,
      taxAmount: 0,
      discountAmount,
      hamaliCharges: 0,
      transportCharges: 0,
      roundOff: 0,
      grandTotal,
      paymentMethod,
      amountPaid: grandTotal,
      balanceDue: 0,
      status: 'completed',
      locationId: 'loc-shop',
      locationName: 'Main Mandi Shop (APMC #12)',
      notes: notes || undefined,
    });

    setIsSubmitting(false);
    setSuccessMessage(`Invoice ${saleRecord.invoiceNo} generated successfully!`);
    openInvoiceModal(saleRecord);
    clearCart();

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left">
      {/* LEFT COLUMN: Product Catalog & Fast Search (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        {/* Search & Barcode Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product name, variety, or code..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white placeholder:text-[#9CA3AF] focus:outline-hidden focus:ring-2 focus:ring-[#003A41]/20 focus:border-[#003A41]"
            />
          </div>

          <form onSubmit={handleBarcodeScan} className="flex items-center gap-2">
            <div className="relative">
              <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                placeholder="Scan barcode..."
                className="w-36 sm:w-40 pl-9 pr-2 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#003A41]/20"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              Scan
            </button>
          </form>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'onion', label: '🧅 Onions' },
            { id: 'potato', label: '🥔 Potatoes' },
            { id: 'garlic', label: '🧄 Garlic' },
            { id: 'combos', label: '📦 Pre-packs' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150',
                selectedCategory === cat.id
                  ? 'bg-[#003A41] text-white shadow-xs'
                  : 'bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredProducts.map((product) => {
            const inCart = cart.find((it) => it.productId === product.id);

            return (
              <div
                key={product.id}
                onClick={() => addToCart(product.id)}
                className={cn(
                  'group p-3 sm:p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-150 select-none flex flex-col justify-between relative',
                  inCart
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 shadow-xs ring-1 ring-emerald-500/20'
                    : 'bg-white dark:bg-[#161B22] border-[#E5E7EB] dark:border-gray-800 hover:border-gray-300 hover:shadow-xs hover:-translate-y-0.5'
                )}
              >
                {inCart && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#003A41] text-white">
                    {inCart.quantity} in cart
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] font-bold text-[#6B7280] dark:text-gray-400 uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.isPopular && (
                      <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400">
                        <Sparkles className="h-2.5 w-2.5" /> Popular
                      </span>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-[#1D1B1A] dark:text-white leading-tight line-clamp-1 group-hover:text-[#003A41] dark:group-hover:text-[#58AFB7]">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-[#6B7280] dark:text-gray-400 line-clamp-1 mt-0.5">
                    {product.variety}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-[#003A41] dark:text-[#58AFB7]">
                      ₹{product.retailPricePerKg}
                    </span>
                    <span className="text-[10px] text-gray-500 ml-0.5">/kg</span>
                    <p className="text-[10px] text-gray-400">
                      {product.currentStockKg.toLocaleString()} kg left
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product.id);
                    }}
                    className="h-7 w-7 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-[#003A41] group-hover:text-white dark:group-hover:bg-[#003A41] text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: POS Billing Cart & Payment Checkout (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#161B22] border border-[#E5E7EB] dark:border-gray-800 shadow-xs flex flex-col h-full justify-between">
          <div>
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[#003A41]/10 text-[#003A41] dark:bg-[#58AFB7]/20 dark:text-[#58AFB7] flex items-center justify-center">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1D1B1A] dark:text-white">
                    Counter Bill Register
                  </h3>
                  <p className="text-[10px] text-gray-500">Shop #12 • Spot Retail Billing</p>
                </div>
              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Optional Customer Contact */}
            <div className="grid grid-cols-2 gap-2 mt-3 mb-3">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Customer Name"
                className="px-2.5 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
              />
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone (for SMS slip)"
                className="px-2.5 py-1.5 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-[#1D1B1A] dark:text-white"
              />
            </div>

            {/* Cart Items Table */}
            <div className="max-h-60 overflow-y-auto pr-1 space-y-2 border-t border-b border-gray-100 dark:border-gray-800 py-3 my-2">
              {cart.length === 0 ? (
                <div className="py-8 text-center text-gray-400 dark:text-gray-500">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-semibold">Cart is currently empty</p>
                  <p className="text-[11px] mt-0.5">Click products on the left or scan barcode</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-2 rounded-xl bg-gray-50/70 dark:bg-gray-800/40 text-xs"
                  >
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="font-bold text-[#1D1B1A] dark:text-white truncate">
                        {item.productName}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        ₹{item.ratePerUnit}/kg
                      </p>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5 px-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-5 w-5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <input
                        type="number"
                        min="0.1"
                        step="0.5"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.productId, parseFloat(e.target.value) || 0)
                        }
                        className="w-10 text-center text-xs font-bold bg-transparent border-0 focus:outline-hidden"
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-5 w-5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="w-16 text-right font-extrabold text-[#1D1B1A] dark:text-white ml-2">
                      ₹{item.total.toLocaleString()}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="ml-2 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bill Summary Calculations */}
            <div className="space-y-1.5 text-xs text-[#4B5563] dark:text-gray-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold text-[#1D1B1A] dark:text-white">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span>Discount / Round off</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">-₹</span>
                  <input
                    type="number"
                    min="0"
                    value={discountAmount || ''}
                    onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-16 text-right px-1.5 py-0.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800 text-base font-extrabold text-[#1D1B1A] dark:text-white">
                <span>Total Amount</span>
                <span className="text-lg text-[#003A41] dark:text-[#58AFB7]">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-400 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'cash', label: 'Cash', icon: Banknote },
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'bank_transfer', label: 'Bank', icon: Coins },
                ].map((m) => {
                  const MIcon = m.icon;
                  const isSelected = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                      className={cn(
                        'flex flex-col items-center justify-center p-2 rounded-xl text-[11px] font-semibold border transition-all',
                        isSelected
                          ? 'bg-[#003A41] text-white border-[#003A41] shadow-xs'
                          : 'bg-gray-50/70 dark:bg-gray-800/40 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                      )}
                    >
                      <MIcon className="h-4 w-4 mb-1" />
                      <span>{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cash Tendered Calculator (visible when cash is selected) */}
              {paymentMethod === 'cash' && grandTotal > 0 && (
                <div className="mt-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Cash Tendered
                    </span>
                    <input
                      type="number"
                      value={cashTendered || ''}
                      onChange={(e) => setCashTendered(parseFloat(e.target.value) || 0)}
                      placeholder="₹0"
                      className="w-24 text-right px-2 py-1 text-xs font-bold border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex items-center gap-1.5 justify-end">
                    {[grandTotal, 100, 500, 2000].map((preset, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCashPreset(preset)}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100"
                      >
                        {i === 0 ? 'Exact' : `₹${preset}`}
                      </button>
                    ))}
                  </div>

                  {changeDue > 0 && (
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 pt-1 border-t border-gray-200 dark:border-gray-700">
                      <span>Change to Return:</span>
                      <span>₹{changeDue.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 space-y-2">
            {successMessage && (
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <button
              type="button"
              disabled={cart.length === 0 || isSubmitting}
              onClick={handleCompleteSale}
              className={cn(
                'w-full py-3 rounded-xl font-bold text-sm shadow-sm transition-all duration-150 flex items-center justify-center gap-2',
                cart.length > 0
                  ? 'bg-[#003A41] hover:bg-[#002d33] text-white shadow-emerald-950/10 cursor-pointer active:scale-[0.99]'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
              )}
            >
              <Receipt className="h-4 w-4" />
              <span>⚡ Complete & Generate Invoice (₹{grandTotal.toLocaleString()})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
