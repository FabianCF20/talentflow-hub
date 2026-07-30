import type { Role, RoleKey, PermissionAction } from "@/types/entities";

export const ROLES: Role[] = [
  { key: "administrador", nombre: "Administrador", descripcion: "Control total del sistema y configuración", nivel: 1 },
  { key: "gerente_general", nombre: "Gerente General", descripcion: "Visión global y aprobaciones estratégicas", nivel: 2 },
  { key: "director", nombre: "Director", descripcion: "Gestión por dirección y aprobaciones de segundo nivel", nivel: 3 },
  { key: "jefe", nombre: "Jefe", descripcion: "Gestión de área y aprobación de solicitudes", nivel: 4 },
  { key: "supervisor", nombre: "Supervisor", descripcion: "Control operativo del equipo a cargo", nivel: 5 },
  { key: "talento_humano", nombre: "Talento Humano", descripcion: "Administración de personal y documentación", nivel: 3 },
  { key: "nomina", nombre: "Nómina", descripcion: "Liquidación, novedades y reportes de nómina", nivel: 3 },
  { key: "sst", nombre: "SST", descripcion: "Seguridad y salud en el trabajo", nivel: 3 },
  { key: "empleado", nombre: "Empleado", descripcion: "Autogestión de su información y solicitudes", nivel: 9 },
];

export const ROLE_LABEL = Object.fromEntries(ROLES.map((r) => [r.key, r.nombre])) as Record<
  RoleKey,
  string
>;

/** Matriz de permisos por módulo: módulo -> rol -> acciones habilitadas. */
export type PermissionMatrix = Record<string, Partial<Record<RoleKey, PermissionAction[]>>>;

export const ALL_ACTIONS: PermissionAction[] = [
  "ver",
  "crear",
  "editar",
  "aprobar",
  "exportar",
  "inactivar",
];

/** Permisos base del núcleo. Los módulos funcionales se registrarán aquí. */
export const PERMISSION_MATRIX: PermissionMatrix = {
  dashboard: {
    administrador: ALL_ACTIONS,
    gerente_general: ["ver", "exportar"],
    director: ["ver", "exportar"],
    jefe: ["ver"],
    supervisor: ["ver"],
    talento_humano: ["ver", "exportar"],
    nomina: ["ver", "exportar"],
    sst: ["ver", "exportar"],
    empleado: ["ver"],
  },
  maestros: {
    administrador: ALL_ACTIONS,
    talento_humano: ["ver", "crear", "editar", "exportar", "inactivar"],
    gerente_general: ["ver", "exportar"],
  },
  usuarios: {
    administrador: ALL_ACTIONS,
    talento_humano: ["ver", "crear", "editar", "inactivar"],
  },
  auditoria: {
    administrador: ["ver", "exportar"],
    gerente_general: ["ver", "exportar"],
  },
  configuracion: {
    administrador: ALL_ACTIONS,
  },
};

export function can(roles: RoleKey[], modulo: string, accion: PermissionAction): boolean {
  const modulePerms = PERMISSION_MATRIX[modulo];
  if (!modulePerms) return false;
  return roles.some((role) => modulePerms[role]?.includes(accion) ?? false);
}
