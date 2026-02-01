"use client"

import {
  Users,
  UserCheck,
  Clock,
  FileWarning,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stats = [
  {
    title: "Presentes Hoje",
    value: "142",
    total: 160,
    change: "+12%",
    trend: "up" as const,
    description: "de 160 esperados",
    icon: UserCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
    progressColor: "bg-emerald-500",
  },
  {
    title: "Ausentes",
    value: "18",
    total: 160,
    change: "-5%",
    trend: "down" as const,
    description: "vs. ontem",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-500/10",
    progressColor: "bg-rose-500",
  },
  {
    title: "Atrasos",
    value: "7",
    total: 160,
    change: "+2",
    trend: "up" as const,
    description: "esta semana",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
    progressColor: "bg-amber-500",
  },
  {
    title: "Pendencias",
    value: "23",
    total: null,
    change: "8 novos",
    trend: "neutral" as const,
    description: "aguardando analise",
    icon: FileWarning,
    color: "text-sky-600",
    bgColor: "bg-sky-500/10",
    progressColor: "bg-sky-500",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const percentage = stat.total
          ? Math.round((parseInt(stat.value) / stat.total) * 100)
          : null

        return (
          <Card
            key={stat.title}
            className="group relative overflow-hidden transition-all hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold tracking-tight">
                      {stat.value}
                    </span>
                    {stat.trend !== "neutral" && (
                      <span
                        className={`flex items-center text-xs font-semibold ${
                          stat.trend === "up"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {stat.change}
                      </span>
                    )}
                    {stat.trend === "neutral" && (
                      <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-600">
                        {stat.change}
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className={`rounded-xl p-2.5 ${stat.bgColor} transition-transform group-hover:scale-110`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>

              {percentage !== null ? (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {stat.description}
                    </span>
                    <span className="font-medium">{percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${stat.progressColor}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
