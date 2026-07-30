import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Check, Minus, UserPlus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { ROLES, PERMISSION_MATRIX } from "@/config/roles";
import { PERMISSION_ACTIONS, PERMISSION_ACTION_LABEL } from "@/types/entities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuarios y roles | SIGTH" },
      {
        name: "description",
        content: "Roles corporativos y matriz de permisos por módulo: ver, crear, editar, aprobar, exportar e inactivar.",
      },
      { property: "og:title", content: "Usuarios y roles | SIGTH" },
      {
        property: "og:description",
        content: "Control de accesos y permisos granulares por módulo y rol.",
      },
    ],
  }),
  component: Usuarios,
});

const modulos = Object.keys(PERMISSION_MATRIX);

function Usuarios() {
  return (
    <AppShell>
      <PageHeader
        breadcrumb={["Administración", "Usuarios y roles"]}
        title="Usuarios y roles"
        description="Nueve roles iniciales con permisos granulares por módulo y acción."
        actions={
          <Button size="sm">
            <UserPlus className="size-4" /> Nuevo usuario
          </Button>
        }
      />

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permisos">Matriz de permisos</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((role) => (
              <div key={role.key} className="surface-panel p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{role.nombre}</h3>
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
                    Nivel {role.nivel}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{role.descripcion}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permisos" className="mt-4">
          <div className="surface-panel overflow-x-auto">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 text-left">Módulo / Rol</th>
                  {PERMISSION_ACTIONS.map((a) => (
                    <th key={a} className="px-3 py-3 text-center font-semibold">
                      {PERMISSION_ACTION_LABEL[a]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modulos.map((modulo) => (
                  <Fragment key={modulo}>
                    <tr className="border-b border-border bg-primary-soft/50">
                      <td colSpan={PERMISSION_ACTIONS.length + 1} className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        {modulo}
                      </td>
                    </tr>
                    {Object.entries(PERMISSION_MATRIX[modulo]).map(([roleKey, actions]) => (
                      <tr key={`${modulo}-${roleKey}`} className="border-b border-border/60 last:border-0">
                        <td className="px-4 py-2.5 text-foreground">
                          {ROLES.find((r) => r.key === roleKey)?.nombre}
                        </td>
                        {PERMISSION_ACTIONS.map((a) => (
                          <td key={a} className="px-3 py-2.5 text-center">
                            {actions?.includes(a) ? (
                              <Check className="mx-auto size-4 text-success" />
                            ) : (
                              <Minus className="mx-auto size-4 text-muted-foreground/40" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
