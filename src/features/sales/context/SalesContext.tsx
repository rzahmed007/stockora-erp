import React, { useState, useMemo, useCallback } from 'react';
import {
  SaleRecord,
  SalesOrderRecord,
  SalesReturnRecord,
  ProductCatalogItem,
  WholesaleCustomer,
} from '../types/sales.types';
import {
  INITIAL_SALES_RECORDS,
  INITIAL_SALES_ORDERS,
  INITIAL_SALES_RETURNS,
  MOCK_PRODUCTS,
  MOCK_CUSTOMERS,
} from '../data/salesMockData';
import { SalesContext } from './sales-context';

export function SalesProvider({ children }: { children: React.ReactNode }) {
  const [sales, setSales] = useState<SaleRecord[]>(() => INITIAL_SALES_RECORDS);
  const [orders, setOrders] = useState<SalesOrderRecord[]>(() => INITIAL_SALES_ORDERS);
  const [returns, setReturns] = useState<SalesReturnRecord[]>(() => INITIAL_SALES_RETURNS);
  const [products, setProducts] = useState<ProductCatalogItem[]>(() => MOCK_PRODUCTS);
  const [customers, setCustomers] = useState<WholesaleCustomer[]>(() => MOCK_CUSTOMERS);
  const [selectedInvoice, setSelectedInvoice] = useState<SaleRecord | null>(null);

  const openInvoiceModal = useCallback((invoice: SaleRecord) => {
    setSelectedInvoice(invoice);
  }, []);

  const closeInvoiceModal = useCallback(() => {
    setSelectedInvoice(null);
  }, []);

  // Create Sale with live stock deduction & Udhar ledger synchronization
  const createSale = useCallback(
    (data: Omit<SaleRecord, 'id' | 'invoiceNo' | 'date' | 'time' | 'timestamp'>) => {
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const timeFormatted = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      // Sequential Invoice Number
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const invoiceNo =
        data.type === 'retail'
          ? `POS-${now.getFullYear()}-${randomSuffix}`
          : `INV-${now.getFullYear()}-${randomSuffix}`;

      const created: SaleRecord = {
        ...data,
        id: `sale-${Date.now()}`,
        invoiceNo,
        date: dateFormatted,
        time: timeFormatted,
        timestamp: now.getTime(),
      };

      // 1. Stock Deduction
      setProducts((prev) =>
        prev.map((prod) => {
          const matchedItem = data.items.find((it) => it.productId === prod.id);
          if (!matchedItem) return prod;

          const deductKg = matchedItem.totalWeightKg;
          const deductSacks =
            matchedItem.unit === 'sack'
              ? matchedItem.quantity
              : Math.ceil(deductKg / prod.weightPerSackKg);

          return {
            ...prod,
            currentStockKg: Math.max(0, prod.currentStockKg - deductKg),
            currentStockSacks: Math.max(0, prod.currentStockSacks - deductSacks),
          };
        })
      );

      // 2. Customer Credit (Udhar) Ledger Sync
      if (data.type === 'wholesale' && data.customerId && data.balanceDue > 0) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === data.customerId
              ? {
                  ...c,
                  outstandingBalance: c.outstandingBalance + data.balanceDue,
                }
              : c
          )
        );
      }

      // 3. Add to sales list
      setSales((prev) => [created, ...prev]);

      return created;
    },
    []
  );

  // Create Sales Order
  const createSalesOrder = useCallback(
    (data: Omit<SalesOrderRecord, 'id' | 'orderNo' | 'date'>) => {
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const orderNo = `SO-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const created: SalesOrderRecord = {
        ...data,
        id: `so-${Date.now()}`,
        orderNo,
        date: dateFormatted,
      };

      setOrders((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  // Create Sales Return & Restock
  const createSalesReturn = useCallback(
    (data: Omit<SalesReturnRecord, 'id' | 'returnNo' | 'date'>) => {
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const returnNo = `RET-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const created: SalesReturnRecord = {
        ...data,
        id: `ret-${Date.now()}`,
        returnNo,
        date: dateFormatted,
      };

      // Restock inventory if condition allows
      if (data.restocked) {
        setProducts((prev) =>
          prev.map((prod) => {
            const matched = data.items.find((it) => it.productId === prod.id);
            if (!matched) return prod;
            return {
              ...prod,
              currentStockKg: prod.currentStockKg + matched.totalWeightKg,
              currentStockSacks:
                matched.unit === 'sack'
                  ? prod.currentStockSacks + matched.quantity
                  : prod.currentStockSacks + Math.ceil(matched.totalWeightKg / prod.weightPerSackKg),
            };
          })
        );
      }

      // Reversal in customer Udhar ledger if applicable
      if (data.refundMethod === 'udhar_reversal' && data.customerId) {
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === data.customerId
              ? {
                  ...c,
                  outstandingBalance: Math.max(0, c.outstandingBalance - data.totalRefundAmount),
                }
              : c
          )
        );
      }

      setReturns((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  // Live KPI Computations
  const totalSalesToday = useMemo(
    () => sales.reduce((acc, s) => acc + s.grandTotal, 0),
    [sales]
  );

  const retailSalesToday = useMemo(
    () => sales.filter((s) => s.type === 'retail').reduce((acc, s) => acc + s.grandTotal, 0),
    [sales]
  );

  const wholesaleSalesToday = useMemo(
    () => sales.filter((s) => s.type === 'wholesale').reduce((acc, s) => acc + s.grandTotal, 0),
    [sales]
  );

  const todayCashCollected = useMemo(
    () => sales.reduce((acc, s) => acc + s.amountPaid, 0),
    [sales]
  );

  const todayUdharIncurred = useMemo(
    () => sales.reduce((acc, s) => acc + s.balanceDue, 0),
    [sales]
  );

  const value = useMemo(
    () => ({
      sales,
      orders,
      returns,
      products,
      customers,
      selectedInvoice,
      openInvoiceModal,
      closeInvoiceModal,
      createSale,
      createSalesOrder,
      createSalesReturn,
      totalSalesToday,
      retailSalesToday,
      wholesaleSalesToday,
      todayCashCollected,
      todayUdharIncurred,
    }),
    [
      sales,
      orders,
      returns,
      products,
      customers,
      selectedInvoice,
      openInvoiceModal,
      closeInvoiceModal,
      createSale,
      createSalesOrder,
      createSalesReturn,
      totalSalesToday,
      retailSalesToday,
      wholesaleSalesToday,
      todayCashCollected,
      todayUdharIncurred,
    ]
  );

  return <SalesContext.Provider value={value}>{children}</SalesContext.Provider>;
}
