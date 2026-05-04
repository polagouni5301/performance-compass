import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Persona =
  | "supervisor"
  | "agent"
  | "qa-compliance"
  | "manager"
  | "admin"
  | "auditor";

export interface PersonaInfo {
  id: Persona;
  label: string;
  role: string;
  initials: string;
  name: string;
  team: string;
  accent: string;
}

export const personas: Record<Persona, PersonaInfo> = {
  supervisor: { id: "supervisor", label: "Supervisor", role: "Team Lead · Claims Ops", initials: "PS", name: "Priya Shah", team: "Claims Ops", accent: "from-primary to-primary-glow" },
  agent: { id: "agent", label: "Agent", role: "Senior Associate", initials: "MB", name: "Marcus Bennett", team: "Underwriting", accent: "from-info to-primary" },
  "qa-compliance": { id: "qa-compliance", label: "QA / Compliance", role: "Quality Auditor", initials: "NA", name: "Nikhil Anand", team: "QA Team", accent: "from-warning to-primary" },
  manager: { id: "manager", label: "Manager", role: "Operations Manager", initials: "RI", name: "Rohan Iyer", team: "Claims Ops", accent: "from-success to-primary" },
  admin: { id: "admin", label: "Admin", role: "System Administrator", initials: "AD", name: "Asha Devi", team: "Platform Ops", accent: "from-destructive to-primary" },
  auditor: { id: "auditor", label: "Auditor", role: "Read-only · Governance", initials: "HP", name: "Helena Park", team: "Risk & Audit", accent: "from-muted to-primary" },
};

const KEY = "active-persona-v1";

const Ctx = createContext<{ persona: Persona; setPersona: (p: Persona) => void }>({
  persona: "supervisor",
  setPersona: () => {},
});

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState<Persona>("supervisor");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
    if (stored && stored in personas) setPersonaState(stored as Persona);
  }, []);

  const setPersona = (p: Persona) => {
    setPersonaState(p);
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, p);
  };

  return <Ctx.Provider value={{ persona, setPersona }}>{children}</Ctx.Provider>;
}

export function usePersona() {
  return useContext(Ctx);
}
