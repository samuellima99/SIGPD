"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Users,
  Clock,
  BarChart3,
  PieChart,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const reportTypes = [
  {
    id: "frequency-individual",
    title: "Frequência Individual",
    description: "Relatório detalhado de frequência por servidor",
    icon: Users,
    category: "frequency",
  },
  {
    id: "frequency-department",
    title: "Frequência por Setor",
    description: "Consolidado de frequência por departamento",
    icon: BarChart3,
    category: "frequency",
  },
  {
    id: "absences",
    title: "Ausências e Atrasos",
    description: "Listagem de ausências, atrasos e saídas antecipadas",
    icon: Clock,
    category: "frequency",
  },
  {
    id: "justifications",
    title: "Justificativas",
    description: "Relatório de justificativas e atestados",
    icon: FileText,
    category: "justifications",
  },
  {
    id: "summary",
    title: "Resumo Mensal",
    description: "Consolidado mensal de frequência",
    icon: PieChart,
    category: "frequency",
  },
];

const recentReports = [
  {
    id: 1,
    name: "Frequência Individual - Janeiro 2026",
    type: "frequency-individual",
    generatedAt: "2026-01-30 14:32",
    format: "PDF",
  },
  {
    id: 2,
    name: "Resumo Mensal - Dezembro 2025",
    type: "summary",
    generatedAt: "2026-01-02 09:15",
    format: "Excel",
  },
  {
    id: 3,
    name: "Ausências - Janeiro 2026",
    type: "absences",
    generatedAt: "2026-01-28 16:45",
    format: "PDF",
  },
];

interface FilterState {
  startDate: string;
  endDate: string;
  sector: string;
  server: string;
  format: string;
  sorting: string;
}

