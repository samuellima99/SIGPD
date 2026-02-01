"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileText,
  BarChart3,
  Settings,
  Shield,
  ClipboardList,
  QrCode,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useAuth,
  usePermissions,
  type UserRole,
} from "@/contexts/auth-context";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  permission?: string;
  children?: { title: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    permission: "canViewDashboard",
  },
  {
    title: "Usuários",
    href: "/usuarios",
    icon: Users,
    permission: "canViewAllUsers",
  },
  {
    title: "Frequência",
    href: "/frequencia",
    icon: CalendarCheck,
    permission: "canViewFrequency",
  },
  {
    title: "Justificativas",
    href: "/justificativas",
    icon: FileText,
    permission: "canApproveJustifications",
    children: [
      { title: "Pendentes", href: "/justificativas/pendentes" },
      { title: "Atestados", href: "/justificativas/atestados" },
      { title: "Histórico", href: "/justificativas/historico" },
    ],
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
    permission: "canViewReports",
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
    permission: "canViewSettings",
  },
  {
    title: "Auditoria",
    href: "/auditoria",
    icon: Shield,
    permission: "canViewAudit",
  },
];

const professorNavItems: NavItem[] = [
  {
    title: "Minha Frequência",
    href: "/minha-frequencia",
    icon: ClipboardList,
  },
  {
    title: "Registrar Presença",
    href: "/registrar-presenca",
    icon: QrCode,
  },
  {
    title: "Minhas Justificativas",
    href: "/minhas-justificativas",
    icon: FileText,
  },
];

function NavItemComponent({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (item.children) {
    const isChildActive = item.children.some(
      (child) => pathname === child.href,
    );

    return (
      <Collapsible open={isOpen || isChildActive} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isChildActive &&
                "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              {item.title}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                (isOpen || isChildActive) && "rotate-180",
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-11 pt-1">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm transition-all",
                "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                pathname === child.href &&
                  "bg-sidebar-primary text-sidebar-primary-foreground",
              )}
            >
              {child.title}
            </Link>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
        "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
      )}
    >
      <item.icon className="h-5 w-5" />
      {item.title}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const permissions = usePermissions();

  const isProfessor = user?.role === "professor";
  const items = isProfessor ? professorNavItems : navItems;

  const filteredItems = items.filter((item) => {
    if (!item.permission) return true;
    return permissions[item.permission as keyof typeof permissions];
  });

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <CalendarCheck className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight">IFCE</span>
          <span className="text-xs text-sidebar-foreground/60">
            Controle de Frequência
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {filteredItems.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            isActive={pathname === item.href}
          />
        ))}
      </nav>
    </aside>
  );
}
