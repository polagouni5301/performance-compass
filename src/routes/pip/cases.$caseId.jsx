import { Link, useParams } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { PIPStatusBadge, ReviewStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases } from "@/lib/mock-data";
import {
  ArrowLeft,
  FileText,
  Mail,
  Calendar,
  Download,
  Video,
  Target,
  Check,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";


export default function PIPDetail() {
  const { caseId } = useParams();
  const c = pipCases.find((x) => x.id === caseId);
  const [active, setActive] = useState("reviews");

  if (!c) return <div className="rounded-2xl border p-10 text-center">Case not found.</div>;

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
        actions={
          <>
            <PIPStatusBadge status={c.status} />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> PIP Document v{c.documentVersion}
            </Button>
            <Button>
              <Video className="mr-2 h-4 w-4" /> Schedule Teams review
            </Button>
          </>
        }
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
          label="Document version"
          value={`v${c.documentVersion}`}
          hint="Updated each review"
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
            <div className="mt-1 text-xl font-bold">{c.consecutiveWarnings}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">Warnings in 8 weeks</div>
            <div className="mt-1 text-xl font-bold">{c.warningsLast8Weeks}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">NI rating · last month</div>
            <div className="mt-1 text-xl font-bold">{c.niLastMonth}</div>
          </div>
          <div className="rounded-xl bg-secondary/60 p-3">
            <div className="text-xs text-muted-foreground">NI rating · 6 months</div>
            <div className="mt-1 text-xl font-bold">{c.niLast6Months}</div>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-primary-soft/40 p-3 text-xs text-muted-foreground">
          <strong className="text-primary">Trigger:</strong> {c.triggerReason}
        </p>
      </SectionCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard
            title="Review cycle"
            description="Auto-scheduled every 15 days · KPI fetched live from SQL"
            actions={
              c.status === "extended" ? (
                <StatusBadge variant="info">Extended +30d, 2 extra reviews</StatusBadge>
              ) : undefined
            }
          >
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
                        <div className="text-sm font-semibold">Review {r.number}</div>
                        <div className="text-xs text-muted-foreground">{r.date}</div>
                      </div>
                      <ReviewStatusBadge status={r.status} />
                    </div>
                    {r.kpiScore !== undefined && (
                      <div className="mt-3 flex items-center gap-4 text-xs">
                        <div>
                          KPI score: <span className="font-bold text-base">{r.kpiScore}</span>
                        </div>
                        {r.feedback && <div className="text-muted-foreground">— {r.feedback}</div>}
                      </div>
                    )}
                    {r.status === "scheduled" && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm">
                          <Check className="mr-1 h-3.5 w-3.5" /> Mark target met
                        </Button>
                        <Button size="sm" variant="outline">
                          <X className="mr-1 h-3.5 w-3.5" /> Mark not met
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Video className="mr-1 h-3.5 w-3.5" /> Open Teams meeting
                        </Button>
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

          <SectionCard
            title="Performance targets"
            actions={
              <Button size="sm" variant="outline">
                <Plus className="mr-1 h-3.5 w-3.5" /> Adjust for next review
              </Button>
            }
          >
            <ul className="space-y-2">
              {c.targets.map((t, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-xl bg-secondary/40 p-3 text-sm"
                >
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="PIP Document">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    PIP_{c.id}_v{c.documentVersion}.docx
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {c.employee.type === "apprentice"
                      ? "Apprentice template"
                      : "Regular employee template"}
                  </div>
                </div>
              </div>
              <div className="mt-3 grid gap-1 text-xs text-muted-foreground">
                <div>From: {c.employee.supervisor}</div>
                <div>To: {c.employee.email}</div>
                <div>CC: {c.employee.manager}</div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="mr-1 h-3.5 w-3.5" /> Download
                </Button>
                <Button size="sm" className="flex-1">
                  <Mail className="mr-1 h-3.5 w-3.5" /> Resend
                </Button>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Acknowledgement">
            {c.acknowledgedAt ? (
              <div className="space-y-2 text-sm">
                <StatusBadge variant="success">Acknowledged {c.acknowledgedAt}</StatusBadge>
                <div className="rounded-lg border border-border bg-secondary/40 p-3 font-mono text-xs">
                  📧 {c.acknowledgmentEmail}
                </div>
                <p className="text-xs text-muted-foreground">Stored as audit-ready `.eml` proof.</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <StatusBadge variant="warning">Awaiting agent reply</StatusBadge>
                <p className="text-xs text-muted-foreground">
                  Reply will be auto-captured in `.eml` format.
                </p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Meeting tracking">
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Total meetings</span>
                <span className="font-semibold">
                  {c.reviews.filter((r) => r.status !== "pending").length}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Avg duration</span>
                <span className="font-semibold">28 min</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Attendance</span>
                <span className="font-semibold text-success">100%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Channel</span>
                <span className="font-semibold">Microsoft Teams</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
