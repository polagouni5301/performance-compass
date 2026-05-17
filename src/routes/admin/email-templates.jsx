import { PageHeader, SectionCard } from "@/components/shared/page-primitives";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const emails = [
  { id: "pip-init", name: "PIP initiation — to agent", to: "Agent", cc: "Manager" },
  { id: "pip-review", name: "PIP review summary", to: "Agent", cc: "Manager" },
  { id: "pip-success", name: "PIP closure — success", to: "Agent", cc: "Manager" },
  {
    id: "pip-extension",
    name: "PIP extension — manager approval",
    to: "Manager",
    cc: "Supervisor",
  },
  { id: "pip-failure", name: "PIP failure — HR referral", to: "Manager", cc: "HR" },
  { id: "cap-issued", name: "CAP issued — supervisor", to: "Supervisor", cc: "Manager, Issuer" },
  { id: "cap-dispute", name: "CAP dispute — issuer", to: "Issuer", cc: "Supervisor" },
  {
    id: "cap-exception",
    name: "CAP exception — approver",
    to: "QA / Compliance Mgr / SDL",
    cc: "Supervisor",
  },
  { id: "cap-ack", name: "CAP acknowledgement — agent", to: "Agent", cc: "Supervisor" },
];

export default function EmailTemplates() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin · Config"
        title="Email templates"
        description="System-generated emails across PIP & CAP lifecycle."
      />

      <SectionCard>
        <ul className="divide-y divide-border">
          {emails.map((e) => (
            <li
              key={e.id}
              className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{e.name}</div>
                  <div className="text-xs text-muted-foreground">
                    To: {e.to} · CC: {e.cc}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Edit template
              </Button>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
