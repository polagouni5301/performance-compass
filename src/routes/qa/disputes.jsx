import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { Check, X, ShieldAlert, Upload } from "lucide-react";

export default function Disputes() {
  const list = capCases.filter((c) => c.status === "disputed");

  return (
    <div>
      <PageHeader
        eyebrow="QA / Compliance"
        title="Dispute resolution"
        description="Review supervisor responses, attempt counter, and discussion notes. Accept dispute, reject, or raise an exception."
      />

      {list.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-muted-foreground">No active disputes.</p>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          {list.map((c) => (
            <SectionCard
              key={c.id}
              title={`${c.employee.name} — ${c.id}`}
              description={`${c.breachType} · raised by ${c.raisedBy}`}
              actions={
                <div className="flex items-center gap-2">
                  <CAPLevelBadge level={c.level} />
                  <StatusBadge variant="warning">Attempt {c.disputeAttempts} / 2</StatusBadge>
                </div>
              }
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-3 lg:col-span-2">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Supervisor response
                    </div>
                    <p className="mt-1 rounded-lg bg-secondary/40 p-3 text-sm">
                      Disagree with framing — context: peak workload + system outage at the time.
                      Requesting reduced level.
                    </p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Discussion notes
                    </div>
                    <textarea
                      rows={3}
                      placeholder="Log outcome of offline discussion…"
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
                    />
                    <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 py-3 text-xs text-muted-foreground hover:border-primary/40">
                      <Upload className="h-3.5 w-3.5" /> Attach discussion notes
                    </button>
                  </div>
                </div>
                <aside className="space-y-2">
                  <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Accept dispute
                  </Button>
                  <Button variant="outline" className="w-full">
                    <X className="mr-2 h-4 w-4" /> Reject dispute
                  </Button>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/cap/exceptions">
                      <ShieldAlert className="mr-2 h-4 w-4" /> Raise exception
                    </Link>
                  </Button>
                </aside>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
