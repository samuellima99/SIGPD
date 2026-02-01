"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  MapPin,
  Wifi,
  QrCode,
  Calendar,
  FileText,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import MapViewer from "@/components/frequency/map-viewer";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const mockAttendance = [
  {
    id: "1",
    userId: "1",
    name: "Maria Silva Santos",
    role: "professor",
    campus: "Fortaleza",
    setor: "Informática",
    date: "2026-01-30",
    entryTime: "08:02",
    exitTime: "17:05",
    status: "presente",
    method: "QRCode + Geolocalização",
    location: { lat: -3.7327, lng: -38.5267 },
  },
  {
    id: "2",
    userId: "2",
    name: "João Pedro Lima",
    role: "professor",
    campus: "Fortaleza",
    setor: "Matemática",
    date: "2026-01-30",
    entryTime: "08:18",
    exitTime: "17:00",
    status: "atrasado",
    method: "QRCode",
    location: { lat: -3.7327, lng: -38.5267 },
    observations: "Atraso no transporte público. Trânsito intenso na região.",
    delayReason:
      "Problema com transporte - Ônibus atrasou 20 minutos na linha habitual",
    attestation: null,
    justificationStatus: "pendente",
  },
  {
    id: "3",
    userId: "3",
    name: "Ana Carolina Costa",
    role: "coordenador",
    campus: "Maracanaú",
    setor: "Engenharia",
    date: "2026-01-30",
    entryTime: "07:55",
    exitTime: "17:10",
    status: "presente",
    method: "QRCode + Wi-Fi",
    location: { lat: -3.8679, lng: -38.6256 },
    observations: null,
    delayReason: null,
    attestation: null,
    justificationStatus: null,
  },
];

const statusConfig = {
  presente: {
    label: "Presente",
    className: "bg-primary/10 text-primary",
  },
  atrasado: {
    label: "Atrasado",
    className: "bg-warning/10 text-warning-foreground",
  },
  ausente: {
    label: "Ausente",
    className: "bg-destructive/10 text-destructive",
  },
  justificado: {
    label: "Justificado",
    className: "bg-muted text-muted-foreground",
  },
};

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const record = mockAttendance.find((r) => r.id === id) ?? null;

  if (!record) {
    return (
      <div className="flex min-h-90 flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Registro não encontrado.</p>
        <Button variant="outline" asChild>
          <Link href="/frequencia">Voltar</Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[record.status as keyof typeof statusConfig];
  const dateObj = new Date(record.date);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Detalhes da Frequência
          </h1>
          <p className="text-muted-foreground">
            Informações completas do registro
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{record.name}</CardTitle>
          <CardDescription>
            {record.setor} • {record.campus}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {record.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{record.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {record.setor} • {record.campus}
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="text-sm font-medium">
                    {format(dateObj, "EEEE, dd/MM/yyyy", { locale: ptBR })}
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Entrada</span>
                </div>
                <p className="text-2xl font-bold">{record.entryTime || "—"}</p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Saída</span>
                </div>
                <p className="text-2xl font-bold">{record.exitTime || "—"}</p>
              </div>
            </div>

            {record.method && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Método de Verificação
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {record.method.includes("QRCode") && (
                      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                        <QrCode className="h-4 w-4 text-primary" />
                        <span className="text-sm">QR Code</span>
                      </div>
                    )}
                    {record.method.includes("Geolocalização") && (
                      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Geolocalização</span>
                      </div>
                    )}
                    {record.method.includes("Wi-Fi") && (
                      <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
                        <Wifi className="h-4 w-4 text-primary" />
                        <span className="text-sm">Wi-Fi</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {record.location && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Localização
                  </h4>
                  <div className="rounded-lg border overflow-hidden mt-2">
                    <MapViewer
                      lat={record.location.lat}
                      lng={record.location.lng}
                      height="h-48"
                    />
                  </div>
                </div>
              </>
            )}

            {record.justification && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Justificativa
                  </h4>
                  <div className="flex items-start gap-3 rounded-lg border p-4 mt-2">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{record.justification}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Aprovado em 29/01/2026
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(record.observations ||
              record.delayReason ||
              record.attestation) && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Observações e Justificativa
                  </h4>

                  {record.observations && (
                    <div className="rounded-lg bg-muted/50 p-4 border-l-4 border-l-amber-500">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm text-amber-900">
                            Observações
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {record.observations}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {record.delayReason && (
                    <div className="rounded-lg bg-warning/10 p-4 border-l-4 border-l-warning">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-warning-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">
                            Motivo do Atraso
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {record.delayReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {record.attestation && (
                    <div className="rounded-lg bg-emerald-500/10 p-4 border-l-4 border-l-emerald-500">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm text-emerald-900">
                            Atestado / Comprovante
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {record.attestation}
                          </p>
                          {record.justificationStatus && (
                            <div className="mt-2">
                              <Badge
                                variant="outline"
                                className={
                                  record.justificationStatus === "aprovado"
                                    ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                                    : record.justificationStatus === "pendente"
                                      ? "bg-amber-500/10 text-amber-700 border-amber-200"
                                      : "bg-rose-500/10 text-rose-700 border-rose-200"
                                }
                              >
                                {record.justificationStatus === "aprovado" &&
                                  "✓ Aprovado"}
                                {record.justificationStatus === "pendente" &&
                                  "⏳ Pendente"}
                                {record.justificationStatus === "rejeitado" &&
                                  "✕ Rejeitado"}
                              </Badge>
                              {record.justificationDate && (
                                <p className="text-xs text-muted-foreground mt-2">
                                  Processado em {record.justificationDate}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
