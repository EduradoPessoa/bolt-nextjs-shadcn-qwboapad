"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building2, Package } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
            Sistema de Gestão
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Gerencie seus clientes e produtos de forma simples e eficiente
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={() => router.push("/login")}>Entrar</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Criar Conta
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Gestão de Clientes
              </CardTitle>
              <CardDescription>
                Cadastre e gerencie seus clientes de forma organizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Cadastro completo de clientes</li>
                <li>Histórico de interações</li>
                <li>Dados de contato</li>
                <li>Relatórios detalhados</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-6 w-6" />
                Gestão de Produtos
              </CardTitle>
              <CardDescription>
                Controle seu inventário e catálogo de produtos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Cadastro de produtos</li>
                <li>Controle de estoque</li>
                <li>Categorização</li>
                <li>Preços e descontos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}