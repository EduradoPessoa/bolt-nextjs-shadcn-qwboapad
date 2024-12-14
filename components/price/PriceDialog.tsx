"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getConfig } from "@/lib/config";
import type { Product, SalePrice } from "@/types";

interface PriceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSave: (price: SalePrice) => void;
}

export function PriceDialog({ isOpen, onClose, product, onSave }: PriceDialogProps) {
  const { toast } = useToast();
  const [margin, setMargin] = useState(getConfig().defaultProfitMargin);
  const [salePrice, setSalePrice] = useState(product.price * (1 + margin / 100));

  useEffect(() => {
    setMargin(getConfig().defaultProfitMargin);
    setSalePrice(product.price * (1 + getConfig().defaultProfitMargin / 100));
  }, [product.price]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrice: SalePrice = {
      id: Date.now(),
      productId: product.id,
      price: salePrice,
      startDate: new Date().toISOString().split("T")[0],
    };
    onSave(newPrice);
    onClose();
  };

  const handleMarginChange = (value: number) => {
    setMargin(value);
    setSalePrice(product.price * (1 + value / 100));
  };

  const handlePriceChange = (value: number) => {
    setSalePrice(value);
    setMargin(((value / product.price - 1) * 100));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Definir Preço de Venda - {product.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Preço de Custo</Label>
            <Input
              type="number"
              value={product.price}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label>Margem de Lucro (%)</Label>
            <Input
              type="number"
              value={margin}
              onChange={(e) => handleMarginChange(Number(e.target.value))}
              min="0"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>Preço de Venda</Label>
            <Input
              type="number"
              value={salePrice}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              min="0"
              step="0.01"
            />
          </div>
          <Button type="submit" className="w-full">
            Salvar Preço
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}