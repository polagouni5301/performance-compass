import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAP & PIP Consequence Management" },
      { name: "description", content: "Persona-driven consequence management for performance and compliance." },
    ],
  }),
  component: PersonaRedirect,
});

const homes: Record<string, string> = {
  supervisor: "/supervisor",
  agent: "/agent",
  "qa-compliance": "/qa",
  manager: "/manager",
  admin: "/admin",
  auditor: "/audit",
};

function PersonaRedirect() {
  const { persona } = usePersona();
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: homes[persona] ?? "/supervisor", replace: true });
  }, [persona, navigate]);
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
      Loading your persona workspace…
    </div>
  );
}
