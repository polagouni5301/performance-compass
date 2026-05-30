import { Link, useParams } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { CAPStatusBadge, CAPLevelBadge, StatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { capCases } from "@/lib/mock-data";
import { usePersona } from "@/lib/persona";
import {
  ArrowLeft,
  Download,
  Check,
  X,
  ShieldAlert,
  Upload,
  Send,
  FileText,
  Mail,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export default function CAPDetail() {
  const { caseId } = useParams();
  const c = capCases.find((x) => x.id === caseId);
  const [showException, setShowException] = useState(false);
  const { persona } = usePersona();

  const [updateTrigger, setUpdateTrigger] = useState(0);
  const forceUpdate = () => setUpdateTrigger((prev) => prev + 1);

  // Determine initial state based on whether the case is already accepted/discussion closed
  const isInitiallyAccepted = c && c.status === "accepted";
  const isInitiallyDisputed = c && c.status === "disputed";
  const isInitiallyException = c && c.status === "exception-pending";

  const [state, setState] = useState({
    selectedAction: isInitiallyAccepted ? "accept" : isInitiallyDisputed ? "dispute" : isInitiallyException ? "exception" : null,
    isDiscussionClosed: isInitiallyAccepted,
    discussionComments: isInitiallyAccepted ? (c.discussionComments || "Discussed the breach details and corrective actions with the guide. Guide understands the expectations and compliance requirements.") : "",
    discussionDate: isInitiallyAccepted ? (c.discussionDate || "2026-05-16") : "",
    discussionClosedAt: isInitiallyAccepted ? (c.discussionClosedAt || "5/16/2026") : null,
    uploadedAckFile: "",
    isFlowCompleted: false,

    disputeComments: isInitiallyDisputed ? (c.supervisorComment || "Agent was managing double the usual volume during this hour. CRM performance was also degraded.") : "",
    disputeFile: isInitiallyDisputed ? (c.documents?.[0] || "workload_report.pdf") : "",
    isDisputeSubmitted: isInitiallyDisputed,

    exceptionComments: isInitiallyException ? (c.supervisorComment || "Regional outage reported. Documented by IT department and SDL was informed.") : "",
    exceptionFile: isInitiallyException ? (c.documents?.[0] || "internet_outage_ticket.pdf") : "",
    isExceptionSubmitted: isInitiallyException,
    managerStatus: "pending",
    qaStatus: "pending",
  });

  const updateState = (updates) => setState((prev) => ({ ...prev, ...updates }));

  if (!c) return <div className="rounded-2xl border p-10 text-center">Case not found.</div>;

  const disputeRemaining = 2 - c.disputeAttempts;
  const backTo = persona === "agent" ? "/agent/cap" : "/cap/cases";
  const backLabel = persona === "agent" ? "My CAP / Warnings" : "All CAP cases";

  let pendingActionText = "Pending Action Required";
  if (c.status === "closed") {
    pendingActionText = "No Pending actions (Completed)";
  } else if (c.status === "disputed") {
    pendingActionText = "Awaiting response from QA/Compliance";
  } else if (c.status === "exception-pending") {
    pendingActionText = "Awaiting Manager Approval";
  } else if (state.selectedAction === "accept" || c.status === "accepted") {
    if (!state.isDiscussionClosed) {
      pendingActionText = "Discussion Pending";
    } else {
      pendingActionText = "Awaiting guide acknowledgment";
    }
  } else if (state.selectedAction === "dispute") {
    pendingActionText = "Awaiting Dispute Submission";
  } else if (state.selectedAction === "exception") {
    pendingActionText = "Awaiting Exception Submission";
  } else if (c.status === "logged") {
    pendingActionText = "cap initiate-Initiated";
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-2 h-9 gap-2 font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
        asChild
      >
        <Link to={backTo}>
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </Button>

      <PageHeader
        eyebrow={`Case · ${c.id}`}
        title={c.employee.name}
        description={
          <span className="mt-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                OHR
              </span>
              <span className="font-mono font-medium text-foreground">{c.employee.ohrId}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                Supervisor
              </span>
              <span className="font-medium text-foreground">{c.employee.supervisor}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                Manager
              </span>
              <span className="font-medium text-foreground">{c.employee.manager}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
              <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                Department
              </span>
              <span className="font-medium text-foreground">{c.employee.team}</span>
            </span>
          </span>
        }
        actions={
          <>
            {c.level === "Warning" ? (
              <StatusBadge variant="neutral" dot={false} className="font-bold border-dashed h-6">
                Warning Letter
              </StatusBadge>
            ) : (
              <CAPLevelBadge level={c.level} />
            )}
            <CAPStatusBadge status={c.status} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label={c.level === "Warning" ? "Action Type" : "CAP Level"}
          value={c.level === "Warning" ? "Warning Letter" : c.level}
          hint={c.level === "CAP 3" ? "HR-managed" : c.level === "Warning" ? "Valid 30 days" : "Valid 90 days"}
          icon={ShieldAlert}
          tone={c.level === "CAP 3" ? "danger" : c.level === "CAP 2" ? "primary" : "warning"}
        />
        <StatCard label="Raised Date" value={c.raisedAt} hint={`By ${c.raisedByTeam}`} />
        <StatCard
          label="Breach Month"
          value={
            c.auditMonth
              ? new Date(c.auditMonth + "-01").toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : "April 2026"
          }
          hint="Audit reference month"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Breach details">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Breach Category / Type
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">{c.breachType}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Breach Month
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {c.auditMonth
                    ? new Date(c.auditMonth + "-01").toLocaleString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "April 2026"}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Type of Action
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground capitalize">
                  {c.level === "Warning" ? "Warning Letter" : c.level}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Supporting Documents
                </div>
                <div className="mt-1 text-sm">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Downloading evidence documents...");
                    }}
                    className="text-primary font-semibold hover:underline flex items-center gap-1"
                  >
                    📎 QA_Compliance_Evidence_{c.id}.pdf (Download)
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </div>
              <p className="mt-1 text-sm leading-relaxed text-foreground bg-secondary/30 p-3 rounded-xl border border-border">
                {c.breachDescription || "No detailed description provided for this breach."}
              </p>
            </div>

              {/* New Comment Field & Action Buttons */}
              {!state.selectedAction && c.status === "logged" && (
                <div className="mt-6 border-t border-border pt-4 space-y-4">
                  {c.disputeRejected && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-destructive mb-1">
                        <XCircle className="h-4 w-4" /> Previous Dispute Rejected
                      </div>
                      <div className="text-xs text-destructive/90"><strong>QA/Compliance Notes:</strong> {c.qaComment}</div>
                    </div>
                  )}
                  {c.exceptionRejected && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/20 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-destructive mb-1">
                        <XCircle className="h-4 w-4" /> Previous Exception Request Rejected
                      </div>
                      <div className="text-xs text-destructive/90"><strong>Manager Notes:</strong> {c.managerComment}</div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Supervisor Feedback Comment / Review Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide comments on the breach review here…"
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 rounded-xl px-5"
                      onClick={() => updateState({ selectedAction: "accept" })}
                    >
                      <Check className="h-4 w-4" /> Accept
                    </Button>
                    {!c.disputeRejected && !c.exceptionRejected && (
                      <>
                        <Button
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive/10 font-semibold flex items-center gap-1.5 rounded-xl px-5"
                          onClick={() => updateState({ selectedAction: "dispute" })}
                        >
                          <X className="h-4 w-4" /> Dispute
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-amber-500 hover:bg-amber-500/10 font-semibold flex items-center gap-1.5 rounded-xl px-5"
                          onClick={() => updateState({ selectedAction: "exception" })}
                        >
                          <ShieldAlert className="h-4 w-4" /> Raise Exception
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
          </SectionCard>

            {/* FLOW 1: ACCEPTED ACTIONS FLOW */}
            {(state.selectedAction === "accept" || (!state.selectedAction && c.status === "accepted")) && c.status !== "closed" && (
              <div className="space-y-6 border-l-2 border-emerald-500 pl-4 mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-emerald-600">Accepted Actions Flow</h4>
                  {c.status === "logged" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateState({ selectedAction: null })}
                    >
                      Change Action
                    </Button>
                  )}
                </div>

                {/* Discussion Card */}
                <SectionCard title="Discussion Card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-bold">
                        Discussion Status:
                      </span>
                      {state.isDiscussionClosed ? (
                        <StatusBadge variant="success">Discussion Closed</StatusBadge>
                      ) : (
                        <StatusBadge variant="warning">Discussion Pending</StatusBadge>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">
                        Discussion Notes / Comment Box
                      </label>
                    {state.isDiscussionClosed ? (
                      <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 text-sm text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
                        {state.discussionComments}
                      </div>
                    ) : (
                      <textarea
                        rows={3}
                        value={state.discussionComments}
                        onChange={(e) =>
                          updateState({ discussionComments: e.target.value })
                        }
                        placeholder="Detail the discussion points with the guide…"
                        className="w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground dark:bg-zinc-900 focus:outline-none focus:border-ring"
                      />
                    )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 items-end">
                      <label className="block space-y-1.5">
                        <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" /> Discussion Closed Date
                        </span>
                      {state.isDiscussionClosed ? (
                        <div className="w-full rounded-xl border border-border bg-secondary/50 p-2.5 text-sm font-medium text-foreground">
                          {state.discussionDate || (state.discussionClosedAt ? new Date(state.discussionClosedAt).toISOString().slice(0, 10) : "2026-05-16")}
                        </div>
                      ) : (
                        <input
                          type="date"
                          value={state.discussionDate}
                          onChange={(e) =>
                            updateState({ discussionDate: e.target.value })
                          }
                          className="w-full rounded-xl border border-input bg-background p-2.5 text-sm text-foreground dark:bg-zinc-900 focus:outline-none focus:border-ring"
                        />
                      )}
                      </label>

                    {!state.isDiscussionClosed && (
                      <Button
                        onClick={() => {
                          if (!state.discussionDate) {
                            alert("Please choose a discussion closed date.");
                            return;
                          }
                          updateState({
                            isDiscussionClosed: true,
                            discussionClosedAt: new Date(state.discussionDate).toLocaleDateString(),
                          });
                          c.status = "accepted";
                          forceUpdate();
                          alert(
                            "Discussion closed. CAP document generated and sent to guide to acknowledge."
                          );
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-[42px]"
                      >
                        Discussion Closed
                      </Button>
                    )}
                    </div>
                  </div>
                </SectionCard>

                {/* Attach Guide Acknowledge Email Card */}
                {state.isDiscussionClosed && (
                  <SectionCard title="Attach Guide Acknowledge Email">
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center bg-secondary/15 hover:bg-secondary/30 transition-colors">
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <div className="text-sm font-semibold text-foreground">
                          {state.uploadedAckFile
                            ? state.uploadedAckFile
                            : "Upload guide acknowledgment email"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          .eml, .pdf, .msg allowed formats
                        </div>

                        <input
                          type="file"
                          accept=".eml,.pdf,.msg"
                          id={`ack-upload-${c.id}`}
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              updateState({ uploadedAckFile: file.name });
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById(`ack-upload-${c.id}`)?.click()}
                        >
                          Choose File
                        </Button>
                      </div>

                      <Button
                        onClick={() => {
                          if (!state.uploadedAckFile) {
                            alert("Please upload the acknowledgment file first.");
                            return;
                          }
                          c.status = "closed";
                          c.history.push({
                            date: new Date().toLocaleDateString(),
                            event: "Discussion Closed & Acknowledged",
                            actor: "Supervisor Priya Shah",
                          });

                          updateState({
                            isFlowCompleted: true,
                          });
                          forceUpdate();
                          alert(
                            "CAP details saved and submitted successfully. Case is now closed!"
                          );
                        }}
                        disabled={c.status === "closed"}
                        className="w-full bg-primary text-primary-foreground font-semibold"
                      >
                        Save & Submit
                      </Button>
                    </div>
                  </SectionCard>
                )}
              </div>
            )}

            {/* FLOW 2: DISPUTED ACTIONS FLOW */}
            {(state.selectedAction === "dispute" || (!state.selectedAction && c.status === "disputed")) && c.status !== "closed" && (
              <div className="space-y-6 border-l-2 border-destructive pl-4 mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-destructive">Disputed Actions Flow</h4>
                  {!state.isDisputeSubmitted && c.status === "logged" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateState({ selectedAction: null })}
                    >
                      Change Action
                    </Button>
                  )}
                </div>

                <SectionCard title="Dispute Raised Card">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">
                        Dispute Comments / Justification
                      </label>
                      {state.isDisputeSubmitted ? (
                        <div className="w-full rounded-xl border border-red-500/20 bg-red-50/50 dark:bg-red-950/20 p-4 text-sm text-red-900 dark:text-red-100 font-medium leading-relaxed">
                          {state.disputeComments}
                        </div>
                      ) : (
                        <textarea
                          rows={3}
                          value={state.disputeComments}
                          onChange={(e) =>
                            updateState({ disputeComments: e.target.value })
                          }
                          placeholder="State the reason you are disputing this breach…"
                          className="w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground dark:bg-zinc-900 focus:outline-none focus:border-ring"
                        />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        Attachment Evidence Card
                      </span>
                      <div className="border-2 border-dashed border-border rounded-xl p-4 text-center bg-secondary/15">
                        <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                        <div className="text-sm font-semibold text-foreground">
                          {state.disputeFile
                            ? state.disputeFile
                            : "Upload dispute evidence document"}
                        </div>
                        {!state.isDisputeSubmitted && (
                          <>
                            <input
                              type="file"
                              id={`dispute-upload-${c.id}`}
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  updateState({ disputeFile: file.name });
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-3"
                              onClick={() =>
                                document.getElementById(`dispute-upload-${c.id}`)?.click()
                              }
                            >
                              Upload Evidence
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {!state.isDisputeSubmitted && (
                      <Button
                        className="w-full bg-destructive text-white font-semibold hover:bg-destructive/90"
                        onClick={() => {
                          if (!state.disputeComments.trim()) {
                            alert("Please enter dispute comments.");
                            return;
                          }
                          c.status = "disputed";
                          c.history.push({
                            date: new Date().toLocaleDateString(),
                            event: "Dispute Raised by Supervisor",
                            actor: "Supervisor Priya Shah",
                          });

                          updateState({
                            isDisputeSubmitted: true,
                          });
                          forceUpdate();
                          alert(
                            "Dispute submitted successfully! Sent to QA/Compliance for review. CAP status moved to Disputed."
                          );
                        }}
                      >
                        Submit Dispute
                      </Button>
                    )}
                  </div>
                </SectionCard>

                {(state.isDisputeSubmitted || c.status === "disputed") && (
                  <SectionCard title="Dispute Status">
                    <div className="bg-warning/10 border border-warning/20 p-4 rounded-xl">
                      <div className="text-warning font-bold text-sm mb-2">Awaiting QA/Compliance Review</div>
                      <p className="text-xs text-muted-foreground">Your dispute has been submitted and is pending review by the QA/Compliance team. You will be notified once a decision is made.</p>
                    </div>
                  </SectionCard>
                )}
              </div>
            )}

            {/* FLOW 3: EXCEPTION ACTIONS FLOW */}
            {(state.selectedAction === "exception" || (!state.selectedAction && c.status === "exception-pending")) && c.status !== "closed" && (
              <div className="space-y-6 border-l-2 border-amber-500 pl-4 mt-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-500">Exception Actions Flow</h4>
                  {!state.isExceptionSubmitted && c.status === "logged" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateState({ selectedAction: null })}
                    >
                      Change Action
                    </Button>
                  )}
                </div>

                <SectionCard title="Exception Raise Card">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase">
                        Exception Comment / Justification
                      </label>
                      {state.isExceptionSubmitted ? (
                        <div className="w-full rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/20 p-4 text-sm text-amber-900 dark:text-amber-100 font-medium leading-relaxed">
                          {state.exceptionComments}
                        </div>
                      ) : (
                        <textarea
                          rows={3}
                          value={state.exceptionComments}
                          onChange={(e) =>
                            updateState({ exceptionComments: e.target.value })
                          }
                          placeholder="Provide justification why exception is needed…"
                          className="w-full rounded-xl border border-input bg-background p-3 text-sm text-foreground dark:bg-zinc-900 focus:outline-none focus:border-ring"
                        />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-muted-foreground uppercase">
                        Attachment Evidence Card
                      </span>
                      <div className="border-2 border-dashed border-border rounded-xl p-4 text-center bg-secondary/15">
                        <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                        <div className="text-sm font-semibold text-foreground">
                          {state.exceptionFile
                            ? state.exceptionFile
                            : "Upload exception evidence document"}
                        </div>
                        {!state.isExceptionSubmitted && (
                          <>
                            <input
                              type="file"
                              id={`exception-upload-${c.id}`}
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  updateState({ exceptionFile: file.name });
                                }
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-3"
                              onClick={() =>
                                document.getElementById(`exception-upload-${c.id}`)?.click()
                              }
                            >
                              Upload Evidence
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {!state.isExceptionSubmitted && (
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                        onClick={() => {
                          if (!state.exceptionComments.trim()) {
                            alert("Please enter exception justification.");
                            return;
                          }
                          c.status = "exception-pending";
                          c.history.push({
                            date: new Date().toLocaleDateString(),
                            event: "Exception Raised by Supervisor",
                            actor: "Supervisor Priya Shah",
                          });

                          updateState({
                            isExceptionSubmitted: true,
                          });
                          forceUpdate();
                          alert("Exception Raised successfully! Pending Manager Approval.");
                        }}
                      >
                        Submit Exception Request
                      </Button>
                    )}
                  </div>
                </SectionCard>

                {(state.isExceptionSubmitted || c.status === "exception-pending") && (
                  <SectionCard title="Exception Status">
                    <div className="bg-info/10 border border-info/20 p-4 rounded-xl">
                      <div className="text-info font-bold text-sm mb-2">Awaiting Manager Approval</div>
                      <p className="text-xs text-muted-foreground">Your exception request has been submitted and is pending review by the Manager. You will be notified once a decision is made.</p>
                    </div>
                  </SectionCard>
                )}
              </div>
            )}

            {/* FLOW COMPLETED / CLOSED DISPLAY CARD */}
            {c.status === "closed" && (
              <div className="mt-8 space-y-6">
                <div className="mb-6 rounded-xl border border-success/30 bg-success/10 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <div className="text-sm font-semibold text-success">
                      All required workflows and approvals for this case have been finalized.
                    </div>
                  </div>
                </div>

                {c.exceptionApproved ? (
                  <div className="space-y-6 border-l-2 border-emerald-500 pl-4">
                    <h4 className="text-sm font-bold text-emerald-600">Exception Actions Flow (Completed)</h4>
                    <SectionCard title="Exception Raise Card">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Exception Comment / Justification</label>
                        <div className="w-full rounded-xl border border-border bg-secondary/30 p-4 text-sm font-medium leading-relaxed text-foreground">
                          {state.exceptionComments || c.supervisorComment || "Internet outage verification."}
                        </div>
                      </div>
                    </SectionCard>
                    <SectionCard title="Exception Approvals">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Manager Review</div>
                          <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.managerComment || "Approved"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">QA/Compliance Review</div>
                          <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.qaComment || "Approved"}</div>
                        </div>
                      </div>
                    </SectionCard>
                    <SectionCard title="CAP Actions Successfully Completed">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Justification</div>
                          <div className="mt-1 text-sm font-medium text-foreground">{state.exceptionComments || c.supervisorComment || "Internet outage verification."}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Manager Review</div>
                          <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.managerComment || "Approved"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">QA/Compliance Review</div>
                          <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.qaComment || "Approved"}</div>
                        </div>
                        <div className="md:col-span-2 border-t border-border pt-4">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Outcome</div>
                          <div className="mt-1 text-sm font-bold text-foreground">Exception Approved - Closed</div>
                        </div>
                      </div>
                    </SectionCard>
                  </div>
                ) : c.disputeAccepted ? (
                  <div className="space-y-6 border-l-2 border-emerald-500 pl-4">
                    <h4 className="text-sm font-bold text-emerald-600">Disputed Actions Flow (Completed)</h4>
                    <SectionCard title="Dispute Raised Card">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase">Dispute Comments / Justification</label>
                        <div className="w-full rounded-xl border border-border bg-secondary/30 p-4 text-sm font-medium leading-relaxed text-foreground">
                          {state.disputeComments || c.supervisorComment || "Valid context provided."}
                        </div>
                      </div>
                    </SectionCard>
                    <SectionCard title="QA/Compliance Review">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Review Outcome</div>
                        <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.qaComment || "Dispute accepted, breach overturned."}</div>
                      </div>
                    </SectionCard>
                    <SectionCard title="CAP Actions Successfully Completed">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Justification</div>
                          <div className="mt-1 text-sm font-medium text-foreground">{state.disputeComments || c.supervisorComment || "Valid context provided."}</div>
                        </div>
                        <div className="md:col-span-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">QA/Compliance Review</div>
                          <div className="mt-1 text-sm font-semibold text-success flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> {c.qaComment || "Dispute accepted, breach overturned."}</div>
                        </div>
                        <div className="md:col-span-2 border-t border-border pt-4">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Outcome</div>
                          <div className="mt-1 text-sm font-bold text-foreground">Dispute Accepted - Closed</div>
                        </div>
                      </div>
                    </SectionCard>
                  </div>
                ) : (
                  <div className="space-y-6 border-l-2 border-emerald-500 pl-4">
                    <h4 className="text-sm font-bold text-emerald-600">Accepted Actions Flow (Completed)</h4>
                    <SectionCard title="Discussion Card">
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-muted-foreground uppercase">Discussion Notes / Comment Box</label>
                          <div className="w-full rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 text-sm font-medium leading-relaxed text-emerald-950 dark:text-emerald-100">
                            {state.discussionComments || c.discussionComments || "Discussion completed offline."}
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 items-end">
                          <label className="block space-y-1.5">
                            <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" /> Discussion Closed Date
                            </span>
                            <div className="w-full rounded-xl border border-border bg-secondary/50 p-2.5 text-sm font-medium text-foreground">
                              {state.discussionDate || c.discussionDate || "2026-05-04"}
                            </div>
                          </label>
                        </div>
                      </div>
                    </SectionCard>
                    <SectionCard title="Attach Guide Acknowledge Email">
                      <div className="border-2 border-dashed border-emerald-500/30 rounded-xl p-6 text-center bg-emerald-50/30 dark:bg-emerald-950/10">
                        <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" /> {state.uploadedAckFile || c.acknowledgmentEmail || "ack_email.eml"}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Successfully attached on {state.discussionClosedAt || c.acknowledgedAt || new Date().toLocaleDateString()}
                        </div>
                      </div>
                    </SectionCard>
                    <SectionCard title="CAP Actions Successfully Completed">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Discussion Notes</div>
                          <div className="mt-1 text-sm font-medium text-foreground">{state.discussionComments || c.discussionComments || "Discussion completed offline."}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Acknowledgment Email</div>
                          <div className="mt-1 text-sm font-mono text-muted-foreground">{state.uploadedAckFile || c.acknowledgmentEmail || "ack_email.eml"}</div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Completed On</div>
                          <div className="mt-1 text-sm font-medium text-foreground">{state.discussionClosedAt || c.acknowledgedAt || new Date().toLocaleDateString()}</div>
                        </div>
                        <div className="md:col-span-2 border-t border-border pt-4">
                          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Outcome</div>
                          <div className="mt-1 text-sm font-bold text-foreground">CAP Accepted & Acknowledged - Closed</div>
                        </div>
                      </div>
                    </SectionCard>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <SectionCard title="Activity & history">
              <ol className="relative space-y-4 border-l-2 border-border pl-5">
                {state.isDiscussionClosed && !c.history.some((h) => h.event.toLowerCase().includes("discussion closed")) && (
                  <li className="relative">
                    <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-foreground">
                        Discussion Closed with Guide
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {state.discussionClosedAt} · <span className="font-medium text-foreground">Supervisor Priya Shah</span>
                      </div>
                    </div>
                  </li>
                )}
                {state.isDisputeSubmitted && !c.history.some((h) => h.event.toLowerCase().includes("dispute raised")) && (
                  <li className="relative">
                    <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-destructive" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-foreground">
                        Dispute Raised by Supervisor
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {c.raisedAt} · <span className="font-medium text-foreground">Supervisor {c.employee.supervisor}</span>
                      </div>
                    </div>
                  </li>
                )}
                {state.isExceptionSubmitted && !c.history.some((h) => h.event.toLowerCase().includes("exception raised")) && (
                  <li className="relative">
                    <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-500" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-foreground">
                        Exception Raised by Supervisor
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {c.raisedAt} · <span className="font-medium text-foreground">Supervisor {c.employee.supervisor}</span>
                      </div>
                    </div>
                  </li>
                )}
                {[...c.history].reverse().map((h, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[23px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-foreground">{h.event}</div>
                      <div className="text-xs text-muted-foreground">
                        {h.date} · <span className="font-medium text-foreground">{h.actor}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionCard>

          <SectionCard title="CAP letter">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">CAP_{c.id}.docx</div>
                  <div className="text-xs text-muted-foreground">
                    {c.employee.type === "apprentice" ? "Apprentice template" : "Regular template"}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="mr-1 h-3.5 w-3.5" /> Download
                </Button>
                <Button size="sm" className="flex-1">
                  <Mail className="mr-1 h-3.5 w-3.5" /> Send to agent
                </Button>
              </div>
            </div>
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
