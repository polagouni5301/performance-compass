import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases, capCases, departments } from "@/lib/mock-data";
import { Inbox, ShieldAlert, ArrowRight, Briefcase } from "lucide-react";

export const Route = createFileRoute("/manager/")({
  head: () => ({
    meta: [
      { title: "Manager home — Approvals" },
      { name: "description", content: "Manager queue for PIP extensions and CAP exception approvals." },
    ],
  }),
  component: ManagerHome,
});

function ManagerHome() {
  const pipPending = pipCases.filter((c) => c.status === "pending-approval");
  const capExceptions = capCases.filter((c) => c.exceptionRequested);

  return (
    <div>
      <PageHeader
        eyebrow="Manager"
        title="Approvals"
        description="Sign off PIP extensions and review CAP exception requests escalated by supervisors."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="PIP extensions" value={pipPending.length} icon={Inbox} tone="warning" />
        <StatCard label="CAP exceptions" value={capExceptions.length} icon={ShieldAlert} />
        <StatCard label="Total team cases" value={pipCases.length + capCases.length} />
        <StatCard label="Departments" value={departments.length} hint="Voice · Messaging · CDT" icon={Briefcase} tone="primary" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard title="PIP extension queue" actions={<Button size="sm" variant="ghost" asChild><Link to="/pip/approvals">Open <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>}>
          {pipPending.length === 0 ? <p className="text-sm text-muted-foreground">No requests.</p> : (
            <ul className="divide-y divide-border">
              {pipPending.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{c.id}</div>
                  </div>
                  <PIPStatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="CAP exception queue" actions={<Button size="sm" variant="ghost" asChild><Link to="/cap/exceptions">Open <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>}>
          {capExceptions.length === 0 ? <p className="text-sm text-muted-foreground">No requests.</p> : (
            <ul className="divide-y divide-border">
              {capExceptions.map((c) => (
                <li key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{c.id} · {c.breachType}</div>
                  </div>
                  <CAPLevelBadge level={c.level} />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
