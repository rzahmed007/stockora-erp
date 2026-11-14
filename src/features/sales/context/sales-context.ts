import { createContext } from 'react';
import {
  SaleRecord,
  SalesOrderRecord,
  SalesReturnRecord,
  ProductCatalogItem,
  WholesaleCustomer,
} from '../types/sales.types';

export interface SalesContextType {
  sales: SaleRecord[];
  orders: SalesOrderRecord[];
  returns: SalesReturnRecord[];
  products: ProductCatalogItem[];
  customers: WholesaleCustomer[];
  selectedInvoice: SaleRecord | null;
  openInvoiceModal: (invoice: SaleRecord) => void;
  closeInvoiceModal: () => void;
  createSale: (
    newSale: Omit<SaleRecord, 'id' | 'invoiceNo' | 'date' | 'time' | 'timestamp'>
  ) => SaleRecord;
  createSalesOrder: (
    newOrder: Omit<SalesOrderRecord, 'id' | 'orderNo' | 'date'>
  ) => SalesOrderRecord;
  createSalesReturn: (
    newReturn: Omit<SalesReturnRecord, 'id' | 'returnNo' | 'date'>
  ) => SalesReturnRecord;
  // Live KPI helpers
  totalSalesToday: number;
  retailSalesToday: number;
  wholesaleSalesToday: number;
  todayCashCollected: number;
  todayUdharIncurred: number;
}

export const SalesContext = createContext<SalesContextType | undefined>(undefined);

