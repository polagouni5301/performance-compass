import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Check } from "lucide-react";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({ meta: [{ title: "Admin — Role access" }] }),
  component: Roles,
});

const matrix = [
  { area: "PIP candidate review", supervisor: true, agent: false, qa: false, manager: true, admin: true, auditor: true },
  { area: "PIP initiation & targets", supervisor: true, agent: false, qa: false, manager: false, admin: true, auditor: true },
  { area: "PIP review (15-day)", supervisor: true, agent: false, qa: false, manager: false, admin: true, auditor: true },
  { area: "PIP extension approval", supervisor: false, agent: false, qa: false, manager: true, admin: true, auditor: true },
  { area: "CAP breach intake", supervisor: false, agent: false, qa: true, manager: false, admin: true, auditor: true },
  { area: "CAP accept / dispute", supervisor: true, agent: false, qa: false, manager: false, admin: true, auditor: true },
  { area: "CAP exception approval", supervisor: false, agent: false, qa: true, manager: true, admin: true, auditor: true },
  { area: "Agent acknowledgement", supervisor: false, agent: true, qa: false, manager: false, admin: true, auditor: true },
  { area: "Audit dashboard", supervisor: true, agent: false, qa: true, manager: true, admin: true, auditor: true },
  { area: "System configuration", supervisor: false, agent: false, qa: false, manager: false, admin: true, auditor: false },
];

const cols = ["supervisor", "agent", "qa", "manager", "admin", "auditor"] as const;
const labels: Record<(typeof cols)[number], string> = {
  supervisor: "Supervisor", agent: "Agent", qa: "QA / Comp.", manager: "Manager", admin: "Admin", auditor: "Auditor",
};

function Roles() {
  return (
    <div>
      <PageHeader eyebrow="Admin · Config" title="Role access" description="Persona permissions matrix across the consequence-management modules." />

      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3">Area</th>
                {cols.map((c) => <th key={c} className="py-2 pr-3 text-center">{labels[c]}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {matrix.map((r) => (
                <tr key={r.area}>
                  <td className="py-3 pr-3 font-medium">{r.area}</td>
                  {cols.map((c) => (
                    <td key={c} className="py-3 pr-3 text-center">
                      {(r as any)[c] ? <Check className="mx-auto h-4 w-4 text-success" /> : <span className="text-muted-foreground">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
