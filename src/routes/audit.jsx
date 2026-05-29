import { Link } from "react-router-dom";
import { PageHeader, StatCard, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { PIPStatusBadge, CAPStatusBadge, CAPLevelBadge } from "@/components/shared/status-badges";
import { pipCases, capCases } from "@/lib/mock-data";
import { Download, FileSearch, ShieldCheck, History, Filter } from "lucide-react";
import { useState } from "react";

export default function Audit() {
  const [tab, setTab] = useState("pip");

  const totalPIP = pipCases.length;
  const totalCAP = capCases.length;
  const closedSuccess = pipCases.filter((c) => c.status === "closed-success").length;
  const hrEscalations = capCases.filter((c) => c.status === "hr-escalation").length;

  return (
    <div>
      <PageHeader
        eyebrow="Governance"
        title="Audit dashboard"
        description="Every PIP & CAP action is logged with full lifecycle traceability. View, filter and export records."
        actions={
          <>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filters
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Total PIP cases" value={totalPIP} icon={History} tone="primary" />
        <StatCard
          label="PIP closed — success"
          value={closedSuccess}
          hint="Exit criteria met"
          icon={ShieldCheck}
          tone="success"
        />
        <StatCard label="Total CAP cases" value={totalCAP} icon={FileSearch} />
        <StatCard label="HR escalations" value={hrEscalations} hint="CAP 3" tone="danger" />
      </div>

      <div className="mt-6 inline-flex rounded-xl border border-border bg-secondary/50 p-1">
        {["pip", "cap"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition ${
              tab === t
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t} Audit
          </button>
        ))}
      </div>

      {tab === "pip" ? (
        <SectionCard title="PIP audit log" className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">Case</th>
                  <th className="py-2 pr-3">Employee</th>
                  <th className="py-2 pr-3">OHR</th>
                  <th className="py-2 pr-3">Type</th>
                  <th className="py-2 pr-3">Started</th>
                  <th className="py-2 pr-3">Reviews</th>
                  <th className="py-2 pr-3">Doc ver.</th>
                  <th className="py-2 pr-3">Ack</th>
                  <th className="py-2 pr-3">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pipCases.map((c) => {
                  const met = c.reviews.filter((r) => r.status === "met").length;
                  return (
                    <tr key={c.id} className="hover:bg-secondary/40">
                      <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                      <td className="py-3 pr-3 font-medium">{c.employee.name}</td>
                      <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">
                        {c.employee.ohrId}
                      </td>
                      <td className="py-3 pr-3 capitalize text-muted-foreground">
                        {c.employee.type}
                      </td>
                      <td className="py-3 pr-3 text-muted-foreground">{c.startDate}</td>
                      <td className="py-3 pr-3">
                        <span className="font-semibold text-success">{met}</span>
                        <span className="text-muted-foreground">/{c.reviews.length}</span>
                      </td>
                      <td className="py-3 pr-3">v{c.documentVersion}</td>
                      <td className="py-3 pr-3 text-xs text-muted-foreground">
                        {c.acknowledgedAt ?? "—"}
                      </td>
                      <td className="py-3 pr-3">
                        <PIPStatusBadge status={c.status} />
                      </td>
                      <td className="py-3 pr-3 text-right">
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/pip/cases/${c.id}`}>View</Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="CAP audit log" className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">Case</th>
                  <th className="py-2 pr-3">Employee</th>
                  <th className="py-2 pr-3">OHR</th>
                  <th className="py-2 pr-3">Breach</th>
                  <th className="py-2 pr-3">Source</th>
                  <th className="py-2 pr-3">Raised</th>
                  <th className="py-2 pr-3">Disputes</th>
                  <th className="py-2 pr-3">Level</th>
                  <th className="py-2 pr-3">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {capCases.map((c) => (
                  <tr key={c.id} className="hover:bg-secondary/40">
                    <td className="py-3 pr-3 font-mono text-xs">{c.id}</td>
                    <td className="py-3 pr-3 font-medium">{c.employee.name}</td>
                    <td className="py-3 pr-3 font-mono text-xs text-muted-foreground">
                      {c.employee.ohrId}
                    </td>
                    <td className="py-3 pr-3">{c.breachType}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.raisedByTeam}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.raisedAt}</td>
                    <td className="py-3 pr-3">{c.disputeAttempts}/2</td>
                    <td className="py-3 pr-3">
                      <CAPLevelBadge level={c.level} />
                    </td>
                    <td className="py-3 pr-3">
                      <CAPStatusBadge status={c.status} />
                    </td>
                    <td className="py-3 pr-3 text-right">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/cap/cases/${c.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}
