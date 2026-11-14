export type SalesType = 'retail' | 'wholesale';

export type PaymentMethod =
  | 'cash'
  | 'upi'
  | 'bank_transfer'
  | 'card'
  | 'udhar_credit'
  | 'partial';

export type OrderStatus =
  | 'completed'
  | 'dispatched'
  | 'pending_dispatch'
  | 'order_confirmed'
  | 'returned';

export interface SaleItem {
  id: string;
  productId: string;
  productName: string;
  variety: string;
  unit: 'kg' | 'sack' | 'quintal' | 'box';
  quantity: number;
  weightPerUnitKg?: number;
  totalWeightKg: number;
  ratePerUnit: number; // Price per kg or per sack
  taxPercent: number;
  discount: number;
  total: number;
}

export interface WholesaleCustomer {
  id: string;
  name: string;
  tradeName?: string;
  phone: string;
  city: string;
  address: string;
  gstin?: string;
  creditLimit: number;
  outstandingBalance: number; // Current Udhar
  status: 'active' | 'warning' | 'blocked';
  overdueDays?: number;
}

export interface DispatchDetails {
  vehicleNumber?: string;
  driverName?: string;
  driverPhone?: string;
  transporterName?: string;
  destinationMandi?: string;
  biltyNumber?: string;
  hamaliCharges?: number;
}

export interface SaleRecord {
  id: string;
  invoiceNo: string;
  orderNo?: string;
  type: SalesType;
  date: string;
  time: string;
  timestamp: number;
  // Customer info
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerCity?: string;
  // Commodity items
  items: SaleItem[];
  // Pricing & Financials
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  hamaliCharges: number;
  transportCharges: number;
  roundOff: number;
  grandTotal: number;
  // Payment
  paymentMethod: PaymentMethod;
  amountPaid: number;
  balanceDue: number; // Udhar / Credit amount
  dueDate?: string;
  // Operational state
  status: OrderStatus;
  dispatchDetails?: DispatchDetails;
  locationId: string;
  locationName: string;
  notes?: string;
}

export interface SalesOrderRecord {
  id: string;
  orderNo: string;
  date: string;
  expectedDispatchDate: string;
  customerId: string;
  customerName: string;
  customerCity: string;
  items: SaleItem[];
  totalAmount: number;
  advanceReceived: number;
  balanceDue: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'cancelled';
  dispatchVehicle?: string;
  destinationMandi: string;
}

export interface SalesReturnRecord {
  id: string;
  returnNo: string;
  invoiceNo: string;
  type: SalesType;
  date: string;
  customerId?: string;
  customerName: string;
  items: SaleItem[];
  totalRefundAmount: number;
  refundMethod: 'cash' | 'credit_note' | 'udhar_reversal';
  reason: 'Weight Shortage' | 'Spoiled / Rotten' | 'Quality Mismatch' | 'Cancelled Order';
  restocked: boolean;
  status: 'processed' | 'pending_inspection';
}

export interface ProductCatalogItem {
  id: string;
  name: string;
  variety: string;
  category: 'onion' | 'potato' | 'garlic' | 'combos' | 'other';
  barcode: string;
  currentStockSacks: number;
  currentStockKg: number;
  weightPerSackKg: number;
  retailPricePerKg: number;
  wholesalePricePerKg: number;
  wholesalePricePerSack: number;
  location: string;
  imageColor?: string;
  isPopular?: boolean;
}

