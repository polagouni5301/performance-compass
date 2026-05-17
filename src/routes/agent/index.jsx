import { Link } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, CAPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases, capCases } from "@/lib/mock-data";
import { TrendingUp, ShieldAlert, Mail } from "lucide-react";

export default function AgentHome() {
  // Pretend the agent is Marcus Bennett (OHR-205033)
  const myPIP = pipCases.find((c) => c.employee.ohrId === "OHR-205033");
  const myCAPs = capCases.filter((c) => c.employee.ohrId === "OHR-205033");

  return (
    <div>
      <PageHeader
        eyebrow="Agent"
        title="My cases"
        description="Your performance and compliance records. Acknowledge documents and track your progress."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard
          label="Active PIP"
          value={myPIP ? "Yes" : "No"}
          hint={myPIP?.id ?? "—"}
          icon={TrendingUp}
          tone="primary"
        />
        <StatCard
          label="Open CAPs"
          value={myCAPs.filter((c) => c.status !== "closed").length}
          icon={ShieldAlert}
          tone="warning"
        />
        <StatCard
          label="Pending acknowledgements"
          value={
            (myPIP && !myPIP.acknowledgedAt ? 1 : 0) +
            myCAPs.filter((c) => !c.acknowledgedAt).length
          }
          icon={Mail}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="My PIP"
          actions={
            <Button size="sm" asChild>
              <Link to="/agent/pip">Open</Link>
            </Button>
          }
        >
          {myPIP ? (
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{myPIP.id}</span>
                <PIPStatusBadge status={myPIP.status} />
              </div>
              <div className="text-xs text-muted-foreground">
                {myPIP.startDate} → {myPIP.endDate}
              </div>
              <div className="text-xs">
                Reviews met:{" "}
                <span className="font-semibold">
                  {myPIP.reviews.filter((r) => r.status === "met").length}/{myPIP.reviews.length}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No active PIP.</p>
          )}
        </SectionCard>

        <SectionCard
          title="My CAP / Warnings"
          actions={
            <Button size="sm" asChild>
              <Link to="/agent/cap">Open</Link>
            </Button>
          }
        >
          {myCAPs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No CAPs on record.</p>
          ) : (
            <ul className="divide-y divide-border">
              {myCAPs.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                >
                  <div>
                    <div className="text-sm font-medium">{c.id}</div>
                    <div className="text-xs text-muted-foreground">{c.breachType}</div>
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
