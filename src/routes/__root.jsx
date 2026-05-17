import { Outlet, useLocation } from "react-router-dom";
import { AppShell } from "@/components/layout/app-shell";
import { PersonaProvider } from "@/lib/persona";

const STANDALONE = ["/landing", "/hub"];

export default function Root() {
  const location = useLocation();
  const pathname = location.pathname;

  if (STANDALONE.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return (
      <PersonaProvider>
        <Outlet />
      </PersonaProvider>
    );
  }

  return (
    <PersonaProvider>
      <AppShell />
    </PersonaProvider>
  );
}
