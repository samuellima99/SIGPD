"use client";

import { useState } from "react";
import {
  Clock,
  MapPin,
  QrCode,
  CheckCircle,
  AlertCircle,
  Upload,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  BarChart3,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AppMobileProfessorPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [showMenu, setShowMenu] = useState(false);
  const [lastCheckIn, setLastCheckIn] = useState({
    time: "08:02",
    date: "31/01/2026",
    location: "Bloco Central",
  });

  const handleCheckIn = () => {
    setLastCheckIn({
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("pt-BR"),
      location: "Bloco Central",
    });
    toast({
      title: "✓ Check-in realizado",
      description: "Sua presença foi registrada com sucesso",
    });
  };

  return (
    <div className="fixed inset-0 bg-linear-to-b from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex-1">
          <h1 className="text-lg font-bold">SIGDP</h1>
          <p className="text-xs text-emerald-100">Sistema de Frequência</p>
        </div>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {showMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu Lateral */}
      {showMenu && (
        <div className="absolute inset-0 top-14 bg-slate-900/95 backdrop-blur z-40 p-4 space-y-2">
          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <Link href="/dashboard">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
          </Link>
          <Link href="/minha-frequencia">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <BarChart3 className="h-5 w-5" />
              <span>Minha Frequência</span>
            </button>
          </Link>
          <Link href="/minhas-justificativas">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span>Justificativas</span>
            </button>
          </Link>
          <hr className="my-4 border-white/10" />
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/20 transition-colors text-red-400"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-4 space-y-4">
          {/* Status de Presença */}
          <Card className="border-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm text-slate-300">Presença de hoje</p>
                <p className="text-2xl font-bold mt-1">{lastCheckIn.time}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {lastCheckIn.date}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Botão Principal - Check-in */}
          <button
            onClick={handleCheckIn}
            className="w-full py-6 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-transform shadow-lg"
          >
            <QrCode className="h-8 w-8 mx-auto mb-2" />
            <p className="font-bold text-lg">Registrar Presença</p>
            <p className="text-xs opacity-90">Escanear QR Code</p>
          </button>

          {/* Informações Rápidas */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="pt-4">
                <Clock className="h-5 w-5 text-amber-400 mb-2" />
                <p className="text-xs text-slate-400">Horário entrada</p>
                <p className="text-lg font-bold mt-1">{lastCheckIn.time}</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur">
              <CardContent className="pt-4">
                <MapPin className="h-5 w-5 text-blue-400 mb-2" />
                <p className="text-xs text-slate-400">Local</p>
                <p className="text-sm font-bold mt-1 truncate">
                  {lastCheckIn.location}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Frequência Semanal */}
          <Card className="border-0 bg-white/5 backdrop-blur">
            <CardContent className="pt-4">
              <p className="font-semibold mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Frequência Semanal
              </p>
              <div className="space-y-2">
                {[
                  { day: "Seg", status: "presente" },
                  { day: "Ter", status: "presente" },
                  { day: "Qua", status: "presente" },
                  { day: "Qui", status: "presente" },
                  { day: "Sex", status: "atrasado" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between p-2 rounded bg-white/5"
                  >
                    <span className="text-sm">{item.day}</span>
                    <Badge
                      variant={
                        item.status === "presente" ? "default" : "secondary"
                      }
                      className={
                        item.status === "presente"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }
                    >
                      {item.status === "presente" ? "✓ Presente" : "⏱ Atrasado"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/minhas-justificativas">
              <button className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <FileText className="h-5 w-5 mx-auto mb-2 text-purple-400" />
                <p className="text-xs font-medium">Justificativas</p>
              </button>
            </Link>
            <Link href="/minha-frequencia">
              <button className="w-full p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <BarChart3 className="h-5 w-5 mx-auto mb-2 text-blue-400" />
                <p className="text-xs font-medium">Relatório</p>
              </button>
            </Link>
          </div>

          {/* Alertas */}
          <Card className="border-0 bg-amber-500/20 backdrop-blur">
            <CardContent className="pt-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Atenção</p>
                  <p className="text-xs text-amber-200 mt-1">
                    Você acumulou 2 atrasos este mês
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-white/10 px-4 py-3">
        <div className="grid grid-cols-3 gap-2">
          <Link href="/dashboard">
            <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </button>
          </Link>
          <button
            onClick={handleCheckIn}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/50"
          >
            <QrCode className="h-5 w-5 text-emerald-400" />
            <span className="text-xs">Check-in</span>
          </button>
          <Link href="/minhas-justificativas">
            <button className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10 transition-colors">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Justif.</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
