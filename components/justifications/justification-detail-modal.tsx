"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Stethoscope,
  Calendar,
  Clock,
  Paperclip,
  Download,
  CheckCircle2,
  XCircle,
  Loader2,
  MessageSquare,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

interface Justification {
  id: string
  type: string
  title: string
  description: string
  requester: {
    id: string
    name: string
    email: string
    avatar: string
    setor: string
  }
  date: string
  absenceDate: string
  absenceEndDate?: string
  status: string
  attachments: number
  comments: number
  createdAt: string
  urgent?: boolean
  approvedBy?: string
  approvedAt?: string
  rejectedBy?: string
  rejectedAt?: string
  rejectionReason?: string
}

interface JustificationDetailModalProps {
  justification: Justification | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

export function JustificationDetailModal({
  justification,
  open,
  onOpenChange,
}: JustificationDetailModalProps) {
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null)

  if (!justification) return null

  const status = statusConfig[justification.status as keyof typeof statusConfig]

  const handleApprove = async () => {
    setLoading("approve")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Solicitação aprovada",
      description: `A justificativa de ${justification.requester.name} foi aprovada.`,
    })
    setLoading(null)
    onOpenChange(false)
  }

  const handleReject = async () => {
    if (!comment.trim()) {
      toast({
        title: "Comentário obrigatório",
        description: "Adicione um motivo para a rejeição.",
        variant: "destructive",
      })
      return
    }
    setLoading("reject")
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Solicitação rejeitada",
      description: `A justificativa de ${justification.requester.name} foi rejeitada.`,
    })
    setLoading(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`rounded-lg p-2.5 ${
                  justification.type === "atestado" ? "bg-primary/10" : "bg-muted"
                }`}
              >
                {justification.type === "atestado" ? (
                  <Stethoscope className="h-5 w-5 text-primary" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <DialogTitle className="flex items-center gap-2">
                  {justification.title}
                  {justification.urgent && (
                    <Badge variant="destructive" className="text-[10px]">
                      Urgente
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Solicitado em {format(new Date(justification.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </DialogDescription>
              </div>
            </div>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Requester Info */}
          <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {justification.requester.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{justification.requester.name}</p>
              <p className="text-sm text-muted-foreground">{justification.requester.email}</p>
              <p className="text-sm text-muted-foreground">{justification.requester.setor}</p>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data da ausência</p>
                <p className="font-medium">
                  {format(new Date(justification.absenceDate), "dd/MM/yyyy", { locale: ptBR })}
                  {justification.absenceEndDate &&
                    ` - ${format(new Date(justification.absenceEndDate), "dd/MM/yyyy", { locale: ptBR })}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Solicitado em</p>
                <p className="font-medium">
                  {format(new Date(justification.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Descrição
            </h4>
            <p className="text-sm leading-relaxed">{justification.description}</p>
          </div>

          {/* Attachments */}
          {justification.attachments > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Anexos ({justification.attachments})
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Paperclip className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">atestado_medico.pdf</p>
                        <p className="text-xs text-muted-foreground">245 KB</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  {justification.attachments > 1 && (
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">comprovante.jpg</p>
                          <p className="text-xs text-muted-foreground">1.2 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Status Info (for approved/rejected) */}
          {justification.status === "aprovado" && justification.approvedBy && (
            <>
              <Separator />
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">Aprovado</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Aprovado por <strong>{justification.approvedBy}</strong> em{" "}
                  {format(new Date(justification.approvedAt!), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </>
          )}

          {justification.status === "rejeitado" && justification.rejectedBy && (
            <>
              <Separator />
              <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                <div className="flex items-center gap-2 text-destructive mb-2">
                  <XCircle className="h-4 w-4" />
                  <span className="font-medium">Rejeitado</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Rejeitado por <strong>{justification.rejectedBy}</strong> em{" "}
                  {format(new Date(justification.rejectedAt!), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
                {justification.rejectionReason && (
                  <p className="text-sm">
                    <strong>Motivo:</strong> {justification.rejectionReason}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Actions for pending items */}
          {justification.status === "pendente" && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="comment" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comentário (opcional para aprovar, obrigatório para rejeitar)
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Adicione um comentário ou motivo da decisão..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    onClick={handleApprove}
                    disabled={loading !== null}
                  >
                    {loading === "approve" ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    Aprovar
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={handleReject}
                    disabled={loading !== null}
                  >
                    {loading === "reject" ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Rejeitar
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
