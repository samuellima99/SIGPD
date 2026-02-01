"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, Sun, Moon, CloudSun } from "lucide-react"

interface DashboardHeaderProps {
  userName: string
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const hour = currentTime.getHours()
  const greeting =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite"
  const GreetingIcon = hour < 12 ? Sun : hour < 18 ? CloudSun : Moon

  const formattedDate = currentTime.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const formattedTime = currentTime.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  const firstName = userName.split(" ")[0]

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <GreetingIcon className="h-5 w-5" />
          <span className="text-sm font-medium">{greeting}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Bem-vindo de volta, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Aqui esta o resumo do controle de frequencia
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl border bg-card px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="capitalize text-foreground">{formattedDate}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-mono font-medium text-foreground tabular-nums">
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  )
}
