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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface Justificativa {
  id: string;
  serverName: string;
  serverEmail: string;
  date: string;
  reason: string;
  type: "atestado" | "justificativa";
  status: "pendente" | "aprovado" | "rejeitado";
  submissionDate: string;
  approvalDate?: string;
  attachmentUrl?: string;
  comments?: string;
}

const mockJustificativas: Justificativa[] = [
  {
    id: "1",
    serverName: "João Silva",
    serverEmail: "joao@ifce.edu.br",
    date: "30/01/2026",
    reason: "Consulta médica",
    type: "atestado",
    status: "pendente",
    submissionDate: "31/01/2026 09:15",
    attachmentUrl: "atestado_joao_30jan.pdf",
  },
  {
    id: "2",
    serverName: "Maria Santos",
    serverEmail: "maria@ifce.edu.br",
    date: "29/01/2026",
    reason: "Problema familiar urgente",
    type: "justificativa",
    status: "pendente",
    submissionDate: "30/01/2026 14:30",
    comments: "Descrita como emergência familiar",
  },
  {
    id: "3",
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
  },
  {
    id: "4",
    serverName: "Ana Oliveira",
    serverEmail: "ana@ifce.edu.br",
    date: "27/01/2026",
    reason: "Comparecimento em audiência",
    type: "justificativa",
    status: "aprovado",
    submissionDate: "27/01/2026 08:30",
    approvalDate: "27/01/2026 11:20",
    comments: "Comprovação de audiência anexada",
  },
  {
    id: "5",
    serverName: "Carlos Mendes",
    serverEmail: "carlos@ifce.edu.br",
    date: "26/01/2026",
    reason: "Problema de saúde",
    type: "justificativa",
    status: "rejeitado",
    submissionDate: "26/01/2026 15:00",
    approvalDate: "27/01/2026 09:30",
    comments: "Documentação insuficiente. Solicitar comprovação adicional.",
  },
  {
    id: "6",
    serverName: "Roberto Silva",
    serverEmail: "roberto@ifce.edu.br",
    date: "25/01/2026",
    reason: "Atestado médico - Cirurgia",
    type: "atestado",
    status: "aprovado",
    submissionDate: "25/01/2026 09:00",
    approvalDate: "25/01/2026 13:15",
    attachmentUrl: "atestado_roberto_25jan.pdf",
  },
];

export default function JustificativasPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const pendentes = mockJustificativas.filter((j) => j.status === "pendente");
  const aprovadas = mockJustificativas.filter((j) => j.status === "aprovado");
  const rejeitadas = mockJustificativas.filter((j) => j.status === "rejeitado");
  const atestados = mockJustificativas.filter((j) => j.type === "atestado");
  const historico = mockJustificativas.filter((j) => j.status !== "pendente");

  const JustificativaCard = ({ item }: { item: Justificativa }) => (
    <Collapsible
      open={expandedId === item.id}
      onOpenChange={(open) => setExpandedId(open ? item.id : null)}
    >
      <CollapsibleTrigger asChild>
        <button className="w-full text-left">
          <div className="flex items-center gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
            {item.status === "pendente" && (
              <Clock className="h-5 w-5 text-amber-500 shrink-0" />
            )}
            {item.status === "aprovado" && (
              <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
            )}
            {item.status === "rejeitado" && (
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-medium text-foreground">
                  {item.serverName}
                </span>
                <Badge
                  variant="secondary"
                  className={`text-xs ${
                    item.type === "atestado"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {item.type === "atestado"
                    ? "🏥 Atestado"
                    : "📄 Justificativa"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {item.reason}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.date}
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    item.status === "pendente"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : item.status === "aprovado"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {item.status === "pendente" && "⏳ Pendente"}
                  {item.status === "aprovado" && "✓ Aprovado"}
                  {item.status === "rejeitado" && "✗ Rejeitado"}
                </Badge>
              </div>
            </div>

            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform ${
                expandedId === item.id ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-muted/30 rounded-b-lg border border-t-0 p-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Informações do Servidor
              </p>
              <div className="text-sm space-y-1">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span>{item.serverName}</span>
                </div>
                <p className="text-muted-foreground break-all">
                  {item.serverEmail}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Datas
              </p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="text-muted-foreground">Data da falta: </span>
                  <span className="font-medium">{item.date}</span>
                </p>
                <p>
                  <span className="text-muted-foreground">Enviado em: </span>
                  <span className="font-medium">{item.submissionDate}</span>
                </p>
                {item.approvalDate && (
                  <p>
                    <span className="text-muted-foreground">Decidido em: </span>
                    <span className="font-medium">{item.approvalDate}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Motivo/Descrição
            </p>
            <p className="text-sm">{item.reason}</p>
          </div>

          {item.comments && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                  <MessageSquare className="h-3 w-3" />
                  Comentários
                </p>
                <p className="text-sm">{item.comments}</p>
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

          {item.status === "pendente" && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Aprovar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Rejeitar
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
          Justificativas
        </h1>
        <p className="text-muted-foreground">
          Gerencie justificativas e atestados de faltas dos servidores
        </p>
      </div>

      <Tabs defaultValue="pendentes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="pendentes" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Pendentes</span>
            <span className="sm:hidden">Pend.</span>
            <Badge variant="secondary">{pendentes.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="atestados" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Atestados</span>
            <span className="sm:hidden">Atest.</span>
            <Badge variant="secondary">{atestados.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="historico" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Histórico</span>
            <span className="sm:hidden">Hist.</span>
            <Badge variant="secondary">{historico.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendentes" className="space-y-4">
          {pendentes.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    Pendentes de Aprovação
                  </CardTitle>
                  <CardDescription>
                    {pendentes.length} justificativa(s) aguardando análise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pendentes.map((item) => (
                    <JustificativaCard key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhuma justificativa pendente
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="atestados" className="space-y-4">
          {atestados.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    Atestados Médicos
                  </CardTitle>
                  <CardDescription>
                    {atestados.length} atestado(s) no sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {atestados.map((item) => (
                    <JustificativaCard key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhum atestado registrado
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          {historico.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    Histórico
                  </CardTitle>
                  <CardDescription>
                    {historico.length} justificativa(s) processada(s)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {historico.map((item) => (
                    <JustificativaCard key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">
                  Nenhum histórico disponível
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
