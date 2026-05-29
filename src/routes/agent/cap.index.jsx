import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { CAPLevelBadge, CAPStatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { capCases } from "@/lib/mock-data";

export default function MyCAP() {
  const list = capCases.filter((c) => c.employee.ohrId === "OHR-205033");

  return (
    <div>
      <PageHeader
        eyebrow="Agent · CAP"
        title="My CAP / Warnings"
        description="All breach records and validity windows for your account."
      />

      <div className="space-y-3">
        {list.map((c) => (
          <SectionCard
            key={c.id}
            title={`${c.id} — ${c.breachType}`}
            description={`Raised ${c.raisedAt} · Valid until ${c.validUntil ?? "—"}`}
            actions={
              <div className="flex items-center gap-2">
                <CAPLevelBadge level={c.level} />
                <CAPStatusBadge status={c.status} />
              </div>
            }
          >
            <p className="text-sm text-muted-foreground">{c.breachDescription}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/cap/cases/${c.id}`}>View letter</Link>
              </Button>
              {!c.acknowledgedAt && (
                <Button size="sm" asChild>
                  <Link to="/agent/cap/acknowledge">Acknowledge</Link>
                </Button>
              )}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
