"use client";

import { useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";

interface AuditLog {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  action: string;
  category:
    | "usuario"
    | "frequencia"
    | "justificativa"
    | "permissao"
    | "sistema";
  actionType:
    | "create"
    | "read"
    | "update"
    | "delete"
    | "approve"
    | "reject"
    | "export";
  status: "sucesso" | "erro" | "pendente";
  description: string;
  changes?: {
    field: string;
    before: string;
    after: string;
  }[];
  ipAddress: string;
  browser: string;
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2026-01-31T14:35:22",
    date: "31/01/2026",
    time: "14:35",
    user: {
      id: "u1",
      name: "Maria Silva",
      email: "maria@ifce.edu.br",
      role: "diretor",
    },
    action: "Criou novo usuário",
    category: "usuario",
    actionType: "create",
    status: "sucesso",
    description:
      "Novo usuário 'João Santos' (Professor) foi adicionado ao sistema",
    changes: [
      { field: "nome", before: "-", after: "João Santos" },
      { field: "email", before: "-", after: "joao@ifce.edu.br" },
      { field: "role", before: "-", after: "professor" },
    ],
    ipAddress: "192.168.1.100",
    browser: "Chrome 122.0",
  },
  {
    id: "2",
    timestamp: "2026-01-31T13:20:15",
    date: "31/01/2026",
    time: "13:20",
    user: {
      id: "u2",
      name: "Carlos Oliveira",
      email: "carlos@ifce.edu.br",
      role: "diretor_ensino",
    },
    action: "Aprovou justificativa",
    category: "justificativa",
    actionType: "approve",
    status: "sucesso",
    description:
      "Justificativa #245 de Pedro Costa foi aprovada (Atestado médico)",
    changes: [
      {
        field: "status",
        before: "pendente",
        after: "aprovado",
      },
    ],
    ipAddress: "192.168.1.105",
    browser: "Firefox 123.0",
  },
  {
    id: "3",
    timestamp: "2026-01-31T11:45:30",
    date: "31/01/2026",
    time: "11:45",
    user: {
      id: "u3",
      name: "Ana Costa",
      email: "ana@ifce.edu.br",
      role: "coordenador",
    },
    action: "Editou frequência",
    category: "frequencia",
    actionType: "update",
    status: "sucesso",
    description:
      "Registro de frequência de Paulo Mendes em 30/01/2026 foi editado",
    changes: [
      { field: "entrada", before: "08:15", after: "08:00" },
      { field: "status", before: "atrasado", after: "presente" },
    ],
    ipAddress: "192.168.1.110",
    browser: "Safari 17.0",
  },
  {
    id: "4",
    timestamp: "2026-01-31T10:20:45",
    date: "31/01/2026",
    time: "10:20",
    user: {
      id: "u1",
      name: "Maria Silva",
      email: "maria@ifce.edu.br",
      role: "diretor",
    },
    action: "Exportou relatório",
    category: "sistema",
    actionType: "export",
    status: "sucesso",
    description:
      "Relatório de frequência mensal (Janeiro/2026) foi exportado em PDF",
    ipAddress: "192.168.1.100",
    browser: "Chrome 122.0",
  },
  {
    id: "5",
    timestamp: "2026-01-30T16:55:10",
    date: "30/01/2026",
    time: "16:55",
    user: {
      id: "u4",
      name: "Roberto Silva",
      email: "roberto@ifce.edu.br",
      role: "professor",
    },
    action: "Registrou presença",
    category: "frequencia",
    actionType: "create",
    status: "sucesso",
    description: "Presença registrada via QR Code às 08:02",
    ipAddress: "192.168.1.115",
    browser: "Chrome Mobile 122.0",
  },
  {
    id: "6",
    timestamp: "2026-01-30T15:30:22",
    date: "30/01/2026",
    time: "15:30",
    user: {
      id: "u2",
      name: "Carlos Oliveira",
      email: "carlos@ifce.edu.br",
      role: "diretor_ensino",
    },
    action: "Rejeitou justificativa",
    category: "justificativa",
    actionType: "reject",
    status: "sucesso",
    description:
      "Justificativa #243 de Lucas Martins foi rejeitada (Documentação incompleta)",
    changes: [
      {
        field: "status",
        before: "pendente",
        after: "rejeitado",
      },
    ],
    ipAddress: "192.168.1.105",
    browser: "Firefox 123.0",
  },
  {
    id: "7",
    timestamp: "2026-01-30T14:15:05",
    date: "30/01/2026",
    time: "14:15",
    user: {
      id: "u1",
      name: "Maria Silva",
      email: "maria@ifce.edu.br",
      role: "diretor",
    },
    action: "Falha ao deletar usuário",
    category: "usuario",
    actionType: "delete",
    status: "erro",
    description:
      "Tentativa de deletar usuário 'Fernanda Costa' falhou (Usuário possui registros de frequência)",
    ipAddress: "192.168.1.100",
    browser: "Chrome 122.0",
  },
  {
    id: "8",
    timestamp: "2026-01-30T09:50:33",
    date: "30/01/2026",
    time: "09:50",
    user: {
      id: "u5",
      name: "Sistema",
      email: "system@ifce.edu.br",
      role: "sistema",
    },
    action: "Backup automático",
    category: "sistema",
    actionType: "create",
    status: "sucesso",
    description: "Backup diário do banco de dados completado com sucesso",
    ipAddress: "127.0.0.1",
    browser: "Sistema",
  },
];

