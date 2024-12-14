"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/layout/BackButton";
import type { SalePrice, Product } from "@/types";

export default function SalePrices() {
  const { toast } = useToast();
  const [salePrices, setSalePrices] = useState<SalePrice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<SalePrice | null>(null);
  const [formData, setFormData] = useState({
    productId: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
    const storedPrices = JSON.parse(localStorage.getItem("salePrices") || "[]");
    setSalePrices(storedPrices);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrice: SalePrice = {
      id: editingPrice?.id || Date.now(),
      productId: Number(formData.productId),
      price: Number(formData.price),
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
    };

    if (editingPrice) {
      setSalePrices(prices => prices.map(p => p.id === editingPrice.id ? newPrice : p));
      toast({
        title: "Preço atualizado com sucesso!",
      });
    } else {
      setSalePrices(prices => [...prices, newPrice]);
      toast({
        title: "Preço cadastrado com sucesso!",
      });
    }

    localStorage.setItem("salePrices", JSON.stringify(salePrices));
    setIsOpen(false);
    setEditingPrice(null);
    setFormData({ productId: "", price: "", startDate: "", endDate: "" });
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tabela de Preços</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Preço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPrice ? "Editar Preço" : "Novo Preço"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Produto</Label>
                <Select
                  value={formData.productId}
                  onValueChange={(value) => setFormData({ ...formData, productId: value })}
                >
                  <SelectTrigger>
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
              </div>
              <div>
                <Label>Preço</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Data Inicial</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Data Final (opcional)</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingPrice ? "Atualizar" : "Cadastrar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Data Inicial</TableHead>
            <TableHead>Data Final</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salePrices.map(price => (
            <TableRow key={price.id}>
              <TableCell>
                {products.find(p => p.id === price.productId)?.name}
              </TableCell>
              <TableCell>R$ {price.price.toFixed(2)}</TableCell>
              <TableCell>{new Date(price.startDate).toLocaleDateString()}</TableCell>
              <TableCell>
                {price.endDate ? new Date(price.endDate).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingPrice(price);
                      setFormData({
                        productId: price.productId.toString(),
                        price: price.price.toString(),
                        startDate: price.startDate,
                        endDate: price.endDate || "",
                      });
                      setIsOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSalePrices(prices => prices.filter(p => p.id !== price.id));
                      localStorage.setItem("salePrices", JSON.stringify(
                        salePrices.filter(p => p.id !== price.id)
                      ));
                      toast({
                        title: "Preço removido com sucesso!",
                      });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}