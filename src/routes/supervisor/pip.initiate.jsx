import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { FileText, Lock, Plus, Trash2, User } from "lucide-react";
import { useState } from "react";
import { employees } from "@/lib/mock-data";

const AVAILABLE_KPIS = ["QA score", "AHT", "New Conv%", "NRPC", "NAOS", "NPS"];

export default function Initiate() {
  const [selectedOhrId, setSelectedOhrId] = useState("OHR-204871");
  const [targets, setTargets] = useState([
    { kpiName: "QA score", target: "≥ 92%" },
    { kpiName: "AHT", target: "≤ 6:30" },
    { kpiName: "NRPC", target: "≤ 10%" },
  ]);
  const [selectedKpi, setSelectedKpi] = useState("QA score");
  const [targetValue, setTargetValue] = useState("");

  const selectedAgent = employees.find((e) => e.ohrId === selectedOhrId) || employees[0];

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title="PIP initiation & target setup"
        description="Set duration (locked at 60 days), define KPI-linked targets, and complete setup."
      />

      <div className="space-y-6">
        <SectionCard title="1 · Duration & basics">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" /> Agent
              </span>
              <select
                value={selectedOhrId}
                onChange={(e) => setSelectedOhrId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
              >
                {employees.map((emp) => (
                  <option key={emp.ohrId} value={emp.ohrId}>
                    {emp.name} — {emp.ohrId}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                Employee Type
              </span>
              <input
                value={
                  selectedAgent
                    ? selectedAgent.type.charAt(0).toUpperCase() + selectedAgent.type.slice(1)
                    : ""
                }
                disabled
                className="mt-1.5 w-full rounded-xl border border-input bg-secondary/60 px-3 py-2.5 text-sm font-semibold text-muted-foreground capitalize"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Lock className="h-3 w-3" /> Duration (locked)
              </span>
              <input
                value="60 days"
                disabled
                className="mt-1.5 w-full rounded-xl border border-input bg-secondary/60 px-3 py-2.5 text-sm font-semibold text-muted-foreground"
              />
            </label>
          </div>
        </SectionCard>

        <SectionCard title="2 · Targets (KPI-linked)">
          <div className="overflow-hidden rounded-xl border border-border bg-secondary/20 mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground bg-secondary/50">
                  <th className="py-2.5 px-4">KPI Name</th>
                  <th className="py-2.5 px-4">Target</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {targets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-6 text-center text-muted-foreground text-xs italic"
                    >
                      No targets added yet. Use the form below to add targets.
                    </td>
                  </tr>
                ) : (
                  targets.map((t, i) => (
                    <tr key={i} className="hover:bg-secondary/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-foreground">{t.kpiName}</td>
                      <td className="py-3 px-4 text-muted-foreground">{t.target}</td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setTargets(targets.filter((_, idx) => idx !== i))}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <label className="flex-1 w-full block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                KPI Name
              </span>
              <select
                value={selectedKpi}
                onChange={(e) => setSelectedKpi(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
              >
                {AVAILABLE_KPIS.map((kpi) => (
                  <option key={kpi} value={kpi}>
                    {kpi}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex-1 w-full block">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Target Value
              </span>
              <input
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="e.g. ≥ 92% or ≤ 6:30"
                className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
              />
            </label>

            <Button
              type="button"
              onClick={() => {
                if (targetValue.trim()) {
                  setTargets([...targets, { kpiName: selectedKpi, target: targetValue.trim() }]);
                  setTargetValue("");
                }
              }}
              className="w-full sm:w-auto h-[38px] rounded-xl px-4"
            >
              <Plus className="mr-1 h-4 w-4" /> Add KPI
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="3 · Expectations & notes">
          <textarea
            rows={4}
            placeholder="Articulate expectations, support plan, and consequences if targets are not met…"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none text-foreground dark:bg-zinc-900"
          />
        </SectionCard>

        <SectionCard title="On submit">
          <ul className="space-y-3 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-2.5">
              <FileText className="mt-0.5 h-4.5 w-4.5 text-primary flex-shrink-0" />
              <span>
                PIP Word document generated ({selectedAgent ? selectedAgent.type : "regular"}{" "}
                template)
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <FileText className="mt-0.5 h-4.5 w-4.5 text-primary flex-shrink-0" />
              <span>4 reviews scheduled at 15-day intervals</span>
            </li>
            <li className="flex items-start gap-2.5">
              <FileText className="mt-0.5 h-4.5 w-4.5 text-primary flex-shrink-0" />
              <span>Email sent to agent (CC manager); .eml acknowledgement captured</span>
            </li>
          </ul>

          <Button size="lg" className="w-full" asChild>
            <Link to="/supervisor/pip/document">Submit targets & generate document</Link>
          </Button>
        </SectionCard>
      </div>
    </div>
  );
}
