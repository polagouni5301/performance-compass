import { createContext, useContext, useState, useEffect } from "react";

export const personas = {
  supervisor: {
    id: "supervisor",
    label: "Supervisor",
    role: "Team Lead · Claims Ops",
    initials: "PS",
    name: "Priya Shah",
    team: "Claims Ops",
    accent: "from-primary to-primary-glow",
  },
  agent: {
    id: "agent",
    label: "Agent",
    role: "Senior Associate",
    initials: "MB",
    name: "Marcus Bennett",
    team: "Underwriting",
    accent: "from-info to-primary",
  },
  "qa-compliance": {
    id: "qa-compliance",
    label: "QA / Compliance",
    role: "Quality Auditor",
    initials: "NA",
    name: "Nikhil Anand",
    team: "QA Team",
    accent: "from-warning to-primary",
  },
  manager: {
    id: "manager",
    label: "Manager",
    role: "Operations Manager",
    initials: "RI",
    name: "Rohan Iyer",
    team: "Claims Ops",
    accent: "from-success to-primary",
  },
  admin: {
    id: "admin",
    label: "Admin & Audit",
    role: "System Admin · Governance",
    initials: "AD",
    name: "Asha Devi",
    team: "Platform Ops",
    accent: "from-destructive to-primary",
  },
};

const KEY = "active-persona-v1";

const Ctx = createContext({
  persona: "supervisor",
  setPersona: () => {},
});

export function PersonaProvider({ children }) {
  const [persona, setPersonaState] = useState("supervisor");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
    if (stored && stored in personas) setPersonaState(stored);
  }, []);

  const setPersona = (p) => {
    setPersonaState(p);
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, p);
  };

  return <Ctx.Provider value={{ persona, setPersona }}>{children}</Ctx.Provider>;
}

export function usePersona() {
  return useContext(Ctx);
}
