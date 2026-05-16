import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { StatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const rules = [
  {
    name: "PIP · 3 consecutive warnings",
    window: "3 weeks",
    source: "Auto Scheduler",
    active: true,
  },
  { name: "PIP · 6 warnings", window: "8 weeks", source: "Auto Scheduler", active: true },
  { name: "PIP · 1 NI rating", window: "Last month", source: "AES", active: true },
  { name: "PIP · 2 NI ratings", window: "Last 6 months", source: "AES", active: true },
  { name: "CAP 3 escalation", window: "On 3rd same-breach", source: "CAP history", active: true },
];

export default function Triggers() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin · Config"
        title="Trigger rules"
        description="Source-of-truth automation thresholds for PIP candidate identification and CAP escalation."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add rule
          </Button>
        }
      />

      <SectionCard>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="py-2 pr-3">Rule</th>
              <th className="py-2 pr-3">Window</th>
              <th className="py-2 pr-3">Source</th>
              <th className="py-2 pr-3">Status</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rules.map((r) => (
              <tr key={r.name} className="hover:bg-secondary/40">
                <td className="py-3 pr-3 font-medium">{r.name}</td>
                <td className="py-3 pr-3 text-muted-foreground">{r.window}</td>
                <td className="py-3 pr-3 text-muted-foreground">{r.source}</td>
                <td className="py-3 pr-3">
                  {r.active ? (
                    <StatusBadge variant="success">Active</StatusBadge>
                  ) : (
                    <StatusBadge>Inactive</StatusBadge>
                  )}
                </td>
                <td className="py-3 pr-3 text-right">
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}
