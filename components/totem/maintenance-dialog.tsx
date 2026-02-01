"use client"

import React, { useState, useEffect } from "react"
import { 
  Settings, 
  X, 
  Smartphone, 
  Wifi, 
  RefreshCw, 
  CornerDownRight, 
  Key,
  ShieldAlert,
  HardDrive,
  Info
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function MaintenanceDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(true)
  const [pin, setPin] = useState("")
  const [pressTimer, setPressTimer] = useState<any>(null)

  // Hidden Trigger: Long press (5s) in the bottom-right corner
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Bottom-right 100x100 zone
      if (clientX > innerWidth - 100 && clientY > innerHeight - 100) {
        const timer = setTimeout(() => {
          setIsOpen(true)
          setPin("")
          setIsLocked(true)
        }, 5000)
        setPressTimer(timer)
      }
    }

    const handleMouseUp = () => {
      if (pressTimer) {
        clearTimeout(pressTimer)
        setPressTimer(null)
      }
    }

    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [pressTimer])

  const handlePinComplete = (value: string) => {
    if (value === "123456") { // Mock admin PIN
      setIsLocked(false)
      toast.success("Acesso administrativo liberado")
    } else {
      setPin("")
      toast.error("PIN incorreto")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-xl bg-neutral-900/80 backdrop-blur-2xl border-white/10 text-white rounded-[3rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {isLocked ? (
          <div className="flex flex-col items-center py-10 space-y-10">
            <div className="h-24 w-24 rounded-[2rem] bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-inner">
              <Key className="h-12 w-12" />
            </div>
            <div className="text-center space-y-3">
              <DialogTitle className="text-3xl font-black tracking-tighter uppercase drop-shadow-sm">Painel Restrito</DialogTitle>
              <DialogDescription className="text-neutral-400 font-bold text-lg italic">
                Operação exclusiva para técnicos autorizados.
              </DialogDescription>
            </div>
            
            <InputOTP 
              maxLength={6} 
              value={pin} 
              onChange={setPin}
              onComplete={handlePinComplete}
              autoFocus
            >
              <InputOTPGroup className="gap-3">
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot 
                    key={i} 
                    index={i} 
                    className="h-20 w-16 rounded-2xl bg-black/40 border-white/10 text-3xl font-black text-primary transition-all duration-300 focus:ring-2 focus:ring-primary/50" 
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button variant="ghost" className="text-neutral-500 font-black uppercase text-xs tracking-[0.2em] hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              Voltar ao Totem
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center">
                    <Settings className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-black tracking-tight uppercase">Manutenção de Terminal</DialogTitle>
                    <p className="text-sm text-primary font-black tracking-[0.1em] uppercase opacity-80">TOT-FOR-01 | GOLD STATUS</p>
                  </div>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors" role="button" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-black/30 border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-xs font-black text-neutral-500 uppercase tracking-widest underline decoration-primary/50 underline-offset-4">
                  <Wifi className="h-4 w-4 text-primary" /> Conectividade
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black text-white">Sincronizado</p>
                  <p className="text-xs text-neutral-500 font-bold italic">IP: 10.0.0.42 (Optic Fiber)</p>
                </div>
              </div>
              <div className="p-6 rounded-3xl bg-black/30 border border-white/5 space-y-4">
                <div className="flex items-center gap-3 text-xs font-black text-neutral-500 uppercase tracking-widest underline decoration-primary/50 underline-offset-4">
                  <HardDrive className="h-4 w-4 text-primary" /> Backup Local
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-black text-white">100% Integridade</p>
                  <p className="text-xs text-neutral-500 font-bold italic">0 registros pendentes</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-black text-neutral-600 uppercase tracking-[0.2em] ml-2">Ferramentas Diagnósticas</p>
              <div className="grid grid-cols-1 gap-3">
                <Button variant="secondary" className="justify-start gap-6 h-20 rounded-[1.8rem] bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <RefreshCw className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-black uppercase tracking-tight">Forçar Sincronização</p>
                    <p className="text-xs text-neutral-500 font-bold italic tracking-wide">Atualizar base de dados e tokens</p>
                  </div>
                </Button>
                <Button variant="secondary" className="justify-start gap-6 h-20 rounded-[1.8rem] bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                   <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ShieldAlert className="h-6 w-6 text-primary group-hover:text-white" />
                  </div>
                   <div className="text-left">
                     <p className="text-lg font-black uppercase tracking-tight">Bloqueio Protetivo</p>
                     <p className="text-xs text-neutral-500 font-bold italic tracking-wide">Pausar entradas por 60 segundos</p>
                   </div>
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 hover:bg-white/5 text-neutral-500 font-black uppercase tracking-widest" onClick={() => setIsLocked(true)}>
                Lock Panel
              </Button>
              <Button className="flex-1 h-14 rounded-2xl font-black uppercase tracking-[0.1em] shadow-lg shadow-primary/20" onClick={() => setIsOpen(false)}>
                Reiniciar Terminal
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
