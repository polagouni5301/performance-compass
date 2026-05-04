import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, CAPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases, capCases, pipCandidates } from "@/lib/mock-data";
import { TrendingUp, ShieldAlert, Users, FileSearch, ArrowRight, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — CAP & PIP Consequence Management" },
      { name: "description", content: "Cross-module overview of active PIP and CAP cases, candidates, and pending approvals." },
    ],
  }),
  component: Overview,
});

function Overview() {
  const activePIPs = pipCases.filter((c) => c.status === "active" || c.status === "extended").length;
  const pendingApprovals = pipCases.filter((c) => c.status === "pending-approval").length;
  const openCAPs = capCases.filter((c) => c.status !== "closed" && c.status !== "hr-escalation").length;
  const escalations = capCases.filter((c) => c.status === "hr-escalation").length;

  return (
    <div>
      <PageHeader
        eyebrow="Consequence Management"
        title="Welcome back, Priya"
        description="Automate identification, tracking, and closure of performance and compliance actions with full audit traceability."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/audit">View audit dashboard</Link>
            </Button>
            <Button asChild>
              <Link to="/cap/new">Log new breach</Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="PIP Candidates" value={pipCandidates.length} hint="Awaiting supervisor confirmation" icon={Users} tone="warning" />
        <StatCard label="Active PIPs" value={activePIPs} hint="In review cycle" icon={TrendingUp} tone="primary" />
        <StatCard label="Open CAPs" value={openCAPs} hint="Across QA & Compliance" icon={ShieldAlert} tone="default" />
        <StatCard label="HR Escalations" value={escalations} hint="CAP 3 cases referred" icon={AlertTriangle} tone="danger" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Recent PIP cases"
          description="3-out-of-4 review rule applies to closure"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/pip/cases">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {pipCases.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <Link to="/pip/cases/$caseId" params={{ caseId: c.id }} className="font-medium hover:underline">
                    {c.employee.name}
                  </Link>
                  <div className="truncate text-xs text-muted-foreground">
                    {c.id} · {c.employee.team} · Started {c.startDate}
                  </div>
                </div>
                <PIPStatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard
          title="Recent CAP cases"
          description="Severity by level — CAP 1 / 2 valid 90 days, CAP 3 → HR"
          actions={
            <Button variant="ghost" size="sm" asChild>
              <Link to="/cap/cases">
                View all <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {capCases.slice(0, 4).map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <Link to="/cap/cases/$caseId" params={{ caseId: c.id }} className="font-medium hover:underline">
                    {c.employee.name}
                  </Link>
                  <div className="truncate text-xs text-muted-foreground">
                    {c.id} · {c.breachType} · {c.raisedByTeam}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CAPLevelBadge level={c.level} />
                  <CAPStatusBadge status={c.status} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-gradient-warm p-6 shadow-soft lg:col-span-2">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">PIP Trigger Logic</div>
          <h3 className="mt-2 text-lg font-bold tracking-tight">How candidates are identified</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Sourced from Auto Scheduler warnings, AES ratings, monthly schedule upload and SQL Server KPI data.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <div className="text-xs font-semibold text-primary">Condition 1</div>
              <p className="mt-1 text-sm">3 consecutive warnings in last 3 weeks</p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <div className="text-xs font-semibold text-primary">OR Condition 2</div>
              <p className="mt-1 text-sm">6 warnings in last 8 weeks</p>
            </div>
            <div className="rounded-xl border border-border bg-card/70 p-4">
              <div className="text-xs font-semibold text-primary">AND Qualifier</div>
              <p className="mt-1 text-sm">1 NI rating (last month) OR 2 NI ratings (last 6 months)</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Pending your action</div>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center justify-between gap-2">
              <span>PIP extension approvals</span>
              <span className="font-semibold text-warning-foreground">{pendingApprovals}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>Candidates awaiting confirmation</span>
              <span className="font-semibold">{pipCandidates.filter((c) => !c.supervisorAcknowledged).length}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>CAP exceptions to validate</span>
              <span className="font-semibold">{capCases.filter((c) => c.status === "exception-pending").length}</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <span>CAPs in dispute</span>
              <span className="font-semibold">{capCases.filter((c) => c.status === "disputed").length}</span>
            </li>
          </ul>
          <Button variant="outline" className="mt-4 w-full" asChild>
            <Link to="/audit">
              <FileSearch className="mr-2 h-4 w-4" /> Open audit dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
