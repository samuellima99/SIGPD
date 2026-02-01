"use client"

import React, { useState, useEffect, useCallback } from "react"
import { 
  Wifi, 
  WifiOff, 
  ShieldCheck, 
  Clock as ClockIcon, 
  MapPin,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"

// Components
import { MaintenanceDialog } from "@/components/totem/maintenance-dialog"
import { FeedbackOverlay } from "@/components/totem/feedback-overlay"

export default function TotemPage() {
  const [now, setNow] = useState(new Date())
  const [isOnline, setIsOnline] = useState(true)
  const [countdown, setCountdown] = useState(30)
  const [qrToken, setQrToken] = useState("TOTEM-TOKEN-INIT")
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; visible: boolean }>({
    type: null,
    visible: false
  })
  
  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate dynamic QR Code rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Generate new token
          const newToken = `TOKEN-${Math.random().toString(36).substring(7).toUpperCase()}`
          setQrToken(newToken)
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Offline/Online simulation
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const triggerMaintenance = () => {
    // This will be handled by the HiddenMaintenanceTrigger
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-between p-8 font-sans overflow-hidden">
      
      {/* Top Bar: Identity & Status */}
      <header className="w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-6 group">
          <div className="h-16 w-16 rounded-[1.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
            <ShieldCheck className="h-10 w-10 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-3xl font-black tracking-tight text-white uppercase antialiased drop-shadow-sm">IFCE</h1>
            <div className="flex items-center gap-2 text-neutral-400">
               <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
               <span className="text-lg font-bold tracking-tight uppercase opacity-80">Campus Fortaleza</span>
               <span className="text-neutral-600 font-black">•</span>
               <span className="text-lg font-medium text-neutral-500 italic leading-none">Entrada Principal</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-0">
          <div className="text-6xl font-black tracking-tighter text-white tabular-nums drop-shadow-2xl leading-none">
            {format(now, "HH:mm:ss", { locale: ptBR })}
          </div>
          <div className="text-lg text-primary font-bold uppercase tracking-widest opacity-80 mt-1">
            {format(now, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </div>
        </div>
      </header>

      {/* Main QR Area */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-5xl z-10 transition-all duration-700">
        <div className="relative">
          {/* Advanced Glass Effect Container */}
          <div className="absolute -inset-16 bg-primary/5 rounded-full blur-[80px] animate-pulse pointer-events-none" />
          
          <div className="relative group scale-90 lg:scale-100">
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary/30 to-emerald-500/30 rounded-[3.5rem] blur opacity-40 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-3xl p-10 rounded-[4rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              
              {!isOnline && (
                <div className="absolute inset-0 bg-neutral-900/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center z-20 animate-in fade-in duration-500">
                  <div className="h-20 w-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                    <AlertTriangle className="h-10 w-10 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Modo Offline</h3>
                  <p className="text-neutral-400 mt-1 font-bold text-base italic">Aguardando rede...</p>
                </div>
              )}
              
              <div className="bg-white p-4 rounded-[2.5rem] shadow-inner">
                <QRCodeSVG 
                  value={qrToken}
                  size={360}
                  level="H"
                  includeMargin={false}
                  fgColor="#000000"
                />
              </div>
              
              {/* Animated Scan Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20 animate-[scan_3s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-[2rem] flex items-center gap-4 shadow-2xl">
             <div className="relative h-6 w-6">
               <RefreshCw className={cn("absolute inset-0 h-6 w-6 text-primary animate-spin-slow")} />
               <div className="absolute inset-0 h-6 w-6 border-2 border-primary/20 rounded-full" />
             </div>
             <span className="text-2xl font-black text-white uppercase tracking-wider">
               Token expira em: <span className="text-primary tabular-nums drop-shadow-[0_0_10px_rgba(var(--primary),0.5)]">{countdown}s</span>
             </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-tight">Aponte a câmera do seu App</h2>
            <p className="text-xl text-neutral-500 font-bold italic tracking-tight opacity-70">Registro instantâneo e seguro via criptografia</p>
          </div>
        </div>
      </main>

      {/* Footer: Steps & System Info */}
      <footer className="w-full flex items-end justify-between z-10 mt-4">
        <div className="flex items-center gap-10 bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl font-black italic">1</div>
            <div>
              <p className="text-lg font-black text-white uppercase tracking-tight leading-none">Abra o App</p>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">SIGDP Mobile</p>
            </div>
          </div>
          <div className="h-10 w-px bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-2xl font-black italic">2</div>
            <div>
              <p className="text-lg font-black text-white uppercase tracking-tight leading-none">Escaneie o QR</p>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">Automaticamente</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 p-2">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
             <div className={cn(
               "h-3 w-3 rounded-full animate-pulse",
               isOnline ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]"
             )} />
             <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
               {isOnline ? "OPERACIONAL" : "INSTÁVEL"}
             </span>
          </div>
          <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] mr-1 opacity-50">
            ID: TOT-FOR-01 • v2.0.1
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: 100%; }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hidden Maintenance Trigger (Bottom Right Corner) */}
      <MaintenanceDialog />
      
      {/* Registration Feedback Overlay */}
      <FeedbackOverlay />

      {/* Demo Actions (Only for testing in dev) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-10 hover:opacity-100 transition-opacity">
          <Button size="sm" onClick={() => (window as any).dispatchFeedback("success")}>Simular Sucesso</Button>
          <Button size="sm" onClick={() => (window as any).dispatchFeedback("error")}>Simular Erro</Button>
          <Button size="sm" onClick={() => setIsOnline(!isOnline)}>Alternar Rede</Button>
        </div>
      )}
    </div>
  )
}
