import { useState, useEffect } from "react";
import type { SalePrice } from "@/types";

export function useSalePrices() {
  const [salePrices, setSalePrices] = useState<SalePrice[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("salePrices");
    if (stored) {
      setSalePrices(JSON.parse(stored));
    }
  }, []);

  const addPrice = (price: SalePrice) => {
    const newPrices = [...salePrices, price];
    setSalePrices(newPrices);
    localStorage.setItem("salePrices", JSON.stringify(newPrices));
  };

  const getCurrentPrice = (productId: number) => {
    const today = new Date().toISOString().split("T")[0];
    const validPrices = salePrices.filter(
      price => price.productId === productId &&
      price.startDate <= today &&
      (!price.endDate || price.endDate >= today)
    );
    return validPrices.length > 0
      ? validPrices[validPrices.length - 1]
      : null;
  };

  return {
    salePrices,
    addPrice,
    getCurrentPrice,
  };
}