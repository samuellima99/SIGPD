"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  MapPin,
  ArrowLeft,
  User,
  X,
  Users,
  UserCheck,
  UserX,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

// Mock de usuarios para buscar nome pelo ID
const mockUserNames: Record<string, string> = {
  "1": "Maria Silva Santos",
  "2": "Joao Pedro Lima",
  "3": "Ana Carolina Costa",
  "4": "Pedro Henrique Alves",
  "5": "Carla Mendes Ferreira",
  "6": "Lucas Rodrigues Silva",
  "7": "Fernanda Lima Sousa",
};

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
  },
  {
    id: "4",
    userId: "4",
    name: "Pedro Henrique Alves",
    role: "professor",
    campus: "Fortaleza",
    setor: "Informática",
    date: "2026-01-30",
    entryTime: null,
    exitTime: null,
    status: "ausente",
    method: null,
    location: null,
  },
  {
    id: "5",
    userId: "5",
    name: "Carla Mendes Ferreira",
    role: "diretor_ensino",
    campus: "Fortaleza",
    setor: "Administração",
    date: "2026-01-30",
    entryTime: "07:50",
    exitTime: "18:00",
    status: "presente",
    method: "QRCode + Geolocalização",
    location: { lat: -3.7327, lng: -38.5267 },
  },
  {
    id: "6",
    userId: "6",
    name: "Lucas Rodrigues Silva",
    role: "professor",
    campus: "Sobral",
    setor: "Física",
    date: "2026-01-30",
    entryTime: "08:05",
    exitTime: null,
    status: "presente",
    method: "QRCode",
    location: { lat: -3.688, lng: -40.3497 },
  },
  {
    id: "7",
    userId: "7",
    name: "Fernanda Lima Sousa",
    role: "coordenador",
    campus: "Sobral",
    setor: "Ciências",
    date: "2026-01-30",
    entryTime: null,
    exitTime: null,
    status: "justificado",
    method: null,
    location: null,
    justification: "Licença médica",
  },
];

const statusConfig = {
  presente: {
    label: "Presente",
    className: "bg-primary/10 text-primary hover:bg-primary/20 border-0",
  },
  atrasado: {
    label: "Atrasado",
    className:
      "bg-warning/10 text-warning-foreground hover:bg-warning/20 border-0",
  },
  ausente: {
    label: "Ausente",
    className:
      "bg-destructive/10 text-destructive hover:bg-destructive/20 border-0",
  },
  justificado: {
    label: "Justificado",
    className: "bg-muted text-muted-foreground hover:bg-muted/80 border-0",
  },
};

export default function FrequenciaPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("userId");
  const selectedUserName = userIdParam ? mockUserNames[userIdParam] : null;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [campusFilter, setCampusFilter] = useState("all");
  const [date, setDate] = useState<Date>(new Date());
  const router = useRouter();

  const filteredRecords = mockAttendance.filter((record) => {
    // Filtro por usuario especifico (quando vem da pagina de detalhes)
    if (userIdParam && record.userId !== userIdParam) {
      return false;
    }
    const matchesSearch = record.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || record.status === statusFilter;
    const matchesCampus =
      campusFilter === "all" || record.campus === campusFilter;
    return matchesSearch && matchesStatus && matchesCampus;
  });

  const handleViewRecord = (record: (typeof mockAttendance)[0]) => {
    router.push(`/frequencia/${record.id}`);
  };

  // Stats
  const stats = {
    total: mockAttendance.length,
    presentes: mockAttendance.filter((r) => r.status === "presente").length,
    atrasados: mockAttendance.filter((r) => r.status === "atrasado").length,
    ausentes: mockAttendance.filter((r) => r.status === "ausente").length,
    justificados: mockAttendance.filter((r) => r.status === "justificado")
      .length,
  };

  const rows =
    filteredRecords.length === 0 ? (
      <TableRow>
        <TableCell colSpan={7} className="h-32 text-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-8 w-8" />
            <p>Nenhum registro encontrado</p>
          </div>
        </TableCell>
      </TableRow>
    ) : (
      filteredRecords.map((record) => {
        const status = statusConfig[record.status as keyof typeof statusConfig];
        const roleLabel =
          record.role === "professor"
            ? "Prof"
            : record.role === "coordenador"
              ? "Coord"
              : record.role === "diretor_ensino"
                ? "Dir. Ensino"
                : "Diretor";

        return (
          <TableRow
            key={record.id}
            className="hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => handleViewRecord(record)}
          >
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {record.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{record.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {record.setor}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden lg:table-cell text-sm">
              {record.campus}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {record.entryTime || "—"}
                </span>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {record.exitTime || "—"}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className={status.className}>
                {status.label}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewRecord(record);
                }}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        );
      })
    );

  return (
    <div className="space-y-6">
      {/* User Filter Banner */}
      {selectedUserName && (
        <div className="flex items-center justify-between rounded-lg border bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Exibindo frequencia de
              </p>
              <p className="font-semibold">{selectedUserName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent"
              asChild
            >
              <Link href={`/usuarios/${userIdParam}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Perfil
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/frequencia">
                <X className="mr-2 h-4 w-4" />
                Ver Todos
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {selectedUserName
              ? `Frequencia de ${selectedUserName.split(" ")[0]}`
              : "Frequencia"}
          </h1>
          <p className="text-muted-foreground">
            {selectedUserName
              ? "Historico completo de registros de presenca"
              : "Acompanhe os registros de presenca dos servidores."}
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <CalendarIcon className="h-4 w-4" />
                {format(date, "dd 'de' MMMM", { locale: ptBR })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-slate-500/10 p-2.5">
              <Users className="h-5 w-5 text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-emerald-500/10 p-2.5">
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {stats.presentes}
              </p>
              <p className="text-sm text-muted-foreground">Presentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-warning/10 p-2.5">
              <Clock className="h-5 w-5 text-warning-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.atrasados}</p>
              <p className="text-sm text-muted-foreground">Atrasados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-rose-500/10 p-2.5">
              <UserX className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">
                {stats.ausentes}
              </p>
              <p className="text-sm text-muted-foreground">Ausentes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-lg bg-muted p-2.5">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.justificados}</p>
              <p className="text-sm text-muted-foreground">Justificados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Registros do Dia</CardTitle>
          <CardDescription>
            {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={campusFilter} onValueChange={setCampusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Campus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Campus</SelectItem>
                  <SelectItem value="Fortaleza">Fortaleza</SelectItem>
                  <SelectItem value="Maracanaú">Maracanaú</SelectItem>
                  <SelectItem value="Sobral">Sobral</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos Status</SelectItem>
                  <SelectItem value="presente">Presente</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                  <SelectItem value="ausente">Ausente</SelectItem>
                  <SelectItem value="justificado">Justificado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Servidor</TableHead>
                  <TableHead className="hidden lg:table-cell">Campus</TableHead>
                  <TableHead>Entrada</TableHead>
                  <TableHead className="hidden md:table-cell">Saída</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12.5 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{rows}</TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredRecords.length} de {mockAttendance.length}{" "}
              registros
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 bg-primary text-primary-foreground"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detail route opens a dedicated page now */}
    </div>
  );
}
