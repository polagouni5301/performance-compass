import { Link } from "react-router-dom";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Settings, FileText, Mail, Users, ArrowRight, Briefcase, FileSearch } from "lucide-react";

const sections = [
  {
    to: "/admin/triggers",
    icon: Settings,
    label: "Trigger rules",
    desc: "PIP & CAP automation thresholds, NI ratings, AES windows.",
  },
  {
    to: "/admin/templates",
    icon: FileText,
    label: "Document templates",
    desc: "Word templates for Regular vs Apprentice employees.",
  },
  {
    to: "/admin/email-templates",
    icon: Mail,
    label: "Email templates",
    desc: "Notifications for supervisor, agent, manager, HR.",
  },
  {
    to: "/admin/roles",
    icon: Users,
    label: "Role access",
    desc: "Persona permissions across PIP and CAP modules.",
  },
  {
    to: "/admin/departments",
    icon: Briefcase,
    label: "Departments",
    desc: "Voice, Messaging and CDT departments across the org.",
  },
  {
    to: "/audit",
    icon: FileSearch,
    label: "Audit dashboard",
    desc: "Full lifecycle traceability across PIP and CAP cases.",
  },
];

export default function AdminHome() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="System configuration"
        description="Tune the engine driving consequence management."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Trigger rules" value={5} hint="Active" />
        <StatCard label="Departments" value={11} hint="Voice · Messaging · CDT" />
        <StatCard label="Email templates" value={9} />
        <StatCard label="Roles" value={5} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((s) => (
          <SectionCard
            key={s.to}
            title={s.label}
            description={s.desc}
            actions={
              <Button size="sm" variant="outline" asChild>
                <Link to={s.to}>
                  Open <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            }
          >
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <s.icon className="h-4 w-4" />
              Configure & version-control rules. All changes are audit-logged.
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
