import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { pipCandidates } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badges";
import { AlertTriangle, Check, X, Eye, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supervisor/pip/candidates")({
  head: () => ({
    meta: [
      { title: "Supervisor — PIP Candidate Review" },
      { name: "description", content: "Review system-identified PIP candidates from trigger engine and confirm or reject." },
    ],
  }),
  component: CandidateReview,
});

function CandidateReview() {
  const [drawerFor, setDrawerFor] = useState<string | null>(null);
  const drawer = pipCandidates.find((c) => c.employee.ohrId === drawerFor);

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title="PIP candidate review"
        description="Populated from Auto Scheduler warnings, AES, and SQL KPIs. Confirm to initiate, or reject with reason."
      />

      <div className="mb-6 rounded-2xl border border-warning/30 bg-warning/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning-foreground" />
          <div className="text-sm">
            <div className="font-semibold">Trigger logic</div>
            <p className="text-muted-foreground">
              (3 consecutive warnings in 3 weeks) OR (6 warnings in 8 weeks) <strong>AND</strong> (1 NI in last month OR 2 NI in last 6 months).
            </p>
          </div>
        </div>
      </div>

      <SectionCard title="Identified candidates">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3">Agent</th>
                <th className="py-2 pr-3">Warnings (3w / 8w)</th>
                <th className="py-2 pr-3">NI (1m / 6m)</th>
                <th className="py-2 pr-3">Trigger reason</th>
                <th className="py-2 pr-3">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pipCandidates.map((c) => (
                <tr key={c.employee.ohrId} className="hover:bg-secondary/40">
                  <td className="py-3 pr-3">
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{c.employee.ohrId} · {c.employee.team}</div>
                  </td>
                  <td className="py-3 pr-3 font-semibold">{c.consecutiveWarnings} <span className="text-muted-foreground">/ {c.warningsLast8Weeks}</span></td>
                  <td className="py-3 pr-3 font-semibold">{c.niLastMonth} <span className="text-muted-foreground">/ {c.niLast6Months}</span></td>
                  <td className="py-3 pr-3 text-xs text-muted-foreground">Auto Scheduler + AES rating</td>
                  <td className="py-3 pr-3">
                    {c.supervisorAcknowledged ? <StatusBadge variant="success">Acknowledged</StatusBadge> : <StatusBadge variant="warning">Pending</StatusBadge>}
                  </td>
                  <td className="py-3 pr-3 text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button size="sm" variant="ghost"><Eye className="mr-1 h-3.5 w-3.5" /> View data</Button>
                      <Button size="sm" variant="outline"><X className="mr-1 h-3.5 w-3.5" /> Reject</Button>
                      <Button size="sm" onClick={() => setDrawerFor(c.employee.ohrId)}><Check className="mr-1 h-3.5 w-3.5" /> Confirm</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {drawer && (
        <div className="fixed inset-0 z-40 flex justify-end bg-foreground/30 backdrop-blur-sm" onClick={() => setDrawerFor(null)}>
          <div className="h-full w-full max-w-md overflow-y-auto bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Confirm PIP</div>
            <h2 className="mt-1 text-xl font-bold">{drawer.employee.name}</h2>
            <p className="text-xs text-muted-foreground">{drawer.employee.ohrId} · {drawer.employee.team}</p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Initial PIP targets</label>
                <textarea
                  rows={4}
                  defaultValue={"• Maintain QA score ≥ 92%\n• Average handle time ≤ 6:30\n• Zero compliance breaches"}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Readiness note</label>
                <textarea
                  rows={2}
                  placeholder="Confirm readiness for discussion meeting…"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <Button asChild>
                <Link to="/supervisor/pip/initiate">Proceed to initiation <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
              <Button variant="ghost" onClick={() => setDrawerFor(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
