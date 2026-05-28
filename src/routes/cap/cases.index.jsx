import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { useState, useMemo, useRef } from "react";
import { Calendar, Download, Filter } from "lucide-react";

const filters = [
  "all",
  "logged",
  "accepted",
  "disputed",
  "exception-pending",
  "closed",
  "hr-escalation",
];

export default function CAPList() {
  const [filter, setFilter] = useState("all");
  const [team, setTeam] = useState("all");
  const [dept, setDept] = useState("all");
  const [q, setQ] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const monthInputRef = useRef(null); // Ref for the hidden month input
  const allCases = capCases; // Now using the consolidated capCases from mock-data.js

  // Get unique departments for the filter
  const departments = useMemo(() => {
    const set = new Set(allCases.map(c => c.employee.team));
    return Array.from(set).sort();
  }, [allCases]);

  const list = useMemo(() => allCases.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (team !== "all" && c.raisedByTeam !== team) return false;
    if (dept !== "all" && c.employee.team !== dept) return false;
    if (selectedMonth) {
      const auditMatch = c.auditMonth === selectedMonth;
      if (!auditMatch) return false;
    }
    if (
      q &&
      !`${c.employee.name} ${c.employee.ohrId} ${c.id} ${c.breachType}`
        .toLowerCase()
        .includes(q.toLowerCase())
    )
      return false;
    return true;
  }), [allCases, filter, team, dept, selectedMonth, q]);

  const displayMonth = useMemo(() => {
    if (!selectedMonth) return "All Months";
    // type="month" returns YYYY-MM. We add -01 to create a valid date object.
    const date = new Date(selectedMonth + "-01");
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="All CAP cases"
        description="Full lifecycle traceability across QA & Compliance breaches."
        actions={
          <div className="flex items-center gap-2">
            <div className="relative">
              <input 
                ref={monthInputRef}
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="absolute inset-0 h-full w-full opacity-0 pointer-events-none"
              />
              <Button
                variant="outline" 
                className="h-9 text-xs font-semibold"
                type="button"
                onClick={() => monthInputRef.current?.showPicker ? monthInputRef.current.showPicker() : monthInputRef.current?.focus()}
              >
                <Calendar className="mr-2 h-3.5 w-3.5" />
                {displayMonth}
              </Button>
            </div>
            <Button className="h-9 text-xs font-semibold">
              <Download className="mr-2 h-3.5 w-3.5" />
              Download Report
            </Button>
          </div>
        }
      />

      <SectionCard
        title={`${list.length} case${list.length !== 1 ? "s" : ""}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
            >
              <option value="all">All teams</option>
              <option value="QA">QA</option>
              <option value="Compliance">Compliance</option>
            </select>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
            >
              <option value="all">All Departments</option>
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <input
              placeholder="Search…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-56 rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
            />
          </div>
        }
      >
        <div className="-mt-2 mb-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/40 hover:border-primary/40"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 px-1 font-semibold">Case</th>
                <th className="py-2 px-1 font-semibold">Employee</th>
                <th className="py-2 px-1 font-semibold">Breach</th>
                <th className="py-2 px-1 font-semibold text-center">Department</th>
                <th className="py-2 px-1 font-semibold">Source</th>
                <th className="py-2 px-1 font-semibold">Audit Month</th>
                <th className="py-2 px-1 font-semibold">Raised</th>
                <th className="py-2 px-1 font-semibold">Valid until</th>
                <th className="py-2 px-1 font-semibold">Level</th>
                <th className="py-2 px-1 font-semibold">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/40">
                  <td className="py-3 px-1 font-mono text-[11px] whitespace-nowrap">{c.id}</td>
                  <td className="py-3 px-1">
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-[10px] text-muted-foreground">{c.employee.ohrId}</div>
                  </td>
                  <td className="py-3 px-1 text-xs">{c.breachType}</td>
                  <td className="py-3 px-1 font-medium text-primary/80 text-xs text-center">{c.employee.team}</td>
                  <td className="py-3 px-1 text-[11px] text-muted-foreground whitespace-nowrap">{c.raisedByTeam}</td>
                  <td className="py-3 px-1 text-[11px] whitespace-nowrap">
                    {c.auditMonth ? new Date(c.auditMonth + "-01").toLocaleString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : '—'}
                  </td>
                  <td className="py-3 px-1 text-[11px] text-muted-foreground whitespace-nowrap">{c.raisedAt || "—"}</td>
                  <td className="py-3 px-1 text-[11px] text-muted-foreground whitespace-nowrap">{c.validUntil || "—"}</td>
                  <td className="py-3 px-1">
                    {c.level === "Warning" ? (
                      <StatusBadge variant="neutral" dot={false} className="font-bold border-dashed text-[10px] h-5 px-1.5 whitespace-nowrap">
                        Warning
                      </StatusBadge>
                    ) : (
                      <div className="whitespace-nowrap">
                        <CAPLevelBadge level={c.level} />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-1">
                    <CAPStatusBadge status={c.status} />
                  </td>
                  <td className="py-3 px-1 text-right">
                    <Button size="sm" variant="secondary" className="border shadow-sm" asChild>
                      <Link to={`/cap/cases/${c.id}`}>
                        Open
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
