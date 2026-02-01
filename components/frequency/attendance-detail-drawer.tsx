"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Wifi, QrCode, Calendar, FileText } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface AttendanceRecord {
  id: string
  userId: string
  name: string
  role: string
  campus: string
  setor: string
  date: string
  entryTime: string | null
  exitTime: string | null
  status: string
  method: string | null
  location: { lat: number; lng: number } | null
  justification?: string
}

interface AttendanceDetailDrawerProps {
  record: AttendanceRecord | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  presente: {
    label: "Presente",
    className: "bg-primary/10 text-primary",
  },
  atrasado: {
    label: "Atrasado",
    className: "bg-warning/10 text-warning-foreground",
  },
  ausente: {
    label: "Ausente",
    className: "bg-destructive/10 text-destructive",
  },
  justificado: {
    label: "Justificado",
    className: "bg-muted text-muted-foreground",
  },
}

export function AttendanceDetailDrawer({
  record,
  open,
  onOpenChange,
}: AttendanceDetailDrawerProps) {
  if (!record) return null

  const status = statusConfig[record.status as keyof typeof statusConfig]
  const dateObj = new Date(record.date)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle>Detalhes do Registro</SheetTitle>
          <SheetDescription>
            Informações completas do registro de frequência
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {record.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">{record.name}</h3>
              <p className="text-sm text-muted-foreground">
                {record.setor} • {record.campus}
              </p>
            </div>
          </div>

          <Separator />

          {/* Date & Status */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Data e Status
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="text-sm font-medium">
                    {format(dateObj, "EEEE, dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Time Records */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Horários
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Entrada</span>
                </div>
                <p className="text-2xl font-bold">
                  {record.entryTime || "—"}
                </p>
                {record.status === "atrasado" && record.entryTime && (
                  <p className="text-xs text-warning-foreground mt-1">
                    +18 min de atraso
                  </p>
                )}
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Saída</span>
                </div>
                <p className="text-2xl font-bold">
                  {record.exitTime || "—"}
                </p>
              </div>
            </div>
            {record.entryTime && record.exitTime && (
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="text-sm text-muted-foreground">Tempo trabalhado</p>
                <p className="text-lg font-semibold">9h 03min</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Verification Method */}
          {record.method && (
            <>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Método de Verificação
                </h4>
                <div className="flex flex-wrap gap-2">
                  {record.method.includes("QRCode") && (
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <QrCode className="h-4 w-4 text-primary" />
                      <span className="text-sm">QR Code</span>
                    </div>
                  )}
                  {record.method.includes("Geolocalização") && (
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm">Geolocalização</span>
                    </div>
                  )}
                  {record.method.includes("Wi-Fi") && (
                    <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span className="text-sm">Wi-Fi</span>
                    </div>
                  )}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Location */}
          {record.location && (
            <>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Localização
                </h4>
                <div className="rounded-lg border overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Mapa: {record.campus}</p>
                      <p className="text-xs">
                        {record.location.lat.toFixed(4)}, {record.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Justification */}
          {record.justification && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Justificativa
              </h4>
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{record.justification}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Aprovado em 29/01/2026
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Timeline
            </h4>
            <div className="space-y-4">
              {record.entryTime && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="h-full w-px bg-border" />
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium">Entrada registrada</p>
                    <p className="text-xs text-muted-foreground">
                      {record.entryTime} - {record.method}
                    </p>
                  </div>
                </div>
              )}
              {record.exitTime && (
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Saída registrada</p>
                    <p className="text-xs text-muted-foreground">
                      {record.exitTime} - {record.method}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
