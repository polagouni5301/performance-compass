import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { findEmployee, getCAPHistoryForEmployee, recommendCAPLevel } from "@/lib/mock-data";
import { Search, Upload, ShieldAlert, History, ChevronDown } from "lucide-react";
import { useMemo, useState, useRef, useEffect } from "react";

const breachTypesQA = [
  "HIGH-Legal/Procedural -Standard MGR codes not used",
  "HIGH-Legal/Procedural -Did not used Promo code from the Sales tab in CRM",
  "HIGH-Legal/Procedural -Third Party Code used",
  "HIGH-Legal/Procedural -Refund policy not adhered - Incorrect refund duration",
  "HIGH-Legal/Procedural -Refund policy not adhered - Excess/Less amount refunded",
  "HIGH-Legal/Procedural - Refund not applicable however processed",
  "HIGH-Legal/Procedural -Agent did not qualify the customer using article number 5630",
  "HIGH-Legal/Procedural -Did not reach out to PHS requesting for approval",
  "HIGH-Legal/Procedural -PHS did not notate the acount",
  "HIGH-Legal/Procedural - Deactivate payment methods",
  "HIGH-Legal/Procedural - Process an order without the customers permission.",
  "HIGH-Legal/Procedural - Cancel refund and repurchase a product that is eligible for a credit move",
  "HIGH-Legal/Procedural - Incorrect disposition",
  "HIGH-Legal/Procedural - Agent did not adhere to 9PM/AM barrier(Called the customer post 9PM).",
  "HIGH-Legal/Procedural - unauthorized access such as processing payments from customers account taking the 3/4-digit CVV number/ATM Pin/OTP of the customer.",
  "HIGH-Legal/Procedural - Agent informed the customer to change the currency/Address in the account to avoid service tax.",
  "HIGH-Legal/Procedural - Agent did not validate the account however resolution was provided.",
  "HIGH-Legal/Procedural -Any Personal Calls through CISCO/Login to phone controls/WEBCRM with other's ID's.",
  "LOW-Legal/Procedural - Product Cancelation Disclosure: read full disclaimer/confirm products being canceled/obtain permission.",
  "LOW-Legal/Procedural - Call Disclosure - Outbound or new person joining the call must be informed the call may be Recorded and Retained for Quality and Training purposes",
  "LOW-Legal/Procedural - Legal Agreements - Accept any legal agreement through purchase/product setup/etc. without notifying the customer that you are accepting the agreement on their behalf",
  "LOW-Legal/Procedural - Auto Renewal Disclosure was not read when new products were purchased",
  "LOW-Legal/Procedural - Change domain contact (WHOIS) information",
  "LOW-Legal/Procedural - Initiate or accept a Change of Account for a domain name",
];

const breachTypesCompliance = [
  "Call Disconnections",
  "Long Holds",
  "Disc Coupon Usage",
  "Email Audits",
  "Misc Fee Usage",
  "Refunds",
  "Calls NPS",
  "RONA",
  "Chat NPS",
  "No Dials",
  "NULL Cases",
  "Repeat Dials",
  "Zero Cart",
  "Receipt Moves",
];

