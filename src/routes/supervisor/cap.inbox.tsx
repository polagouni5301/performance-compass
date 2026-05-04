import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { Check, X, ShieldAlert, Mail, Video } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supervisor/cap/inbox")({
  head: () => ({
    meta: [
      { title: "Supervisor — CAP Inbox · Accept / Dispute" },
      { name: "description", content: "Email-link landing for supervisors to accept or dispute breaches with attempt counter." },
    ],
  }),
  component: Inbox,
});

function Inbox() {
  const [openId, setOpenId] = useState<string | null>(null);
  const list = capCases.filter((c) => c.status === "logged" || c.status === "disputed" || c.status === "accepted");

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · CAP"
        title="CAP inbox"
        description="Open the breach, review history, and accept or dispute. Disputes are limited to two attempts."
      />

      <div className="space-y-3">
        {list.map((c) => {
          const remaining = 2 - c.disputeAttempts;
          const open = openId === c.id;
          return (
            <SectionCard
              key={c.id}
              title={`${c.employee.name} — ${c.id}`}
              description={`${c.breachType} · raised by ${c.raisedBy} (${c.raisedByTeam}) on ${c.raisedAt}`}
              actions={
                <div className="flex items-center gap-2">
                  <CAPLevelBadge level={c.level} />
                  <CAPStatusBadge status={c.status} />
                </div>
              }
            >
              <p className="text-sm text-muted-foreground">{c.breachDescription}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setOpenId(open ? null : c.id)}>
                  <Check className="mr-2 h-4 w-4" /> Accept
                </Button>
                <Button variant="outline" disabled={remaining <= 0}>
                  <X className="mr-2 h-4 w-4" /> Dispute ({remaining} left)
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/supervisor/cap/exception">
                    <ShieldAlert className="mr-2 h-4 w-4" /> Raise exception
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/cap/cases/$caseId" params={{ caseId: c.id }}>Open full case</Link>
                </Button>
              </div>

              {open && (
                <div className="mt-4 rounded-xl border border-primary/30 bg-primary-soft/40 p-4 text-sm">
                  <StatusBadge variant="primary">Acceptance recorded</StatusBadge>
                  <p className="mt-2 text-muted-foreground">A discussion meeting will be booked on Microsoft Teams.</p>
                  <ul className="mt-3 grid gap-1.5 text-xs">
                    <li className="flex items-center gap-2"><Video className="h-3.5 w-3.5" /> Teams meeting · auto-scheduled this week</li>
                    <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Confirmation emailed to agent (CC manager)</li>
                  </ul>
                </div>
              )}
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
