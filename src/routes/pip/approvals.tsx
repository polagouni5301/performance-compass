import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { PIPStatusBadge, ReviewStatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { ArrowLeft, Mail, Check, X, FileText } from "lucide-react";

export const Route = createFileRoute("/pip/approvals")({
  head: () => ({
    meta: [
      { title: "PIP Extension Approvals" },
      { name: "description", content: "Manager approval workflow for 30-day PIP extensions with two additional reviews." },
    ],
  }),
  component: Approvals,
});

function Approvals() {
  const pending = pipCases.filter((c) => c.status === "pending-approval");

  return (
    <div>
      <PageHeader
        eyebrow="PIP Module"
        title="Extension approvals"
        description="Managers approve +30 days and two additional reviews when exit criteria are not met. Approval includes detailed review summary."
      />

      {pending.length === 0 ? (
        <SectionCard><p className="text-sm text-muted-foreground">No extension requests pending.</p></SectionCard>
      ) : (
        <div className="space-y-6">
          {pending.map((c) => {
            const met = c.reviews.filter((r) => r.status === "met").length;
            return (
              <SectionCard
                key={c.id}
                title={`${c.employee.name} — ${c.id}`}
                description={`${c.employee.team} · Supervisor ${c.employee.supervisor} · Manager approval needed`}
                actions={<PIPStatusBadge status={c.status} />}
              >
                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold">Review summary</h3>
                    <table className="mt-3 w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                          <th className="py-2 pr-3">#</th>
                          <th className="py-2 pr-3">Date</th>
                          <th className="py-2 pr-3">Outcome</th>
                          <th className="py-2 pr-3">KPI</th>
                          <th className="py-2 pr-3">Feedback</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {c.reviews.map((r) => (
                          <tr key={r.number}>
                            <td className="py-2 pr-3 font-mono text-xs">R{r.number}</td>
                            <td className="py-2 pr-3 text-muted-foreground">{r.date}</td>
                            <td className="py-2 pr-3"><ReviewStatusBadge status={r.status} /></td>
                            <td className="py-2 pr-3 font-semibold">{r.kpiScore ?? "—"}</td>
                            <td className="py-2 pr-3 text-muted-foreground">{r.feedback ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm">
                      <div className="font-semibold">Exit criteria not met</div>
                      <p className="text-xs text-muted-foreground">Only {met} of 4 reviews met (need 3). Recommendation: extend by 30 days with 2 additional reviews (R5 & R6).</p>
                    </div>
                  </div>

                  <aside className="space-y-3">
                    <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Approval email</div>
                      <p className="mt-1 text-xs text-muted-foreground">Sent to <strong>{c.employee.manager}</strong> with full review summary attached.</p>
                      <Button size="sm" variant="outline" className="mt-3 w-full"><Mail className="mr-1 h-3.5 w-3.5" /> View email thread</Button>
                    </div>
                    <Button className="w-full"><Check className="mr-2 h-4 w-4" /> Approve extension</Button>
                    <Button variant="outline" className="w-full"><X className="mr-2 h-4 w-4" /> Reject — refer to HR</Button>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/pip/cases/$caseId" params={{ caseId: c.id }}>
                        <FileText className="mr-2 h-4 w-4" /> Open full case
                      </Link>
                    </Button>
                  </aside>
                </div>
              </SectionCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
