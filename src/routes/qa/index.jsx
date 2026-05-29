import { Link } from "react-router-dom";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { ClipboardList, Scale, Inbox, ArrowRight } from "lucide-react";
import { useMemo } from "react";

export default function QAHome() {
  // Combined data for lists
  const allCases = useMemo(() => {
    return [...capCases].sort((a, b) => new Date(b.raisedAt) - new Date(a.raisedAt));
  }, []);

  const open = allCases.filter((c) => c.status !== "closed" && c.status !== "hr-escalation").length;
  const disputed = allCases.filter((c) => c.status === "disputed").length;
  const warningCount = allCases.filter((c) => c.level === "Warning").length;

  return (
    <div>
      <PageHeader
        eyebrow="QA / Compliance"
        title="Breach intake & tracker"
        description="Log breaches, view CAP recommendations, resolve disputes."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Pending CAPs" value={open} icon={ClipboardList} tone="primary" />
        <StatCard label="Active disputes" value={disputed} icon={Inbox} tone="warning" />
        <StatCard label="Pending Warning letter" value={warningCount} icon={Scale} />
      </div>

      <SectionCard
        title="Recent breaches"
        className="mt-8"
        actions={
          <Button size="sm" variant="ghost" asChild>
            <Link to="/cap/cases">
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        }
      >
        <ul className="divide-y divide-border">
          {allCases.slice(0, 5).map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <Link to={`/cap/cases/${c.id}`} className="font-medium hover:underline">
                  {c.employee.name}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {c.id} · {c.breachType}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {c.level === "Warning" ? (
                  <StatusBadge
                    variant="neutral"
                    dot={false}
                    className="font-bold border-dashed text-[10px] h-5"
                  >
                    Warning Letter
                  </StatusBadge>
                ) : (
                  <CAPLevelBadge level={c.level} />
                )}
                <CAPStatusBadge status={c.status} />
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
