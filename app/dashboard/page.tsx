"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Users,
  Package,
  Building2,
  ShoppingCart,
  ShoppingBag,
} from "lucide-react";
import type {
  Customer,
  Product,
  Supplier,
  PurchaseOrder,
  SalesOrder,
} from "@/types";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    suppliers: 0,
    pendingPurchaseOrders: 0,
    pendingSalesOrders: 0,
  });

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Get stats from localStorage
    const customers = JSON.parse(localStorage.getItem("customers") || "[]");
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]");
    const purchaseOrders = JSON.parse(localStorage.getItem("purchaseOrders") || "[]");
    const salesOrders = JSON.parse(localStorage.getItem("salesOrders") || "[]");

    setStats({
      customers: customers.length,
      products: products.length,
      suppliers: suppliers.length,
      pendingPurchaseOrders: purchaseOrders.filter((o: PurchaseOrder) => o.status === "pending").length,
      pendingSalesOrders: salesOrders.filter((o: SalesOrder) => o.status === "pending").length,
    });
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clientes Cadastrados
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Produtos em Estoque
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Fornecedores Ativos
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.suppliers}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos de Compra Pendentes
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPurchaseOrders}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pedidos de Venda Pendentes
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingSalesOrders}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}