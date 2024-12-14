"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Voltar
    </Button>
  );
}