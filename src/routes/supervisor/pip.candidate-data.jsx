import { useParams, Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badges";
import { pipCandidates } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";

const last6MonthsAES = [
  { month: "April 2026", rating: "NI", tone: "danger" },
  { month: "March 2026", rating: "Met", tone: "success" },
  { month: "February 2026", rating: "NI", tone: "danger" },
  { month: "January 2026", rating: "Exceeded", tone: "primary" },
  { month: "December 2025", rating: "Met", tone: "success" },
  { month: "November 2025", rating: "Met", tone: "success" },
];

const last6MonthsPerf = [
  {
    month: "April 2026",
    aht: "8:45",
    ahtTone: "text-destructive",
    nrpc: "12%",
    nrpcTone: "text-yellow-600 dark:text-yellow-500",
    conv: "22%",
    convTone: "text-emerald-600 dark:text-emerald-500",
  },
  {
    month: "March 2026",
    aht: "7:30",
    ahtTone: "text-emerald-600 dark:text-emerald-500",
    nrpc: "15%",
    nrpcTone: "text-emerald-600 dark:text-emerald-500",
    conv: "20%",
    convTone: "text-emerald-600 dark:text-emerald-500",
  },
  {
    month: "February 2026",
    aht: "9:10",
    ahtTone: "text-destructive",
    nrpc: "10%",
    nrpcTone: "text-destructive",
    conv: "25%",
    convTone: "text-emerald-600 dark:text-emerald-500",
  },
  {
    month: "January 2026",
    aht: "6:45",
    ahtTone: "text-emerald-600 dark:text-emerald-500",
    nrpc: "18%",
    nrpcTone: "text-emerald-600 dark:text-emerald-500",
    conv: "21%",
    convTone: "text-emerald-600 dark:text-emerald-500",
  },
  {
    month: "December 2025",
    aht: "7:00",
    ahtTone: "text-emerald-600 dark:text-emerald-500",
    nrpc: "16%",
    nrpcTone: "text-emerald-600 dark:text-emerald-500",
    conv: "19%",
    convTone: "text-yellow-600 dark:text-yellow-500",
  },
  {
    month: "November 2025",
    aht: "6:50",
    ahtTone: "text-emerald-600 dark:text-emerald-500",
    nrpc: "17%",
    nrpcTone: "text-emerald-600 dark:text-emerald-500",
    conv: "20%",
    convTone: "text-emerald-600 dark:text-emerald-500",
  },
];

export default function CandidateDataView() {
  const { ohrId } = useParams();
  // Fallback to the first candidate if the param is not found in dummy data
  const candidate = pipCandidates.find((c) => c.employee.ohrId === ohrId) || pipCandidates[0];
  const emp = candidate.employee;

  return (
    <div>
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground -ml-2"
          asChild
        >
          <Link to="/supervisor/pip/candidates">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Candidates
          </Link>
        </Button>
      </div>

      <PageHeader
        eyebrow="System · Read-only"
        title="AES / Auto Scheduler Trigger Summary"
        description={`Detailed trigger conditions and historical data for ${emp.name} (${emp.ohrId}).`}
      />

      <div className="space-y-8">
        {/* Section 1: AES Rating Table */}
        <SectionCard title="AES Rating (Last 6 Months)">
          <div className="rounded-xl border border-border shadow-sm overflow-hidden bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 border-b border-border">
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <th className="px-6 py-4">Guide Name</th>
                  <th className="px-6 py-4">OHR</th>
                  <th className="px-6 py-4">Month</th>
                  <th className="px-6 py-4">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {last6MonthsAES.map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-3.5 font-medium">{emp.name}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                      {emp.ohrId}
                    </td>
                    <td className="px-6 py-3.5 font-medium">{row.month}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge variant={row.tone}>{row.rating}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Section 2: Auto Scheduler Performance Tracker */}
        <SectionCard title="Auto Scheduler Performance (Last 6 Months)">
          <div className="rounded-xl border border-border shadow-sm overflow-hidden bg-card">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 border-b border-border">
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  <th className="px-6 py-4">Guide Name</th>
                  <th className="px-6 py-4">OHR</th>
                  <th className="px-6 py-4">Month</th>
                  <th className="px-6 py-4 text-center">AHT</th>
                  <th className="px-6 py-4 text-center">NRPC</th>
                  <th className="px-6 py-4 text-center">New Conv %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {last6MonthsPerf.map((row, i) => (
                  <tr key={i} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-3.5 font-medium">{emp.name}</td>
                    <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground">
                      {emp.ohrId}
                    </td>
                    <td className="px-6 py-3.5 font-medium">{row.month}</td>
                    <td className={`px-6 py-3.5 text-center font-bold ${row.ahtTone}`}>
                      {row.aht}
                    </td>
                    <td className={`px-6 py-3.5 text-center font-bold ${row.nrpcTone}`}>
                      {row.nrpc}
                    </td>
                    <td className={`px-6 py-3.5 text-center font-bold ${row.convTone}`}>
                      {row.conv}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Section 3: Auto Scheduler Warning Tracker */}
        <SectionCard title="Auto Scheduler Warning Tracker (Last 8 Weeks)">
          <div className="rounded-xl border border-border shadow-sm overflow-hidden bg-card overflow-x-auto">
            <table className="w-full text-sm text-left min-w-max">
              <thead className="bg-secondary/50 border-b border-border">
                <tr className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold whitespace-nowrap">
                  <th className="px-6 py-4">Guide Name</th>
                  <th className="px-6 py-4">OHR</th>
                  {[...Array(8)].map((_, i) => (
                    <th key={i} className="px-4 py-4 text-center">
                      Week {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="px-6 py-3.5 font-medium whitespace-nowrap">{emp.name}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                    {emp.ohrId}
                  </td>
                  {[...Array(8)].map((_, i) => {
                    const isIssued = i >= 5; // e.g., week 6, 7, 8
                    return (
                      <td key={i} className="px-4 py-3.5 text-center">
                        <StatusBadge
                          variant={isIssued ? "danger" : "success"}
                          dot={false}
                          className="px-2 py-0.5 whitespace-nowrap text-[10px]"
                        >
                          {isIssued ? "Issued" : "OnTrack"}
                        </StatusBadge>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
