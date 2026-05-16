import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload } from "lucide-react";

const templates = [
  { name: "PIP_Regular_v3.docx", role: "Regular employee", updated: "2025-04-12" },
  { name: "PIP_Apprentice_v2.docx", role: "Apprentice", updated: "2025-04-12" },
  { name: "CAP_Letter_Standard_v4.docx", role: "All", updated: "2025-03-29" },
];

export default function Templates() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin · Config"
        title="Document templates"
        description="Versioned Word templates used during PIP & CAP generation."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templates.map((t) => (
          <SectionCard key={t.name}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">
                  {t.role} · updated {t.updated}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Download className="mr-1 h-3.5 w-3.5" /> Download
              </Button>
              <Button size="sm" className="flex-1">
                <Upload className="mr-1 h-3.5 w-3.5" /> Upload v+
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
