import {
  Users,
  Package,
  Building2,
  ShoppingCart,
  ShoppingBag,
  Settings,
  PriceTag,
} from "lucide-react";
import type { MenuItem } from "./types";

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: Package,
    href: "/dashboard",
  },
  {
    title: "Clientes",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    title: "Produtos",
    icon: Package,
    href: "/dashboard/products",
  },
  {
    title: "Fornecedores",
    icon: Building2,
    href: "/dashboard/suppliers",
  },
  {
    title: "Pedidos de Compra",
    icon: ShoppingCart,
    href: "/dashboard/purchase-orders",
  },
  {
    title: "Pedidos de Venda",
    icon: ShoppingBag,
    href: "/dashboard/sales-orders",
  },
  {
    title: "Tabela de Preços",
    icon: PriceTag,
    href: "/dashboard/sale-prices",
  },
  {
    title: "Configurações",
    icon: Settings,
    href: "/dashboard/config",
  },
];