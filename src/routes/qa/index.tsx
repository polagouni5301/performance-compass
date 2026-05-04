import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { ClipboardList, Scale, Inbox, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/qa/")({
  head: () => ({
    meta: [
      { title: "QA / Compliance home" },
      { name: "description", content: "Breach intake and dispute tracking for QA & Compliance teams." },
    ],
  }),
  component: QAHome,
});

function QAHome() {
  const open = capCases.filter((c) => c.status !== "closed" && c.status !== "hr-escalation").length;
  const disputed = capCases.filter((c) => c.status === "disputed").length;
  return (
    <div>
      <PageHeader
        eyebrow="QA / Compliance"
        title="Breach intake & tracker"
        description="Log breaches, view CAP recommendations, resolve disputes."
        actions={
          <>
            <Button asChild><Link to="/cap/new"><ClipboardList className="mr-2 h-4 w-4" /> Log breach</Link></Button>
            <Button variant="outline" asChild><Link to="/qa/disputes"><Inbox className="mr-2 h-4 w-4" /> Disputes</Link></Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="Open CAPs" value={open} icon={ClipboardList} tone="primary" />
        <StatCard label="Active disputes" value={disputed} icon={Inbox} tone="warning" />
        <StatCard label="Recent recommendations" value={3} icon={Scale} />
      </div>

      <SectionCard
        title="Recent breaches"
        className="mt-8"
        actions={<Button size="sm" variant="ghost" asChild><Link to="/cap/cases">View all <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>}
      >
        <ul className="divide-y divide-border">
          {capCases.slice(0, 5).map((c) => (
            <li key={c.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <Link to="/cap/cases/$caseId" params={{ caseId: c.id }} className="font-medium hover:underline">{c.employee.name}</Link>
                <div className="text-xs text-muted-foreground">{c.id} · {c.breachType}</div>
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
  );
}
