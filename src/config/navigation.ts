import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Inbox,
  Wallet,
  HardHat,
  ClipboardCheck,
  Gauge,
  Scale,
  ShieldCheck,
  Settings,
  Building2,
  History,
  Network,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  to?: string;
  icon: LucideIcon;
  modulo: string;
  /** Módulos funcionales aún no implementados: se muestran deshabilitados. */
  proximamente?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "General",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard, modulo: "dashboard" },
      { label: "Bandeja de solicitudes", icon: Inbox, modulo: "solicitudes", proximamente: true },
    ],
  },
  {
    label: "Organización",
    items: [
      { label: "Estructura organizacional", to: "/organizacion", icon: Building2, modulo: "organizacion" },
      { label: "Organigrama", to: "/organigrama", icon: Network, modulo: "organigrama" },
    ],
  },
  {
    label: "Talento Humano",
    items: [
      { label: "Empleados", icon: Users, modulo: "empleados", proximamente: true },
      { label: "Documentación", icon: FileText, modulo: "documentacion", proximamente: true },
      { label: "Evaluaciones", icon: ClipboardCheck, modulo: "evaluaciones", proximamente: true },
      { label: "Gestión disciplinaria", icon: Scale, modulo: "disciplinario", proximamente: true },
    ],
  },
  {
    label: "Operación",
    items: [
      { label: "Nómina", icon: Wallet, modulo: "nomina", proximamente: true },
      { label: "SST", icon: HardHat, modulo: "sst", proximamente: true },
      { label: "Control operativo", icon: Gauge, modulo: "control_operativo", proximamente: true },
      { label: "Proyectos y áreas", icon: FolderKanban, modulo: "areas", proximamente: true },
    ],
  },
  {
    label: "Administración",
    items: [
      { label: "Datos maestros", to: "/maestros", icon: Building2, modulo: "maestros" },
      { label: "Usuarios y roles", to: "/usuarios", icon: ShieldCheck, modulo: "usuarios" },
      { label: "Auditoría", to: "/auditoria", icon: History, modulo: "auditoria" },
      { label: "Configuración", to: "/configuracion", icon: Settings, modulo: "configuracion" },
    ],
  },
];
