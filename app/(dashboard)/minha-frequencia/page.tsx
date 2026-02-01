"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWeekend } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"

// Mock data for the professor's attendance
const mockMyAttendance = [
  { date: "2026-01-02", status: "presente", entryTime: "07:58", exitTime: "17:05" },
  { date: "2026-01-03", status: "presente", entryTime: "08:02", exitTime: "17:00" },
  { date: "2026-01-06", status: "presente", entryTime: "07:55", exitTime: "17:10" },
  { date: "2026-01-07", status: "atrasado", entryTime: "08:25", exitTime: "17:30" },
  { date: "2026-01-08", status: "presente", entryTime: "08:00", exitTime: "17:05" },
  { date: "2026-01-09", status: "presente", entryTime: "07:50", exitTime: "17:00" },
  { date: "2026-01-10", status: "justificado", entryTime: null, exitTime: null },
  { date: "2026-01-13", status: "presente", entryTime: "08:05", exitTime: "17:15" },
  { date: "2026-01-14", status: "presente", entryTime: "07:58", exitTime: "17:00" },
  { date: "2026-01-15", status: "presente", entryTime: "08:00", exitTime: "17:05" },
  { date: "2026-01-16", status: "presente", entryTime: "07:55", exitTime: "17:00" },
  { date: "2026-01-17", status: "atrasado", entryTime: "08:18", exitTime: "17:20" },
  { date: "2026-01-20", status: "presente", entryTime: "08:00", exitTime: "17:05" },
  { date: "2026-01-21", status: "presente", entryTime: "07:58", exitTime: "17:00" },
  { date: "2026-01-22", status: "presente", entryTime: "08:02", exitTime: "17:10" },
  { date: "2026-01-23", status: "presente", entryTime: "07:55", exitTime: "17:05" },
  { date: "2026-01-24", status: "presente", entryTime: "08:00", exitTime: "17:00" },
  { date: "2026-01-27", status: "presente", entryTime: "07:58", exitTime: "17:05" },
  { date: "2026-01-28", status: "presente", entryTime: "08:00", exitTime: "17:00" },
  { date: "2026-01-29", status: "presente", entryTime: "07:55", exitTime: "17:10" },
  { date: "2026-01-30", status: "presente", entryTime: "08:02", exitTime: "17:05" },
]

const statusColors: Record<string, string> = {
  presente: "bg-primary",
  atrasado: "bg-warning",
  ausente: "bg-destructive",
  justificado: "bg-muted-foreground",
}

