import { Link } from "react-router-dom";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { CAPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { capCases } from "@/lib/mock-data";
import { ShieldAlert, ClipboardList, AlertTriangle, FileSearch, Plus } from "lucide-react";

export default function CAPDashboard() {
  const open = capCases.filter((c) => c.status !== "closed" && c.status !== "hr-escalation").length;
  const disputed = capCases.filter((c) => c.status === "disputed").length;
  const exceptions = capCases.filter((c) => c.status === "exception-pending").length;
  const escalated = capCases.filter((c) => c.status === "hr-escalation").length;

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="Compliance Action Plans"
        description="QA & Compliance teams log breaches. The system recommends CAP level using past warnings and active CAPs."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/cap/cases">
                <FileSearch className="mr-2 h-4 w-4" /> All cases
              </Link>
            </Button>
            <Button asChild>
              <Link to="/cap/new">
                <Plus className="mr-2 h-4 w-4" /> Log breach
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Open CAPs" value={open} icon={ClipboardList} tone="primary" />
        <StatCard
          label="Disputed"
          value={disputed}
          hint="Max 2 attempts allowed"
          icon={AlertTriangle}
          tone="warning"
        />
        <StatCard
          label="Exception pending"
          value={exceptions}
          hint="Awaiting Mgr/SDL approval"
          icon={ShieldAlert}
          tone="default"
        />
        <StatCard
          label="HR escalations"
          value={escalated}
          hint="CAP 3 cases"
          icon={AlertTriangle}
          tone="danger"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-gradient-warm p-6 shadow-soft lg:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            CAP Levels & validity
          </div>
          <h3 className="mt-2 text-lg font-bold tracking-tight">How severity is determined</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <CAPLevelBadge level="CAP 1" />
              <div className="mt-2 text-sm font-semibold">Warning</div>
              <p className="text-xs text-muted-foreground">
                Valid 90 days. First-time / minor breach.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <CAPLevelBadge level="CAP 2" />
              <div className="mt-2 text-sm font-semibold">Strong warning</div>
              <p className="text-xs text-muted-foreground">
                Valid 90 days. Repeat / serious breach.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <CAPLevelBadge level="CAP 3" />
              <div className="mt-2 text-sm font-semibold">HR escalation</div>
              <p className="text-xs text-muted-foreground">Termination / HR-managed.</p>
            </div>
          </div>
        </div>

        <SectionCard title="Workflow">
          <ol className="space-y-3 text-sm">
            {[
              "Log breach (QA/Compliance)",
              "Auto-recommend CAP level",
              "Notify supervisor + manager",
              "Accept or dispute (max 2)",
              "Optional exception path",
              "Generate CAP letter",
              "Agent acknowledgement",
              "Close & audit",
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </SectionCard>
      </div>

      <SectionCard
        title="All CAP cases"
        className="mt-8"
        actions={
          <Button size="sm" variant="outline" asChild>
            <Link to="/cap/cases">View all</Link>
          </Button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-semibold">Case</th>
                <th className="py-2 pr-3 font-semibold">Employee</th>
                <th className="py-2 pr-3 font-semibold">Breach</th>
                <th className="py-2 pr-3 font-semibold">Source</th>
                <th className="py-2 pr-3 font-semibold">Level</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {capCases.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/40">
                  <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                  <td className="py-3 pr-3">
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{c.employee.ohrId}</div>
                  </td>
                  <td className="py-3 pr-3">{c.breachType}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{c.raisedByTeam}</td>
                  <td className="py-3 pr-3">
                    <CAPLevelBadge level={c.level} />
                  </td>
                  <td className="py-3 pr-3">
                    <CAPStatusBadge status={c.status} />
                  </td>
                  <td className="py-3 pr-3 text-right">
                    <Button size="sm" variant="ghost" asChild>
                      <Link to={`/cap/cases/${c.id}`}>
                        Open
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
