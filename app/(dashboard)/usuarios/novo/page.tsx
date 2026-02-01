"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

const coordenadores = [
  { id: "1", name: "Joao Oliveira", setor: "Informatica" },
  { id: "2", name: "Ana Costa", setor: "Matematica" },
  { id: "3", name: "Fernanda Lima", setor: "Ciencias" },
  { id: "4", name: "Maria Eduarda", setor: "Letras" },
];

export default function NovoUsuarioPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    cpf: "",
    phone: "",
    role: "",
    campus: "",
    setor: "",
    coordenador: "",
    cargaHoraria: "",
    active: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Verifica se o usuario tem permissao para cadastrar
  const canCreateUser =
    user?.role === "diretor" || user?.role === "diretor_ensino";

  // Redireciona se nao tiver permissao
  if (!canCreateUser) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-rose-500/10 p-4">
          <Shield className="h-8 w-8 text-rose-600" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Acesso Negado</h2>
          <p className="mt-1 text-muted-foreground">
            Voce nao tem permissao para cadastrar novos usuarios.
          </p>
          <p className="text-sm text-muted-foreground">
            Apenas Diretores e Diretores de Ensino podem realizar esta acao.
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link href="/usuarios">Voltar para Usuarios</Link>
        </Button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome e obrigatorio";
    }
    if (!formData.matricula.trim()) {
      newErrors.matricula = "Matricula e obrigatoria";
    }
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF e obrigatorio";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-mail e obrigatorio";
    } else if (!formData.email.includes("@ifce.edu.br")) {
      newErrors.email = "Use um e-mail institucional (@ifce.edu.br)";
    }
    if (!formData.role) {
      newErrors.role = "Selecione um cargo";
    }
    if (!formData.campus) {
      newErrors.campus = "Selecione um campus";
    }
    if (!formData.setor.trim()) {
      newErrors.setor = "Setor e obrigatorio";
    }
    if (formData.role === "professor" && !formData.coordenador) {
      newErrors.coordenador = "Selecione um coordenador para o professor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Usuário criado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
    });

    router.push("/usuarios");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/usuarios">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Novo Usuário</h1>
          <p className="text-muted-foreground">
            Cadastre um novo servidor no sistema.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                  Dados básicos do servidor para identificação.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome completo"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="matricula">Matricula *</Label>
                    <Input
                      id="matricula"
                      placeholder="Ex: 2024001"
                      value={formData.matricula}
                      onChange={(e) =>
                        setFormData({ ...formData, matricula: e.target.value })
                      }
                      className={errors.matricula ? "border-destructive" : ""}
                    />
                    {errors.matricula && (
                      <p className="text-sm text-destructive">
                        {errors.matricula}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={(e) =>
                        setFormData({ ...formData, cpf: e.target.value })
                      }
                      className={errors.cpf ? "border-destructive" : ""}
                    />
                    {errors.cpf && (
                      <p className="text-sm text-destructive">{errors.cpf}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(85) 99999-0000"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Institucional *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome.sobrenome@ifce.edu.br"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Work Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações de Trabalho</CardTitle>
                <CardDescription>
                  Defina o cargo, campus e setor do servidor.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Cargo *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          role: value,
                          coordenador: "",
                        })
                      }
                    >
                      <SelectTrigger
                        className={errors.role ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Selecione o cargo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="coordenador">Coordenador</SelectItem>
                        <SelectItem value="diretor_ensino">
                          Diretor de Ensino
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-sm text-destructive">{errors.role}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Campus *</Label>
                    <Select
                      value={formData.campus}
                      onValueChange={(value) =>
                        setFormData({ ...formData, campus: value })
                      }
                    >
                      <SelectTrigger
                        className={errors.campus ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Selecione o campus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fortaleza">Fortaleza</SelectItem>
                        <SelectItem value="maracanau">Maracanaú</SelectItem>
                        <SelectItem value="sobral">Sobral</SelectItem>
                        <SelectItem value="quixada">Quixadá</SelectItem>
                        <SelectItem value="cedro">Cedro</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.campus && (
                      <p className="text-sm text-destructive">
                        {errors.campus}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="setor">Setor / Departamento *</Label>
                  <Input
                    id="setor"
                    placeholder="Ex: Informática, Matemática, Letras..."
                    value={formData.setor}
                    onChange={(e) =>
                      setFormData({ ...formData, setor: e.target.value })
                    }
                    className={errors.setor ? "border-destructive" : ""}
                  />
                  {errors.setor && (
                    <p className="text-sm text-destructive">{errors.setor}</p>
                  )}
                </div>

                {formData.role === "professor" && (
                  <div className="space-y-2">
                    <Label>Coordenador Responsável *</Label>
                    <Select
                      value={formData.coordenador}
                      onValueChange={(value) =>
                        setFormData({ ...formData, coordenador: value })
                      }
                    >
                      <SelectTrigger
                        className={
                          errors.coordenador ? "border-destructive" : ""
                        }
                      >
                        <SelectValue placeholder="Selecione o coordenador" />
                      </SelectTrigger>
                      <SelectContent>
                        {coordenadores.map((coord) => (
                          <SelectItem key={coord.id} value={coord.id}>
                            {coord.name} ({coord.setor})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.coordenador && (
                      <p className="text-sm text-destructive">
                        {errors.coordenador}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
                <CardDescription>
                  Defina se o usuário está ativo no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Usuário Ativo</Label>
                    <p className="text-sm text-muted-foreground">
                      Usuários inativos não podem acessar o sistema.
                    </p>
                  </div>
                  <Switch
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      "Criar Usuário"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => router.push("/usuarios")}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
