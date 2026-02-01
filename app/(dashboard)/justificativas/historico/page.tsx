"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Download,
  MessageSquare,
  User,
  Calendar,
  ChevronDown,
  Search,
  Filter,
  History,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface Justificativa {
  id: string;
  serverName: string;
  serverEmail: string;
  date: string;
  reason: string;
  type: "atestado" | "justificativa";
  status: "aprovado" | "rejeitado";
  submissionDate: string;
  approvalDate: string;
  attachmentUrl?: string;
  comments?: string;
  approvedBy: string;
}

const mockHistorico: Justificativa[] = [
  {
    id: "1",
    serverName: "Pedro Costa",
    serverEmail: "pedro@ifce.edu.br",
    date: "28/01/2026",
    reason: "Atestado médico - Inflamação",
    type: "atestado",
    status: "aprovado",
    submissionDate: "28/01/2026 10:00",
    approvalDate: "28/01/2026 16:45",
    attachmentUrl: "atestado_pedro_28jan.pdf",
    comments: "Atestado válido até 29/01/2026",
    approvedBy: "Maria Diretor",
  },
  {
    id: "2",
    serverName: "Ana Oliveira",
    serverEmail: "ana@ifce.edu.br",
    date: "27/01/2026",
    reason: "Comparecimento em audiência",
    type: "justificativa",
    status: "aprovado",
    submissionDate: "27/01/2026 08:30",
    approvalDate: "27/01/2026 11:20",
    comments: "Comprovação de audiência anexada",
    approvedBy: "Maria Diretor",
  },
  {
    id: "3",
    serverName: "Carlos Mendes",
    serverEmail: "carlos@ifce.edu.br",
    date: "26/01/2026",
    reason: "Problema de saúde",
    type: "justificativa",
    status: "rejeitado",
    submissionDate: "26/01/2026 15:00",
    approvalDate: "27/01/2026 09:30",
    comments: "Documentação insuficiente. Solicitar comprovação adicional.",
    approvedBy: "João Coordenador",
  },
  {
    id: "4",
    serverName: "Roberto Silva",
    serverEmail: "roberto@ifce.edu.br",
    date: "25/01/2026",
    reason: "Atestado médico - Cirurgia",
    type: "atestado",
    status: "aprovado",
    submissionDate: "25/01/2026 09:00",
    approvalDate: "25/01/2026 13:15",
    attachmentUrl: "atestado_roberto_25jan.pdf",
    approvedBy: "Maria Diretor",
  },
  {
    id: "5",
    serverName: "Fernanda Lima",
    serverEmail: "fernanda@ifce.edu.br",
    date: "20/01/2026",
    reason: "Consulta médica de rotina",
    type: "atestado",
    status: "aprovado",
    submissionDate: "20/01/2026 08:00",
    approvalDate: "20/01/2026 12:00",
    attachmentUrl: "atestado_fernanda_20jan.pdf",
    approvedBy: "João Coordenador",
  },
  {
    id: "6",
    serverName: "Lucas Andrade",
    serverEmail: "lucas@ifce.edu.br",
    date: "18/01/2026",
    reason: "Problema pessoal",
    type: "justificativa",
    status: "rejeitado",
    submissionDate: "18/01/2026 16:00",
    approvalDate: "19/01/2026 10:00",
    comments: "Justificativa não apresentada com antecedência mínima requerida.",
    approvedBy: "Maria Diretor",
  },
  {
    id: "7",
    serverName: "Mariana Souza",
    serverEmail: "mariana@ifce.edu.br",
    date: "15/01/2026",
    reason: "Participação em evento acadêmico",
    type: "justificativa",
    status: "aprovado",
    submissionDate: "10/01/2026 09:00",
    approvalDate: "12/01/2026 14:30",
    comments: "Participação confirmada como palestrante.",
    approvedBy: "João Coordenador",
  },
];

export default function HistoricoPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [typeFilter, setTypeFilter] = useState<string>("todos");

  const filteredHistorico = mockHistorico.filter((item) => {
    const matchesSearch =
      item.serverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || item.status === statusFilter;
    const matchesType = typeFilter === "todos" || item.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const aprovados = mockHistorico.filter((h) => h.status === "aprovado");
  const rejeitados = mockHistorico.filter((h) => h.status === "rejeitado");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovado":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "rejeitado":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "aprovado":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "rejeitado":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "aprovado":
        return "✓ Aprovado";
      case "rejeitado":
        return "✗ Rejeitado";
      default:
        return status;
    }
  };

  const getTypeBadgeClass = (type: string) => {
    return type === "atestado"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getTypeLabel = (type: string) => {
    return type === "atestado" ? "🏥 Atestado" : "📄 Justificativa";
  };

  const HistoricoCard = ({ item }: { item: Justificativa }) => (
    <Collapsible
      open={expandedId === item.id}
      onOpenChange={(open) => setExpandedId(open ? item.id : null)}
    >
      <CollapsibleTrigger asChild>
        <button className="w-full text-left">
          <div className="flex items-start gap-4 rounded-xl border bg-card p-4 hover:bg-muted/50 transition-all duration-200 hover:shadow-sm">
            {/* Status Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                item.status === "aprovado" ? "bg-emerald-50" : "bg-red-50"
              }`}>
                {getStatusIcon(item.status)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Header Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-foreground">
                      {item.serverName}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs font-medium ${getTypeBadgeClass(item.type)}`}
                    >
                      {getTypeLabel(item.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {item.reason}
                  </p>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${
                    expandedId === item.id ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Meta Row */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>{item.approvedBy}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-medium ${getStatusBadgeClass(item.status)}`}
                >
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
            </div>
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-muted/30 rounded-b-xl border border-t-0 -mt-2 pt-4 px-4 pb-4 ml-14 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Informações do Servidor
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{item.serverName}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {item.serverEmail}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Datas e Análise
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data da falta:</span>
                  <span className="font-medium">{item.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enviado em:</span>
                  <span className="font-medium">{item.submissionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decidido em:</span>
                  <span className="font-medium">{item.approvalDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Analisado por:</span>
                  <span className="font-medium">{item.approvedBy}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Motivo/Descrição
            </p>
            <p className="text-sm">{item.reason}</p>
          </div>

          {item.comments && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Observações
                </p>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">{item.comments}</p>
              </div>
            </>
          )}

          {item.attachmentUrl && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  {item.attachmentUrl}
                </Button>
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Histórico de Justificativas
        </h1>
        <p className="text-muted-foreground">
          Visualize o histórico de justificativas e atestados processados
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="flex h-full w-2 bg-slate-500" />
              <div className="flex items-center gap-4 p-4 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  <History className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{mockHistorico.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Total Processados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="flex h-full w-2 bg-emerald-500" />
              <div className="flex items-center gap-4 p-4 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{aprovados.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Aprovados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="flex h-full w-2 bg-red-500" />
              <div className="flex items-center gap-4 p-4 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{rejeitados.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Rejeitados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Filter className="h-4 w-4" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou motivo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                <SelectItem value="atestado">Atestado</SelectItem>
                <SelectItem value="justificativa">Justificativa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Histórico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-slate-500" />
            Registros Processados
          </CardTitle>
          <CardDescription>
            {filteredHistorico.length} registro(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredHistorico.length > 0 ? (
            filteredHistorico.map((item) => (
              <HistoricoCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-slate-500 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Nenhum registro encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
