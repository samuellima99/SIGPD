"use client"

import React from "react"

export default function TotemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#08090a] text-white selection:bg-none cursor-default overflow-hidden fixed inset-0">
      {/* Premium Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative h-full w-full select-none touch-none z-10">
        {children}
      </div>
      
      <style jsx global>{`
        body {
          background-color: #08090a;
          overflow: hidden;
          -webkit-user-select: none;
          user-select: none;
          touch-action: none;
        }
        * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  )
}
