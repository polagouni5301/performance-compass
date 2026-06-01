import { Link } from "react-router-dom";
import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { PIPStatusBadge } from "@/components/shared/status-badges";
import { pipCases } from "@/lib/mock-data";
import { useState } from "react";
import { FileText, Upload, X as CloseIcon } from "lucide-react";

const filters = [
  "all",
  "active",
  "extended",
  "pending-approval",
  "closed-success",
  "closed-failed",
];

export default function PIPList() {
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [casesData, setCasesData] = useState(() => {
    // Let's make sure the first case is missing acknowledgement email to test the button
    const data = [...pipCases];
    if (data[0]) {
      data[0] = {
        ...data[0],
        acknowledgmentEmail: null,
        acknowledgedAt: null,
      };
    }
    return data;
  });

  const [uploadModalCaseId, setUploadModalCaseId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const list = casesData.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (
      q &&
      !`${c.employee.name} ${c.employee.ohrId} ${c.id}`.toLowerCase().includes(q.toLowerCase())
    )
      return false;
    return true;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleMockSubmit = () => {
    if (!fileName) {
      alert("Please select a file first.");
      return;
    }
    setCasesData((prev) =>
      prev.map((c) => {
        if (c.id === uploadModalCaseId) {
          return {
            ...c,
            acknowledgmentEmail: fileName,
            acknowledgedAt: new Date().toISOString().split("T")[0],
          };
        }
        return c;
      }),
    );
    setUploadModalCaseId(null);
    setFileName("");
  };

  return (
    <div>
      <PageHeader eyebrow="PIP Module" title="All PIP cases" />

      <SectionCard
        title={`${list.length} case${list.length !== 1 ? "s" : ""}`}
        actions={
          <input
            placeholder="Search OHR / case / name…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-56 rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-ring text-foreground dark:bg-zinc-900"
          />
        }
      >
        <div className="-mt-2 mb-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 text-xs font-medium capitalize transition ${
                filter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/40 hover:border-primary/40 text-foreground"
              }`}
            >
              {f.replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-3 font-semibold">Case</th>
                <th className="py-2 pr-3 font-semibold">Employee</th>
                <th className="py-2 pr-3 font-semibold">Employee Type</th>
                <th className="py-2 pr-3 font-semibold">Started</th>
                <th className="py-2 pr-3 font-semibold">Ends</th>
                <th className="py-2 pr-3 font-semibold">Review Period</th>
                <th className="py-2 pr-3 font-semibold">Status</th>
                <th className="py-2 pr-3 font-semibold">Pending Actions</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {list.map((c) => {
                const completedReviews = c.reviews.filter(
                  (r) => r.status !== "scheduled" && r.status !== "pending",
                ).length;
                const reviewPeriodText =
                  completedReviews === 0
                    ? "None"
                    : completedReviews === 1
                      ? "1st"
                      : completedReviews === 2
                        ? "2nd"
                        : completedReviews === 3
                          ? "3rd"
                          : completedReviews === 4
                            ? "4th"
                            : `${completedReviews}th`;

                const nextScheduledReview = c.reviews.find((r) => r.status === "scheduled");

                let pendingActionEl = (
                  <span className="text-muted-foreground text-xs">No Pending actions</span>
                );

                if (!c.acknowledgmentEmail) {
                  pendingActionEl = (
                    <Button
                      size="xs"
                      className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] px-2 py-1 rounded"
                      onClick={() => {
                        setUploadModalCaseId(c.id);
                        setFileName("");
                      }}
                    >
                      Attach Acknowledgment Email
                    </Button>
                  );
                } else if (nextScheduledReview && c.status === "active") {
                  pendingActionEl = (
                    <Button
                      size="xs"
                      variant="outline"
                      className="border-primary/50 text-primary hover:bg-primary-soft text-[10px] px-2 py-1 rounded"
                      asChild
                    >
                      <Link to={`/supervisor/pip/review?caseId=${c.id}`}>
                        Close Review Cycle {nextScheduledReview.number}
                      </Link>
                    </Button>
                  );
                }

                return (
                  <tr key={c.id} className="hover:bg-secondary/40">
                    <td className="py-3 pr-3 font-mono text-xs text-foreground">{c.id}</td>
                    <td className="py-3 pr-3">
                      <div className="font-medium text-foreground">{c.employee.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.employee.ohrId} · {c.employee.team}
                      </div>
                    </td>
                    <td className="py-3 pr-3 capitalize text-muted-foreground">
                      {c.employee.type}
                    </td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.startDate}</td>
                    <td className="py-3 pr-3 text-muted-foreground">{c.endDate}</td>
                    <td className="py-3 pr-3 text-foreground font-medium">{reviewPeriodText}</td>
                    <td className="py-3 pr-3">
                      <PIPStatusBadge status={c.status} />
                    </td>
                    <td className="py-3 pr-3">{pendingActionEl}</td>
                    <td className="py-3 pr-3 text-right">
                      <Button size="sm" variant="outline" asChild>
                        <Link to={`/pip/cases/${c.id}`}>Open</Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Upload Modal Dialog */}
      {uploadModalCaseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md p-6 rounded-2xl border border-border shadow-2xl relative">
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              onClick={() => setUploadModalCaseId(null)}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold text-foreground mb-1">Attach Acknowledgment Email</h3>
            <p className="text-xs text-muted-foreground mb-4">Case ID: {uploadModalCaseId}</p>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary-soft/10"
                  : "border-border bg-secondary/20 hover:border-primary/50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setFileName(file.name);
                }
              }}
            >
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm font-semibold text-foreground">
                {fileName ? fileName : "Drag & drop files here"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Supported formats: .eml, .pdf, .msg
              </div>
              <input
                type="file"
                accept=".eml,.pdf,.msg"
                className="hidden"
                id="file-upload-input"
                onChange={handleFileUpload}
              />
              <Button
                size="sm"
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("file-upload-input")?.click()}
              >
                Browse files
              </Button>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setUploadModalCaseId(null)}>
                Cancel
              </Button>
              <Button onClick={handleMockSubmit} disabled={!fileName}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
