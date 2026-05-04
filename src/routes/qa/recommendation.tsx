import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases, getCAPHistoryForEmployee, recommendCAPLevel } from "@/lib/mock-data";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/qa/recommendation")({
  head: () => ({
    meta: [
      { title: "QA — CAP Recommendation Panel" },
      { name: "description", content: "Visual reference of CAP level recommendation logic, validity, and HR escalation triggers." },
    ],
  }),
  component: Recommendation,
});

function Recommendation() {
  const samples = capCases.slice(0, 3).map((c) => ({
    case: c,
    history: getCAPHistoryForEmployee(c.employee.ohrId),
    recommended: recommendCAPLevel(c.employee.ohrId, c.breachType),
  }));

  return (
    <div>
      <PageHeader
        eyebrow="QA / Compliance"
        title="CAP recommendation panel"
        description="System logic that drives the recommendation engine. CAP 1 / 2 valid 90 days · CAP 3 escalates to HR."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard>
          <CAPLevelBadge level="CAP 1" />
          <p className="mt-2 text-sm font-semibold">First-time / minor</p>
          <p className="text-xs text-muted-foreground">Issued as a warning. Valid 90 days.</p>
        </SectionCard>
        <SectionCard>
          <CAPLevelBadge level="CAP 2" />
          <p className="mt-2 text-sm font-semibold">Repeat or serious</p>
          <p className="text-xs text-muted-foreground">Stronger consequence. Valid 90 days.</p>
        </SectionCard>
        <SectionCard>
          <div className="flex items-center gap-2">
            <CAPLevelBadge level="CAP 3" />
            <StatusBadge variant="danger"><AlertTriangle className="h-3 w-3" /> HR escalation</StatusBadge>
          </div>
          <p className="mt-2 text-sm font-semibold">Repeat misconduct</p>
          <p className="text-xs text-muted-foreground">Termination path. HR-managed outside this tool.</p>
        </SectionCard>
      </div>

      <SectionCard title="Sample recommendations" className="mt-6" description="Driven by past warnings and same-breach history.">
        <ul className="divide-y divide-border">
          {samples.map(({ case: c, history, recommended }) => (
            <li key={c.id} className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-4">
              <div>
                <div className="font-medium">{c.employee.name}</div>
                <div className="text-xs text-muted-foreground">{c.employee.ohrId}</div>
              </div>
              <div className="text-sm"><span className="text-muted-foreground">Breach</span><div className="font-medium">{c.breachType}</div></div>
              <div className="text-sm"><span className="text-muted-foreground">Past CAPs</span><div className="font-medium">{history.length}</div></div>
              <div className="flex items-center gap-2">
                <CAPLevelBadge level={recommended} />
                <CAPStatusBadge status={c.status} />
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
