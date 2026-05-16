import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { ReviewStatusBadge, PIPStatusBadge } from "@/components/shared/status-badges";
import { Button } from "@/components/ui/button";
import { pipCases } from "@/lib/mock-data";
import { Mail, FileText } from "lucide-react";

export default function MyPIP() {
  const c = pipCases.find((p) => p.employee.ohrId === "OHR-205033");

  return (
    <div>
      <PageHeader
        eyebrow="Agent · PIP"
        title="My Performance Improvement Plan"
        description={`Case ${c.id} · ${c.duration} days · Supervisor ${c.employee.supervisor}`}
        actions={<PIPStatusBadge status={c.status} />}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SectionCard title="Targets">
            <ul className="space-y-2">
              {c.targets.map((t, i) => (
                <li key={i} className="rounded-xl border border-border bg-secondary/40 p-3 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard title="Review schedule">
            <ol className="space-y-2">
              {c.reviews.map((r) => (
                <li
                  key={r.number}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-sm"
                >
                  <div>
                    <div className="font-medium">Review {r.number}</div>
                    <div className="text-xs text-muted-foreground">
                      {r.date} {r.kpiScore !== undefined && `· KPI ${r.kpiScore}`}
                    </div>
                  </div>
                  <ReviewStatusBadge status={r.status} />
                </li>
              ))}
            </ol>
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <SectionCard title="Document">
            <div className="rounded-xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-xs">
                  <div className="font-semibold">
                    PIP_{c.id}_v{c.documentVersion}.docx
                  </div>
                  <div className="text-muted-foreground">Latest version</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-3 w-full">
                Download
              </Button>
            </div>
          </SectionCard>

          <SectionCard title="Acknowledgement">
            {c.acknowledgedAt ? (
              <div className="text-sm">
                <div className="font-semibold text-success">Acknowledged on {c.acknowledgedAt}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">
                  📧 {c.acknowledgmentEmail}
                </div>
              </div>
            ) : (
              <Button asChild className="w-full">
                <Link to="/agent/pip/acknowledge">
                  <Mail className="mr-2 h-4 w-4" /> Acknowledge PIP
                </Link>
              </Button>
            )}
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
