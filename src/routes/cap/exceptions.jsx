import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { Check, X, FileText, Upload } from "lucide-react";

export default function Exceptions() {
  const list = capCases.filter((c) => c.exceptionRequested);

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="Exception requests"
        description="Supervisors raise exceptions when context warrants reduced/no CAP. Approved by QA Manager, Compliance Manager, or SDL."
      />

      {list.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-muted-foreground">No exception requests pending.</p>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          {list.map((c) => (
            <SectionCard
              key={c.id}
              title={`${c.employee.name} — ${c.id}`}
              description={`Raised by ${c.raisedBy} (${c.raisedByTeam}) · Approver: ${c.exceptionApprover}`}
              actions={<CAPLevelBadge level={c.level} />}
            >
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-3">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Breach
                    </div>
                    <div className="mt-1 text-sm font-medium">{c.breachType}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{c.breachDescription}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/40 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Upload className="h-4 w-4" /> Supporting documents
                    </div>
                    <ul className="mt-2 space-y-1 text-xs">
                      <li className="rounded-md bg-card px-2 py-1.5 font-mono">
                        📎 supervisor_context.pdf
                      </li>
                      <li className="rounded-md bg-card px-2 py-1.5 font-mono">
                        📎 system_log_excerpt.pdf
                      </li>
                    </ul>
                  </div>
                </div>
                <aside className="space-y-2">
                  <Button className="w-full">
                    <Check className="mr-2 h-4 w-4" /> Approve exception
                  </Button>
                  <Button variant="outline" className="w-full">
                    <X className="mr-2 h-4 w-4" /> Reject — proceed with CAP
                  </Button>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to={`/cap/cases/${c.id}`}>
                      <FileText className="mr-2 h-4 w-4" /> Open case
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