export default function NewCAP() {
  const [team, setTeam] = useState("QA");
  const [ohrId, setOhrId] = useState("");
  const [employee, setEmployee] = useState(null);
  const [lookupErr, setLookupErr] = useState("");
  const [breachType, setBreachType] = useState("");
  const [description, setDescription] = useState("");
  const [recommended, setRecommended] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [actionType, setActionType] = useState("");
  const [files, setFiles] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const types = team === "QA" ? breachTypesQA : breachTypesCompliance;

  const history = useMemo(() => {
    if (!employee) return [];
    return getCAPHistoryForEmployee(employee.ohrId);
  }, [employee]);

  const activeCount = history.filter(
    (c) => c.status !== "closed" && c.status !== "hr-escalation",
  ).length;

  const formatMonthYear = (dateStr) => {
    if (!dateStr) return "N/A";
    const normalized = dateStr.length === 7 ? `${dateStr}-01` : dateStr;
    const d = new Date(normalized);
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${month} ${d.getFullYear()}`;
  };

  function lookup() {
    setLookupErr("");
    const found = findEmployee(ohrId.trim());
    if (!found) {
      setEmployee(null);
      setLookupErr("No employee found for that OHR ID.");
      return;
    }
    setEmployee(found);
    setRecommended(null);
    setActionType("");
  }

  const recommendation = useMemo(() => {
    if (!employee || !breachType) return null;
    const sameBreachHistory = history.filter((h) => h.breachType === breachType);
    const latest = sameBreachHistory[0];

    if (latest) {
      const nextLevelMap = {
        Warning: "CAP 1",
        "CAP 1": "CAP 2",
        "CAP 2": "CAP 3",
        "CAP 3": "HR Escalation",
      };
      return `Employee was previously issued ${latest.level} for this breach in ${formatMonthYear(latest.raisedAt)}. Based on history, we recommend moving to ${nextLevelMap[latest.level] || "CAP 1"}.`;
    }

    const isHigh = breachType.startsWith("HIGH");
    return isHigh
      ? "First-time High breach detected. Recommend CAP 1."
      : "First-time Low breach detected. Recommend Warning letter.";
  }, [employee, breachType, history]);

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="Log new breach"
        description="Choose your team, look up the employee, describe the breach. The system recommends a CAP level."
      />

      <div className="grid gap-6 ">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="1 · Submitter team">
            <div className="grid gap-3 md:grid-cols-2">
              {["QA", "Compliance"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTeam(t)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    team === t
                      ? "border-primary bg-primary-soft/40 shadow-soft"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{t} Team</div>
                    {team === t && <StatusBadge variant="primary">Selected</StatusBadge>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t === "QA"
                      ? "Quality audit findings, documentation issues."
                      : "Regulatory, disclosure & process deviations."}
                  </p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="2 · Employee lookup"
            description="Enter OHR ID to fetch details and breach history."
          >
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={ohrId}
                  onChange={(e) => setOhrId(e.target.value)}
                  placeholder="e.g. OHR-204871"
                  className="w-full rounded-xl border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-ring"
                />
              </div>
              <Button onClick={lookup}>Look up</Button>
            </div>
            {lookupErr && <p className="mt-2 text-xs text-destructive">{lookupErr}</p>}

            {employee && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                {/* Profile Header */}
                <div className="bg-secondary/30 px-6 py-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary shadow-lg shadow-primary/20 flex items-center justify-center text-primary-foreground text-xl font-bold">
                      {employee.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground leading-tight">
                        {employee.name}
                      </h4>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
                          <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                            OHR
                          </span>
                          <span className="font-mono font-medium text-foreground">
                            {employee.ohrId}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
                          <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                            Supervisor
                          </span>
                          <span className="font-medium text-foreground">{employee.supervisor}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
                          <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                            Manager
                          </span>
                          <span className="font-medium text-foreground">{employee.manager}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] transition-colors hover:bg-secondary">
                          <span className="font-bold text-muted-foreground uppercase tracking-wider text-[9px]">
                            Department
                          </span>
                          <span className="font-medium text-foreground">{employee.team}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breach History Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-2">
                      <History className="h-3.5 w-3.5" /> Last 5 breaches
                    </h5>
                  </div>

                  <div className="space-y-3">
                    {history.length === 0 ? (
                      <div className="text-sm text-muted-foreground italic p-8 rounded-2xl border-2 border-dashed border-border bg-secondary/5 text-center">
                        No previous breach history found for this record.
                      </div>
                    ) : (
                      history.slice(0, 5).map((h) => (
                        <div
                          key={h.id}
                          className="relative group overflow-hidden rounded-xl border border-border bg-card p-4 hover:border-primary/20 transition-all shadow-sm"
                        >
                          <div
                            className={`absolute inset-y-0 left-0 w-1 ${h.status === "closed" ? "bg-muted" : "bg-warning"} group-hover:bg-primary transition-colors`}
                          />
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="space-y-2.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-[10px] font-bold bg-secondary px-1.5 py-0.5 rounded border border-border">
                                  {h.id}
                                </span>
                                <h6 className="text-sm font-bold text-foreground leading-tight">
                                  {h.breachType}
                                </h6>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 px-2 py-0.5 text-[10px]">
                                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[8px]">
                                    Breach month
                                  </span>
                                  <span className="font-medium text-blue-900 dark:text-blue-100">
                                    {formatMonthYear(h.auditMonth)}
                                  </span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/20 px-2 py-0.5 text-[10px]">
                                  <span className="font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider text-[8px]">
                                    Issued date
                                  </span>
                                  <span className="font-medium text-purple-900 dark:text-purple-100">
                                    {h.raisedAt}
                                  </span>
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[10px]">
                                  <span className="font-bold text-muted-foreground uppercase tracking-wider text-[8px]">
                                    Status
                                  </span>
                                  <CAPStatusBadge status={h.status} />
                                </span>
                              </div>
                            </div>
                            <div className="shrink-0">
                              {h.level === "Warning" ? (
                                <StatusBadge
                                  variant="neutral"
                                  dot={false}
                                  className="font-bold border-dashed text-xs"
                                >
                                  Warning Letter
                                </StatusBadge>
                              ) : (
                                <CAPLevelBadge level={h.level} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </SectionCard>

          <SectionCard title="3 · Breach details">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="block" ref={dropdownRef}>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Breach type
                </span>
                <div className="relative mt-1.5">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex min-h-[42px] w-full items-center justify-between rounded-xl border border-input bg-background px-3 py-2 text-sm text-left outline-none focus:border-ring transition-all hover:bg-secondary/20"
                  >
                    <span
                      className={
                        breachType
                          ? "text-foreground whitespace-normal leading-snug py-1"
                          : "text-muted-foreground"
                      }
                    >
                      {breachType || "Select breach type…"}
                    </span>
                    <ChevronDown
                      className={`ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl animate-in fade-in zoom-in duration-200">
                      <div className="max-h-80 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-muted">
                        <div className="sticky top-0 z-10 bg-secondary px-3 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border">
                          {team === "QA" ? "Quality Team breaches" : "Compliance Audit Categories"}
                        </div>
                        {team === "QA" && (
                          <div className="px-3 py-1.5 text-[10px] font-bold text-primary/70 bg-primary-soft/10 border-b border-border/40">
                            Business Risk Identifiers - Legal / Procedural
                          </div>
                        )}
                        {types.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setBreachType(t);
                              setRecommended(null);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex w-full px-4 py-2.5 text-sm text-left hover:bg-secondary transition-colors whitespace-normal leading-snug border-b border-border/20 last:border-0 ${
                              breachType === t
                                ? "bg-primary-soft/40 text-primary font-semibold"
                                : "text-foreground/90"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Month of breach
                </span>
                <input
                  type="month"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Description
              </span>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the breach, evidence collected, and observed impact…"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
              />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Type of action
              </span>
              <select
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
              >
                <option value="">Select action…</option>
                <option value="warning">Warning</option>
                <option value="cap1">CAP 1</option>
                <option value="cap2">CAP 2</option>
                <option value="cap3">CAP 3</option>
              </select>
              {recommendation && (
                <div className="mt-3 rounded-lg bg-primary-soft/20 border border-primary/20 p-3 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <span className="font-bold text-primary">System Recommendation:</span>
                    <p className="text-muted-foreground mt-0.5">{recommendation}</p>
                  </div>
                </div>
              )}
            </label>

            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Supporting documents
              </span>
              <button
                type="button"
                onClick={() => setFiles([...files, `evidence-${files.length + 1}.pdf`])}
                className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 py-6 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                <Upload className="h-4 w-4" /> Click to upload (mock)
              </button>
              {files.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  {files.map((f) => (
                    <li key={f} className="rounded-md bg-secondary/60 px-2 py-1 font-mono">
                      📎 {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </SectionCard>
        </div>
        <Button className="w-full" size="lg" disabled={!employee || !breachType || !description}>
          Submit CAP
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/cap">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
