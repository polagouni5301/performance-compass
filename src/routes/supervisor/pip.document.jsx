import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badges";
import { Download, History, Lock, FileText, Mail } from "lucide-react";

export default function DocumentPreview() {
  return (
    <div>
      <PageHeader
        eyebrow="System · Read-only"
        title="PIP document preview"
        description="Generated Word document. Editable sections are locked. Versioned per review."
        actions={
          <>
            <StatusBadge variant="info">v1 · Initial</StatusBadge>
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" /> View history
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Download Word
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard title="Document preview">
            <div className="rounded-2xl border-2 border-dashed border-border bg-secondary/30 p-8">
              <div className="mx-auto max-w-2xl space-y-4 text-sm">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Confidential
                  </div>
                  <h3 className="mt-1 text-lg font-bold">Performance Improvement Plan</h3>
                </div>
                <hr className="border-border" />
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground">Employee</span>
                    <div className="font-medium">Aarav Mehta</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">OHR</span>
                    <div className="font-medium">OHR-204871</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Supervisor</span>
                    <div className="font-medium">Priya Shah</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration</span>
                    <div className="font-medium">60 days</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Targets
                  </div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>1. Maintain QA score ≥ 92%</li>
                    <li>2. Average handle time ≤ 6:30</li>
                    <li>3. Zero compliance breaches</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Review schedule
                  </div>
                  <table className="mt-2 w-full text-xs">
                    <tbody className="divide-y divide-border">
                      {[1, 2, 3, 4].map((n, i) => (
                        <tr key={n}>
                          <td className="py-1.5 pr-2 font-mono">Review {n}</td>
                          <td className="py-1.5 text-muted-foreground">
                            {["8 May", "23 May", "7 Jun", "22 Jun"][i]} · 2025
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-warning/10 p-3 text-xs text-warning-foreground">
                  <Lock className="h-3.5 w-3.5" /> Sections below this line are locked for the
                  agent.
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="File">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-xs">
                  <div className="font-semibold">PIP_OHR-204871_v1.docx</div>
                  <div className="text-muted-foreground">Regular template · 24 KB</div>
                </div>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="Distribution">
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">From</span>
                <span className="font-medium">Priya Shah</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">To</span>
                <span className="font-medium">aarav.mehta@…</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">CC</span>
                <span className="font-medium">Rohan Iyer (Mgr)</span>
              </li>
            </ul>
            <Button className="mt-4 w-full" asChild>
              <Link to="/agent/pip/acknowledge">
                <Mail className="mr-2 h-4 w-4" /> Send to agent
              </Link>
            </Button>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
