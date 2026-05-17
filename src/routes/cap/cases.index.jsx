import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { CAPLevelBadge, CAPStatusBadge } from "@/components/shared/status-badges";
import { capCases } from "@/lib/mock-data";
import { useState } from "react";

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
  const [q, setQ] = useState("");

  const list = capCases.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (team !== "all" && c.raisedByTeam !== team) return false;
    if (
      q &&
      !`${c.employee.name} ${c.employee.ohrId} ${c.id} ${c.breachType}`
        .toLowerCase()
        .includes(q.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        eyebrow="CAP Module"
        title="All CAP cases"
        description="Full lifecycle traceability across QA & Compliance breaches."
      />

      <SectionCard
        title={`${list.length} case${list.length !== 1 ? "s" : ""}`}
        actions={
          <div className="flex gap-2">
            <select
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
            >
              <option value="all">All teams</option>
              <option value="QA">QA</option>
              <option value="Compliance">Compliance</option>
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
                <th className="py-2 pr-3 font-semibold">Case</th>
                <th className="py-2 pr-3 font-semibold">Employee</th>
                <th className="py-2 pr-3 font-semibold">Breach</th>
                <th className="py-2 pr-3 font-semibold">Source</th>
                <th className="py-2 pr-3 font-semibold">Raised</th>
                <th className="py-2 pr-3 font-semibold">Valid until</th>
                <th className="py-2 pr-3 font-semibold">Level</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-secondary/40">
                  <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                  <td className="py-3 pr-3">
                    <div className="font-medium">{c.employee.name}</div>
                    <div className="text-xs text-muted-foreground">{c.employee.ohrId}</div>
                  </td>
                  <td className="py-3 pr-3">{c.breachType}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{c.raisedByTeam}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{c.raisedAt}</td>
                  <td className="py-3 pr-3 text-muted-foreground">{c.validUntil ?? "—"}</td>
                  <td className="py-3 pr-3">
                    <CAPLevelBadge level={c.level} />
                  </td>
                  <td className="py-3 pr-3">
                    <CAPStatusBadge status={c.status} />
                  </td>
                  <td className="py-3 pr-3 text-right">
                    <Button size="sm" variant="ghost" asChild>
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
