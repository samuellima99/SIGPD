"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

export default function ImportarUsuariosPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const canCreateUser =
    user?.role === "diretor" || user?.role === "diretor_ensino";

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0] ?? null;
      setFile(f);
    },
    [],
  );

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    setFile(f);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Nenhum arquivo selecionado",
        description: "Selecione um arquivo para importar.",
      });
      return;
    }

    setLoading(true);

    // Simula upload / processamento; trocar por chamada real à API quando disponível
    await new Promise((r) => setTimeout(r, 1400));

    setLoading(false);
    toast({
      title: "Importação concluída",
      description: `${file.name} importado com sucesso.`,
    });
    router.push("/usuarios");
  };

  if (!canCreateUser) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-rose-500/10 p-4">
          <FileText className="h-8 w-8 text-rose-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Acesso Negado</h2>
          <p className="mt-1 text-muted-foreground">
            Voce nao tem permissao para importar usuarios.
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link href="/usuarios">Voltar para Usuarios</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/usuarios">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Importar Usuários
          </h1>
          <p className="text-muted-foreground">
            Faça upload do arquivo de dados para importação.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload de Arquivo</CardTitle>
          <CardDescription>
            Envie um CSV ou XLSX com os usuários para importar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="mb-4 flex h-40 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30 bg-muted/2 p-4 text-center"
          >
            <label className="flex w-full cursor-pointer flex-col items-center justify-center gap-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <div className="text-sm text-muted-foreground">
                Arraste o arquivo aqui ou clique para selecionar
              </div>
              <input
                type="file"
                accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {file ? (
            <div className="mb-4 flex items-center justify-between rounded-md border p-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                  Remover
                </Button>
                <Button size="sm" onClick={handleUpload} disabled={loading}>
                  {loading ? "Enviando..." : "Importar"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="mb-4 text-sm text-muted-foreground">
              Nenhum arquivo selecionado
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/usuarios")}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleUpload}
              disabled={!file || loading}
            >
              {loading ? "Processando..." : "Iniciar importação"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
