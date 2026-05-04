import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import { useState } from "react";
import { CAPLevelBadge } from "@/components/shared/status-badges";

export const Route = createFileRoute("/agent/cap/acknowledge")({
  head: () => ({
    meta: [
      { title: "Agent — Acknowledge CAP" },
      { name: "description", content: "Acknowledge a CAP letter or warning. Reply is captured as audit proof." },
    ],
  }),
  component: AckCAP,
});

function AckCAP() {
  const [done, setDone] = useState(false);
  return (
    <div>
      <PageHeader eyebrow="Agent · CAP" title="Acknowledge CAP / Warning" description="Confirm you have read and understood the CAP letter." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Letter summary" actions={<CAPLevelBadge level="CAP 2" />}>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Case</span><span className="font-medium">CAP-2025-0455</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Breach</span><span className="font-medium">Compliance — Disclosure</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Validity</span><span className="font-medium">90 days from issue</span></li>
            </ul>
            <p className="mt-3 rounded-lg bg-secondary/40 p-3 text-sm leading-relaxed">
              Failed to disclose conflict of interest within SLA. Repeat occurrence may escalate to CAP 3 (HR-managed).
            </p>
          </SectionCard>
        </div>
        <aside className="space-y-4">
          <SectionCard title="Acknowledge">
            {done ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold text-success">
                  <Check className="h-4 w-4" /> Recorded
                </div>
                <Button asChild size="sm" className="mt-3 w-full"><Link to="/agent/cap">Back to CAPs</Link></Button>
              </div>
            ) : (
              <Button className="w-full" onClick={() => setDone(true)}>
                <Mail className="mr-2 h-4 w-4" /> Acknowledge CAP
              </Button>
            )}
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
