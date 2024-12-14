"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/layout/BackButton";
import { getConfig, setConfig, type SystemConfig } from "@/lib/config";

export default function Config() {
  const { toast } = useToast();
  const [config, setLocalConfig] = useState<SystemConfig>(getConfig());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig(config);
    toast({
      title: "Configurações salvas com sucesso!",
    });
  };

  return (
    <div className="p-6">
      <BackButton />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Configurações do Sistema</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="margin">Margem de Lucro Padrão (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={config.defaultProfitMargin}
                  onChange={(e) => setLocalConfig({
                    ...config,
                    defaultProfitMargin: Number(e.target.value)
                  })}
                  min="0"
                  step="1"
                />
              </div>
              <Button type="submit">Salvar Configurações</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}