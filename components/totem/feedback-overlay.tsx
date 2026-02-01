"use client"

import React, { useState, useEffect } from "react"
import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function FeedbackOverlay() {
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; visible: boolean }>({
    type: null,
    visible: false
  })

  useEffect(() => {
    const handleFeedback = (e: CustomEvent<{ type: "success" | "error" }>) => {
      setFeedback({ type: e.detail.type, visible: true })
      
      const timer = setTimeout(() => {
        setFeedback((prev) => ({ ...prev, visible: false }))
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Attach to window to allow simulation
    (window as any).dispatchFeedback = (type: "success" | "error") => {
      window.dispatchEvent(new CustomEvent("totem-feedback", { detail: { type } }))
    }

    window.addEventListener("totem-feedback" as any, handleFeedback)
    return () => window.removeEventListener("totem-feedback" as any, handleFeedback)
  }, [])

  if (!feedback.visible) return null

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-500 backdrop-blur-[40px]",
      feedback.type === "success" ? "bg-emerald-500/10" : "bg-rose-500/10"
    )}>
      <div className={cn(
        "p-12 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col items-center gap-8 text-center animate-in zoom-in-95 duration-700 border border-white/10",
        feedback.type === "success" ? "bg-emerald-600/90" : "bg-rose-600/90"
      )}>
        {feedback.type === "success" ? (
          <>
            <div className="h-32 w-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center animate-bounce shadow-2xl">
              <CheckCircle2 className="h-20 w-20 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">Registrado</h2>
              <p className="text-2xl font-black text-white/90 italic tracking-widest uppercase opacity-80">Acesso Confirmado ✅</p>
            </div>
          </>
        ) : (
          <>
            <div className="h-32 w-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-2xl">
              <XCircle className="h-20 w-20 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">Token Expirado</h2>
              <p className="text-2xl font-black text-white/90 italic tracking-widest uppercase opacity-80">Tente Novamente ❌</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
