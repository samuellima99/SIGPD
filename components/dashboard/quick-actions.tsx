"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  FileText,
  Download,
  UserPlus,
  Settings,
  QrCode,
  BarChart3,
} from "lucide-react"
import { usePermissions } from "@/contexts/auth-context"

const actions = [
  {
    title: "Gerar Relatorio",
    description: "Exportar dados em PDF/CSV",
    icon: FileText,
    href: "/relatorios",
    permission: "canViewReports",
    color: "bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20",
  },
  {
    title: "Exportar Dados",
    description: "Download da planilha",
    icon: Download,
    href: "/relatorios?export=true",
    permission: "canViewReports",
    color: "bg-sky-500/10 text-sky-600 group-hover:bg-sky-500/20",
  },
  {
    title: "Novo Usuario",
    description: "Cadastrar servidor",
    icon: UserPlus,
    href: "/usuarios/novo",
    permission: "canManageUsers",
    color: "bg-violet-500/10 text-violet-600 group-hover:bg-violet-500/20",
  },
  {
    title: "Configuracoes",
    description: "Regras do sistema",
    icon: Settings,
    href: "/configuracoes",
    permission: "canViewSettings",
    color: "bg-slate-500/10 text-slate-600 group-hover:bg-slate-500/20",
  },
  {
    title: "QR Code",
    description: "Gerar codigo do campus",
    icon: QrCode,
    href: "/configuracoes/qrcode",
    permission: "canManageSettings",
    color: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20",
  },
  {
    title: "Indicadores",
    description: "Metricas detalhadas",
    icon: BarChart3,
    href: "/relatorios/indicadores",
    permission: "canViewReports",
    color: "bg-rose-500/10 text-rose-600 group-hover:bg-rose-500/20",
  },
]

export function QuickActions() {
  const permissions = usePermissions()

  const filteredActions = actions.filter(
    (action) => permissions[action.permission as keyof typeof permissions]
  )

  if (filteredActions.length === 0) return null

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Acoes Rapidas</CardTitle>
        <CardDescription>Acesso rapido as funcoes mais usadas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="grid grid-cols-2 gap-2">
          {filteredActions.slice(0, 6).map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group flex flex-col gap-2 rounded-xl border bg-card p-3 transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <div
                className={`w-fit rounded-lg p-2 transition-colors ${action.color}`}
              >
                <action.icon className="h-4 w-4" />
              </div>
              <div>
                <span className="text-sm font-medium">{action.title}</span>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
