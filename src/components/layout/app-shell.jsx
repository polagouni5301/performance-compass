import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  ShieldAlert,
  ClipboardList,
  FileSearch,
  Users,
  Bell,
  Search,
  Mail,
  CalendarCheck,
  FileText,
  CheckCircle2,
  XCircle,
  Inbox,
  Settings,
  Scale,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonaProvider, personas, usePersona } from "@/lib/persona";

const personaNav = {
  supervisor: {
    home: { label: "Supervisor home", to: "/supervisor", icon: LayoutDashboard, exact: true },
    sections: [
      {
        section: "PIP — Performance",
        items: [
          { label: "Candidate review", to: "/supervisor/pip/candidates", icon: Users },
          { label: "Initiate PIP", to: "/supervisor/pip/initiate", icon: ClipboardList },
          { label: "Active cases", to: "/pip/cases", icon: TrendingUp },
          { label: "Review cycle (15-day)", to: "/supervisor/pip/review", icon: CalendarCheck },
          { label: "Closure / Extension", to: "/supervisor/pip/closure", icon: CheckCircle2 },
          { label: "Failure escalation", to: "/supervisor/pip/failure", icon: XCircle },
        ],
      },
      {
        section: "CAP — Compliance",
        items: [
          { label: "Inbox · Accept / Dispute", to: "/supervisor/cap/inbox", icon: Inbox },
          { label: "Exception request", to: "/supervisor/cap/exception", icon: ShieldAlert },
          { label: "All CAP cases", to: "/cap/cases", icon: FileSearch },
        ],
      },
    ],
  },
  agent: {
    home: { label: "My cases", to: "/agent", icon: LayoutDashboard, exact: true },
    sections: [
      {
        section: "PIP",
        items: [
          { label: "My PIP", to: "/agent/pip", icon: TrendingUp, exact: true },
          { label: "Acknowledge PIP", to: "/agent/pip/acknowledge", icon: Mail, exact: true },
        ],
      },
      {
        section: "CAP",
        items: [
          { label: "My CAP / Warnings", to: "/agent/cap", icon: ShieldAlert, exact: true },
          { label: "Acknowledge CAP", to: "/agent/cap/acknowledge", icon: Mail, exact: true },
        ],
      },
    ],
  },
  "qa-compliance": {
    home: { label: "QA / Compliance home", to: "/qa", icon: LayoutDashboard, exact: true },
    sections: [
      {
        section: "Breach intake",
        items: [
          { label: "Log new breach", to: "/cap/new", icon: ClipboardList },
          
        ],
      },
      {
        section: "Tracker",
        items: [
          { label: "Disputes & Exceptions", to: "/qa/disputes", icon: Inbox },
          { label: "All Cases", to: "/cap/cases", icon: FileSearch },
        ],
      },
    ],
  },
  manager: {
    home: { label: "Manager home", to: "/manager", icon: LayoutDashboard, exact: true },
    sections: [
      {
        section: "Approvals",
        items: [
          { label: "PIP extension queue", to: "/pip/approvals", icon: Inbox },
          { label: "CAP exception queue", to: "/cap/exceptions", icon: ShieldAlert },
        ],
      },
      {
        section: "Oversight",
        items: [
          { label: "Team PIP cases", to: "/pip/cases", icon: TrendingUp },
          { label: "Team CAP cases", to: "/cap/cases", icon: FileSearch },
          { label: "Departments", to: "/manager/departments", icon: Briefcase },
        ],
      },
    ],
  },
  admin: {
    home: { label: "Admin home", to: "/admin", icon: LayoutDashboard, exact: true },
    sections: [
      {
        section: "System config",
        items: [
          { label: "Trigger rules", to: "/admin/triggers", icon: Settings },
          { label: "Document templates", to: "/admin/templates", icon: FileText },
          { label: "Email templates", to: "/admin/email-templates", icon: Mail },
          { label: "Role access", to: "/admin/roles", icon: Users },
          { label: "Departments", to: "/admin/departments", icon: Briefcase },
        ],
      },
      {
        section: "Audit & oversight",
        items: [
          { label: "Audit dashboard", to: "/audit", icon: FileSearch, exact: true },
          { label: "PIP register", to: "/pip/cases", icon: TrendingUp },
          { label: "CAP register", to: "/cap/cases", icon: FileSearch },
        ],
      },
    ],
  },
};

const personaIcon = {
  supervisor: Briefcase,
  agent: GraduationCap,
  "qa-compliance": ShieldCheck,
  manager: Scale,
  admin: Settings,
};

function NavLink({ to, icon: Icon, label, exact }) {
  const location = useLocation();
  const path = location.pathname;
  const active = exact ? path === to : path === to || path.startsWith(to + "/");
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-soft"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      <Icon
        className={cn("h-4 w-4", active ? "" : "text-muted-foreground group-hover:text-foreground")}
      />
      <span>{label}</span>
    </Link>
  );
}

function PersonaSwitcher() {
  const { persona, setPersona } = usePersona();
  const current = personas[persona];
  const Icon = personaIcon[persona];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-2xl border border-sidebar-border bg-sidebar-accent/40 p-3 text-left transition hover:bg-sidebar-accent">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-primary-foreground shadow-soft",
              current.accent,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Acting as
            </div>
            <div className="truncate text-sm font-semibold">{current.label}</div>
            <div className="truncate text-[11px] text-muted-foreground">{current.name}</div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Switch persona</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.values(personas).map((p) => {
          const PIcon = personaIcon[p.id];
          return (
            <DropdownMenuItem key={p.id} onClick={() => setPersona(p.id)} className="gap-3 py-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-primary-foreground",
                  p.accent,
                )}
              >
                <PIcon className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{p.label}</div>
                <div className="text-[11px] text-muted-foreground">{p.role}</div>
              </div>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/audit" className="text-xs">
            Open audit dashboard
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarBody() {
  const { persona } = usePersona();
  const config = personaNav[persona];

  return (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      <div className="space-y-1">
        <NavLink {...config.home} />
      </div>
      {config.sections.map((sec) => (
        <div key={sec.section} className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {sec.section}
          </div>
          {sec.items.map((it) => (
            <NavLink key={it.to} {...it} />
          ))}
        </div>
      ))}
     
    </nav>
  );
}

function HeaderUser() {
  const { persona } = usePersona();
  const p = personas[persona];
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-2 py-1.5">
      <div
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-semibold text-primary-foreground",
          p.accent,
        )}
      >
        {p.initials}
      </div>
      <div className="hidden text-left leading-tight md:block">
        <div className="text-xs font-semibold">{p.name}</div>
        <div className="text-[10px] text-muted-foreground">{p.role}</div>
      </div>
    </div>
  );
}

function ShellInner() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Consequence Mgmt</div>
            <div className="text-[11px] text-muted-foreground">CAP & PIP Module</div>
          </div>
        </div>

        <div className="px-3 pt-4">
          <PersonaSwitcher />
        </div>

        <SidebarBody />

        
      </aside>

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
          <HeaderUser />
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function AppShell() {
  return <ShellInner />;
}
