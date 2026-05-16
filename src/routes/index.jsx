import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePersona } from "@/lib/persona";

const homes = {
  supervisor: "/supervisor",
  agent: "/agent",
  "qa-compliance": "/qa",
  manager: "/manager",
  admin: "/admin",
};

export default function PersonaRedirect() {
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
