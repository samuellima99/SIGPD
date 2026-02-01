"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Users,
  UserCheck,
  UserX,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

const mockUsers = [
  {
    id: "1",
    matricula: "2023001",
    name: "Maria Silva Santos",
    email: "maria.silva@ifce.edu.br",
    role: "professor",
    campus: "Fortaleza",
    setor: "Informatica",
    status: "ativo",
    coordenador: "Joao Oliveira",
    createdAt: "15/03/2023",
  },
  {
    id: "2",
    matricula: "2023002",
    name: "Joao Pedro Lima",
    email: "joao.lima@ifce.edu.br",
    role: "professor",
    campus: "Fortaleza",
    setor: "Matematica",
    status: "ativo",
    coordenador: "Ana Costa",
    createdAt: "22/05/2023",
  },
  {
    id: "3",
    matricula: "2022001",
    name: "Ana Carolina Costa",
    email: "ana.costa@ifce.edu.br",
    role: "coordenador",
    campus: "Maracanau",
    setor: "Engenharia",
    status: "ativo",
    coordenador: null,
    createdAt: "10/01/2022",
  },
  {
    id: "4",
    matricula: "2024001",
    name: "Pedro Henrique Alves",
    email: "pedro.alves@ifce.edu.br",
    role: "professor",
    campus: "Fortaleza",
    setor: "Informatica",
    status: "inativo",
    coordenador: "Joao Oliveira",
    createdAt: "08/09/2024",
  },
  {
    id: "5",
    matricula: "2021001",
    name: "Carla Mendes Ferreira",
    email: "carla.mendes@ifce.edu.br",
    role: "diretor_ensino",
    campus: "Fortaleza",
    setor: "Administracao",
    status: "ativo",
    coordenador: null,
    createdAt: "03/02/2021",
  },
  {
    id: "6",
    matricula: "2023003",
    name: "Lucas Rodrigues Silva",
    email: "lucas.rodrigues@ifce.edu.br",
    role: "professor",
    campus: "Sobral",
    setor: "Fisica",
    status: "ativo",
    coordenador: "Fernanda Lima",
    createdAt: "17/11/2023",
  },
  {
    id: "7",
    matricula: "2022002",
    name: "Fernanda Lima Sousa",
    email: "fernanda.lima@ifce.edu.br",
    role: "coordenador",
    campus: "Sobral",
    setor: "Ciencias",
    status: "ativo",
    coordenador: null,
    createdAt: "25/04/2022",
  },
  {
    id: "8",
    matricula: "2024002",
    name: "Roberto Carlos Nunes",
    email: "roberto.nunes@ifce.edu.br",
    role: "professor",
    campus: "Fortaleza",
    setor: "Letras",
    status: "ativo",
    coordenador: "Maria Eduarda",
    createdAt: "12/07/2024",
  },
];

const roleLabels: Record<string, string> = {
  diretor: "Diretor",
  diretor_ensino: "Dir. Ensino",
  coordenador: "Coordenador",
  professor: "Professor",
};

const roleColors: Record<string, string> = {
  diretor: "bg-violet-500/10 text-violet-700 border-violet-200",
  diretor_ensino: "bg-sky-500/10 text-sky-700 border-sky-200",
  coordenador: "bg-amber-500/10 text-amber-700 border-amber-200",
  professor: "bg-slate-500/10 text-slate-700 border-slate-200",
};

const statusConfig = {
  ativo: {
    label: "Ativo",
    className: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  },
  inativo: {
    label: "Inativo",
    className: "bg-rose-500/10 text-rose-700 border-rose-200",
  },
};

export default function UsuariosPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");

  // Apenas diretor e diretor_ensino podem cadastrar usuarios
  const canCreateUser =
    user?.role === "diretor" || user?.role === "diretor_ensino";

  const filteredUsers = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.matricula.includes(search);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    const matchesCampus = campusFilter === "all" || u.campus === campusFilter;
    return matchesSearch && matchesRole && matchesStatus && matchesCampus;
  });

  const totalAtivos = mockUsers.filter((u) => u.status === "ativo").length;
  const totalInativos = mockUsers.filter((u) => u.status === "inativo").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
          <p className="text-muted-foreground">
            Gerencie os servidores e suas permissoes no sistema.
          </p>
        </div>
        {canCreateUser && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/usuarios/importar">
                <Upload className="mr-2 h-4 w-4" />
                Importar
              </Link>
            </Button>
            <Button asChild>
              <Link href="/usuarios/novo">
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuario
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-sky-500/10 p-2.5">
              <Users className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockUsers.length}</p>
              <p className="text-sm text-muted-foreground">Total de usuarios</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-emerald-500/10 p-2.5">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalAtivos}</p>
              <p className="text-sm text-muted-foreground">Usuarios ativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-rose-500/10 p-2.5">
              <UserX className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalInativos}</p>
              <p className="text-sm text-muted-foreground">Usuarios inativos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-amber-500/10 p-2.5">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Novos este mes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Lista de Usuarios</CardTitle>
              <CardDescription>
                {filteredUsers.length} usuario(s) encontrado(s)
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, e-mail ou matricula..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Cargos</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="coordenador">Coordenador</SelectItem>
                  <SelectItem value="diretor_ensino">Dir. Ensino</SelectItem>
                  <SelectItem value="diretor">Diretor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={campusFilter} onValueChange={setCampusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Campus</SelectItem>
                  <SelectItem value="Fortaleza">Fortaleza</SelectItem>
                  <SelectItem value="Maracanau">Maracanau</SelectItem>
                  <SelectItem value="Sobral">Sobral</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Matricula</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead className="hidden md:table-cell">Campus</TableHead>
                  <TableHead className="hidden lg:table-cell">Setor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12.5" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Search className="h-8 w-8" />
                        <p>Nenhum usuario encontrado</p>
                        <p className="text-sm">
                          Tente ajustar os filtros de busca
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id} className="group">
                      <TableCell>
                        <Link
                          href={`/usuarios/${u.id}`}
                          className="flex items-center gap-3 transition-opacity hover:opacity-80"
                        >
                          <Avatar className="h-10 w-10 ring-2 ring-background">
                            <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
                              {u.name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium group-hover:text-primary">
                              {u.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {u.email}
                            </p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm">{u.matricula}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={roleColors[u.role]}>
                          {roleLabels[u.role]}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {u.campus}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {u.setor}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            statusConfig[u.status as keyof typeof statusConfig]
                              .className
                          }
                        >
                          {
                            statusConfig[u.status as keyof typeof statusConfig]
                              .label
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <Link href={`/usuarios/${u.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Visualizar
                              </DropdownMenuItem>
                            </Link>
                            <Link href={`/frequencia?userId=${u.id}`}>
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Ver Frequencia
                              </DropdownMenuItem>
                            </Link>
                            {canCreateUser && (
                              <>
                                <DropdownMenuSeparator />
                                <Link href={`/usuarios/${u.id}/editar`}>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar
                                  </DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Excluir
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando 1-{filteredUsers.length} de {mockUsers.length}{" "}
              resultados
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 bg-transparent"
              >
                2
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
