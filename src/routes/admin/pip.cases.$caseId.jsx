import { Link, useParams } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, ReviewStatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases } from "@/lib/mock-data";
import {
  ArrowLeft,
  FileText,
  Mail,
  Calendar,
  Download,
  Target,
  Check,
  X,
  Video,
} from "lucide-react";
import { useState } from "react";

export default function PIPDetail() {
  const { caseId } = useParams();
  const c = pipCases.find((x) => x.id === caseId);

  if (!c)
    return (
      <div className="rounded-2xl border p-10 text-center text-foreground bg-card">
        Case not found.
      </div>
    );

  const met = c.reviews.filter((r) => r.status === "met").length;
  const notMet = c.reviews.filter((r) => r.status === "not-met").length;
  const completed = c.reviews.filter(
    (r) => r.status !== "scheduled" && r.status !== "pending",
  ).length;
  const exitMet = met >= 3;

  return (
    <div>
      <Link
        to="/pip/cases"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> All PIP cases
      </Link>

      <PageHeader
        eyebrow={`Case · ${c.id}`}
        title={c.employee.name}
        description={`${c.employee.team} · ${c.employee.type === "apprentice" ? "Apprentice" : "Regular employee"} · Supervisor ${c.employee.supervisor} · Manager ${c.employee.manager}`}
        actions={<PIPStatusBadge status={c.status} />}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Duration"
          value={`${c.duration}d`}
          hint={`${c.startDate} → ${c.endDate}`}
          icon={Calendar}
          tone="primary"
        />
        <StatCard
          label="Reviews met"
          value={`${met}/${c.reviews.length}`}
          hint={`${notMet} not met · ${completed} done`}
          icon={Target}
          tone={exitMet ? "success" : "warning"}
        />
        <StatCard
          label="Review Period"
          value={
            completed === 0
              ? "None"
              : completed === 1
                ? "1st"
                : completed === 2
                  ? "2nd"
                  : completed === 3
                    ? "3rd"
                    : completed === 4
                      ? "4th"
                      : `${completed}th`
          }
          hint={`Cycle ${completed} of ${c.reviews.length}`}
          icon={FileText}
          tone="default"
        />
        <StatCard
          label="Acknowledged"
          value={c.acknowledgedAt ? "Yes" : "Pending"}
          hint={c.acknowledgmentEmail ?? "Awaiting reply (.eml)"}
          icon={Mail}
          tone={c.acknowledgedAt ? "success" : "warning"}
        />
      </div>

      <SectionCard title="Trigger evidence" className="mt-6">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">Consecutive warnings (3w)</div>
            <div className="mt-1 text-xl font-bold text-foreground">{c.consecutiveWarnings}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">Warnings in 8 weeks</div>
            <div className="mt-1 text-xl font-bold text-foreground">{c.warningsLast8Weeks}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">NI rating · last month</div>
            <div className="mt-1 text-xl font-bold text-foreground">{c.niLastMonth}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">NI rating · 6 months</div>
            <div className="mt-1 text-xl font-bold text-foreground">{c.niLast6Months}</div>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-primary-soft/40 p-3 text-xs text-muted-foreground">
          <strong className="text-primary">Trigger:</strong> {c.triggerReason}
        </p>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Review cycle">
            <ol className="relative space-y-4 border-l-2 border-border pl-6">
              {c.reviews.map((r) => (
                <li key={r.number} className="relative">
                  <span
                    className={`absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[10px] font-bold ${
                      r.status === "met"
                        ? "bg-success text-success-foreground"
                        : r.status === "not-met"
                          ? "bg-destructive text-destructive-foreground"
                          : r.status === "scheduled"
                            ? "bg-info text-info-foreground"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {r.number}
                  </span>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Review {r.number}
                        </div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                      <ReviewStatusBadge status={r.status} />
                    </div>

                    {r.status !== "scheduled" && r.status !== "pending" && (
                      <div className="mt-3 space-y-2.5 text-xs">
                        <div className="font-semibold text-muted-foreground border-b border-border pb-1">
                          Targets & Performance
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <div className="rounded-lg bg-secondary/30 p-2">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">
                              KPI Target
                            </span>
                            <div className="font-semibold text-foreground">
                              QA score: Target ≥ 92%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Achieved:{" "}
                              <span className="font-bold text-foreground">{r.kpiScore ?? 92}%</span>
                            </div>
                          </div>
                          <div className="rounded-lg bg-secondary/30 p-2">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">
                              AHT Target
                            </span>
                            <div className="font-semibold text-foreground">AHT: Target ≤ 6:30</div>
                            <div className="text-xs text-muted-foreground">
                              Achieved: <span className="font-bold text-foreground">6:20</span>
                            </div>
                          </div>
                        </div>
                        {r.feedback && (
                          <div className="mt-2 rounded-lg bg-secondary/20 p-2.5 border border-border">
                            <span className="font-semibold block text-foreground mb-0.5">
                              Supervisor Comments:
                            </span>
                            <span className="text-muted-foreground italic">"{r.feedback}"</span>
                          </div>
                        )}
                      </div>
                    )}

                    {r.status === "scheduled" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {c.status === "active" && completed === 4 && exitMet && (
              <div className="mt-4 rounded-xl border border-success/30 bg-success/10 p-4">
                <div className="font-semibold text-success">
                  Exit criteria met — 3 of 4 reviews achieved
                </div>
                <p className="text-xs text-muted-foreground">
                  Supervisor can close PIP and trigger success email to agent.
                </p>
                <Button size="sm" className="mt-3">
                  Close PIP — Success
                </Button>
              </div>
            )}
            {c.status === "active" && completed === 4 && !exitMet && (
              <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4">
                <div className="font-semibold">Exit criteria not met</div>
                <p className="text-xs text-muted-foreground">
                  Request 30-day extension with 2 additional reviews. Manager approval required.
                </p>
                <Button size="sm" className="mt-3" asChild>
                  <Link to="/pip/approvals">Request extension</Link>
                </Button>
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Latest PIP Review Document">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    PIP_{c.id}_v{c.documentVersion}.docx
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {c.employee.type === "apprentice"
                      ? `Apprentice employee template - Review No 1 (Date: ${c.reviews[0]?.date || "2026-04-02"})`
                      : `Regular employee template - Review No 1 (Date: ${c.reviews[0]?.date || "2026-04-02"})`}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => alert("Downloading document...")}
                >
                  <Download className="mr-1 h-3.5 w-3.5" /> Download
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => alert("Resending document via email...")}
                >
                  <Mail className="mr-1 h-3.5 w-3.5" /> Resend
                </Button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Acknowledgement Emails">
            <div className="space-y-3">
              {c.acknowledgedAt ? (
                <div className="space-y-2 text-sm">
                  <div
                    className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-secondary/40 font-mono text-xs text-foreground cursor-pointer hover:bg-secondary/60 transition"
                    onClick={() => alert(`Downloading acknowledgement ${c.acknowledgmentEmail}...`)}
                  >
                    <span className="truncate">📧 {c.acknowledgmentEmail}</span>
                    <Download className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Initial PIP Acknowledgment Stored.
                  </p>
                </div>
              ) : (
                <div className="text-xs text-muted-foreground italic">
                  No initial acknowledgment email attached.
                </div>
              )}

              {c.reviews
                .filter((r) => r.status !== "scheduled" && r.status !== "pending")
                .map((r) => (
                  <div key={r.number} className="space-y-1">
                    <div
                      className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-secondary/40 font-mono text-xs text-foreground cursor-pointer hover:bg-secondary/60 transition"
                      onClick={() => alert(`Downloading Review ${r.number} Acknowledgement...`)}
                    >
                      <span className="truncate">
                        📧 PIP_R{r.number}_Ack_{c.employee.ohrId}.eml
                      </span>
                      <Download className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      Review Cycle {r.number} Acknowledgment Stored.
                    </p>
                  </div>
                ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
