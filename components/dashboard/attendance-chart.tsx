"use client"

import { useState } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const weeklyData = [
  { name: "Seg", presentes: 145, ausentes: 15, atrasos: 5 },
  { name: "Ter", presentes: 148, ausentes: 12, atrasos: 8 },
  { name: "Qua", presentes: 142, ausentes: 18, atrasos: 6 },
  { name: "Qui", presentes: 150, ausentes: 10, atrasos: 4 },
  { name: "Sex", presentes: 138, ausentes: 22, atrasos: 10 },
]

const monthlyData = [
  { name: "Sem 1", presentes: 720, ausentes: 80, atrasos: 25 },
  { name: "Sem 2", presentes: 735, ausentes: 65, atrasos: 30 },
  { name: "Sem 3", presentes: 710, ausentes: 90, atrasos: 28 },
  { name: "Sem 4", presentes: 745, ausentes: 55, atrasos: 22 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border bg-card/95 p-4 shadow-xl backdrop-blur-sm">
        <p className="mb-3 text-sm font-semibold text-foreground">{label}</p>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-muted-foreground">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 pt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export function AttendanceChart() {
  const [period, setPeriod] = useState("weekly")
  const data = period === "weekly" ? weeklyData : monthlyData

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            Frequencia {period === "weekly" ? "Semanal" : "Mensal"}
          </CardTitle>
          <CardDescription>
            Acompanhe a presenca dos servidores ao longo do tempo
          </CardDescription>
        </div>
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="weekly" className="px-3 text-xs">
              Semanal
            </TabsTrigger>
            <TabsTrigger value="monthly" className="px-3 text-xs">
              Mensal
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-4">
        <div className="min-h-[300px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientPresentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradientAusentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="gradientAtrasos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              <Area
                type="monotone"
                dataKey="presentes"
                name="Presentes"
                stroke="#10b981"
                strokeWidth={2.5}
                fill="url(#gradientPresentes)"
                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="ausentes"
                name="Ausentes"
                stroke="#f43f5e"
                strokeWidth={2.5}
                fill="url(#gradientAusentes)"
                dot={{ r: 4, fill: "#f43f5e", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#f43f5e", strokeWidth: 2, stroke: "#fff" }}
              />
              <Area
                type="monotone"
                dataKey="atrasos"
                name="Atrasos"
                stroke="#f59e0b"
                strokeWidth={2.5}
                fill="url(#gradientAtrasos)"
                dot={{ r: 4, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#f59e0b", strokeWidth: 2, stroke: "#fff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
