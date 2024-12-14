export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cnpj: string;
}

export interface SupplierProduct {
  id: number;
  supplierId: number;
  productId: number;
  price: number;
  minimumOrder: number;
  deliveryTime: number;
}

export interface PurchaseOrder {
  id: number;
  supplierId: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  items: PurchaseOrderItem[];
  total: number;
}

export interface PurchaseOrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface SalePrice {
  id: number;
  productId: number;
  price: number;
  startDate: string;
  endDate?: string;
}

export interface SalesOrder {
  id: number;
  customerId: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  items: SalesOrderItem[];
  total: number;
}

export interface SalesOrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
}