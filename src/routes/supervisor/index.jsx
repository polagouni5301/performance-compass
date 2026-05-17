import { Link } from "react-router-dom";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, CAPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases, capCases, pipCandidates } from "@/lib/mock-data";
import { Users, TrendingUp, Inbox, ShieldAlert, ArrowRight, CalendarCheck } from "lucide-react";

export default function SupervisorHome() {
  const candidatesPending = pipCandidates.filter((c) => !c.supervisorAcknowledged).length;
  const upcoming = pipCases
    .flatMap((c) => c.reviews.filter((r) => r.status === "scheduled").map((r) => ({ c, r })))
    .slice(0, 4);
  const capInbox = capCases.filter((c) => c.status === "logged" || c.status === "disputed");

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor"
        title="Welcome back, Priya"
        description="Confirm PIP candidates, run 15-day reviews, accept or dispute CAPs sent by QA / Compliance."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link to="/supervisor/pip/candidates">
                <Users className="mr-2 h-4 w-4" /> Candidates
              </Link>
            </Button>
            <Button asChild>
              <Link to="/supervisor/cap/inbox">
                <Inbox className="mr-2 h-4 w-4" /> CAP inbox
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Candidates to confirm"
          value={candidatesPending}
          icon={Users}
          tone="warning"
        />
        <StatCard
          label="Active PIPs"
          value={pipCases.filter((c) => c.status === "active").length}
          icon={TrendingUp}
          tone="primary"
        />
        <StatCard label="Reviews scheduled" value={upcoming.length} icon={CalendarCheck} />
        <StatCard
          label="CAPs awaiting action"
          value={capInbox.length}
          icon={ShieldAlert}
          tone="danger"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Upcoming 15-day reviews"
          actions={
            <Button size="sm" variant="ghost" asChild>
              <Link to="/supervisor/pip/review">
                Open review cycle <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          }
        >
          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews scheduled.</p>
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.map(({ c, r }) => (
                <li
                  key={c.id + r.number}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <Link to={`/pip/cases/${c.id}`}
                      className="font-medium hover:underline"
                    >
                      {c.employee.name}
                    </Link>
                    <div className="text-xs text-muted-foreground">
                      {c.id} · Review {r.number} · {r.date}
                    </div>
                  </div>
                  <PIPStatusBadge status={c.status} />
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title="CAP inbox"
          description="Breaches awaiting your accept / dispute"
          actions={
            <Button size="sm" variant="ghost" asChild>
              <Link to="/supervisor/cap/inbox">
                Open <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          }
        >
          {capInbox.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing awaiting action.</p>
          ) : (
            <ul className="divide-y divide-border">
              {capInbox.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {c.id} · {c.breachType}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CAPLevelBadge level={c.level} />
                    <CAPStatusBadge status={c.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
