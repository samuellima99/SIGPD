"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  FileText,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  Paperclip,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JustificationDetailModal } from "@/components/justifications/justification-detail-modal"

const mockJustifications = [
  {
    id: "1",
    type: "justificativa",
    title: "Justificativa de Falta",
    description: "Problema de saúde na família que exigiu acompanhamento.",
    requester: {
      id: "1",
      name: "Maria Silva Santos",
      email: "maria.silva@ifce.edu.br",
      avatar: "",
      setor: "Informática",
    },
    date: "2026-01-27",
    absenceDate: "2026-01-24",
    status: "pendente",
    attachments: 1,
    comments: 0,
    createdAt: "2026-01-27T10:30:00",
  },
  {
    id: "2",
    type: "atestado",
    title: "Atestado Médico",
    description: "Atestado médico de 3 dias por motivo de gripe.",
    requester: {
      id: "2",
      name: "João Pedro Lima",
      email: "joao.lima@ifce.edu.br",
      avatar: "",
      setor: "Matemática",
    },
    date: "2026-01-26",
    absenceDate: "2026-01-22",
    absenceEndDate: "2026-01-24",
    status: "pendente",
    attachments: 2,
    comments: 1,
    createdAt: "2026-01-26T14:15:00",
    urgent: true,
  },
  {
    id: "3",
    type: "justificativa",
    title: "Justificativa de Atraso",
    description: "Problemas no trânsito devido a acidente na via principal.",
    requester: {
      id: "6",
      name: "Lucas Rodrigues Silva",
      email: "lucas.rodrigues@ifce.edu.br",
      avatar: "",
      setor: "Física",
    },
    date: "2026-01-25",
    absenceDate: "2026-01-25",
    status: "pendente",
    attachments: 0,
    comments: 0,
    createdAt: "2026-01-25T09:45:00",
  },
  {
    id: "4",
    type: "atestado",
    title: "Atestado Médico",
    description: "Consulta médica agendada previamente.",
    requester: {
      id: "8",
      name: "Roberto Carlos Nunes",
      email: "roberto.nunes@ifce.edu.br",
      avatar: "",
      setor: "Letras",
    },
    date: "2026-01-24",
    absenceDate: "2026-01-23",
    status: "pendente",
    attachments: 1,
    comments: 2,
    createdAt: "2026-01-24T16:00:00",
    urgent: true,
  },
  {
    id: "5",
    type: "justificativa",
    title: "Justificativa de Falta",
    description: "Participação em evento acadêmico externo.",
    requester: {
      id: "1",
      name: "Maria Silva Santos",
      email: "maria.silva@ifce.edu.br",
      avatar: "",
      setor: "Informática",
    },
    date: "2026-01-20",
    absenceDate: "2026-01-17",
    status: "aprovado",
    attachments: 2,
    comments: 1,
    createdAt: "2026-01-20T11:20:00",
    approvedBy: "Ana Costa",
    approvedAt: "2026-01-21T09:00:00",
  },
  {
    id: "6",
    type: "atestado",
    title: "Atestado Médico",
    description: "Licença médica por procedimento cirúrgico.",
    requester: {
      id: "7",
      name: "Fernanda Lima Sousa",
      email: "fernanda.lima@ifce.edu.br",
      avatar: "",
      setor: "Ciências",
    },
    date: "2026-01-10",
    absenceDate: "2026-01-10",
    absenceEndDate: "2026-01-15",
    status: "rejeitado",
    attachments: 1,
    comments: 3,
    createdAt: "2026-01-10T08:30:00",
    rejectedBy: "João Oliveira",
    rejectedAt: "2026-01-11T14:00:00",
    rejectionReason: "Documentação incompleta. Por favor, envie o atestado com CID.",
  },
]

const statusConfig = {
  pendente: {
    label: "Pendente",
    className: "bg-warning/10 text-warning-foreground",
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-primary/10 text-primary",
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-destructive/10 text-destructive",
  },
}

export default function JustificativasPendentesPage() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedJustification, setSelectedJustification] = useState<(typeof mockJustifications)[0] | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const pendingItems = mockJustifications.filter((j) => j.status === "pendente")
  const approvedItems = mockJustifications.filter((j) => j.status === "aprovado")
  const rejectedItems = mockJustifications.filter((j) => j.status === "rejeitado")

  const filterItems = (items: typeof mockJustifications) => {
    return items.filter((item) => {
      const matchesSearch =
        item.requester.name.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === "all" || item.type === typeFilter
      return matchesSearch && matchesType
    })
  }

  const handleViewItem = (item: (typeof mockJustifications)[0]) => {
    setSelectedJustification(item)
    setModalOpen(true)
  }

  const renderList = (items: typeof mockJustifications) => {
    const filtered = filterItems(items)

    if (filtered.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mb-3" />
          <p className="font-medium">Nenhum item encontrado</p>
          <p className="text-sm">Não há registros para exibir</p>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        {filtered.map((item) => {
          const status = statusConfig[item.status as keyof typeof statusConfig]
          return (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
              onClick={() => handleViewItem(item)}
            >
              <div
                className={`rounded-lg p-2.5 ${
                  item.type === "atestado" ? "bg-primary/10" : "bg-muted"
                }`}
              >
                {item.type === "atestado" ? (
                  <Stethoscope className="h-5 w-5 text-primary" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.urgent && (
                        <Badge variant="destructive" className="text-[10px] h-5">
                          Urgente
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className={status.className}>
                    {status.label}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                        {item.requester.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{item.requester.name}</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                    {item.attachments > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        <span>{item.attachments}</span>
                      </div>
                    )}
                    {item.comments > 0 && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>{item.comments}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                {item.status === "pendente" && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Justificativas e Atestados</h1>
        <p className="text-muted-foreground">
          Gerencie as solicitações de justificativa e atestados médicos.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pendentes</p>
            <p className="text-2xl font-bold">{pendingItems.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Aprovados (mês)</p>
            <p className="text-2xl font-bold text-primary">{approvedItems.length}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rejeitados (mês)</p>
            <p className="text-2xl font-bold text-destructive">{rejectedItems.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Solicitações</CardTitle>
          <CardDescription>
            Analise e gerencie as solicitações de justificativa e atestados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou título..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="justificativa">Justificativa</SelectItem>
                <SelectItem value="atestado">Atestado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="pendentes">
            <TabsList className="mb-4">
              <TabsTrigger value="pendentes" className="gap-2">
                Pendentes
                {pendingItems.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {pendingItems.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="aprovados">Aprovados</TabsTrigger>
              <TabsTrigger value="rejeitados">Rejeitados</TabsTrigger>
            </TabsList>

            <TabsContent value="pendentes">{renderList(pendingItems)}</TabsContent>
            <TabsContent value="aprovados">{renderList(approvedItems)}</TabsContent>
            <TabsContent value="rejeitados">{renderList(rejectedItems)}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <JustificationDetailModal
        justification={selectedJustification}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  )
}
