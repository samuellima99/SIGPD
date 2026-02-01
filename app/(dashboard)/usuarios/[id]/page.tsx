"use client"

import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Building,
  Users,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Briefcase,
  Hash,
  Shield,
  Activity,
  FileText,
  BarChart3,
  UserCheck,
  UserX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

// Mock data - em producao viria do banco de dados
const mockUsers: Record<string, any> = {
  "1": {
    id: "1",
    matricula: "2023001",
    name: "Maria Silva Santos",
    email: "maria.silva@ifce.edu.br",
    phone: "(85) 99999-1234",
    role: "professor",
    campus: "Fortaleza",
    setor: "Informatica",
    status: "ativo",
    coordenador: "Joao Oliveira",
    coordenadorId: "coord1",
    cargaHoraria: "40h",
    regime: "Dedicacao Exclusiva",
    createdAt: "15/03/2023",
    updatedAt: "10/01/2026",
    lastAccess: "31/01/2026 08:32",
    endereco: "Rua das Flores, 123 - Centro, Fortaleza/CE",
    cpf: "123.456.789-00",
    dataNascimento: "15/05/1985",
    dataAdmissao: "01/03/2023",
    vinculo: "Efetivo",
    titulacao: "Mestrado",
    areaFormacao: "Ciencia da Computacao",
    lattes: "http://lattes.cnpq.br/1234567890",
    frequencia: {
      presencas: 145,
      faltas: 5,
      atrasos: 8,
      justificativas: 3,
      taxaPresenca: 91.2,
    },
  },
  "2": {
    id: "2",
    matricula: "2023002",
    name: "Joao Pedro Lima",
    email: "joao.lima@ifce.edu.br",
    phone: "(85) 98888-5678",
    role: "professor",
    campus: "Fortaleza",
    setor: "Matematica",
    status: "ativo",
    coordenador: "Ana Costa",
    coordenadorId: "coord2",
    cargaHoraria: "40h",
    regime: "Dedicacao Exclusiva",
    createdAt: "22/05/2023",
    updatedAt: "05/01/2026",
    lastAccess: "30/01/2026 14:15",
    endereco: "Av. Santos Dumont, 456 - Aldeota, Fortaleza/CE",
    cpf: "987.654.321-00",
    dataNascimento: "20/08/1980",
    dataAdmissao: "01/05/2023",
    vinculo: "Efetivo",
    titulacao: "Doutorado",
    areaFormacao: "Matematica Aplicada",
    lattes: "http://lattes.cnpq.br/0987654321",
    frequencia: {
      presencas: 150,
      faltas: 2,
      atrasos: 3,
      justificativas: 1,
      taxaPresenca: 96.8,
    },
  },
}

// Fallback para IDs nao encontrados
const getUser = (id: string) => {
  return (
    mockUsers[id] || {
      id,
      matricula: "2023001",
      name: "Usuario Exemplo",
      email: "usuario@ifce.edu.br",
      phone: "(85) 99999-0000",
      role: "professor",
      campus: "Fortaleza",
      setor: "Geral",
      status: "ativo",
      coordenador: "Coordenador Exemplo",
      coordenadorId: "coord1",
      cargaHoraria: "40h",
      regime: "Dedicacao Exclusiva",
      createdAt: "01/01/2023",
      updatedAt: "01/01/2026",
      lastAccess: "31/01/2026 08:00",
      endereco: "Endereco nao informado",
      cpf: "000.000.000-00",
      dataNascimento: "01/01/1990",
      dataAdmissao: "01/01/2023",
      vinculo: "Efetivo",
      titulacao: "Graduacao",
      areaFormacao: "Area nao informada",
      lattes: "",
      frequencia: {
        presencas: 100,
        faltas: 10,
        atrasos: 5,
        justificativas: 2,
        taxaPresenca: 85.0,
      },
    }
  )
}

const roleLabels: Record<string, string> = {
  diretor: "Diretor",
  diretor_ensino: "Diretor de Ensino",
  coordenador: "Coordenador",
  professor: "Professor",
}

