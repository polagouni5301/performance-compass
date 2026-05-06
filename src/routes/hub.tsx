import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Workspace Hub · IWO Suite" },
      { name: "description", content: "Access and manage all operational systems from a unified interface." },
    ],
  }),
  component: HubPage,
});

const I = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const IconBell = (p: any) => <I {...p} d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Zm4 13a2 2 0 0 0 4 0" />;
const IconSearch = (p: any) => <I {...p} d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 4 4" />;
const IconArrow = (p: any) => <I {...p} d="M5 12h14m-5-5 5 5-5 5" />;
const IconChart = (p: any) => <I {...p} d="M3 3v18h18M7 14v4M12 9v9M17 5v13" />;
const IconLayers = (p: any) => <I {...p} d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" />;
const IconCog = (p: any) => <I {...p} d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />;
const IconBolt = (p: any) => <I {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;
const IconShield = (p: any) => <I {...p} d="M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Z" />;
const IconUsers = (p: any) => <I {...p} d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 9v-2a4 4 0 0 0-3-3.9M16 3.1A4 4 0 0 1 16 11" />;
const IconCal = (p: any) => <I {...p} d="M3 8h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3-2v4m8-4v4" />;
const IconFile = (p: any) => <I {...p} d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Zm0 0v6h6" />;

type Tag = { label: string; tone: "engine" | "workflow" | "analytics" | "api" | "automation" | "governance" | "scoring" | "audit" | "scheduling" | "validation" | "monitoring" | "forecasting" | "data" | "simulation" };
const tagStyles: Record<Tag["tone"], string> = {
  engine: "bg-primary-soft text-primary border-primary/20",
  workflow: "bg-info/10 text-info border-info/20",
  analytics: "bg-[oklch(0.95_0.06_305)] text-[oklch(0.5_0.18_305)] border-[oklch(0.55_0.18_305)]/25",
  api: "bg-secondary text-foreground border-border",
  automation: "bg-warning/15 text-warning-foreground border-warning/30",
  governance: "bg-destructive/10 text-destructive border-destructive/20",
  scoring: "bg-success/10 text-success border-success/20",
  audit: "bg-foreground/5 text-foreground border-border",
  scheduling: "bg-info/10 text-info border-info/20",
  validation: "bg-success/10 text-success border-success/20",
  monitoring: "bg-warning/15 text-warning-foreground border-warning/30",
  forecasting: "bg-[oklch(0.95_0.06_305)] text-[oklch(0.5_0.18_305)] border-[oklch(0.55_0.18_305)]/25",
  data: "bg-info/10 text-info border-info/20",
  simulation: "bg-primary-soft text-primary border-primary/20",
};

type Status = "Active" | "Configured" | "Needs Setup";
const statusStyles: Record<Status, string> = {
  Active: "bg-success/10 text-success border-success/25",
  Configured: "bg-info/10 text-info border-info/25",
  "Needs Setup": "bg-warning/15 text-warning-foreground border-warning/30",
};

function HubPage() {
  const tools: {
    title: string;
    desc: string;
    bullets: string[];
    tags: Tag[];
    status: Status;
    last: string;
    icon: any;
    accent: string;
    href: string;
  }[] = [
    {
      title: "Target Allocation System",
      desc: "Distribute revenue targets using NRPC baselines and constraint-aware allocation.",
      bullets: [
        "NRPC baseline engine (weighted historical computation)",
        "Constraint processing (tenure, shift, PIP)",
        "Rebalancing algorithm for revenue matching",
        "Simulation support for what-if scenarios",
      ],
      tags: [{ label: "Engine", tone: "engine" }, { label: "Simulation", tone: "simulation" }, { label: "Data Processing", tone: "data" }],
      status: "Active",
      last: "2 minutes ago",
      icon: IconChart,
      accent: "from-primary-soft to-card",
      href: "/landing",
    },
    {
      title: "Leave & Shrinkage Manager",
      desc: "Plan and manage leaves with quota validation and approval workflows.",
      bullets: [
        "Leave quota engine",
        "Swap request workflow",
        "Role-based approvals",
        "Schedule conflict validation",
      ],
      tags: [{ label: "Workflow", tone: "workflow" }, { label: "Validation", tone: "validation" }, { label: "Scheduling", tone: "scheduling" }],
      status: "Configured",
      last: "1 hour ago",
      icon: IconLayers,
      accent: "from-info/10 to-card",
      href: "/landing",
    },
    {
      title: "1-on-1 Auto Scheduler",
      desc: "Automates coaching sessions based on KPI performance.",
      bullets: [
        "KPI breach detection",
        "Auto scheduling engine",
        "Calendar integration (Microsoft Teams)",
        "Escalation & reminder system",
      ],
      tags: [{ label: "Automation", tone: "automation" }, { label: "Scheduling", tone: "scheduling" }, { label: "Monitoring", tone: "monitoring" }],
      status: "Active",
      last: "12 minutes ago",
      icon: IconCog,
      accent: "from-warning/15 to-card",
      href: "/landing",
    },
    {
      title: "AES & Promotion Tracker",
      desc: "Evaluate performance, calculate incentives, and track promotions.",
      bullets: [
        "KPI scoring + stack ranking",
        "Incentive calculation engine",
        "Qualification validation",
        "Promotion prediction model",
      ],
      tags: [{ label: "Analytics", tone: "analytics" }, { label: "Scoring", tone: "scoring" }, { label: "Forecasting", tone: "forecasting" }],
      status: "Active",
      last: "Today, 09:14",
      icon: IconBolt,
      accent: "from-[oklch(0.96_0.04_305)] to-card",
      href: "/landing",
    },
    {
      title: "CAP & PIP Management",
      desc: "Manage performance and compliance actions with full audit tracking.",
      bullets: [
        "PIP/CAP trigger engine",
        "Document generation engine",
        "Review cycle tracking (15-day intervals)",
        "Multi-level approval workflows",
      ],
      tags: [{ label: "Governance", tone: "governance" }, { label: "Workflow", tone: "workflow" }, { label: "Audit", tone: "audit" }],
      status: "Active",
      last: "5 minutes ago",
      icon: IconShield,
      accent: "from-destructive/10 to-card",
      href: "/supervisor",
    },
  ];

  const stats = [
    { l: "Total Agents Managed", v: "10,248", icon: IconUsers, tone: "text-primary" },
    { l: "Active PIPs", v: "37", icon: IconShield, tone: "text-destructive" },
    { l: "Upcoming Sessions", v: "124", icon: IconCal, tone: "text-info" },
    { l: "Allocation Status", v: "Synced", icon: IconBolt, tone: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-warm text-foreground">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[1fr_320px]">
        {/* MAIN */}
        <main>
          {/* HEADER */}
          <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card/70 p-5 shadow-soft backdrop-blur">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Link to="/landing" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary hover:underline">
                  ← IWO Suite
                </Link>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Workspace Hub</h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Access and manage all operational systems from a unified interface.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground shadow-soft md:flex">
                <IconSearch className="h-4 w-4" />
                <span>Search modules, agents, tickets…</span>
                <kbd className="ml-2 rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground/60">⌘K</kbd>
              </div>
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-soft hover:bg-secondary">
                <IconBell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </button>
              <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-2 py-1.5 shadow-soft">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.7_0.22_18)] text-xs font-bold text-primary-foreground">
                  AD
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold">Asha Devi</div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-success" /> Admin
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* QUICK BANNER */}
          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {[
              { l: "Engines online", v: "5 / 5", t: "All systems operational" },
              { l: "Pending approvals", v: "12", t: "PIP extensions · CAP exceptions" },
              { l: "Today's runs", v: "318", t: "Async jobs processed" },
            ].map((b) => (
              <div key={b.l} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{b.l}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-2xl font-bold tracking-tight">{b.v}</div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{b.t}</div>
              </div>
            ))}
          </div>

          {/* TOOL CARDS */}
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Operational Systems</h2>
              <p className="text-xs text-muted-foreground">Five integrated engines · click to enter the workspace</p>
            </div>
            <div className="flex gap-1 rounded-lg border border-border bg-card p-1 text-xs shadow-soft">
              <button className="rounded-md bg-foreground px-3 py-1 font-medium text-background">All</button>
              <button className="rounded-md px-3 py-1 text-muted-foreground hover:text-foreground">Engines</button>
              <button className="rounded-md px-3 py-1 text-muted-foreground hover:text-foreground">Workflows</button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-2">
            {tools.map((t) => (
              <Link
                key={t.title}
                to={t.href}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${t.accent} p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated`}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-2xl transition group-hover:opacity-60"
                  style={{ background: "var(--primary)" }}
                />
                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-primary shadow-soft">
                      <t.icon className="h-5 w-5" />
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusStyles[t.status]}`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                      {t.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>

                  <ul className="mt-4 space-y-1.5">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-xs text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.tags.map((tag) => (
                      <span key={tag.label} className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${tagStyles[tag.tone]}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-3">
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Last activity · {t.last}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background transition group-hover:bg-primary group-hover:text-primary-foreground">
                      Open Tool <IconArrow className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ACTIVITY STRIP */}
          <section className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold tracking-tight">Recent System Events</h3>
                <p className="text-xs text-muted-foreground">Streaming from audit pipeline · last 24h</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">live</span>
            </div>
            <div className="divide-y divide-border">
              {[
                { t: "Allocation engine completed run #ax_91a2 across 14 departments", time: "2m ago", tag: "Allocation", tone: "engine" as const },
                { t: "PIP case PIP-1024 entered cycle 3 · 2/3 KPIs met", time: "11m ago", tag: "Governance", tone: "governance" as const },
                { t: "Auto-scheduler created 14 coaching sessions for Voice — Sales", time: "37m ago", tag: "Automation", tone: "automation" as const },
                { t: "AES weekly bonus computation completed · 8,412 agents", time: "1h ago", tag: "Analytics", tone: "analytics" as const },
              ].map((e) => (
                <div key={e.t} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <IconFile className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground/80">{e.t}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${tagStyles[e.tone]}`}>{e.tag}</span>
                    <span className="text-[11px] text-muted-foreground">{e.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="space-y-4 lg:sticky lg:top-8 lg:h-fit">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold tracking-tight">Quick Stats</h3>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">today</span>
            </div>
            <div className="space-y-2.5">
              {stats.map((s) => (
                <div key={s.l} className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-3 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-card ${s.tone}`}>
                      <s.icon className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                  </div>
                  <div className="text-sm font-bold tracking-tight">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary-soft to-card p-5 shadow-soft">
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">Pinned</div>
            <h3 className="text-sm font-bold tracking-tight">CAP & PIP queue</h3>
            <p className="mt-1 text-xs text-muted-foreground">12 actions need your review across 4 departments.</p>
            <Link to="/supervisor" className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-glow transition hover:brightness-110">
              Review queue <IconArrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-bold tracking-tight">System Health</h3>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { l: "Allocation Engine", v: "Healthy", tone: "bg-success" },
                { l: "Rule Service", v: "Healthy", tone: "bg-success" },
                { l: "Notification Bus", v: "Degraded", tone: "bg-warning" },
                { l: "Audit Pipeline", v: "Healthy", tone: "bg-success" },
              ].map((s) => (
                <div key={s.l} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <span className={`h-1.5 w-1.5 rounded-full ${s.tone}`} />
                    {s.l}
                  </div>
                  <span className="text-muted-foreground">{s.v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-border bg-background/60 p-5 text-xs text-muted-foreground">
            <div className="mb-1 font-semibold text-foreground">Need a new module?</div>
            Spin up a sandbox engine via the API gateway and connect it to the rule layer.
          </div>
        </aside>
      </div>
    </div>
  );
}
