import { Link } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { Check, X, ShieldAlert, Upload, FileText, Download, MessageSquare, Briefcase, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Disputes() {
  const [activeTab, setActiveTab] = useState("disputes");
  const [processedIds, setProcessedIds] = useState({}); // { id: 'accepted' | 'rejected' }

  // Extended dummy data for better demonstration as requested
  const allCases = capCases; // Now using the consolidated capCases from mock-data.js
  const disputes = allCases.filter((c) => c.status === "disputed" || c.status === "rejected");
  const exceptions = allCases.filter((c) => c.status === "exception-pending");

  const list = activeTab === "disputes" ? disputes : exceptions;

  const handleAction = (id, action) => {
    setProcessedIds(prev => ({ ...prev, [id]: action }));
  };

  return (
    <div>
      <PageHeader
        eyebrow="QA / Compliance"
        title="Breach Management"
        description="Review supervisor responses, documents, and resolution notes for disputes and exceptions."
      />

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Active Disputes" value={disputes.length} icon={Users} tone="warning" />
        <StatCard label="Pending Exceptions" value={exceptions.length} icon={Briefcase} tone="info" />
      </div>

      <div className="mb-6 flex items-center gap-1 rounded-2xl bg-secondary/50 p-1 w-fit border border-border">
        <button
          onClick={() => setActiveTab("disputes")}
          className={cn(
            "rounded-xl px-6 py-2 text-sm font-medium transition-all",
            activeTab === "disputes" ? "bg-background shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Disputes
        </button>
        <button
          onClick={() => setActiveTab("exceptions")}
          className={cn(
            "rounded-xl px-6 py-2 text-sm font-medium transition-all",
            activeTab === "exceptions" ? "bg-background shadow-soft text-primary" : "text-muted-foreground hover:text-foreground"
          )}
        >
          Exceptions
        </button>
      </div>

      {list.length === 0 ? (
        <SectionCard>
          <p className="text-sm text-muted-foreground">No active {activeTab} to review.</p>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          {list.map((c) => {
            const isProcessed = processedIds[c.id];
            
            return (
              <SectionCard
                key={c.id}
                title={`${c.employee.name} — ${c.id}`}
                description={`${c.breachType} · raised by ${c.raisedBy}`}
                actions={
                  <div className="flex items-center gap-2">
                    {c.level === "Warning" ? (
                      <StatusBadge variant="neutral" dot={false} className="font-bold border-dashed text-[10px] h-5">
                        Warning Letter
                      </StatusBadge>
                    ) : (
                      <CAPLevelBadge level={c.level} />
                    )}
                    {isProcessed ? (
                      <StatusBadge variant={isProcessed === 'accepted' ? 'success' : 'danger'}>
                        {activeTab === 'disputes' 
                          ? (isProcessed === 'accepted' ? 'Dispute Accepted & Closed' : 'Dispute Rejected') 
                          : (isProcessed === 'accepted' ? 'Exception Approved & Closed' : 'Rejected')}
                      </StatusBadge>
                    ) : (
                      activeTab === 'disputes' ? (
                        <StatusBadge variant="warning">Attempt {c.disputeAttempts} / 2</StatusBadge>
                      ) : (
                        <StatusBadge variant={c.status === 'exception-rejected' ? 'danger' : 'info'}>
                          {c.status === 'exception-rejected' ? 'Rejected by Manager' : 'Exception Pending'}
                        </StatusBadge>
                      )
                    )}
                  </div>
                }
              >
                <div className="flex flex-col gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                        <MessageSquare className="h-3 w-3" /> Supervisor response
                      </div>
                      <p className="rounded-xl bg-secondary/40 p-4 text-sm leading-relaxed border border-border/50 shadow-inner">
                        {c.supervisorComment || "Disagree with framing — context: peak workload + system outage at the time. Requesting reduced level."}
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                        <FileText className="h-3 w-3" /> Supporting documents
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(c.documents || ["dispute_evidence_01.pdf"]).map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:border-primary/40 transition-colors cursor-pointer group">
                            <FileText className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
                            <span>{doc}</span>
                            <Download className="h-3 w-3 ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exception Approval Status - Visible for Exceptions */}
                    {(activeTab === 'exceptions' && c.status === 'exception-pending') && (
                      <div className="mt-2 border-t border-border pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                          <ShieldAlert className="h-3 w-3" /> Exception Approval Status
                        </div>
                        <p className="rounded-xl bg-info/5 p-4 text-sm leading-relaxed border border-info/20 text-info font-medium italic">
                          This exception request is currently awaiting approval from <span className="font-semibold">{c.exceptionApprover}</span>.
                          Once reviewed, the manager/SDL will either approve or reject the request, and their comments will be visible here.
                        </p>
                      </div>
                    )}


                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                      {activeTab === 'disputes' ? 'Discussion notes' : 'QA/Compliance notes'}
                    </div>
                    <textarea
                      rows={3}
                        disabled={!!isProcessed}
                      placeholder={activeTab === 'disputes' ? "Log outcome of offline discussion…" : "Internal notes for exception monitoring…"}
                      className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
                    />
                  </div>

                  {/* Manager Rejection Comments - Visible for Exceptions */}
                  {(activeTab === 'exceptions' && (isProcessed === 'rejected' || c.status === 'exception-rejected')) && (
                    <div className="mt-2 border-t border-border pt-4">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-destructive flex items-center gap-1.5 mb-2">
                        <MessageSquare className="h-3 w-3" /> Manager / SDL Rejection Comments
                      </div>
                      <p className="rounded-xl bg-destructive/5 p-4 text-sm leading-relaxed border border-destructive/20 text-destructive font-medium italic">
                        {c.managerComment || "Rejection: The justification provided does not meet the criteria for a policy exception. Agent must adhere to the standard documentation process regardless of volume."}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {!isProcessed ? (
                      <div className="flex flex-row items-center gap-3 pt-4 border-t border-border">
                         <Button 
                           variant="secondary" 
                           size="sm" 
                           className={cn("text-xs border border-border shadow-sm hover:bg-secondary/80", activeTab === 'exceptions' ? "w-full" : "shrink-0")} 
                           asChild
                         >
                            <Link to={`/cap/cases/${c.id}`}>
                              View full case details
                            </Link>
                         </Button>

                         {activeTab === 'disputes' && (
                           <>
                             <Button 
                               className="flex-1 shadow-glow" 
                               onClick={() => handleAction(c.id, 'accepted')}
                             >
                               <Check className="mr-2 h-4 w-4" /> Accept dispute
                             </Button>
                             <Button 
                               variant="secondary" 
                               className="flex-1" 
                               onClick={() => handleAction(c.id, 'rejected')}
                             >
                               <X className="mr-2 h-4 w-4" /> Reject dispute
                             </Button>
                           </>
                         )}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-2 bg-secondary/10">
                        <div className={cn(
                          "mx-auto flex h-10 w-10 items-center justify-center rounded-full",
                          isProcessed === 'accepted' ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                        )}>
                          {isProcessed === 'accepted' ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                        </div>
                        <p className="text-sm font-semibold">Case {isProcessed === 'accepted' ? 'Approved' : 'Rejected'}</p>
                        <p className="text-xs text-muted-foreground">The case has been marked as closed in the audit log.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              </SectionCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
