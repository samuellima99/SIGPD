"use client"

import { useState } from "react"
import { 
  QrCode, 
  MapPin, 
  Wifi, 
  CheckCircle2, 
  CheckCircle,
  XCircle, 
  Clock, 
  AlertTriangle, 
  Camera,
  Info,
  ShieldCheck,
  Check,
  RotateCcw
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { cn } from "@/lib/utils"

type RegistrationStatus = "idle" | "scanning" | "success" | "error" | "outside_location" | "outside_hours"

const statusMessages = {
  idle: {
    title: "Pronto para registrar",
    description: "Aponte sua câmera para o QR Code oficial do campus.",
    variant: "default" as const,
  },
  scanning: {
    title: "Escaneando...",
    description: "Processando as verificações de segurança em tempo real.",
    variant: "default" as const,
  },
  success: {
    title: "Presença Confirmada!",
    description: "Seu registro foi processado com sucesso e enviado ao sistema.",
    variant: "success" as const,
  },
  error: {
    title: "Falha na Leitura",
    description: "Não foi possível validar o QR Code. Tente aproximar mais a câmera.",
    variant: "destructive" as const,
  },
  outside_location: {
    title: "Fora do Perímetro",
    description: "Você precisa estar dentro do campus para realizar o registro.",
    variant: "warning" as const,
  },
  outside_hours: {
    title: "Fora do Horário",
    description: "O registro está disponível apenas durante o horário de aula.",
    variant: "warning" as const,
  },
}

export default function RegistrarPresencaPage() {
  const [status, setStatus] = useState<RegistrationStatus>("idle")
  const [lastRegistration, setLastRegistration] = useState<{ time: string; type: "entrada" | "saida" } | null>(null)
  const { user } = useAuth()

  const handleStartScan = () => {
    setStatus("scanning")
    // Simulate scanning process
    setTimeout(() => {
      const results: RegistrationStatus[] = ["success", "error", "outside_location", "outside_hours"]
      const randomResult = results[Math.floor(Math.random() * results.length)]
      
      if (randomResult === "success") {
        setLastRegistration({
          time: format(new Date(), "HH:mm"),
          type: lastRegistration?.type === "entrada" ? "saida" : "entrada",
        })
      }
      
      setStatus(randomResult)
    }, 2500)
  }

  const resetStatus = () => {
    setStatus("idle")
  }

  // Verification checks (mock)
  const verifications = [
    { label: "Geolocalização", icon: MapPin, status: true, detail: "Dentro do Campus" },
    { label: "Wi-Fi Campus", icon: Wifi, status: true, detail: "Rede: IFCE_Academico" },
    { label: "Horário", icon: Clock, status: true, detail: "Aula em curso" },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
          <QrCode className="h-8 w-8 text-primary" />
          Registrar Presença
        </h1>
        <p className="text-muted-foreground font-medium italic">
          Utilize o QR Code da sala para confirmar sua frequência diária.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Main Scanner Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/10 shadow-sm overflow-hidden overflow-hidden">
            <CardHeader className="bg-muted/30 border-b py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary/80">Scanner Integrado</CardTitle>
                  <CardDescription className="text-xs font-semibold mt-0.5">
                    {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </CardDescription>
                </div>
                {status !== "idle" && status !== "scanning" && (
                  <Button variant="ghost" size="sm" onClick={resetStatus} className="h-8 text-[10px] font-black uppercase tracking-widest">
                    <RotateCcw className="mr-1.5 h-3 w-3" /> Reiniciar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-8 pb-10">
              {/* Camera Preview / Status Area */}
              <div className="relative aspect-video max-w-xl mx-auto rounded-[32px] bg-slate-950 border-4 border-slate-900 shadow-2xl overflow-hidden group">
                {status === "idle" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping duration-[3000ms]" />
                      <div className="relative rounded-2xl bg-primary/10 p-6 border border-primary/20">
                        <Camera className="h-10 w-10 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">Pronto para Detectar</h3>
                      <p className="text-xs text-slate-400 font-medium">Capture o código para iniciar a validação</p>
                    </div>
                    <Button size="lg" onClick={handleStartScan} className="rounded-xl px-8 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                       Iniciar Scanner
                    </Button>
                  </div>
                )}

                {status === "scanning" && (
                  <div className="absolute inset-0">
                    {/* Fake camera preview image */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1517245318773-5025d519306b?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center" />
                    
                    {/* Scanner animation */}
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <div className="relative w-full max-w-[200px] aspect-square border-2 border-primary/40 rounded-3xl overflow-hidden">
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                        
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_rgba(var(--primary),0.8)] animate-scan-line" />
                        <QrCode className="absolute inset-0 m-auto h-20 w-20 text-primary/20" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2">
                       <Badge className="bg-primary hover:bg-primary font-black animate-pulse px-3 py-1 uppercase tracking-widest text-[9px]">Analisando...</Badge>
                    </div>
                  </div>
                )}

                {status === "success" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-500/10 backdrop-blur-sm animate-in zoom-in duration-500">
                    <div className="rounded-full bg-emerald-500 p-5 mb-4 shadow-xl shadow-emerald-500/30 animate-bounce-short">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-emerald-500">Sucesso!</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      {lastRegistration?.type === "entrada" ? "ENTRADA" : "SAÍDA"} ÀS {lastRegistration?.time}
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive/10 backdrop-blur-sm">
                    <div className="rounded-full bg-destructive p-5 mb-4 shadow-xl shadow-destructive/30">
                      <XCircle className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-destructive">Falha na Leitura</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      Código não identificado
                    </p>
                  </div>
                )}

                {status === "outside_location" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-500/10 backdrop-blur-sm">
                    <div className="rounded-full bg-amber-500 p-5 mb-4 shadow-xl shadow-amber-500/30">
                      <MapPin className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-amber-500">Fora do Campus</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      Geolocalização não validada
                    </p>
                  </div>
                )}

                {status === "outside_hours" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/20 backdrop-blur-md">
                    <div className="rounded-full bg-slate-700 p-5 mb-4 shadow-xl shadow-black/20">
                      <Clock className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-200">Fora do Horário</h3>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">
                      Efetue o registro em aula
                    </p>
                  </div>
                )}
              </div>

              {/* Control helper */}
              {status !== "idle" && status !== "scanning" && (
                <div className="mt-8 flex justify-center">
                  <Button size="lg" onClick={resetStatus} className="rounded-2xl px-10 h-14 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 gap-3 group">
                    Tentar Novamente
                    <RotateCcw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status Alert Overlay */}
          {status !== "idle" && (
            <Alert
              className={cn(
                "border-2 rounded-[24px] py-6 animate-in slide-in-from-top-4 duration-500",
                status === "success" ? "border-emerald-500/20 bg-emerald-50" : 
                (status === "error" ? "border-destructive/20 bg-destructive/5" : "border-amber-500/20 bg-amber-50/50")
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                  status === "success" ? "bg-emerald-500 text-white" : 
                  (status === "error" ? "bg-destructive text-white" : "bg-amber-500 text-white")
                )}>
                   {status === "success" ? <CheckCircle2 className="h-6 w-6" /> : 
                    (status === "error" ? <XCircle className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />)}
                </div>
                <div className="space-y-0.5">
                  <AlertTitle className="text-lg font-black uppercase tracking-tight leading-none">
                    {statusMessages[status].title}
                  </AlertTitle>
                  <AlertDescription className="text-sm font-medium italic opacity-80">
                    {statusMessages[status].description}
                  </AlertDescription>
                </div>
                {status === "success" && (
                  <Button asChild variant="outline" size="sm" className="ml-auto rounded-xl border-emerald-500/30 text-emerald-700 hover:bg-emerald-100 font-bold uppercase text-[10px] tracking-widest">
                    <Link href="/minha-frequencia">Ver Calendário</Link>
                  </Button>
                )}
              </div>
            </Alert>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* User Preview */}
          <Card className="border-primary/5 bg-primary/5 shadow-none overflow-hidden relative">
            <CardHeader className="pb-3 relative z-10">
              <CardTitle className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Autenticação Ativa</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div>
                    <h4 className="font-black text-sm leading-tight truncate">{user?.name || "Professor Nome"}</h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest italic leading-none mt-0.5">Matrícula: {user?.id || "2024001"}</p>
                 </div>
              </div>
            </CardContent>
            {/* Background design */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-3xl -mr-12 -mt-12 rounded-full" />
          </Card>

          {/* Verification Status */}
          <Card className="border-primary/10 shadow-sm">
            <CardHeader className="py-4 border-b">
              <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                 <CheckCircle className="h-4 w-4 text-emerald-500" />
                 Verificações
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-primary/5">
                {verifications.map((v, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                        <v.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-none">{v.label}</p>
                        <p className="text-[10px] text-muted-foreground font-medium mt-1 truncate max-w-[120px]">{v.detail}</p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-lg px-2 py-0 h-5 text-[9px] font-black uppercase tracking-widest",
                        v.status ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-destructive/5 text-destructive border-destructive/20"
                      )}
                    >
                      {v.status ? "OK" : "PENDENTE"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Status */}
          <Card className="border-primary/10 shadow-sm overflow-hidden">
            <CardHeader className="py-4 border-b bg-muted/20">
              <CardTitle className="text-xs font-black uppercase tracking-widest">Hoje</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                 <div className="rounded-xl border bg-card/50 p-2.5">
                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60 mb-1">Entrada</p>
                    <p className="text-lg font-black leading-none">08:02</p>
                 </div>
                 <div className="rounded-xl border bg-card/50 p-2.5 opacity-60">
                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60 mb-1">Saída</p>
                    <p className="text-lg font-black leading-none">—</p>
                 </div>
              </div>
              <div className="rounded-xl bg-primary/5 p-3 flex items-center justify-between border border-primary/10">
                 <span className="text-[10px] font-black text-primary/70 uppercase tracking-widest">Status Atual</span>
                 <Badge className="bg-primary/20 text-primary hover:bg-primary/20 border-0 font-black text-[9px] px-2 py-0.5 shadow-none">PRESENTE</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info / Guidelines */}
          <Card className="border-primary/10 shadow-sm bg-muted/10 border-dashed border-2">
            <CardHeader className="py-3">
              <CardTitle className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Info className="h-3.5 w-3.5" /> Diretrizes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2.5">
              <div className="flex gap-2 text-[11px] font-medium leading-tight">
                 <span className="text-primary font-black">•</span>
                 <p className="text-muted-foreground italic">Permaneça no campus durante todo o período da aula.</p>
              </div>
              <div className="flex gap-2 text-[11px] font-medium leading-tight">
                 <span className="text-primary font-black">•</span>
                 <p className="text-muted-foreground italic">Tolerância de <strong className="text-foreground">15 min</strong> para atrasos permitidos.</p>
              </div>
              <div className="flex gap-2 text-[11px] font-medium leading-tight">
                 <span className="text-primary font-black">•</span>
                 <p className="text-muted-foreground italic">Problemas com o scanner? Reporte ao suporte acadêmico.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan-line {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(195px); }
        }
        .animate-scan-line {
          animation: scan-line 2.5s ease-in-out infinite;
        }
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-short {
          animation: bounce-short 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
