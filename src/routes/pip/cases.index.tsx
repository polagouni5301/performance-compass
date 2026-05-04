import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { PIPStatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/pip/cases/")({
  head: () => ({
    meta: [
      { title: "PIP Cases — All performance plans" },
      { name: "description", content: "Browse, filter and open every PIP case across all teams and statuses." },
    ],
  }),
  component: PIPList,
});

const filters = ["all", "active", "extended", "pending-approval", "closed-success", "closed-failed"] as const;

function PIPList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [q, setQ] = useState("");
  const list = pipCases.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (q && !(`${c.employee.name} ${c.employee.ohrId} ${c.id}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <div>
      <PageHeader eyebrow="PIP Module" title="All PIP cases" description="Lifecycle: Identify → Initiate → Review × 4 → Close or Extend." />

      <SectionCard
        title={`${list.length} case${list.length !== 1 ? "s" : ""}`}
        actions={
          <input
            placeholder="Search OHR / case / name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-56 rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-ring"
          />
        }
      >
        <div className="-mt-2 mb-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                filter === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/40 hover:border-primary/40"
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
                <th className="py-2 pr-3 font-semibold">Type</th>
                <th className="py-2 pr-3 font-semibold">Started</th>
                <th className="py-2 pr-3 font-semibold">Ends</th>
                <th className="py-2 pr-3 font-semibold">Reviews met</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => {
                const met = c.reviews.filter((r) => r.status === "met").length;
                return (
                  <tr key={c.id} className="hover:bg-secondary/40">
                    <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                    <td className="py-3 pr-3">
                      <div className="font-medium">{c.employee.name}</div>
                      <div className="text-xs text-muted-foreground">{c.employee.ohrId} · {c.employee.team}</div>
                    </td>
                    <td className="py-3 pr-3 capitalize text-muted-foreground">{c.employee.type}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.startDate}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.endDate}</td>
                    <td className="py-3 pr-3"><span className="font-semibold text-success">{met}</span><span className="text-muted-foreground"> / {c.reviews.length}</span></td>
                    <td className="py-3 pr-3"><PIPStatusBadge status={c.status} /></td>
                    <td className="py-3 pr-3 text-right">
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/pip/cases/$caseId" params={{ caseId: c.id }}>Open</Link>
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