export default function AuditoriaPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      searchTerm === "" ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUser =
      filterUser === "all" || filterUser === "" || log.user.role === filterUser;
    const matchesCategory =
      filterCategory === "all" ||
      filterCategory === "" ||
      log.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      filterStatus === "" ||
      log.status === filterStatus;

    return matchesSearch && matchesUser && matchesCategory && matchesStatus;
  });

  const handleExportCSV = () => {
    const csv = [
      [
        "Data",
        "Hora",
        "Usuário",
        "Ação",
        "Categoria",
        "Status",
        "Descrição",
      ].join(","),
      ...filteredLogs.map((log) =>
        [
          log.date,
          log.time,
          log.user.name,
          log.action,
          log.category,
          log.status,
          `"${log.description}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auditoria-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();

    toast({
      title: "✓ Exportado",
      description: "Relatório de auditoria exportado com sucesso",
    });
  };

  const getStatusIcon = (status: AuditLog["status"]) => {
    switch (status) {
      case "sucesso":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "erro":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pendente":
        return <Clock className="h-5 w-5 text-amber-500" />;
    }
  };

  const getCategoryBadgeColor = (category: AuditLog["category"]) => {
    const colors: Record<AuditLog["category"], string> = {
      usuario: "bg-blue-100 text-blue-800",
      frequencia: "bg-emerald-100 text-emerald-800",
      justificativa: "bg-purple-100 text-purple-800",
      permissao: "bg-amber-100 text-amber-800",
      sistema: "bg-slate-100 text-slate-800",
    };
    return colors[category];
  };

  const getCategoryLabel = (category: AuditLog["category"]) => {
    const labels: Record<AuditLog["category"], string> = {
      usuario: "👤 Usuário",
      frequencia: "📍 Frequência",
      justificativa: "📄 Justificativa",
      permissao: "🔐 Permissão",
      sistema: "⚙️ Sistema",
    };
    return labels[category];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Auditoria
        </h1>
        <p className="text-muted-foreground">
          Registro de todas as ações realizadas no sistema
        </p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          <CardDescription>Refine os resultados da auditoria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label className="text-sm">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Ação, usuário, descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Tipo de Usuário</Label>
              <Select value={filterUser} onValueChange={setFilterUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="diretor">Diretor</SelectItem>
                  <SelectItem value="diretor_ensino">
                    Diretor de Ensino
                  </SelectItem>
                  <SelectItem value="coordenador">Coordenador</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Categoria</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="usuario">👤 Usuário</SelectItem>
                  <SelectItem value="frequencia">📍 Frequência</SelectItem>
                  <SelectItem value="justificativa">
                    📄 Justificativa
                  </SelectItem>
                  <SelectItem value="permissao">🔐 Permissão</SelectItem>
                  <SelectItem value="sistema">⚙️ Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="sucesso">✓ Sucesso</SelectItem>
                  <SelectItem value="erro">✗ Erro</SelectItem>
                  <SelectItem value="pendente">⏳ Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">&nbsp;</Label>
              <Button
                onClick={handleExportCSV}
                variant="outline"
                className="w-full gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar CSV
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Mostrando{" "}
            <span className="font-semibold">{filteredLogs.length}</span> de{" "}
            <span className="font-semibold">{mockAuditLogs.length}</span>{" "}
            registros
          </div>
        </CardContent>
      </Card>

      {/* Lista de Auditoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Histórico de Ações
          </CardTitle>
          <CardDescription>
            Detalhes de cada operação realizada no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <Collapsible
                  key={log.id}
                  open={expandedId === log.id}
                  onOpenChange={(open) => setExpandedId(open ? log.id : null)}
                >
                  <CollapsibleTrigger asChild>
                    <button className="w-full text-left">
                      <div className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                        {getStatusIcon(log.status)}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-medium text-foreground">
                              {log.action}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getCategoryBadgeColor(
                                log.category,
                              )}`}
                            >
                              {getCategoryLabel(log.category)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {log.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {log.user.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {log.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {log.time}
                            </div>
                          </div>
                        </div>

                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            expandedId === log.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="bg-muted/30 rounded-b-lg border border-t-0 p-4 space-y-4">
                      {/* Informações do Usuário */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Usuário
                          </p>
                          <div className="text-sm">
                            <p className="font-medium text-foreground">
                              {log.user.name}
                            </p>
                            <p className="text-muted-foreground">
                              {log.user.email}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {log.user.role}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Informações Técnicas
                          </p>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="text-muted-foreground">
                                IP:{" "}
                              </span>
                              {log.ipAddress}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Navegador:{" "}
                              </span>
                              {log.browser}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Timestamp:{" "}
                              </span>
                              {log.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mudanças */}
                      {log.changes && log.changes.length > 0 && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                              Alterações
                            </p>
                            <div className="space-y-2">
                              {log.changes.map((change, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-3 p-2 rounded bg-background border text-sm"
                                >
                                  <span className="font-medium text-foreground min-w-max">
                                    {change.field}:
                                  </span>
                                  <div className="flex items-center gap-2 flex-1">
                                    <span className="text-muted-foreground line-through">
                                      {change.before}
                                    </span>
                                    <span className="text-muted-foreground">
                                      →
                                    </span>
                                    <span className="text-emerald-600 font-medium">
                                      {change.after}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhum registro encontrado com os filtros aplicados
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total de Ações",
            value: mockAuditLogs.length,
            icon: FileText,
            color: "text-blue-500",
          },
          {
            label: "Ações com Sucesso",
            value: mockAuditLogs.filter((l) => l.status === "sucesso").length,
            icon: CheckCircle,
            color: "text-emerald-500",
          },
          {
            label: "Erros",
            value: mockAuditLogs.filter((l) => l.status === "erro").length,
            icon: XCircle,
            color: "text-red-500",
          },
          {
            label: "Últimos 24h",
            value: mockAuditLogs.filter((l) => l.date === "31/01/2026").length,
            icon: Calendar,
            color: "text-purple-500",
          },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color} opacity-50`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
