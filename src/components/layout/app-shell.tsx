import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  TrendingUp,
  ShieldAlert,
  ClipboardList,
  FileSearch,
  Users,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Overview", to: "/", icon: LayoutDashboard, exact: true },
  {
    section: "PIP — Performance",
    items: [
      { label: "PIP Dashboard", to: "/pip", icon: TrendingUp },
      { label: "Candidates", to: "/pip/candidates", icon: Users },
      { label: "Active Cases", to: "/pip/cases", icon: ClipboardList },
      { label: "Extension Approvals", to: "/pip/approvals", icon: FileSearch },
    ],
  },
  {
    section: "CAP — Compliance",
    items: [
      { label: "CAP Dashboard", to: "/cap", icon: ShieldAlert },
      { label: "Log New Breach", to: "/cap/new", icon: ClipboardList },
      { label: "All Cases", to: "/cap/cases", icon: FileSearch },
      { label: "Exceptions", to: "/cap/exceptions", icon: ShieldAlert },
    ],
  },
  {
    section: "Governance",
    items: [{ label: "Audit Dashboard", to: "/audit", icon: FileSearch }],
  },
];

function NavLink({ to, icon: Icon, label, exact }: { to: string; icon: any; label: string; exact?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? path === to : path === to || path.startsWith(to + "/");
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-soft"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn("h-4 w-4", active ? "" : "text-muted-foreground group-hover:text-foreground")} />
      <span>{label}</span>
    </Link>
  );
}

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Consequence Mgmt</div>
            <div className="text-[11px] text-muted-foreground">CAP & PIP Module</div>
          </div>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {nav.map((entry, i) =>
            "section" in entry ? (
              <div key={i} className="space-y-1">
                <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {entry.section}
                </div>
                {entry.items.map((it) => (
                  <NavLink key={it.to} {...it} />
                ))}
              </div>
            ) : (
              <NavLink key={entry.to} {...entry} />
            )
          )}
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-2xl bg-gradient-warm p-4 shadow-soft">
            <div className="text-xs font-semibold">Audit-ready</div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              Every PIP & CAP action is logged with full lifecycle traceability.
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/85 px-5 backdrop-blur lg:px-8">
          <div className="relative hidden flex-1 max-w-md md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search OHR ID, case ID, employee…"
              className="w-full rounded-xl border border-input bg-secondary/60 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:bg-background"
            />
          </div>
          <div className="flex flex-1 md:flex-none" />
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-2 py-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
              PS
            </div>
            <div className="hidden text-left leading-tight md:block">
              <div className="text-xs font-semibold">Priya Shah</div>
              <div className="text-[10px] text-muted-foreground">Supervisor · Claims Ops</div>
            </div>
            <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground md:block" />
          </div>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
