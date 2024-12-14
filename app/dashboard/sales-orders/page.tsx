"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/layout/BackButton";
import { PriceDialog } from "@/components/price/PriceDialog";
import { useSalePrices } from "@/hooks/useSalePrices";
import type { SalesOrder, Product, Customer } from "@/types";

export default function SalesOrders() {
  const { toast } = useToast();
  const { getCurrentPrice, addPrice } = useSalePrices();
  const [orders, setOrders] = useState<SalesOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<{
    productId: string;
    quantity: string;
  }[]>([{ productId: "", quantity: "" }]);

  useEffect(() => {
    const storedCustomers = JSON.parse(localStorage.getItem("customers") || "[]");
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const storedOrders = JSON.parse(localStorage.getItem("salesOrders") || "[]");
    
    setCustomers(storedCustomers);
    setProducts(storedProducts);
    setOrders(storedOrders);
  }, []);

  const handleProductSelect = (productId: string, index: number) => {
    const product = products.find(p => p.id.toString() === productId);
    if (product) {
      const currentPrice = getCurrentPrice(product.id);
      if (!currentPrice) {
        setSelectedProduct(product);
        setIsPriceDialogOpen(true);
      }
    }
    setSelectedProducts(products =>
      products.map((p, i) =>
        i === index ? { ...p, productId } : p
      )
    );
  };

  const handlePriceSave = (price: any) => {
    addPrice(price);
    toast({
      title: "Preço cadastrado com sucesso!",
      description: "O preço de venda foi definido para o produto.",
    });
  };

  // ... rest of the component implementation remains the same ...
}