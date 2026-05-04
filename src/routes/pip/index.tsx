import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases, pipCandidates } from "@/lib/mock-data";
import { TrendingUp, Users, FileSearch, ClipboardList, ArrowRight, Calendar, Mail } from "lucide-react";

export const Route = createFileRoute("/pip/")({
  head: () => ({
    meta: [
      { title: "PIP Dashboard — Performance Improvement" },
      { name: "description", content: "Performance Improvement Plan dashboard: candidates, active cases, reviews, extensions and closures." },
    ],
  }),
  component: PIPDashboard,
});

function PIPDashboard() {
  const active = pipCases.filter((c) => c.status === "active").length;
  const extended = pipCases.filter((c) => c.status === "extended").length;
  const pending = pipCases.filter((c) => c.status === "pending-approval").length;
  const closedSuccess = pipCases.filter((c) => c.status === "closed-success").length;

  const upcomingReviews = pipCases
    .flatMap((c) => c.reviews.filter((r) => r.status === "scheduled").map((r) => ({ c, r })))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow="PIP Module"
        title="Performance Improvement Plans"
        description="Auto-triggered from Auto Scheduler warnings, AES ratings & SQL KPI data. 60-day initial duration with reviews every 15 days."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/pip/candidates">
                <Users className="mr-2 h-4 w-4" /> Candidates
              </Link>
            </Button>
            <Button asChild>
              <Link to="/pip/cases">
                <ClipboardList className="mr-2 h-4 w-4" /> All cases
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Candidates identified" value={pipCandidates.length} hint="Pending supervisor review" icon={Users} tone="warning" />
        <StatCard label="Active PIPs" value={active} hint="Within 60-day window" icon={TrendingUp} tone="primary" />
        <StatCard label="Extended PIPs" value={extended} hint="+30 days, 2 extra reviews" icon={Calendar} tone="default" />
        <StatCard label="Closed — Success" value={closedSuccess} hint="3-of-4 reviews met" icon={FileSearch} tone="success" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <SectionCard
          title="Upcoming reviews"
          description="Auto-scheduled Teams meetings — KPI fetched live from SQL"
          className="lg:col-span-2"
        >
          {upcomingReviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews scheduled.</p>
          ) : (
            <ul className="divide-y divide-border">
              {upcomingReviews.map(({ c, r }) => (
                <li key={c.id + r.number} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-sm font-semibold text-primary">
                      R{r.number}
                    </div>
                    <div className="min-w-0">
                      <Link to="/pip/cases/$caseId" params={{ caseId: c.id }} className="font-medium hover:underline">
                        {c.employee.name}
                      </Link>
                      <div className="truncate text-xs text-muted-foreground">
                        {c.id} · {c.employee.team} · Scheduled {r.date}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/pip/cases/$caseId" params={{ caseId: c.id }}>
                      Open <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Pending approvals" description="Manager sign-off for extensions">
          {pending === 0 ? (
            <p className="text-sm text-muted-foreground">No pending extension approvals.</p>
          ) : (
            <div className="space-y-3">
              <p className="text-sm">
                <span className="text-2xl font-bold">{pending}</span>
                <span className="ml-2 text-muted-foreground">extension request{pending > 1 ? "s" : ""} awaiting review.</span>
              </p>
              <Button className="w-full" asChild>
                <Link to="/pip/approvals">
                  <Mail className="mr-2 h-4 w-4" /> Review approvals
                </Link>
              </Button>
            </div>
          )}
        </SectionCard>
      </div>

      <SectionCard title="All PIP cases" className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-semibold">Case ID</th>
                <th className="py-2 pr-3 font-semibold">Employee</th>
                <th className="py-2 pr-3 font-semibold">Team</th>
                <th className="py-2 pr-3 font-semibold">Started</th>
                <th className="py-2 pr-3 font-semibold">Reviews</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th className="py-2 pr-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pipCases.map((c) => {
                const met = c.reviews.filter((r) => r.status === "met").length;
                const done = c.reviews.filter((r) => r.status !== "scheduled" && r.status !== "pending").length;
                return (
                  <tr key={c.id} className="hover:bg-secondary/40">
                    <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                    <td className="py-3 pr-3 font-medium">{c.employee.name}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.employee.team}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.startDate}</td>
                    <td className="py-3 pr-3"><span className="font-semibold text-success">{met}</span> <span className="text-muted-foreground">/ {done} done · {c.reviews.length} total</span></td>
                    <td className="py-3 pr-3"><PIPStatusBadge status={c.status} /></td>
                    <td className="py-3 pr-3 text-right">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/pip/cases/$caseId" params={{ caseId: c.id }}>Open</Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
