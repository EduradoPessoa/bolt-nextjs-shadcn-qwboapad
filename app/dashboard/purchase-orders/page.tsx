"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/layout/BackButton";
import type { PurchaseOrder, Product, Supplier } from "@/types";

export default function PurchaseOrders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<{
    productId: string;
    quantity: string;
    price: string;
  }[]>([{ productId: "", quantity: "", price: "" }]);

  // Mock data - Replace with actual data from your state management solution
  const suppliers: Supplier[] = [];
  const products: Product[] = [];

  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { productId: "", quantity: "", price: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: PurchaseOrder = {
      id: Date.now(),
      supplierId: Number(selectedSupplier),
      date: new Date().toISOString(),
      status: "pending",
      items: selectedProducts.map((item, index) => ({
        id: index,
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      total: selectedProducts.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      ),
    };

    setOrders([...orders, newOrder]);
    toast({
      title: "Pedido de compra criado com sucesso!",
    });
    setIsOpen(false);
    setSelectedSupplier("");
    setSelectedProducts([{ productId: "", quantity: "", price: "" }]);
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pedidos de Compra</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Novo Pedido de Compra</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Fornecedor</Label>
                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um fornecedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.id.toString()}>
                        {supplier.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Produtos</Label>
                {selectedProducts.map((product, index) => (
                  <div key={index} className="flex gap-4">
                    <Select
                      value={product.productId}
                      onValueChange={(value) =>
                        setSelectedProducts(products =>
                          products.map((p, i) =>
                            i === index ? { ...p, productId: value } : p
                          )
                        )
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map(product => (
                          <SelectItem key={product.id} value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Quantidade"
                      value={product.quantity}
                      onChange={(e) =>
                        setSelectedProducts(products =>
                          products.map((p, i) =>
                            i === index ? { ...p, quantity: e.target.value } : p
                          )
                        )
                      }
                      className="w-32"
                    />
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Preço"
                      value={product.price}
                      onChange={(e) =>
                        setSelectedProducts(products =>
                          products.map((p, i) =>
                            i === index ? { ...p, price: e.target.value } : p
                          )
                        )
                      }
                      className="w-32"
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={handleAddProduct}>
                  Adicionar Produto
                </Button>
              </div>

              <Button type="submit" className="w-full">
                Criar Pedido
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {suppliers.find(s => s.id === order.supplierId)?.name}
              </TableCell>
              <TableCell>
                {new Date(order.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>R$ {order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}