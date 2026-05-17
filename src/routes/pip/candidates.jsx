import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { pipCandidates } from "@/lib/mock-data";
import { Check, AlertTriangle, Mail } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badges";

export default function Candidates() {
  return (
    <div>
      <PageHeader
        eyebrow="PIP Module"
        title="PIP Candidates"
        description="Auto-identified using strict trigger logic. Supervisors must review and confirm before initiation."
      />

      <div className="mb-6 rounded-2xl border border-warning/30 bg-warning/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning-foreground" />
          <div className="text-sm">
            <div className="font-semibold">Trigger logic</div>
            <p className="text-muted-foreground">
              (3 consecutive warnings in 3 weeks) OR (6 warnings in 8 weeks) <strong>AND</strong> (1
              NI in last month OR 2 NI in last 6 months).
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pipCandidates.map((cand) => (
          <article
            key={cand.employee.ohrId}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-mono text-muted-foreground">{cand.employee.ohrId}</div>
                <div className="text-base font-semibold">{cand.employee.name}</div>
                <div className="text-xs text-muted-foreground">
                  {cand.employee.team} ·{" "}
                  {cand.employee.type === "apprentice" ? "Apprentice" : "Regular"}
                </div>
              </div>
              {cand.supervisorAcknowledged ? (
                <StatusBadge variant="success">Acknowledged</StatusBadge>
              ) : (
                <StatusBadge variant="warning">Pending review</StatusBadge>
              )}
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <dt className="text-muted-foreground">Consecutive warnings (3w)</dt>
                <dd className="mt-0.5 text-lg font-bold">{cand.consecutiveWarnings}</dd>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <dt className="text-muted-foreground">Warnings in 8 weeks</dt>
                <dd className="mt-0.5 text-lg font-bold">{cand.warningsLast8Weeks}</dd>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <dt className="text-muted-foreground">NI rating (last month)</dt>
                <dd className="mt-0.5 text-lg font-bold">{cand.niLastMonth}</dd>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2.5">
                <dt className="text-muted-foreground">NI rating (6 months)</dt>
                <dd className="mt-0.5 text-lg font-bold">{cand.niLast6Months}</dd>
              </div>
            </dl>

            <div className="mt-4 rounded-lg bg-primary-soft/40 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-primary">
                <Check className="h-3.5 w-3.5" /> Trigger conditions met
              </div>
              <div className="mt-1 text-muted-foreground">Identified {cand.identifiedAt}</div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Mail className="mr-1.5 h-3.5 w-3.5" /> Notify supervisor
              </Button>
              <Button size="sm" className="flex-1" disabled={!cand.supervisorAcknowledged}>
                Initiate PIP
              </Button>
            </div>
          </article>
        ))}
      </div>

      <SectionCard title="Initiation flow" className="mt-8">
        <ol className="grid gap-4 text-sm md:grid-cols-4">
          {[
            { n: 1, t: "Notify supervisor", d: "Email + system notification" },
            { n: 2, t: "Supervisor confirms", d: "Acknowledge & prepare targets" },
            { n: 3, t: "Auto-schedule meeting", d: "Teams meeting in same week" },
            { n: 4, t: "Generate PIP doc", d: "Word doc, 4 reviews × 15 days" },
          ].map((s) => (
            <li key={s.n} className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                {s.n}
              </div>
              <div className="mt-2 font-semibold">{s.t}</div>
              <div className="text-xs text-muted-foreground">{s.d}</div>
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