export default function RelatoriosPage() {
  const { toast } = useToast();
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReports, setGeneratedReports] = useState(recentReports);
  const [showSuccess, setShowSuccess] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    startDate: "2026-01-01",
    endDate: "2026-01-31",
    sector: "all",
    server: "all",
    format: "pdf",
    sorting: "name",
  });

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getReportTitle = () => {
    const report = reportTypes.find((r) => r.id === selectedReport);
    return report?.title || "Relatório";
  };

  const handleGenerateReport = async () => {
    if (!selectedReport) return;

    setIsGenerating(true);
    setShowSuccess(false);

    // Simular geração de relatório
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const report = {
      id: generatedReports.length + 1,
      name: `${getReportTitle()} - Janeiro 2026`,
      type: selectedReport,
      generatedAt: new Date().toLocaleString("pt-BR"),
      format:
        filters.format === "pdf"
          ? "PDF"
          : filters.format === "excel"
            ? "Excel"
            : "CSV",
    };

    setGeneratedReports((prev) => [report, ...prev]);
    setIsGenerating(false);
    setShowSuccess(true);

    toast({
      title: "✓ Relatório gerado com sucesso",
      description: `${report.name} está pronto para download.`,
    });

    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDownload = (reportName: string, format: string) => {
    toast({
      title: "Download iniciado",
      description: `${reportName}.${format === "PDF" ? "pdf" : format === "Excel" ? "xlsx" : "csv"}`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Relatórios
        </h1>
        <p className="text-muted-foreground">
          Gere e exporte relatórios de frequência e gestão de pessoal
        </p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Gerar Relatório</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              const isSelected = selectedReport === report.id;

              return (
                <Card
                  key={report.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    isSelected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {isSelected && (
                        <Badge variant="default" className="bg-primary">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {selectedReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Configuração do Relatório
                </CardTitle>
                <CardDescription>
                  Defina os filtros e o formato de exportação
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Seção de Período */}
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-sm">Período</h4>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label
                        htmlFor="start-date"
                        className="text-sm font-medium"
                      >
                        Data Inicial
                      </Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={filters.startDate}
                        onChange={(e) =>
                          handleFilterChange("startDate", e.target.value)
                        }
                        className="rounded-md border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date" className="text-sm font-medium">
                        Data Final
                      </Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={filters.endDate}
                        onChange={(e) =>
                          handleFilterChange("endDate", e.target.value)
                        }
                        className="rounded-md border"
                      />
                    </div>
                  </div>
                </div>

                {/* Seção de Filtros */}
                <div className="space-y-3 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-sm">Filtros</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="sector" className="text-sm font-medium">
                          Setor
                        </Label>
                        <Select
                          value={filters.sector}
                          onValueChange={(value) =>
                            handleFilterChange("sector", value)
                          }
                        >
                          <SelectTrigger id="sector" className="rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              Todos os Setores
                            </SelectItem>
                            <SelectItem value="direcao">Direção</SelectItem>
                            <SelectItem value="ensino">
                              Diretoria de Ensino
                            </SelectItem>
                            <SelectItem value="administrativo">
                              Administrativo
                            </SelectItem>
                            <SelectItem value="informatica">
                              Informática
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="sorting"
                          className="text-sm font-medium"
                        >
                          Ordenar por
                        </Label>
                        <Select
                          value={filters.sorting}
                          onValueChange={(value) =>
                            handleFilterChange("sorting", value)
                          }
                        >
                          <SelectTrigger id="sorting" className="rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Nome</SelectItem>
                            <SelectItem value="department">Setor</SelectItem>
                            <SelectItem value="frequency">
                              % Frequência
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Campo de servidor para relatório individual */}
                    {selectedReport === "frequency-individual" && (
                      <div className="space-y-2 p-3 rounded-md bg-primary/5 border border-primary/10">
                        <Label
                          htmlFor="server"
                          className="text-sm font-medium text-primary"
                        >
                          👤 Selecione o Servidor
                        </Label>
                        <Select
                          value={filters.server}
                          onValueChange={(value) =>
                            handleFilterChange("server", value)
                          }
                        >
                          <SelectTrigger id="server" className="rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              Todos os Servidores
                            </SelectItem>
                            <SelectItem value="1">
                              Maria Silva Santos
                            </SelectItem>
                            <SelectItem value="2">João Pedro Lima</SelectItem>
                            <SelectItem value="3">
                              Ana Carolina Costa
                            </SelectItem>
                            <SelectItem value="4">
                              Carlos Mendes Oliveira
                            </SelectItem>
                            <SelectItem value="5">
                              Fernanda Rocha Pereira
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seção de Exportação */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-sm">
                      Formato de Exportação
                    </h4>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      {
                        value: "pdf",
                        label: "📄 PDF",
                        desc: "Documento portável",
                      },
                      {
                        value: "excel",
                        label: "📊 Excel",
                        desc: "Planilha editável",
                      },
                      { value: "csv", label: "📋 CSV", desc: "Texto separado" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleFilterChange("format", option.value)
                        }
                        className={`p-3 rounded-md border-2 transition-all text-left ${
                          filters.format === option.value
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-muted-foreground"
                        }`}
                      >
                        <p className="font-medium text-sm">{option.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {option.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resumo e Botões */}
                {showSuccess && (
                  <div className="rounded-lg bg-emerald-500/10 p-4 border border-emerald-200 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-emerald-900">
                        Relatório gerado com sucesso!
                      </p>
                      <p className="text-sm text-emerald-700 mt-1">
                        O arquivo está disponível no histórico para download.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                    className="gap-2 flex-1"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Gerando relatório...
                      </>
                    ) : (
                      <>
                        <FileText className="h-4 w-4" />
                        Gerar Relatório
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    size="lg"
                    onClick={() => setSelectedReport(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>
                Histórico dos últimos relatórios gerados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedReports.length === 0 ? (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    Nenhum relatório gerado ainda
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {generatedReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          {report.format === "Excel" ? (
                            <FileSpreadsheet className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {report.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {report.generatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="secondary" className="font-medium">
                          {report.format}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() =>
                            handleDownload(report.name, report.format)
                          }
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
