import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { findEmployee, getCAPHistoryForEmployee, recommendCAPLevel, type Employee, type CAPLevel } from "@/lib/mock-data";
import { Search, Upload, AlertTriangle, ShieldAlert, Send } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/cap/new")({
  head: () => ({
    meta: [
      { title: "Log new breach — CAP" },
      { name: "description", content: "QA & Compliance form to log a breach. The system recommends CAP level using past warnings." },
    ],
  }),
  component: NewCAP,
});

const breachTypesQA = [
  "Quality — Documentation",
  "Quality — Process Adherence",
  "Quality — Customer Handling",
  "Data Handling",
];
const breachTypesCompliance = [
  "Compliance — Process Deviation",
  "Compliance — Disclosure",
  "Compliance — Regulatory",
  "Repeat Misconduct",
];

function NewCAP() {
  const [team, setTeam] = useState<"QA" | "Compliance">("QA");
  const [ohrId, setOhrId] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [lookupErr, setLookupErr] = useState<string>("");
  const [breachType, setBreachType] = useState("");
  const [description, setDescription] = useState("");
  const [recommended, setRecommended] = useState<CAPLevel | null>(null);
  const [chosen, setChosen] = useState<CAPLevel | null>(null);
  const [files, setFiles] = useState<string[]>([]);

  const types = team === "QA" ? breachTypesQA : breachTypesCompliance;

  const history = useMemo(() => (employee ? getCAPHistoryForEmployee(employee.ohrId) : []), [employee]);
  const activeCount = history.filter((c) => c.status !== "closed" && c.status !== "hr-escalation").length;

  function lookup() {
    setLookupErr("");
    const found = findEmployee(ohrId.trim());
    if (!found) {
      setEmployee(null);
      setLookupErr("No employee found for that OHR ID.");
      return;
    }
    setEmployee(found);
  }

  function compute() {
    if (!employee || !breachType) return;
    setRecommended(recommendCAPLevel(employee.ohrId, breachType));
  }

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="Log new breach"
        description="Choose your team, look up the employee, describe the breach. The system recommends a CAP level."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="1 · Submitter team">
            <div className="grid gap-3 md:grid-cols-2">
              {(["QA", "Compliance"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTeam(t)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    team === t ? "border-primary bg-primary-soft/40 shadow-soft" : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{t} Team</div>
                    {team === t && <StatusBadge variant="primary">Selected</StatusBadge>}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t === "QA" ? "Quality audit findings, documentation issues." : "Regulatory, disclosure & process deviations."}
                  </p>
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="2 · Employee lookup" description="Enter OHR ID to fetch details and breach history.">
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
              <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {employee.ohrId} · {employee.team} · {employee.type === "apprentice" ? "Apprentice" : "Regular"} · Supervisor {employee.supervisor}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge variant={activeCount > 0 ? "warning" : "neutral"}>
                      {activeCount} active CAP{activeCount !== 1 ? "s" : ""}
                    </StatusBadge>
                    <StatusBadge variant="neutral">{history.length} total</StatusBadge>
                  </div>
                </div>
                {history.length > 0 && (
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Past warnings & breaches</div>
                    <ul className="mt-2 space-y-1.5">
                      {history.map((h) => (
                        <li key={h.id} className="flex items-center justify-between text-xs">
                          <span>
                            <span className="font-mono">{h.id}</span> — {h.breachType}
                          </span>
                          <span className="flex items-center gap-2">
                            <CAPLevelBadge level={h.level} />
                            <CAPStatusBadge status={h.status} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </SectionCard>

          <SectionCard title="3 · Breach details">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Breach type</span>
                <select
                  value={breachType}
                  onChange={(e) => { setBreachType(e.target.value); setRecommended(null); }}
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
                >
                  <option value="">Select…</option>
                  {types.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date of breach</span>
                <input type="date" className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</span>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the breach, evidence collected, and observed impact…"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring"
              />
            </label>

            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Supporting documents</span>
              <button
                type="button"
                onClick={() => setFiles([...files, `evidence-${files.length + 1}.pdf`])}
                className="mt-1.5 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 py-6 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
              >
                <Upload className="h-4 w-4" /> Click to upload (mock)
              </button>
              {files.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs">
                  {files.map((f) => <li key={f} className="rounded-md bg-secondary/60 px-2 py-1 font-mono">📎 {f}</li>)}
                </ul>
              )}
            </div>
          </SectionCard>

          <SectionCard title="4 · CAP level recommendation">
            <Button onClick={compute} disabled={!employee || !breachType} variant="outline">
              <ShieldAlert className="mr-2 h-4 w-4" /> Compute recommendation
            </Button>

            {recommended && (
              <div className="mt-4 rounded-2xl border border-primary/30 bg-primary-soft/40 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">System recommends</div>
                <div className="mt-2 flex items-center gap-3">
                  <CAPLevelBadge level={recommended} />
                  <span className="text-sm text-muted-foreground">
                    {recommended === "CAP 1" && "First-time / minor — Warning. Valid 90 days."}
                    {recommended === "CAP 2" && "Repeat — Strong warning. Valid 90 days."}
                    {recommended === "CAP 3" && "Serious / repeated — HR escalation."}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Override (with justification)</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["CAP 1", "CAP 2", "CAP 3"] as CAPLevel[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setChosen(l)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          (chosen ?? recommended) === l ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="On submission">
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> CAP letter generated using {employee?.type === "apprentice" ? "apprentice" : "regular"} template</li>
              <li className="flex gap-2"><Send className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Email sent to supervisor; CC managers + you</li>
              <li className="flex gap-2"><Send className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Supervisor can accept or dispute (max 2 disputes)</li>
              <li className="flex gap-2"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Agent receives letter for acknowledgement</li>
            </ul>
          </SectionCard>

          <Button className="w-full" size="lg" disabled={!employee || !breachType || !description}>
            Submit CAP
          </Button>
          <Button variant="outline" className="w-full" asChild><Link to="/cap">Cancel</Link></Button>
        </aside>
      </div>
    </div>
  );
}
