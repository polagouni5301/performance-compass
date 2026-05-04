import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Mail, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/agent/pip/acknowledge")({
  head: () => ({
    meta: [
      { title: "Agent — Acknowledge PIP" },
      { name: "description", content: "Agent acknowledges receipt of the PIP document; reply captured as .eml proof." },
    ],
  }),
  component: AcknowledgePIP,
});

function AcknowledgePIP() {
  const [done, setDone] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Agent · PIP"
        title="Acknowledge your PIP"
        description="By acknowledging, your reply is captured as a .eml audit record."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Summary">
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Case</span><span className="font-medium">PIP-2025-0142</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">60 days</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span className="font-medium">4 × 15 days</span></li>
            </ul>
          </SectionCard>
          <SectionCard title="Targets">
            <ul className="space-y-2 text-sm">
              <li className="rounded-lg bg-secondary/40 p-2.5">Maintain QA score ≥ 92%</li>
              <li className="rounded-lg bg-secondary/40 p-2.5">Average handle time ≤ 6:30</li>
              <li className="rounded-lg bg-secondary/40 p-2.5">Zero compliance breaches</li>
            </ul>
          </SectionCard>
        </div>

        <aside className="space-y-4">
          <SectionCard title="Acknowledge">
            {done ? (
              <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-sm">
                <div className="flex items-center gap-2 font-semibold text-success">
                  <Check className="h-4 w-4" /> Acknowledgement captured
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Stored as RE_PIP_Acknowledgement_OHR-205033.eml</p>
                <Button asChild size="sm" className="mt-3 w-full"><Link to="/agent/pip">Back to my PIP</Link></Button>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground">Click to send acknowledgement email back to your supervisor.</p>
                <Button className="mt-3 w-full" onClick={() => setDone(true)}>
                  <Mail className="mr-2 h-4 w-4" /> Acknowledge PIP
                </Button>
              </>
            )}
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
