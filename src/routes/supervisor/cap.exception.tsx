import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Upload, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/supervisor/cap/exception")({
  head: () => ({
    meta: [
      { title: "Supervisor — CAP Exception Request" },
      { name: "description", content: "Request an exception with reason and supporting documents. Routed to QA / Compliance Manager or SDL." },
    ],
  }),
  component: Exception,
});

function Exception() {
  const [files, setFiles] = useState<string[]>([]);
  const [approver, setApprover] = useState("QA Manager");

  return (
    <div>
      <PageHeader
        eyebrow="Supervisor · CAP"
        title="Exception request"
        description="Provide justification and evidence. Approval routes to QA / Compliance Manager or SDL based on selection."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Reason">
            <textarea
              rows={5}
              placeholder="Describe the contextual factors that justify reduced or no CAP…"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:border-ring focus:outline-none"
            />
          </SectionCard>
          <SectionCard title="Supporting documents">
            <button
              type="button"
              onClick={() => setFiles([...files, `evidence-${files.length + 1}.pdf`])}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/30 py-8 text-sm text-muted-foreground hover:border-primary/40 hover:text-foreground"
            >
              <Upload className="h-4 w-4" /> Click to upload (mock)
            </button>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs">
                {files.map((f) => <li key={f} className="rounded-md bg-secondary/60 px-2 py-1 font-mono">📎 {f}</li>)}
              </ul>
            )}
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Route approval to">
            <div className="space-y-2">
              {["QA Manager", "Compliance Manager", "SDL"].map((r) => (
                <button
                  key={r}
                  onClick={() => setApprover(r)}
                  className={`block w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    approver === r ? "border-primary bg-primary-soft/40" : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </SectionCard>
          <Button className="w-full" size="lg"><Send className="mr-2 h-4 w-4" /> Submit exception</Button>
          <Button variant="ghost" className="w-full" asChild><Link to="/supervisor/cap/inbox">Cancel</Link></Button>
        </aside>
      </div>
    </div>
  );
}
