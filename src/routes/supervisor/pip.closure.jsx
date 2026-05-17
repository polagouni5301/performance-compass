import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { ReviewStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function Closure() {
  const cases = pipCases.filter(
    (c) => c.reviews.length >= 4 && (c.status === "active" || c.status === "pending-approval"),
  );

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title="Closure / Extension decision"
        description="If 3-of-4 reviews are met, close as success. Otherwise request a 30-day extension (manager approval required)."
      />

      <div className="space-y-6">
        {cases.map((c) => {
          const met = c.reviews.slice(0, 4).filter((r) => r.status === "met").length;
          const closeReady = met >= 3;
          return (
            <SectionCard
              key={c.id}
              title={`${c.employee.name} — ${c.id}`}
              description={`${c.employee.team} · 4 reviews complete · ${met}/4 met`}
              actions={
                closeReady ? (
                  <StatusBadge variant="success">Eligible for closure</StatusBadge>
                ) : (
                  <StatusBadge variant="warning">Extension recommended</StatusBadge>
                )
              }
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                        <th className="py-2 pr-3">Review</th>
                        <th className="py-2 pr-3">Date</th>
                        <th className="py-2 pr-3">KPI</th>
                        <th className="py-2 pr-3">Outcome</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {c.reviews.slice(0, 4).map((r) => (
                        <tr key={r.number}>
                          <td className="py-2 pr-3 font-mono text-xs">R{r.number}</td>
                          <td className="py-2 pr-3 text-muted-foreground">{r.date}</td>
                          <td className="py-2 pr-3 font-semibold">{r.kpiScore ?? "—"}</td>
                          <td className="py-2 pr-3">
                            <ReviewStatusBadge status={r.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <aside className="space-y-2">
                  <Button className="w-full" disabled={!closeReady}>
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Close PIP — Success
                  </Button>
                  <Button variant="outline" className="w-full" disabled={closeReady} asChild>
                    <Link to="/pip/approvals">
                      <AlertTriangle className="mr-2 h-4 w-4" /> Request 30-day extension
                    </Link>
                  </Button>
                  <p className="text-[11px] text-muted-foreground">
                    Extension request requires manager approval and creates Reviews 5 & 6.
                  </p>
                </aside>
              </div>
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