export default function MinhaFrequenciaPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const getAttendanceForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return mockMyAttendance.find((a) => a.date === dateStr)
  }

  const selectedAttendance = getAttendanceForDate(selectedDate)

  // Calculate monthly stats
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const workDays = daysInMonth.filter((d) => !isWeekend(d))

  const monthlyStats = {
    totalDays: workDays.length,
    presentes: mockMyAttendance.filter((a) => a.status === "presente").length,
    atrasados: mockMyAttendance.filter((a) => a.status === "atrasado").length,
    justificados: mockMyAttendance.filter((a) => a.status === "justificado").length,
    ausentes: workDays.length - mockMyAttendance.length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minha Frequência</h1>
          <p className="text-muted-foreground">
            Acompanhe seus registros de presença e histórico.
          </p>
        </div>
        <Button asChild>
          <Link href="/registrar-presenca">
            Registrar Presença
          </Link>
        </Button>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Taxa de Presença</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-primary">
                {Math.round(((monthlyStats.presentes + monthlyStats.atrasados) / monthlyStats.totalDays) * 100)}%
              </p>
              <span className="text-sm text-muted-foreground">do mês</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Presenças</p>
            <p className="text-3xl font-bold">{monthlyStats.presentes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Atrasos</p>
            <p className="text-3xl font-bold">{monthlyStats.atrasados}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Justificativas</p>
            <p className="text-3xl font-bold">{monthlyStats.justificados}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="calendar" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendário
          </TabsTrigger>
          <TabsTrigger value="list" className="gap-2">
            <FileText className="h-4 w-4" />
            Lista de Registros
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-3">
            {/* Calendar - 2 columns on large screens for a more balanced look */}
            <Card className="lg:col-span-2 shadow-sm border-primary/10 overflow-hidden h-fit">
              <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4 px-6">
                <div className="space-y-0.5">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                    Calendário de Frequência
                  </CardTitle>
                  <CardDescription className="capitalize text-xs font-semibold text-foreground/60">
                    {format(currentMonth, "MMMM 'de' yyyy", { locale: ptBR })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      const prev = new Date(currentMonth)
                      prev.setMonth(prev.getMonth() - 1)
                      setCurrentMonth(prev)
                    }}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 text-[10px] px-2 font-bold uppercase tracking-wider"
                    onClick={() => {
                      const today = new Date()
                      setCurrentMonth(today)
                      setSelectedDate(today)
                    }}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      const next = new Date(currentMonth)
                      next.setMonth(next.getMonth() + 1)
                      setCurrentMonth(next)
                    }}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(d) => d && setSelectedDate(d)}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    locale={ptBR}
                    className="w-full max-w-[450px]"
                    style={{
                      "--cell-size": "3.2rem"
                    } as React.CSSProperties}
                    modifiers={{
                      presente: (date) => getAttendanceForDate(date)?.status === "presente",
                      atrasado: (date) => getAttendanceForDate(date)?.status === "atrasado",
                      justificado: (date) => getAttendanceForDate(date)?.status === "justificado",
                    }}
                    modifiersClassNames={{
                      presente: "bg-primary/15 text-primary font-bold hover:bg-primary/25 rounded-lg",
                      atrasado: "bg-warning/15 text-warning-foreground font-bold hover:bg-warning/25 rounded-lg",
                      justificado: "bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 rounded-lg",
                    }}
                  />
                </div>

                {/* Legend - More compact */}
                <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 border-t pt-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/5 rounded-full border border-primary/10">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-[11px] font-bold text-primary uppercase">Presente</span>
                    <span className="text-[11px] font-medium opacity-60 ml-1">{monthlyStats.presentes}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/5 rounded-full border border-warning/10">
                    <span className="h-2 w-2 rounded-full bg-warning" />
                    <span className="text-[11px] font-bold text-warning-foreground uppercase">Atrasado</span>
                    <span className="text-[11px] font-medium opacity-60 ml-1">{monthlyStats.atrasados}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Justificado</span>
                    <span className="text-[11px] font-medium opacity-60 ml-1">{monthlyStats.justificados}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/5 rounded-full border border-destructive/10">
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                    <span className="text-[11px] font-bold text-destructive uppercase">Ausente</span>
                    <span className="text-[11px] font-medium opacity-60 ml-1">{monthlyStats.ausentes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Day Details */}
            <Card className="shadow-sm border-primary/10 flex flex-col h-full lg:max-h-[600px] overflow-hidden">
              <CardHeader className="bg-primary/5 border-b py-4 px-6">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-primary/80">
                  <Clock className="h-3.5 w-3.5" />
                  Detalhes
                </CardTitle>
                <CardDescription className="text-foreground font-bold text-base">
                  {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col justify-start">
                {isWeekend(selectedDate) ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 opacity-40" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Fim de semana</p>
                      <p className="text-[11px]">Sem expediente registrado.</p>
                    </div>
                  </div>
                ) : selectedAttendance ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-muted/40 rounded-xl border border-primary/5">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">Status</span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-black px-2.5 py-0.5 shadow-none ${
                          selectedAttendance.status === "presente"
                            ? "bg-primary/20 text-primary border-primary/20"
                            : selectedAttendance.status === "atrasado"
                              ? "bg-warning/20 text-warning-foreground border-warning/20"
                              : "bg-slate-200 text-slate-600 border-slate-300"
                        }`}
                      >
                        {selectedAttendance.status.toUpperCase()}
                      </Badge>
                    </div>

                    {selectedAttendance.entryTime && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border bg-card p-3 shadow-none hover:border-primary/20 transition-colors">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Entrada</p>
                            <p className="text-lg font-black">{selectedAttendance.entryTime}</p>
                          </div>
                          <div className="rounded-xl border bg-card p-3 shadow-none hover:border-primary/20 transition-colors">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Saída</p>
                            <p className="text-lg font-black">{selectedAttendance.exitTime || "—"}</p>
                          </div>
                        </div>

                        {selectedAttendance.exitTime && (
                          <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                            <p className="text-[10px] font-black text-primary/60 uppercase mb-2">Total</p>
                            <span className="text-xl font-black text-primary">9h 05min</span>
                            <div className="mt-3 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[90%] rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedAttendance.status === "justificado" && (
                      <div className="flex flex-col items-center gap-3 py-2 text-center">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-slate-500" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-sm">Justificado</p>
                          <p className="text-[11px] text-muted-foreground">Licença médica aprovada.</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 w-full text-[10px] font-bold uppercase tracking-wider rounded-lg">
                          Ver Anexo
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-muted/30 flex items-center justify-center">
                      <Clock className="h-6 w-6 opacity-20" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">Sem registro</p>
                      <p className="text-[11px]">Nenhum ponto para este dia.</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase" asChild>
                      <Link href="/minhas-justificativas">Justificar</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
              <div className="p-4 bg-muted/20 border-t mt-auto">
                <Button className="w-full rounded-xl shadow-none py-6 h-10 text-xs font-bold uppercase tracking-widest gap-2" asChild>
                  <Link href="/registrar-presenca">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    Registrar Agora
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Registros</CardTitle>
              <CardDescription>
                Todos os seus registros de frequência do mês
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockMyAttendance
                  .slice()
                  .reverse()
                  .map((record) => {
                    const dateObj = new Date(record.date)
                    return (
                      <div
                        key={record.date}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-2 w-2 rounded-full ${statusColors[record.status]}`}
                          />
                          <div>
                            <p className="font-medium">
                              {format(dateObj, "EEEE, dd/MM", { locale: ptBR })}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {record.entryTime && record.exitTime
                                ? `${record.entryTime} - ${record.exitTime}`
                                : record.status === "justificado"
                                  ? "Justificado"
                                  : "Sem registro"}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            record.status === "presente"
                              ? "bg-primary/10 text-primary"
                              : record.status === "atrasado"
                                ? "bg-warning/10 text-warning-foreground"
                                : "bg-muted text-muted-foreground"
                          }
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </Badge>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
