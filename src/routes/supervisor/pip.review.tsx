import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { ReviewStatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { Database, Check, X, FileText, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supervisor/pip/review")({
  head: () => ({
    meta: [
      { title: "Supervisor — 15-day Review Cycle" },
      { name: "description", content: "Run a scheduled PIP review with auto-fetched KPI from SQL." },
    ],
  }),
  component: ReviewCycle,
});

function ReviewCycle() {
  const activeCase = pipCases.find((c) => c.status === "active")!;
  const currentReview = activeCase.reviews.find((r) => r.status === "scheduled") ?? activeCase.reviews[activeCase.reviews.length - 1];
  const [decisions, setDecisions] = useState<Record<string, "met" | "not-met" | null>>({});
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title={`Review ${currentReview.number} — ${activeCase.employee.name}`}
        description={`Case ${activeCase.id} · scheduled ${currentReview.date}. KPI fetched live from SQL.`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard
            title="Live KPI vs target"
            description="Auto-fetched from SQL Server"
            actions={<Button size="sm" variant="outline"><Database className="mr-1.5 h-3.5 w-3.5" /> Refresh</Button>}
          >
            <ul className="space-y-3">
              {activeCase.targets.map((t, i) => {
                const score = [93, 88, 100, 100][i] ?? 90;
                const target = [92, 88, 100, 100][i] ?? 90;
                const met = score >= target;
                const key = `t-${i}`;
                const choice = decisions[key];
                return (
                  <li key={i} className="rounded-xl border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{t}</div>
                        <div className="text-xs text-muted-foreground">Live: <span className="font-bold text-foreground">{score}</span> · Target: {target}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant={choice === "met" ? "default" : "outline"} onClick={() => setDecisions({ ...decisions, [key]: "met" })}>
                          <Check className="mr-1 h-3.5 w-3.5" /> Met
                        </Button>
                        <Button size="sm" variant={choice === "not-met" ? "default" : "outline"} onClick={() => setDecisions({ ...decisions, [key]: "not-met" })}>
                          <X className="mr-1 h-3.5 w-3.5" /> Not met
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className={`h-full ${met ? "bg-success" : "bg-destructive"}`} style={{ width: `${Math.min(100, (score / target) * 100)}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionCard>

          <SectionCard title="Feedback & next-cycle targets">
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Discussion summary, root causes, next steps…"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
            />
            <textarea
              rows={3}
              placeholder="Revised targets for next 15-day cycle (if any)…"
              className="mt-3 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
            />
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Review timeline">
            <ol className="space-y-2">
              {activeCase.reviews.map((r) => (
                <li key={r.number} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-2.5 text-xs">
                  <span className="font-mono">R{r.number} · {r.date}</span>
                  <ReviewStatusBadge status={r.status} />
                </li>
              ))}
              {activeCase.extended === false && (
                <li className="rounded-lg border border-dashed border-border p-2.5 text-xs text-muted-foreground">R5 / R6 added on extension</li>
              )}
            </ol>
          </SectionCard>

          <Button className="w-full" onClick={() => setSaved(true)}>
            <Send className="mr-2 h-4 w-4" /> Submit review
          </Button>
          {saved && (
            <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
              <div className="font-semibold text-success">Review submitted</div>
              <p className="mt-1 text-xs text-muted-foreground">Document updated. Continue to confirmation.</p>
              <Button asChild size="sm" className="mt-3 w-full">
                <Link to="/supervisor/pip/document"><FileText className="mr-2 h-3.5 w-3.5" /> View updated document</Link>
              </Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