const roleColors: Record<string, string> = {
  diretor: "bg-violet-500/10 text-violet-700 border-violet-200",
  diretor_ensino: "bg-sky-500/10 text-sky-700 border-sky-200",
  coordenador: "bg-amber-500/10 text-amber-700 border-amber-200",
  professor: "bg-slate-500/10 text-slate-700 border-slate-200",
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { user: currentUser } = useAuth()
  const user = getUser(id)
  
  console.log("[v0] UserDetailPage - id:", id)
  console.log("[v0] UserDetailPage - user:", user)
  console.log("[v0] UserDetailPage - currentUser:", currentUser)

  const canEdit =
    currentUser?.role === "diretor" || currentUser?.role === "diretor_ensino"

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/usuarios">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Detalhes do Usuario
            </h1>
            <p className="text-muted-foreground">
              Informacoes completas do servidor
            </p>
          </div>
        </div>
        {canEdit && (
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-transparent" asChild>
              <Link href={`/usuarios/${id}/editar`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Link>
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg">
                <AvatarFallback className="bg-primary/10 text-2xl font-semibold text-primary">
                  {user.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={roleColors[user.role]}>
                    {roleLabels[user.role]}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      user.status === "ativo"
                        ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                        : "bg-rose-500/10 text-rose-700 border-rose-200"
                    }
                  >
                    {user.status === "ativo" ? (
                      <UserCheck className="mr-1 h-3 w-3" />
                    ) : (
                      <UserX className="mr-1 h-3 w-3" />
                    )}
                    {user.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                  <Badge variant="secondary" className="font-mono">
                    <Hash className="mr-1 h-3 w-3" />
                    {user.matricula}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/frequencia?userId=${id}`}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver Frequencia
                </Link>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href={`/relatorios?userId=${id}`}>
                  <FileText className="mr-2 h-4 w-4" />
                  Relatorios
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Content */}
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Informacoes</TabsTrigger>
          <TabsTrigger value="frequencia">Resumo de Frequencia</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-primary" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>Informacoes pessoais do servidor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">CPF</p>
                    <p className="font-medium">{user.cpf}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Data de Nascimento
                    </p>
                    <p className="font-medium">{user.dataNascimento}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Endereco</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.endereco}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados Profissionais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Briefcase className="h-4 w-4 text-primary" />
                  Dados Profissionais
                </CardTitle>
                <CardDescription>Informacoes do vinculo institucional</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Campus</p>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="font-medium">{user.campus}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Setor</p>
                    <p className="font-medium">{user.setor}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Carga Horaria</p>
                    <p className="font-medium">{user.cargaHoraria}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Regime</p>
                    <p className="font-medium">{user.regime}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Vinculo</p>
                    <p className="font-medium">{user.vinculo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Data de Admissao</p>
                    <p className="font-medium">{user.dataAdmissao}</p>
                  </div>
                </div>
                {user.coordenador && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Coordenador Responsavel
                      </p>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{user.coordenador}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Formacao Academica */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4 text-primary" />
                  Formacao Academica
                </CardTitle>
                <CardDescription>Titulacao e area de formacao</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Titulacao</p>
                    <p className="font-medium">{user.titulacao}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Area de Formacao</p>
                    <p className="font-medium">{user.areaFormacao}</p>
                  </div>
                </div>
                {user.lattes && (
                  <>
                    <Separator />
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Curriculo Lattes
                      </p>
                      <a
                        href={user.lattes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {user.lattes}
                      </a>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Contato */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mail className="h-4 w-4 text-primary" />
                  Contato
                </CardTitle>
                <CardDescription>Informacoes de contato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">E-mail Institucional</p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${user.email}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {user.email}
                    </a>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="frequencia" className="space-y-6">
          {/* Frequencia Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-2">
                    <UserCheck className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.frequencia.presencas}
                    </p>
                    <p className="text-sm text-muted-foreground">Presencas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-rose-500/10 p-2">
                    <UserX className="h-5 w-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.frequencia.faltas}</p>
                    <p className="text-sm text-muted-foreground">Faltas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-amber-500/10 p-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.frequencia.atrasos}
                    </p>
                    <p className="text-sm text-muted-foreground">Atrasos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-sky-500/10 p-2">
                    <FileText className="h-5 w-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.frequencia.justificativas}
                    </p>
                    <p className="text-sm text-muted-foreground">Justificativas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {user.frequencia.taxaPresenca}%
                    </p>
                    <p className="text-sm text-muted-foreground">Taxa Presenca</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Acoes de Frequencia</CardTitle>
              <CardDescription>
                Acesse os detalhes completos da frequencia deste servidor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href={`/frequencia?userId=${id}`}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Ver Frequencia Completa
                  </Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href={`/relatorios?userId=${id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    Gerar Relatorio
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sistema" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4 text-primary" />
                Informacoes do Sistema
              </CardTitle>
              <CardDescription>
                Dados de registro e acesso ao sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Cadastrado em</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.createdAt}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Ultima Atualizacao</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.updatedAt}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Ultimo Acesso</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{user.lastAccess}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">ID do Usuario</p>
                  <p className="font-mono text-sm font-medium">{user.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
