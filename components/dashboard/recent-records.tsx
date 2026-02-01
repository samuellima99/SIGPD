"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

const recentRecords = [
  {
    id: "1",
    name: "Maria Silva",
    role: "Professora",
    time: "08:02",
    status: "presente",
    campus: "Fortaleza",
  },
  {
    id: "2",
    name: "Joao Santos",
    role: "Professor",
    time: "08:15",
    status: "atrasado",
    campus: "Fortaleza",
  },
  {
    id: "3",
    name: "Ana Costa",
    role: "Coordenadora",
    time: "07:58",
    status: "presente",
    campus: "Maracanau",
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    role: "Professor",
    time: "08:45",
    status: "atrasado",
    campus: "Fortaleza",
  },
  {
    id: "5",
    name: "Carla Mendes",
    role: "Professora",
    time: "07:55",
    status: "presente",
    campus: "Fortaleza",
  },
]

const statusConfig = {
  presente: {
    label: "Presente",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-700",
  },
  atrasado: {
    label: "Atrasado",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-700",
  },
  ausente: {
    label: "Ausente",
    dotColor: "bg-rose-500",
    bgColor: "bg-rose-500/10",
    textColor: "text-rose-700",
  },
}

const avatarColors = [
  "bg-sky-500/15 text-sky-700",
  "bg-violet-500/15 text-violet-700",
  "bg-emerald-500/15 text-emerald-700",
  "bg-amber-500/15 text-amber-700",
  "bg-rose-500/15 text-rose-700",
]

export function RecentRecords() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Registros Recentes
          </CardTitle>
          <CardDescription>Ultimos registros de frequencia do dia</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="gap-1.5" asChild>
          <Link href="/frequencia">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          {recentRecords.map((record, index) => {
            const status = statusConfig[record.status as keyof typeof statusConfig]
            const avatarColor = avatarColors[index % avatarColors.length]
            return (
              <div
                key={record.id}
                className="group flex items-center justify-between rounded-xl border bg-card p-3 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-background">
                    <AvatarFallback className={`text-sm font-medium ${avatarColor}`}>
                      {record.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{record.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {record.role} - {record.campus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-mono tabular-nums">{record.time}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 ${status.bgColor}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`}
                    />
                    <span className={`text-xs font-medium ${status.textColor}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
