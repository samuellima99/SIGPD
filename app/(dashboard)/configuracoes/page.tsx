"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Clock,
  Bell,
  Shield,
  Save,
  Users,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function ConfiguracoesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [nightShifts, setNightShifts] = useState([
    { id: 1, name: "Noite - Turno 1", start: "18:00", end: "22:00" },
  ]);
  const [showAddShift, setShowAddShift] = useState(false);
  const [newShift, setNewShift] = useState({ name: "", start: "", end: "" });
  const [dayShifts, setDayShifts] = useState([
    { day: "Segunda-feira", start: "08:00", end: "17:00" },
    { day: "Terça-feira", start: "08:00", end: "17:00" },
    { day: "Quarta-feira", start: "08:00", end: "17:00" },
    { day: "Quinta-feira", start: "08:00", end: "17:00" },
    { day: "Sexta-feira", start: "08:00", end: "17:00" },
    { day: "Sábado", start: "—", end: "—" },
    { day: "Domingo", start: "—", end: "—" },
  ]);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");
  const [permissions, setPermissions] = useState<
    Array<{
      id: number;
      name: string;
      role: string;
      description: string;
      category: "usuarios" | "frequencia" | "relatorios" | "sistema";
      isSystem: boolean;
      createdAt: string;
    }>
  >([
    {
      id: 1,
      name: "Visualizar Usuários",
      role: "diretor",
      description: "Permissão para visualizar lista de usuários",
      category: "usuarios",
      isSystem: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Criar Usuários",
      role: "diretor",
      description: "Permissão para criar novos usuários no sistema",
      category: "usuarios",
      isSystem: true,
      createdAt: "2024-01-15",
    },
    {
      id: 3,
      name: "Editar Frequência",
      role: "diretor_ensino",
      description: "Permissão para editar registros de frequência",
      category: "frequencia",
      isSystem: true,
      createdAt: "2024-01-15",
    },
    {
      id: 4,
      name: "Aprovar Justificativas",
      role: "diretor_ensino",
      description: "Permissão para aprovar justificativas de servidores",
      category: "frequencia",
      isSystem: true,
      createdAt: "2024-01-15",
    },
    {
      id: 5,
      name: "Gerar Relatórios",
      role: "coordenador",
      description: "Permissão para gerar relatórios de frequência",
      category: "relatorios",
      isSystem: true,
      createdAt: "2024-01-15",
    },
  ]);
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [newPermission, setNewPermission] = useState({
    name: "",
    role: "",
    description: "",
    category: "usuarios" as const,
  });

  const canManagePermissions =
    user?.role === "diretor" || user?.role === "diretor_ensino";

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "✓ Configurações salvas",
        description: "As alterações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handleAddShift = () => {
    if (!newShift.name || !newShift.start || !newShift.end) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos do turno.",
        variant: "destructive",
      });
      return;
    }
    setNightShifts([...nightShifts, { ...newShift, id: Date.now() }]);
    setNewShift({ name: "", start: "", end: "" });
    setShowAddShift(false);
    toast({
      title: "✓ Turno adicionado",
      description: `${newShift.name} foi adicionado com sucesso.`,
    });
  };

  const handleRemoveShift = (id: number) => {
    setNightShifts(nightShifts.filter((s) => s.id !== id));
    toast({
      title: "✓ Turno removido",
      description: "O turno foi removido com sucesso.",
    });
  };

  const handleEditDayShift = (day: string) => {
    const shift = dayShifts.find((s) => s.day === day);
    if (shift) {
      setEditingDay(day);
      setEditStart(shift.start);
      setEditEnd(shift.end);
    }
  };

  const handleSaveDayShift = () => {
    if (!editStart || !editEnd) {
      toast({
        title: "Erro",
        description: "Preencha os horários.",
        variant: "destructive",
      });
      return;
    }
    setDayShifts(
      dayShifts.map((s) =>
        s.day === editingDay ? { ...s, start: editStart, end: editEnd } : s,
      ),
    );
    setEditingDay(null);
    setEditStart("");
    setEditEnd("");
    toast({
      title: "✓ Horário atualizado",
      description: `${editingDay} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteDayShift = (day: string) => {
    setDayShifts(
      dayShifts.map((s) =>
        s.day === day ? { ...s, start: "—", end: "—" } : s,
      ),
    );
    toast({
      title: "✓ Horário removido",
      description: `${day} foi removida da lista de trabalho.`,
    });
  };

  const handleAddDayShift = () => {
    const newDay = `Dia ${dayShifts.length + 1}`;
    setDayShifts([...dayShifts, { day: newDay, start: "08:00", end: "17:00" }]);
    toast({
      title: "✓ Turno adicionado",
      description: `${newDay} foi adicionado com sucesso.`,
    });
  };

  const handleAddPermission = () => {
    if (!newPermission.name || !newPermission.role) {
      toast({
        title: "Erro",
        description: "Preencha o nome e selecione uma função.",
        variant: "destructive",
      });
      return;
    }
    setPermissions([
      ...permissions,
      {
        ...newPermission,
        id: Date.now(),
        isSystem: false,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setNewPermission({
      name: "",
      role: "",
      description: "",
      category: "usuarios",
    });
    setShowAddPermission(false);
    toast({
      title: "✓ Permissão criada",
      description: `${newPermission.name} foi associada a ${newPermission.role}.`,
    });
  };

  const handleRemovePermission = (id: number) => {
    setPermissions(permissions.filter((p) => p.id !== id));
    toast({
      title: "✓ Permissão removida",
      description: "A permissão foi removida com sucesso.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema de controle de frequência
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-none lg:flex">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Horários</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Permissões</span>
          </TabsTrigger>
          <TabsTrigger value="locations" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Locais</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações da Instituição
              </CardTitle>
              <CardDescription>
                Dados básicos do campus e configurações gerais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome da Instituição</Label>
                  <Input defaultValue="IFCE - Campus Fortaleza" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input defaultValue="10.744.098/0001-45" />
                </div>
                <div className="space-y-2">
                  <Label>Endereço</Label>
                  <Input defaultValue="Av. 13 de Maio, 2081 - Benfica" />
                </div>
                <div className="space-y-2">
                  <Label>Cidade/UF</Label>
                  <Input defaultValue="Fortaleza - CE" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">
                  Configurações do Sistema
                </h4>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Tolerância para Atraso</Label>
                      <p className="text-sm text-muted-foreground">
                        Tempo de tolerância antes de considerar como atraso
                      </p>
                    </div>
                    <Select defaultValue="15">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 minutos</SelectItem>
                        <SelectItem value="10">10 minutos</SelectItem>
                        <SelectItem value="15">15 minutos</SelectItem>
                        <SelectItem value="30">30 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Fuso Horário</Label>
                      <p className="text-sm text-muted-foreground">
                        Fuso horário para registro de ponto
                      </p>
                    </div>
                    <Select defaultValue="fortaleza">
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fortaleza">
                          America/Fortaleza (GMT-3)
                        </SelectItem>
                        <SelectItem value="saopaulo">
                          America/Sao_Paulo (GMT-3)
                        </SelectItem>
                        <SelectItem value="manaus">
                          America/Manaus (GMT-4)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Modo de Registro</Label>
                      <p className="text-sm text-muted-foreground">
                        Método padrão para registro de presença
                      </p>
                    </div>
                    <Select defaultValue="qrcode">
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qrcode">QR Code</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="biometric">Biométrico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horários de Trabalho
              </CardTitle>
              <CardDescription>
                Configure os horários de trabalho diurno e noturno
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* TURNOS DIURNOS */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Turno Diurno
                </h4>
                <div className="grid gap-2">
                  {dayShifts.map((item) => (
                    <div key={item.day}>
                      {editingDay === item.day ? (
                        // Modo edição
                        <div className="rounded-md border p-3 bg-primary/5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-foreground">
                              {item.day}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Editando...
                            </span>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label className="text-xs">Entrada</Label>
                              <Input
                                type="time"
                                value={editStart}
                                onChange={(e) => setEditStart(e.target.value)}
                                className="h-8 text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Saída</Label>
                              <Input
                                type="time"
                                value={editEnd}
                                onChange={(e) => setEditEnd(e.target.value)}
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={handleSaveDayShift}
                              className="h-8 text-sm"
                            >
                              Salvar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingDay(null)}
                              className="h-8 text-sm"
                            >
                              Cancelar
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Modo visualização
                        <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30 hover:bg-muted/40 transition-colors">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="font-medium text-sm text-foreground w-32">
                              {item.day}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">
                                {item.start}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                →
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {item.end}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditDayShift(item.day)}
                              className="h-8 px-3 text-xs hover:bg-blue-100"
                            >
                              ✏️ Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteDayShift(item.day)}
                              className="h-8 px-3 text-xs hover:bg-red-100"
                            >
                              🗑️ Deletar
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2 bg-transparent h-9 text-sm"
                  onClick={handleAddDayShift}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Turno Diurno
                </Button>
              </div>

              <Separator className="my-4" />

              {/* TURNOS NOTURNOS */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Turno Noturno
                </h4>
                <div className="grid gap-2">
                  {nightShifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="flex items-center justify-between rounded-md border p-3 bg-muted/30 hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-medium text-sm text-foreground">
                          {shift.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {shift.start}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            →
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {shift.end}
                          </span>
                        </div>
                        {canManagePermissions && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveShift(shift.id)}
                            className="h-8 px-2 text-xs"
                          >
                            Deletar
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {!showAddShift ? (
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent h-9 text-sm"
                    onClick={() => setShowAddShift(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar Turno Noturno
                  </Button>
                ) : (
                  <div className="rounded-md border p-3 space-y-3 bg-muted/50">
                    <p className="text-sm font-medium">Novo Turno Noturno</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Nome</Label>
                        <Input
                          placeholder="Ex: Noite - Turno 1"
                          value={newShift.name}
                          onChange={(e) =>
                            setNewShift({ ...newShift, name: e.target.value })
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Início</Label>
                        <Input
                          type="time"
                          value={newShift.start}
                          onChange={(e) =>
                            setNewShift({ ...newShift, start: e.target.value })
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Fim</Label>
                        <Input
                          type="time"
                          value={newShift.end}
                          onChange={(e) =>
                            setNewShift({ ...newShift, end: e.target.value })
                          }
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={handleAddShift}
                        className="gap-2 h-8 text-sm"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Adicionar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowAddShift(false)}
                        className="h-8 text-sm"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações de Notificações
              </CardTitle>
              <CardDescription>
                Gerencie quando e como as notificações são enviadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Lembrete de Registro de Ponto",
                  description:
                    "Enviar lembrete se o servidor não registrar entrada",
                  enabled: true,
                },
                {
                  title: "Alerta de Atraso",
                  description: "Notificar gestores sobre atrasos de servidores",
                  enabled: true,
                },
                {
                  title: "Nova Justificativa",
                  description:
                    "Notificar quando uma nova justificativa for enviada",
                  enabled: true,
                },
                {
                  title: "Justificativa Aprovada/Rejeitada",
                  description:
                    "Notificar servidor sobre status da justificativa",
                  enabled: true,
                },
                {
                  title: "Relatório Semanal",
                  description: "Enviar resumo semanal de frequência por e-mail",
                  enabled: false,
                },
                {
                  title: "Alerta de Banco de Horas",
                  description: "Notificar quando banco de horas exceder limite",
                  enabled: false,
                },
              ].map((notification) => (
                <div
                  key={notification.title}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-0.5">
                    <Label>{notification.title}</Label>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                  <Switch defaultChecked={notification.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>E-mail de Notificações</CardTitle>
              <CardDescription>
                Configure o servidor de e-mail para envio de notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Servidor SMTP</Label>
                  <Input
                    type="text"
                    placeholder="smtp.ifce.edu.br"
                    defaultValue="smtp.ifce.edu.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Porta</Label>
                  <Input type="number" placeholder="587" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail de Envio</Label>
                  <Input
                    type="email"
                    placeholder="frequencia@ifce.edu.br"
                    defaultValue="frequencia@ifce.edu.br"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nome do Remetente</Label>
                  <Input
                    type="text"
                    defaultValue="Sistema de Frequência IFCE"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          {!canManagePermissions && (
            <Card className="border-warning/30 bg-warning/5">
              <CardContent className="flex items-start gap-3 pt-6">
                <Lock className="h-5 w-5 text-warning mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-warning-foreground">
                    Acesso Restrito
                  </p>
                  <p className="text-sm text-warning-foreground/80 mt-1">
                    Apenas Diretor ou Diretor de Ensino podem gerenciar
                    permissões.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Gerenciar Permissões
              </CardTitle>
              <CardDescription>
                Organize as permissões do sistema por categoria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Permissões agrupadas por categoria */}
              {["usuarios", "frequencia", "relatorios", "sistema"].map(
                (category) => {
                  const categoryPermissions = permissions.filter(
                    (p) => p.category === category,
                  );
                  if (categoryPermissions.length === 0) return null;

                  const categoryLabels: Record<string, string> = {
                    usuarios: "👥 Usuários",
                    frequencia: "📍 Frequência",
                    relatorios: "📊 Relatórios",
                    sistema: "⚙️ Sistema",
                  };

                  return (
                    <div key={category} className="space-y-3">
                      <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                        {categoryLabels[category]}
                      </h4>
                      <div className="grid gap-2 pl-3 border-l-2 border-muted">
                        {categoryPermissions.map((perm) => (
                          <div
                            key={perm.id}
                            className="flex items-start justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm text-foreground">
                                  {perm.name}
                                </p>
                                {perm.isSystem && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Sistema
                                  </Badge>
                                )}
                              </div>
                              {perm.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {perm.description}
                                </p>
                              )}
                              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">
                                  {perm.role}
                                </Badge>
                                <span>•</span>
                                <span>{perm.createdAt}</span>
                              </div>
                            </div>
                            {canManagePermissions && !perm.isSystem && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemovePermission(perm.id)}
                                className="ml-2 h-8 px-2 hover:bg-red-100"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      <Separator className="my-2" />
                    </div>
                  );
                },
              )}

              {/* Botão para adicionar permissão */}
              {canManagePermissions && (
                <>
                  {!showAddPermission ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2 bg-transparent"
                      onClick={() => setShowAddPermission(true)}
                    >
                      <Plus className="h-4 w-4" />
                      Criar Nova Permissão
                    </Button>
                  ) : (
                    <div className="rounded-lg border p-4 space-y-4 bg-primary/5">
                      <h4 className="font-medium text-foreground">
                        Nova Permissão Customizada
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label className="text-sm">Nome da Permissão</Label>
                          <Input
                            placeholder="Ex: Deletar Usuários"
                            value={newPermission.name}
                            onChange={(e) =>
                              setNewPermission({
                                ...newPermission,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label className="text-sm">Categoria</Label>
                            <Select
                              value={newPermission.category}
                              onValueChange={(value) =>
                                setNewPermission({
                                  ...newPermission,
                                  category: value as
                                    | "usuarios"
                                    | "frequencia"
                                    | "relatorios"
                                    | "sistema",
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usuarios">
                                  👥 Usuários
                                </SelectItem>
                                <SelectItem value="frequencia">
                                  📍 Frequência
                                </SelectItem>
                                <SelectItem value="relatorios">
                                  📊 Relatórios
                                </SelectItem>
                                <SelectItem value="sistema">
                                  ⚙️ Sistema
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm">Função</Label>
                            <Select
                              value={newPermission.role}
                              onValueChange={(value) =>
                                setNewPermission({
                                  ...newPermission,
                                  role: value,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma função" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="diretor">Diretor</SelectItem>
                                <SelectItem value="diretor_ensino">
                                  Diretor de Ensino
                                </SelectItem>
                                <SelectItem value="coordenador">
                                  Coordenador
                                </SelectItem>
                                <SelectItem value="professor">
                                  Professor
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm">Descrição</Label>
                          <Textarea
                            placeholder="Descreva para que serve esta permissão"
                            value={newPermission.description}
                            onChange={(e) =>
                              setNewPermission({
                                ...newPermission,
                                description: e.target.value,
                              })
                            }
                            className="resize-none h-20 text-sm"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleAddPermission}
                            className="gap-2 h-8 text-sm"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            Criar Permissão
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowAddPermission(false)}
                            className="h-8 text-sm"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Resumo de Permissões por Perfil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Permissões por Perfil
              </CardTitle>
              <CardDescription>
                Visão geral das permissões de cada função no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  role: "Diretor",
                  permissions: permissions
                    .filter((p) => p.role === "diretor")
                    .map((p) => p.name),
                  color: "bg-chart-1",
                  icon: "👨‍💼",
                },
                {
                  role: "Diretor de Ensino",
                  permissions: permissions
                    .filter((p) => p.role === "diretor_ensino")
                    .map((p) => p.name),
                  color: "bg-chart-2",
                  icon: "👨‍🏫",
                },
                {
                  role: "Coordenador",
                  permissions: permissions
                    .filter((p) => p.role === "coordenador")
                    .map((p) => p.name),
                  color: "bg-chart-3",
                  icon: "📋",
                },
                {
                  role: "Professor",
                  permissions: ["Registrar Presença", "Enviar Justificativas"],
                  color: "bg-chart-4",
                  icon: "👨‍🎓",
                },
              ].map((profile) => (
                <div
                  key={profile.role}
                  className="rounded-lg border p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-3 w-3 rounded-full ${profile.color}`} />
                    <h4 className="font-medium text-foreground">
                      {profile.icon} {profile.role}
                    </h4>
                    <Badge variant="secondary" className="ml-auto">
                      {profile.permissions.length} permissões
                    </Badge>
                  </div>
                  {profile.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.permissions.map((perm) => (
                        <Badge
                          key={perm}
                          variant="secondary"
                          className="text-xs"
                        >
                          {perm}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">
                      Nenhuma permissão configurada
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Locais de Registro
              </CardTitle>
              <CardDescription>
                Configure os locais permitidos para registro de ponto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Bloco Central",
                  address: "Av. 13 de Maio, 2081",
                  active: true,
                },
                {
                  name: "Laboratório de Informática",
                  address: "Bloco B, Sala 102",
                  active: true,
                },
                {
                  name: "Biblioteca",
                  address: "Bloco A, Térreo",
                  active: true,
                },
                {
                  name: "Ginásio Poliesportivo",
                  address: "Área Externa",
                  active: false,
                },
              ].map((location) => (
                <div
                  key={location.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {location.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={location.active ? "default" : "secondary"}
                      className={location.active ? "bg-primary" : ""}
                    >
                      {location.active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Switch defaultChecked={location.active} />
                  </div>
                </div>
              ))}

              <Button variant="outline" className="w-full gap-2 bg-transparent">
                <MapPin className="h-4 w-4" />
                Adicionar Novo Local
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          {isSaving ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
