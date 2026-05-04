import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { Send, AlertOctagon } from "lucide-react";

export const Route = createFileRoute("/supervisor/pip/failure")({
  head: () => ({
    meta: [
      { title: "Supervisor — Final Failure Escalation" },
      { name: "description", content: "Mark a PIP as failed after extension reviews and escalate to HR via manager." },
    ],
  }),
  component: Failure,
});

function Failure() {
  const candidates = pipCases.filter((c) => c.extended);
  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title="Final failure escalation"
        description="If R5 / R6 still fail, mark Failed. The system emails the manager with an HR-referral recommendation."
      />

      <div className="space-y-6">
        {candidates.map((c) => {
          const final = c.reviews.slice(-2);
          const totalMet = c.reviews.filter((r) => r.status === "met").length;
          return (
            <SectionCard
              key={c.id}
              title={`${c.employee.name} — ${c.id}`}
              description={`Extended PIP · 6 reviews · ${totalMet} met`}
              actions={<StatusBadge variant="danger">Recommend HR referral</StatusBadge>}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {final.map((r) => (
                  <div key={r.number} className="rounded-xl border border-border bg-secondary/40 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review {r.number}</div>
                    <div className="mt-1 text-2xl font-bold">{r.kpiScore ?? "—"}</div>
                    <div className="text-xs text-muted-foreground">{r.date}</div>
                  </div>
                ))}
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                    <AlertOctagon className="h-4 w-4" /> Outcome
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Targets not achieved across extended cycle.</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline">Mark as Failed</Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" /> Email manager — recommend HR referral
                </Button>
              </div>
            </SectionCard>
          );
        })}
      </div>
    </div>
  );
}
