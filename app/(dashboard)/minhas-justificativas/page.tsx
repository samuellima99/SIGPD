"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Plus,
  FileText,
  Stethoscope,
  Clock,
  Paperclip,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

const myJustifications = [
  {
    id: "1",
    type: "justificativa",
    title: "Justificativa de Falta",
    description: "Participação em evento acadêmico externo - Congresso de Educação.",
    absenceDate: "2026-01-17",
    status: "aprovado",
    attachments: 2,
    createdAt: "2026-01-20",
    approvedBy: "Ana Costa",
    approvedAt: "2026-01-21",
  },
  {
    id: "2",
    type: "atestado",
    title: "Atestado Médico",
    description: "Licença médica por motivo de gripe.",
    absenceDate: "2026-01-10",
    status: "aprovado",
    attachments: 1,
    createdAt: "2026-01-10",
    approvedBy: "João Oliveira",
    approvedAt: "2026-01-11",
  },
  {
    id: "3",
    type: "justificativa",
    title: "Justificativa de Atraso",
    description: "Problemas no trânsito devido a obras na avenida principal.",
    absenceDate: "2026-01-25",
    status: "pendente",
    attachments: 0,
    createdAt: "2026-01-25",
  },
  {
    id: "4",
    type: "justificativa",
    title: "Justificativa de Falta",
    description: "Acompanhamento médico de familiar.",
    absenceDate: "2025-12-15",
    status: "rejeitado",
    attachments: 1,
    createdAt: "2025-12-16",
    rejectedBy: "Maria Santos",
    rejectedAt: "2025-12-17",
    rejectionReason: "Necessário apresentar declaração de acompanhamento.",
  },
]

const statusConfig = {
  pendente: {
    label: "Pendente",
    className: "bg-warning/10 text-warning-foreground",
    icon: AlertCircle,
  },
  aprovado: {
    label: "Aprovado",
    className: "bg-primary/10 text-primary",
    icon: CheckCircle2,
  },
  rejeitado: {
    label: "Rejeitado",
    className: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
}

export default function MinhasJustificativasPage() {
  const { toast } = useToast()
  const [newDialogOpen, setNewDialogOpen] = useState(false)
  const [newType, setNewType] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newDate, setNewDate] = useState("")

  const pendingItems = myJustifications.filter((j) => j.status === "pendente")
  const approvedItems = myJustifications.filter((j) => j.status === "aprovado")
  const rejectedItems = myJustifications.filter((j) => j.status === "rejeitado")

  const handleSubmit = () => {
    if (!newType || !newDescription || !newDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos para enviar a solicitação.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Solicitação enviada",
      description: "Sua justificativa foi enviada para análise.",
    })
    setNewDialogOpen(false)
    setNewType("")
    setNewDescription("")
    setNewDate("")
  }

  const renderList = (items: typeof myJustifications) => {
    if (items.length === 0) {
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
        {items.map((item) => {
          const status = statusConfig[item.status as keyof typeof statusConfig]
          const StatusIcon = status.icon
          return (
            <div
              key={item.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-start gap-4">
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
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className={status.className}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>
                        {format(new Date(item.absenceDate), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    {item.attachments > 0 && (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3.5 w-3.5" />
                        <span>{item.attachments} anexo(s)</span>
                      </div>
                    )}
                  </div>

                  {/* Status details */}
                  {item.status === "aprovado" && item.approvedBy && (
                    <div className="mt-3 text-sm text-primary">
                      Aprovado por {item.approvedBy} em{" "}
                      {format(new Date(item.approvedAt!), "dd/MM/yyyy", { locale: ptBR })}
                    </div>
                  )}
                  {item.status === "rejeitado" && item.rejectedBy && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-destructive">
                        Rejeitado por {item.rejectedBy} em{" "}
                        {format(new Date(item.rejectedAt!), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                      {item.rejectionReason && (
                        <p className="text-sm text-muted-foreground">
                          <strong>Motivo:</strong> {item.rejectionReason}
                        </p>
                      )}
                    </div>
                  )}
                </div>
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minhas Justificativas</h1>
          <p className="text-muted-foreground">
            Acompanhe suas solicitações de justificativa e atestados.
          </p>
        </div>
        <Dialog open={newDialogOpen} onOpenChange={setNewDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Solicitação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Solicitação</DialogTitle>
              <DialogDescription>
                Preencha os dados para solicitar uma justificativa ou enviar um atestado.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Tipo de Solicitação</Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="justificativa_falta">Justificativa de Falta</SelectItem>
                    <SelectItem value="justificativa_atraso">Justificativa de Atraso</SelectItem>
                    <SelectItem value="atestado">Atestado Médico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data da Ausência/Atraso</Label>
                <Input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea
                  placeholder="Descreva o motivo da justificativa..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Anexos (opcional)</Label>
                <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: PDF, JPG, PNG. Máximo 5MB.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setNewDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="flex-1" onClick={handleSubmit}>
                  Enviar Solicitação
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <AlertCircle className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em análise</p>
                <p className="text-2xl font-bold">{pendingItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Aprovadas</p>
                <p className="text-2xl font-bold text-primary">{approvedItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-destructive/10 p-2">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejeitadas</p>
                <p className="text-2xl font-bold text-destructive">{rejectedItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Solicitações</CardTitle>
          <CardDescription>
            Todas as suas solicitações de justificativa e atestados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="todas">
            <TabsList className="mb-4">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="pendentes" className="gap-2">
                Pendentes
                {pendingItems.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5">
                    {pendingItems.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
              <TabsTrigger value="rejeitadas">Rejeitadas</TabsTrigger>
            </TabsList>

            <TabsContent value="todas">{renderList(myJustifications)}</TabsContent>
            <TabsContent value="pendentes">{renderList(pendingItems)}</TabsContent>
            <TabsContent value="aprovadas">{renderList(approvedItems)}</TabsContent>
            <TabsContent value="rejeitadas">{renderList(rejectedItems)}</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
