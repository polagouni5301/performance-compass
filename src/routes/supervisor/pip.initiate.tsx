import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Calendar, Video, FileText, Lock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supervisor/pip/initiate")({
  head: () => ({
    meta: [
      { title: "Supervisor — Initiate PIP" },
      { name: "description", content: "Define PIP setup, KPI targets, expectations, and auto-schedule the discussion meeting." },
    ],
  }),
  component: Initiate,
});

function Initiate() {
  const [targets, setTargets] = useState<string[]>([
    "QA score ≥ 92%",
    "Average handle time ≤ 6:30",
    "Zero compliance breaches",
  ]);
  const [draft, setDraft] = useState("");

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · PIP"
        title="PIP initiation & target setup"
        description="Set duration (locked at 60 days), define KPI-linked targets, and schedule the discussion meeting."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="1 · Duration & basics">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Agent</span>
                <input value="Aarav Mehta — OHR-204871" disabled className="mt-1.5 w-full rounded-xl border border-input bg-secondary/60 px-3 py-2.5 text-sm" />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"><Lock className="h-3 w-3" /> Duration (locked)</span>
                <input value="60 days" disabled className="mt-1.5 w-full rounded-xl border border-input bg-secondary/60 px-3 py-2.5 text-sm font-semibold" />
              </label>
            </div>
          </SectionCard>

          <SectionCard title="2 · Targets (KPI-linked)">
            <ul className="space-y-2">
              {targets.map((t, i) => (
                <li key={i} className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 p-3 text-sm">
                  <span className="flex-1">{t}</span>
                  <Button size="sm" variant="ghost" onClick={() => setTargets(targets.filter((_, idx) => idx !== i))}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add a measurable target…"
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
              />
              <Button onClick={() => { if (draft.trim()) { setTargets([...targets, draft.trim()]); setDraft(""); } }}>
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="3 · Expectations & notes">
            <textarea
              rows={4}
              placeholder="Articulate expectations, support plan, and consequences if targets are not met…"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
            />
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Auto-scheduled meeting">
            <div className="rounded-xl border border-primary/30 bg-primary-soft/40 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Video className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Microsoft Teams</div>
                  <div className="text-[11px] text-muted-foreground">Auto-scheduled this week</div>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5 text-xs">
                <li className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">Fri, 8 May · 10:30 AM</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-medium">30 min</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Participants</span><span className="font-medium">Supervisor, Agent</span></li>
              </ul>
              <Button size="sm" variant="outline" className="mt-3 w-full"><Calendar className="mr-1 h-3.5 w-3.5" /> Reschedule</Button>
            </div>
          </SectionCard>

          <SectionCard title="On submit">
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2"><FileText className="mt-0.5 h-3.5 w-3.5 text-primary" /> PIP Word document generated (regular template)</li>
              <li className="flex items-start gap-2"><FileText className="mt-0.5 h-3.5 w-3.5 text-primary" /> 4 reviews scheduled at 15-day intervals</li>
              <li className="flex items-start gap-2"><FileText className="mt-0.5 h-3.5 w-3.5 text-primary" /> Email sent to agent (CC manager); .eml acknowledgement captured</li>
            </ul>
          </SectionCard>

          <Button size="lg" className="w-full" asChild>
            <Link to="/supervisor/pip/document">Submit targets & generate document</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
