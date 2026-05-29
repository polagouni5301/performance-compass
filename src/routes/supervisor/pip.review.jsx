import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import {
  Database,
  Check,
  X,
  FileText,
  Send,
  Plus,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { pipCases } from "@/lib/mock-data";

const AVAILABLE_KPIS = ["QA score", "AHT", "New Conv%", "NRPC", "NAOS", "NPS"];

export default function ReviewCycle() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caseId = searchParams.get("caseId");

  // Find target case or fallback
  const activeCase =
    pipCases.find((c) => c.id === caseId) ||
    pipCases.find((c) => c.status === "active") ||
    pipCases[0];

  const currentReview =
    activeCase.reviews.find((r) => r.status === "scheduled") ??
    activeCase.reviews[activeCase.reviews.length - 1];

  const [overallOutcome, setOverallOutcome] = useState("met");
  const [feedback, setFeedback] = useState("");

  // Parse targets for table representation
  const [nextCycleTargets, setNextCycleTargets] = useState(() => {
    return activeCase.targets.map((t) => {
      // split by first space to extract KPI name and target val
      const firstSpace = t.indexOf(" ");
      if (firstSpace > 0) {
        return {
          kpiName: t.substring(0, firstSpace),
          currentPerf: "90%",
          target: t.substring(firstSpace + 1),
        };
      }
      return { kpiName: t, currentPerf: "90%", target: "≥ 92%" };
    });
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newKpiName, setNewKpiName] = useState("QA score");
  const [newCurrentPerf, setNewCurrentPerf] = useState("");
  const [newTarget, setNewTarget] = useState("");

  const [isApprovedStatus, setIsApprovedStatus] = useState(false);
  const [closureStatus, setClosureStatus] = useState(null);

  // Compute review statistics
  const previousMetCount = activeCase.reviews.filter(
    (r) => r.number !== currentReview.number && r.status === "met",
  ).length;
  const metCount = previousMetCount + (overallOutcome === "met" ? 1 : 0);

  const isFinalReview = currentReview.number === activeCase.reviews.length;

  const handleSubmitReview = (statusOverride) => {
    // Persist to the global activeCase mock object so it displays correctly on cases list
    currentReview.status = overallOutcome;
    currentReview.feedback = feedback;

    // Save next cycle targets if not final review
    if (!isFinalReview) {
      activeCase.targets = nextCycleTargets.map((t) => `${t.kpiName} ${t.target}`);
    }

    const finalStatus = typeof statusOverride === "string" ? statusOverride : closureStatus;
    if (finalStatus) {
      activeCase.status = finalStatus;
    }

    alert("Review submitted successfully! Re-directing back to All Cases.");
    navigate("/pip/cases");
  };

  // Build review data for the closure timeline
  const allReviews = activeCase.reviews.slice(0, 4).map((r, i) => {
    if (r.number === currentReview.number) {
      return { ...r, displayStatus: overallOutcome, isCurrent: true };
    }
    return { ...r, displayStatus: r.status, isCurrent: false };
  });

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title={`Review ${currentReview.number} — ${activeCase.employee.name}`}
        description={`Case ${activeCase.id} · Scheduled ${currentReview.date}.`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Card 1: Live KPI vs target */}
        <SectionCard
          title="Live KPI vs target"
          actions={
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert("Refreshed KPI stats from SQL Server.")}
            >
              <Database className="mr-1.5 h-3.5 w-3.5" /> Refresh
            </Button>
          }
        >
          <ul className="space-y-3">
            {activeCase.targets.map((t, i) => {
              const score = [93, 88, 100, 100][i] ?? 90;
              const targetVal = [92, 88, 100, 100][i] ?? 90;
              const isMet = score >= targetVal;
              return (
                <li key={i} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-foreground">{t}</div>
                      <div className="text-xs text-muted-foreground">
                        Live: <span className="font-bold text-foreground">{score}</span> · Target:{" "}
                        {targetVal}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full ${isMet ? "bg-success" : "bg-destructive"}`}
                      style={{ width: `${Math.min(100, (score / targetVal) * 100)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-foreground">Confirm Review Outcome</div>
              <div className="text-xs text-muted-foreground">
                Select whether the agent met overall targets for this cycle.
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={overallOutcome === "met" ? "default" : "outline"}
                onClick={() => setOverallOutcome("met")}
                className="px-4 py-2 rounded-xl text-xs font-semibold"
              >
                <Check className="mr-1.5 h-4 w-4" /> Overall Met
              </Button>
              <Button
                variant={overallOutcome === "not-met" ? "default" : "outline"}
                onClick={() => setOverallOutcome("not-met")}
                className="px-4 py-2 rounded-xl border-destructive text-destructive hover:bg-destructive/10 text-xs font-semibold"
              >
                <X className="mr-1.5 h-4 w-4" /> Overall Not Met
              </Button>
            </div>
          </div>
        </SectionCard>

        {/* Card 2: Feedback & next-cycle targets */}
        <SectionCard title={isFinalReview ? "Review Feedback" : "Feedback & next-cycle targets"}>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Supervisor Feedback Comments
            </span>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Discussion summary, root causes, next steps…"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
            />
          </div>

          {!isFinalReview && (
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Targets for Next Review Cycle
              </span>
              <div className="overflow-hidden rounded-xl border border-border bg-secondary/20 mb-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/50">
                      <th className="py-2 px-3 font-semibold">KPI Name</th>
                      <th className="py-2 px-3 font-semibold">Current Performance Number</th>
                      <th className="py-2 px-3 font-semibold">Targets for Next Review Cycle</th>
                      <th className="py-2 px-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {nextCycleTargets.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-xs italic text-muted-foreground"
                        >
                          No targets added. Add targets below.
                        </td>
                      </tr>
                    ) : (
                      nextCycleTargets.map((t, idx) => (
                        <tr key={idx} className="hover:bg-secondary/40 text-foreground">
                          <td className="py-2.5 px-3 font-semibold">{t.kpiName}</td>
                          <td className="py-2.5 px-3 text-muted-foreground">{t.currentPerf}</td>
                          <td className="py-2.5 px-3 text-muted-foreground">{t.target}</td>
                          <td className="py-2.5 px-3 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() =>
                                setNextCycleTargets(nextCycleTargets.filter((_, i) => i !== idx))
                              }
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {showAddForm ? (
                <div className="p-3 border border-border rounded-xl bg-card space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <label className="block">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        KPI Name
                      </span>
                      <select
                        value={newKpiName}
                        onChange={(e) => setNewKpiName(e.target.value)}
                        className="mt-1 w-full text-xs rounded-lg border border-input bg-background p-1.5 focus:border-ring text-foreground dark:bg-zinc-900"
                      >
                        {AVAILABLE_KPIS.map((kpi) => (
                          <option key={kpi} value={kpi}>
                            {kpi}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Current Perf
                      </span>
                      <input
                        value={newCurrentPerf}
                        onChange={(e) => setNewCurrentPerf(e.target.value)}
                        placeholder="e.g. 90%"
                        className="mt-1 w-full text-xs rounded-lg border border-input bg-background p-1.5 focus:border-ring text-foreground dark:bg-zinc-900"
                      />
                    </label>
                    <label className="block">
                      <span className="text-[10px] text-muted-foreground uppercase font-bold">
                        Target
                      </span>
                      <input
                        value={newTarget}
                        onChange={(e) => setNewTarget(e.target.value)}
                        placeholder="e.g. ≥ 92%"
                        className="mt-1 w-full text-xs rounded-lg border border-input bg-background p-1.5 focus:border-ring text-foreground dark:bg-zinc-900"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" variant="ghost" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        if (newTarget.trim()) {
                          setNextCycleTargets([
                            ...nextCycleTargets,
                            {
                              kpiName: newKpiName,
                              currentPerf: newCurrentPerf || "—",
                              target: newTarget.trim(),
                            },
                          ]);
                          setNewTarget("");
                          setNewCurrentPerf("");
                          setShowAddForm(false);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setShowAddForm(true)}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add More KPIs
                </Button>
              )}
            </div>
          )}
        </SectionCard>

        {!isFinalReview && (
          <div className="pt-2 pb-2">
            <Button size="lg" className="w-full" onClick={() => handleSubmitReview()}>
              <Send className="mr-2 h-4 w-4" /> Submit review and generate document
            </Button>
          </div>
        )}

        {/* Card 3: PIP Closure — Enhanced Premium Design (Shows on 4th Review Cycle) */}
        {isFinalReview && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/25 shadow-elevated">
            {/* Decorative animated gradient bar */}
            <div
              className="h-1.5"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.22 22), oklch(0.78 0.16 75), oklch(0.66 0.15 155), oklch(0.65 0.13 240), oklch(0.65 0.22 22))",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />

            {/* Background gradient */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 50%, oklch(0.65 0.22 22), transparent 70%), radial-gradient(ellipse at 80% 50%, oklch(0.66 0.15 155), transparent 70%)",
              }}
            />

            <div className="relative">
              {/* Header */}
              <div className="px-6 pt-6 pb-5">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-glow"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.7 0.22 18), oklch(0.65 0.22 22))",
                    }}
                  >
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      PIP Closure Decision
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Final review cycle — determine the outcome for{" "}
                      <span className="font-semibold text-foreground">
                        {activeCase.employee.name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-border/60" />

              {/* Review Timeline Visualization */}
              <div className="px-6 py-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-4">
                  Review Cycle Outcomes
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {allReviews.map((r) => {
                    const isMet = r.displayStatus === "met";
                    const isScheduled = r.displayStatus === "scheduled";
                    return (
                      <div
                        key={r.number}
                        className={`relative rounded-xl border-2 p-4 transition-all ${
                          r.isCurrent
                            ? "border-primary/40 bg-primary-soft/20 shadow-soft ring-2 ring-primary/10"
                            : isMet
                              ? "border-success/30 bg-success/5"
                              : "border-destructive/30 bg-destructive/5"
                        }`}
                      >
                        {r.isCurrent && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground shadow-soft">
                            Current
                          </div>
                        )}
                        <div className="flex flex-col items-center text-center gap-2">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              isMet
                                ? "bg-success/15 text-success"
                                : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {isMet ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">
                              Review {r.number}
                            </div>
                            <div
                              className={`mt-0.5 text-[11px] font-semibold ${
                                isMet ? "text-success" : "text-destructive"
                              }`}
                            >
                              {isMet ? "Met" : "Not Met"}
                            </div>
                            {r.date && (
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                {r.date}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Connecting line between cards */}
                <div className="flex items-center justify-center mt-4 gap-2">
                  <div className="flex-1 h-px bg-border" />
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold shadow-soft ${
                      metCount >= 3
                        ? "bg-success/10 text-success border border-success/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                    }`}
                  >
                    {metCount >= 3 ? (
                      <Trophy className="h-3.5 w-3.5" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5" />
                    )}
                    {metCount} of 4 Reviews Met
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-border/60" />

              {/* Action Area */}
              <div className="px-6 py-6">
                {isApprovedStatus ? (
                  /* Waiting for Manager Approval Status */
                  <div className="rounded-2xl overflow-hidden border border-amber-400/30 shadow-soft">
                    <div
                      className="px-5 py-4"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.78 0.16 75 / 0.12), oklch(0.78 0.16 75 / 0.04))",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 mt-0.5">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                            </span>
                            PIP Waiting for Manager Approval
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                            The PIP has been referred to the manager and is currently awaiting
                            approval. An email notification has been sent to{" "}
                            <span className="font-semibold text-foreground">
                              {activeCase.employee.manager || "the manager"}
                            </span>
                            . You will be notified once a decision is made.
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                              <Mail className="h-3 w-3" />
                              Email sent to manager
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                              <Clock className="h-3 w-3" />
                              Awaiting response
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : metCount >= 3 ? (
                  /* Success Path: 3+ of 4 met — only show Close Successfully */
                  <div className="space-y-4">
                    <div
                      className="rounded-xl px-5 py-4"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.66 0.15 155 / 0.08), oklch(0.66 0.15 155 / 0.02))",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
                          <Sparkles className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-success">
                            Eligible for Successful Closure
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            The agent has met targets in {metCount} of 4 review cycles. The PIP can
                            be closed successfully.
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        alert(
                          "🎉 Final closure PIP document generated and sent to agent successfully!",
                        );
                        handleSubmitReview("closed-success");
                      }}
                      className="group relative w-full overflow-hidden rounded-xl py-4 px-6 text-white font-bold text-sm transition-all hover:shadow-lg active:scale-[0.99]"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.66 0.15 155), oklch(0.55 0.18 155))",
                      }}
                    >
                      <div className="flex items-center justify-center gap-2.5">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Close PIP — Success</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                      <div className="text-[11px] font-medium opacity-80 mt-1">
                        Generates final closure document & sends to agent
                      </div>
                    </button>
                  </div>
                ) : (
                  /* Failure Path: <3 of 4 met — show Refer to Manager + Request Extension */
                  <div className="space-y-4">
                    <div
                      className="rounded-xl px-5 py-4"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.58 0.24 27 / 0.08), oklch(0.58 0.24 27 / 0.02))",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-destructive">
                            Performance Targets Not Sufficiently Met
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            The agent met only {metCount} of 4 review cycles. Choose an action below
                            to proceed.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* PIP Failed - Refer to Manager */}
                      <Button
                        size="lg"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => {
                          alert(
                            "📧 Email sent to manager! PIP status moved to Awaiting Manager Approval.",
                          );
                          handleSubmitReview("pending-approval");
                        }}
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        PIP Failed — Refer to Manager
                      </Button>

                      {/* Request 30-Day Extension */}
                      <Button
                        size="lg"
                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                        onClick={() => {
                          alert(
                            "📧 Extension request submitted! Email sent to manager for 30-day extension approval.",
                          );
                          handleSubmitReview("pending-approval");
                        }}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        Request 30-Day Extension
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CSS for shimmer animation */}
            <style>{`
              @keyframes shimmer {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
