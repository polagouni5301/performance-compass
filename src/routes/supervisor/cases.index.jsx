import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge, StatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { useState, useMemo } from "react";
import { Download, Calendar } from "lucide-react";

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

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(firstDayOfMonth.toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(lastDayOfMonth.toISOString().slice(0, 10));

  const allCases = capCases; // Now using the consolidated capCases from mock-data.js

  // Get unique departments for the filter
  const departments = useMemo(() => {
    const set = new Set(allCases.map((c) => c.employee.team));
    return Array.from(set).sort();
  }, [allCases]);

  const list = useMemo(
    () =>
      allCases.filter((c) => {
        if (filter !== "all" && c.status !== filter) return false;
        if (team !== "all" && c.raisedByTeam !== team) return false;
        if (dept !== "all" && c.employee.team !== dept) return false;
        if (startDate && c.raisedAt) {
          // Compare dates as YYYY-MM-DD strings for simplicity and to avoid timezone issues
          if (c.raisedAt < startDate) return false;
        }
        if (endDate && c.raisedAt) {
          // Compare dates as YYYY-MM-DD strings for simplicity and to avoid timezone issues
          if (c.raisedAt > endDate) return false;
        }
        if (
          q &&
          !`${c.employee.name} ${c.employee.ohrId} ${c.id} ${c.breachType}`
            .toLowerCase()
            .includes(q.toLowerCase())
        )
          return false;
        return true;
      }),
    [allCases, filter, team, dept, startDate, endDate, q],
  );

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="All Cases"
        description="Full lifecycle traceability across QA & Compliance breaches."
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 h-9">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-xs outline-none focus:ring-0"
                  title="Start Date"
                />
                <span className="text-muted-foreground text-xs">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-xs outline-none focus:ring-0"
                  title="End Date"
                />
              </div>
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
              <option value="all">Select Audit Team</option>
              <option value="QA">QA</option>
              <option value="Compliance">Compliance</option>
            </select>
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
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
                <th className="py-2 px-1 font-semibold">Breach Month</th>
                <th className="py-2 px-1 font-semibold">Level</th>
                <th className="py-2 px-1 font-semibold">Status</th>
                <th className="py-2 px-1 font-semibold">Pending Action</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => {
                let pendingAction = "Active";
                if (c.status === "logged") {
                  pendingAction = "cap initiate-Initiated";
                } else if (c.status === "accepted") {
                  pendingAction = "Awaiting guide acknowledgment";
                } else if (c.status === "disputed") {
                  pendingAction = "Awaiting response from QA/Compliance";
                } else if (c.status === "exception-pending") {
                  pendingAction = "Awaiting Manager Approval";
                } else if (c.status === "closed") {
                  pendingAction = "Active";
                } else if (c.status === "hr-escalation") {
                  pendingAction = "Escalated to HR";
                }

                return (
                  <tr key={c.id} className="hover:bg-secondary/40 text-foreground">
                    <td className="py-3 px-1 font-mono text-[11px] whitespace-nowrap">{c.id}</td>
                    <td className="py-3 px-1">
                      <div className="font-medium">{c.employee.name}</div>
                      <div className="text-[10px] text-muted-foreground">{c.employee.ohrId}</div>
                    </td>
                    <td className="py-3 px-1 text-xs">{c.breachType}</td>
                    <td className="py-3 px-1 font-medium text-primary/80 text-xs text-center">
                      {c.employee.team}
                    </td>
                    <td className="py-3 px-1 text-[11px] text-muted-foreground whitespace-nowrap">
                      {c.raisedByTeam}
                    </td>
                    <td className="py-3 px-1 text-[11px] whitespace-nowrap">
                      {c.auditMonth
                        ? new Date(c.auditMonth + "-01").toLocaleString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        : "Apr 2026"}
                    </td>
                    <td className="py-3 px-1">
                      {c.level === "Warning" ? (
                        <StatusBadge
                          variant="neutral"
                          dot={false}
                          className="font-bold border-dashed text-[10px] h-5 px-1.5 whitespace-nowrap"
                        >
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
                    <td className="py-3 px-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                          pendingAction === "cap initiate-Initiated"
                            ? "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/30"
                            : pendingAction === "Awaiting guide acknowledgment"
                              ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/30"
                              : pendingAction === "Awaiting Manager Approval"
                                ? "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/30"
                                : "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/30"
                        }`}
                      >
                        {pendingAction}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-right">
                      <Button size="sm" variant="secondary" className="border shadow-sm" asChild>
                        <Link to={`/cap/cases/${c.id}`}>Open</Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
