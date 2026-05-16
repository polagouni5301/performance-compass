import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { StatusBadge } from "@/components/shared/status-badges";
import { departments, channelLabel } from "@/lib/mock-data";
import { Briefcase, Users, TrendingUp, ShieldAlert } from "lucide-react";
import { useState } from "react";

const channelTone = {
  voice: "primary",
  messaging: "info",
  cdt: "warning",
};

export function DepartmentsView({ eyebrow, description }) {
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? departments : departments.filter((d) => d.channel === filter);

  const totalHC = departments.reduce((a, d) => a + d.headcount, 0);
  const totalPIP = departments.reduce((a, d) => a + d.activePIP, 0);
  const totalCAP = departments.reduce((a, d) => a + d.openCAP, 0);

  const tabs = [
    { id: "all", label: "All" },
    { id: "voice", label: "Voice" },
    { id: "messaging", label: "Messaging" },
    { id: "cdt", label: "CDT" },
  ];

  return (
    <div>
      <PageHeader eyebrow={eyebrow} title="Departments" description={description} />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Departments" value={departments.length} icon={Briefcase} tone="primary" />
        <StatCard label="Headcount" value={totalHC} icon={Users} />
        <StatCard label="Active PIPs" value={totalPIP} icon={TrendingUp} tone="warning" />
        <StatCard label="Open CAPs" value={totalCAP} icon={ShieldAlert} tone="danger" />
      </div>

      <div className="mt-6 inline-flex flex-wrap gap-1 rounded-xl border border-border bg-secondary/50 p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
              filter === t.id
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <SectionCard
        className="mt-4"
        title={`${list.length} department${list.length === 1 ? "" : "s"}`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3">Department</th>
                <th className="py-2 pr-3">Channel</th>
                <th className="py-2 pr-3">Manager</th>
                <th className="py-2 pr-3 text-right">Headcount</th>
                <th className="py-2 pr-3 text-right">Active PIP</th>
                <th className="py-2 pr-3 text-right">Open CAP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((d) => (
                <tr key={d.name} className="hover:bg-secondary/40">
                  <td className="py-3 pr-3 font-medium">{d.name}</td>
                  <td className="py-3 pr-3">
                    <StatusBadge variant={channelTone[d.channel]}>
                      {channelLabel[d.channel]}
                    </StatusBadge>
                  </td>
                  <td className="py-3 pr-3 text-muted-foreground">{d.manager}</td>
                  <td className="py-3 pr-3 text-right font-mono">{d.headcount}</td>
                  <td className="py-3 pr-3 text-right font-mono">{d.activePIP}</td>
                  <td className="py-3 pr-3 text-right font-mono">{d.openCAP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
