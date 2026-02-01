"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Stethoscope, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"

const pendingItems = [
  {
    id: "1",
    type: "justificativa",
    title: "Justificativa de Falta",
    requester: "Maria Silva",
    date: "27/01/2026",
    urgent: false,
    daysAgo: 4,
  },
  {
    id: "2",
    type: "atestado",
    title: "Atestado Medico",
    requester: "Joao Santos",
    date: "26/01/2026",
    urgent: true,
    daysAgo: 5,
  },
  {
    id: "3",
    type: "justificativa",
    title: "Justificativa de Atraso",
    requester: "Pedro Lima",
    date: "25/01/2026",
    urgent: false,
    daysAgo: 6,
  },
  {
    id: "4",
    type: "atestado",
    title: "Atestado Medico",
    requester: "Ana Costa",
    date: "24/01/2026",
    urgent: true,
    daysAgo: 7,
  },
]

const urgentCount = pendingItems.filter((item) => item.urgent).length

export function PendingApprovals() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Pendencias</CardTitle>
          <CardDescription>Aguardando sua analise</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {urgentCount > 0 && (
            <Badge
              variant="destructive"
              className="flex h-6 items-center gap-1 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"
            >
              <AlertCircle className="h-3 w-3" />
              {urgentCount} urgente{urgentCount > 1 ? "s" : ""}
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="h-6 bg-muted/50 text-xs font-medium"
          >
            {pendingItems.length} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex-1 space-y-2">
          {pendingItems.map((item) => (
            <div
              key={item.id}
              className={`group relative flex items-start gap-3 rounded-xl border p-3 transition-all hover:shadow-sm ${
                item.urgent
                  ? "border-rose-200 bg-rose-50/50 hover:border-rose-300"
                  : "bg-card hover:border-primary/20"
              }`}
            >
              <div
                className={`rounded-lg p-2 ${
                  item.type === "atestado"
                    ? "bg-sky-500/10"
                    : "bg-slate-500/10"
                }`}
              >
                {item.type === "atestado" ? (
                  <Stethoscope
                    className={`h-4 w-4 ${
                      item.urgent ? "text-rose-600" : "text-sky-600"
                    }`}
                  />
                ) : (
                  <FileText className="h-4 w-4 text-slate-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{item.title}</p>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.requester}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  ha {item.daysAgo} dias
                </p>
              </div>
              {item.urgent && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full gap-2 bg-transparent"
          asChild
        >
          <Link href="/justificativas/pendentes">
            Ver todas pendencias
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
