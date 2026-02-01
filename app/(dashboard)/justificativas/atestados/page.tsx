"use client";

import { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  MessageSquare,
  User,
  Calendar,
  ChevronDown,
  Search,
  Filter,
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

interface Atestado {
  id: string;
  serverName: string;
  serverEmail: string;
  date: string;
  reason: string;
  status: "pendente" | "aprovado" | "rejeitado";
  submissionDate: string;
  approvalDate?: string;
  attachmentUrl: string;
  comments?: string;
  diasAfastamento: number;
  cid?: string;
}

const mockAtestados: Atestado[] = [
  {
    id: "1",
    serverName: "João Silva",
    serverEmail: "joao@ifce.edu.br",
    date: "30/01/2026",
    reason: "Consulta médica",
    status: "pendente",
    submissionDate: "31/01/2026 09:15",
    attachmentUrl: "atestado_joao_30jan.pdf",
    diasAfastamento: 1,
    cid: "Z00.0",
  },
  {
    id: "2",
    serverName: "Pedro Costa",
    serverEmail: "pedro@ifce.edu.br",
    date: "28/01/2026",
    reason: "Atestado médico - Inflamação",
    status: "aprovado",
    submissionDate: "28/01/2026 10:00",
    approvalDate: "28/01/2026 16:45",
    attachmentUrl: "atestado_pedro_28jan.pdf",
    comments: "Atestado válido até 29/01/2026",
    diasAfastamento: 2,
    cid: "J00",
  },
  {
    id: "3",
    serverName: "Roberto Silva",
    serverEmail: "roberto@ifce.edu.br",
    date: "25/01/2026",
    reason: "Atestado médico - Cirurgia",
    status: "aprovado",
    submissionDate: "25/01/2026 09:00",
    approvalDate: "25/01/2026 13:15",
    attachmentUrl: "atestado_roberto_25jan.pdf",
    diasAfastamento: 15,
    cid: "K40.2",
  },
  {
    id: "4",
    serverName: "Fernanda Lima",
    serverEmail: "fernanda@ifce.edu.br",
    date: "20/01/2026",
    reason: "Atestado médico - Gripe",
    status: "aprovado",
    submissionDate: "20/01/2026 08:30",
    approvalDate: "20/01/2026 11:00",
    attachmentUrl: "atestado_fernanda_20jan.pdf",
    diasAfastamento: 3,
    cid: "J11",
  },
  {
    id: "5",
    serverName: "Lucas Andrade",
    serverEmail: "lucas@ifce.edu.br",
    date: "15/01/2026",
    reason: "Atestado médico - Documentação incompleta",
    status: "rejeitado",
    submissionDate: "15/01/2026 14:00",
    approvalDate: "16/01/2026 09:00",
    attachmentUrl: "atestado_lucas_15jan.pdf",
    comments: "Documentação incompleta. Por favor, envie o atestado com CID.",
    diasAfastamento: 2,
  },
];

export default function AtestadosPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");

  const filteredAtestados = mockAtestados.filter((item) => {
    const matchesSearch =
      item.serverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "todos" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendentes = mockAtestados.filter((a) => a.status === "pendente");
  const aprovados = mockAtestados.filter((a) => a.status === "aprovado");
  const rejeitados = mockAtestados.filter((a) => a.status === "rejeitado");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="h-5 w-5 text-amber-500" />;
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
      case "pendente":
        return "bg-amber-50 text-amber-700 border-amber-200";
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
      case "pendente":
        return "⏳ Pendente";
      case "aprovado":
        return "✓ Aprovado";
      case "rejeitado":
        return "✗ Rejeitado";
      default:
        return status;
    }
  };

  const AtestadoCard = ({ item }: { item: Atestado }) => (
    <Collapsible
      open={expandedId === item.id}
      onOpenChange={(open) => setExpandedId(open ? item.id : null)}
    >
      <CollapsibleTrigger asChild>
        <button className="w-full text-left">
          <div className="flex items-start gap-4 rounded-xl border bg-card p-4 hover:bg-muted/50 transition-all duration-200 hover:shadow-sm">
            {/* Status Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
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
                      className="text-xs bg-blue-100 text-blue-800 font-medium"
                    >
                      🏥 Atestado
                    </Badge>
                    {item.cid && (
                      <Badge variant="outline" className="text-xs font-mono">
                        CID: {item.cid}
                      </Badge>
                    )}
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
                  <Clock className="h-3.5 w-3.5" />
                  <span>{item.diasAfastamento} dia(s)</span>
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
                Detalhes do Atestado
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data da falta:</span>
                  <span className="font-medium">{item.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dias de afastamento:</span>
                  <span className="font-medium">{item.diasAfastamento}</span>
                </div>
                {item.cid && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CID:</span>
                    <span className="font-medium font-mono">{item.cid}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Enviado em:</span>
                  <span className="font-medium">{item.submissionDate}</span>
                </div>
                {item.approvalDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Decidido em:</span>
                    <span className="font-medium">{item.approvalDate}</span>
                  </div>
                )}
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
                  Comentários
                </p>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">{item.comments}</p>
              </div>
            </>
          )}

          <Separator />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {item.attachmentUrl}
            </Button>
            {item.status === "pendente" && (
              <>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  Rejeitar
                </Button>
              </>
            )}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Atestados Médicos
        </h1>
        <p className="text-muted-foreground">
          Gerencie os atestados médicos dos servidores
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className="flex h-full w-2 bg-amber-500" />
              <div className="flex items-center gap-4 p-4 flex-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{pendentes.length}</p>
                  <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
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
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Atestados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Atestados Médicos
          </CardTitle>
          <CardDescription>
            {filteredAtestados.length} atestado(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredAtestados.length > 0 ? (
            filteredAtestados.map((item) => (
              <AtestadoCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Nenhum atestado encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
