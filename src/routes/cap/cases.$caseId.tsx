import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { CAPStatusBadge, CAPLevelBadge, StatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { capCases } from "@/lib/mock-data";
import { ArrowLeft, FileText, Mail, Download, Check, X, ShieldAlert, Upload, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cap/cases/$caseId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.caseId} — CAP Case` },
      { name: "description", content: "Detailed CAP case view with dispute, exception and acknowledgement workflow." },
    ],
  }),
  component: CAPDetail,
});

function CAPDetail() {
  const { caseId } = useParams({ from: "/cap/cases/$caseId" });
  const c = capCases.find((x) => x.id === caseId);
  const [showException, setShowException] = useState(false);

  if (!c) return <div className="rounded-2xl border p-10 text-center">Case not found.</div>;

  const disputeRemaining = 2 - c.disputeAttempts;

  return (
    <div>
      <Link to="/cap/cases" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" /> All CAP cases
      </Link>

      <PageHeader
        eyebrow={`Case · ${c.id}`}
        title={c.employee.name}
        description={`${c.employee.team} · ${c.employee.type === "apprentice" ? "Apprentice" : "Regular"} · Raised by ${c.raisedBy} (${c.raisedByTeam})`}
        actions={
          <>
            <CAPLevelBadge level={c.level} />
            <CAPStatusBadge status={c.status} />
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> CAP letter</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="CAP level" value={c.level} hint={c.level === "CAP 3" ? "HR-managed" : "Valid 90 days"} icon={ShieldAlert} tone={c.level === "CAP 3" ? "danger" : c.level === "CAP 2" ? "primary" : "warning"} />
        <StatCard label="Raised" value={c.raisedAt} hint={`By ${c.raisedByTeam}`} />
        <StatCard label="Valid until" value={c.validUntil ?? "—"} hint={c.level === "CAP 3" ? "Escalation case" : "90-day validity"} />
        <StatCard label="Dispute attempts" value={`${c.disputeAttempts}/2`} hint={`${disputeRemaining} remaining`} tone={c.disputeAttempts >= 2 ? "danger" : "default"} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Breach details">
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</div>
                <div className="mt-1 text-sm font-medium">{c.breachType}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</div>
                <p className="mt-1 text-sm leading-relaxed">{c.breachDescription}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Supervisor action" description="Supervisor reviews via email link and updates status.">
            {c.status === "logged" && (
              <div className="flex flex-wrap gap-2">
                <Button><Check className="mr-2 h-4 w-4" /> Accept breach</Button>
                <Button variant="outline" disabled={disputeRemaining <= 0}>
                  <X className="mr-2 h-4 w-4" /> Dispute ({disputeRemaining} left)
                </Button>
                <Button variant="ghost" onClick={() => setShowException(true)}>
                  <ShieldAlert className="mr-2 h-4 w-4" /> Raise exception
                </Button>
              </div>
            )}
            {c.status === "accepted" && (
              <div className="rounded-xl border border-primary/30 bg-primary-soft/40 p-4 text-sm">
                <StatusBadge variant="primary">Accepted</StatusBadge>
                <p className="mt-2 text-muted-foreground">Discussion meeting scheduled. Awaiting agent acknowledgement.</p>
              </div>
            )}
            {c.status === "disputed" && (
              <div className="rounded-xl border border-warning/30 bg-warning/10 p-4 text-sm">
                <StatusBadge variant="warning">Disputed — attempt {c.disputeAttempts} / 2</StatusBadge>
                <p className="mt-2 text-muted-foreground">Internal offline discussion triggered. Submitter must update tool with outcome.</p>
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Update — discussion outcome</Button>
                  {disputeRemaining > 0 && <Button size="sm" variant="outline">Dispute again ({disputeRemaining} left)</Button>}
                </div>
              </div>
            )}
            {c.status === "exception-pending" && (
              <div className="rounded-xl border border-info/30 bg-info/10 p-4 text-sm">
                <StatusBadge variant="info">Exception pending</StatusBadge>
                <p className="mt-2 text-muted-foreground">Awaiting approval from {c.exceptionApprover}. Supporting documents uploaded.</p>
              </div>
            )}
            {c.status === "hr-escalation" && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm">
                <StatusBadge variant="danger">HR Escalation</StatusBadge>
                <p className="mt-2 text-muted-foreground">CAP 3 cases are HR-managed. Communication and closure handled outside this tool.</p>
              </div>
            )}
            {c.status === "closed" && (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
                <StatusBadge variant="success">Closed</StatusBadge>
                <p className="mt-2 text-muted-foreground">Final status updated. Stored for audit.</p>
              </div>
            )}

            {showException && c.status === "logged" && (
              <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4">
                <div className="text-sm font-semibold">Raise exception</div>
                <p className="text-xs text-muted-foreground">Approver: QA Manager / Compliance Manager / SDL</p>
                <textarea rows={3} placeholder="Justification…" className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card py-4 text-sm text-muted-foreground hover:border-primary/40">
                  <Upload className="h-4 w-4" /> Upload supporting documents
                </button>
                <div className="mt-3 flex gap-2">
                  <Button size="sm"><Send className="mr-1 h-3.5 w-3.5" /> Submit for approval</Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowException(false)}>Cancel</Button>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Activity & history">
            <ol className="relative space-y-3 border-l-2 border-border pl-5">
              {c.history.map((h, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                  <div className="text-sm">{h.event}</div>
                  <div className="text-xs text-muted-foreground">{h.date} · {h.actor}</div>
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="CAP letter">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"><FileText className="h-5 w-5" /></div>
                <div>
                  <div className="text-sm font-semibold">CAP_{c.id}.docx</div>
                  <div className="text-xs text-muted-foreground">{c.employee.type === "apprentice" ? "Apprentice template" : "Regular template"}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1"><Download className="mr-1 h-3.5 w-3.5" /> Download</Button>
                <Button size="sm" className="flex-1"><Mail className="mr-1 h-3.5 w-3.5" /> Send to agent</Button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Notification recipients">
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">From</span><span className="font-medium">{c.raisedBy}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">To</span><span className="font-medium">{c.employee.supervisor}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">CC</span><span className="font-medium">{c.employee.manager}</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">CC</span><span className="font-medium">{c.raisedBy}</span></li>
            </ul>
          </SectionCard>

          <SectionCard title="Acknowledgement">
            {c.acknowledgedAt ? (
              <StatusBadge variant="success">Acknowledged {c.acknowledgedAt}</StatusBadge>
            ) : (
              <StatusBadge variant="warning">Awaiting agent</StatusBadge>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
