import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/hub")({
  head: () => ({
    meta: [
      { title: "Workspace · Virtual Supervisor" },
      { name: "description", content: "Access and manage all operational systems from a unified Virtual Supervisor workspace." },
    ],
  }),
  component: HubPage,
});

const I = ({ d, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const IconBell = (p) => <I {...p} d="M6 8a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9Zm4 13a2 2 0 0 0 4 0" />;
const IconSearch = (p) => <I {...p} d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm6-2 4 4" />;
const IconArrow = (p) => <I {...p} d="M5 12h14m-5-5 5 5-5 5" />;
const IconChart = (p) => <I {...p} d="M3 3v18h18M7 14v4M12 9v9M17 5v13" />;
const IconLayers = (p) => <I {...p} d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" />;
const IconCog = (p) => <I {...p} d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />;
const IconBolt = (p) => <I {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;
const IconShield = (p) => <I {...p} d="M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Z" />;
const IconSpark = (p) => <I {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />;

const Logo = ({ size = 36 }) => (
  <div
    className="flex items-center justify-center rounded-xl text-primary-foreground shadow-glow"
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, var(--primary), oklch(0.7 0.22 18))",
    }}
  >
    <svg viewBox="0 0 32 32" width={size * 0.55} height={size * 0.55} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6l8 16M21 22l6-16M11 18h8" />
    </svg>
  </div>
);

const tagStyles = {
  engine: "bg-primary-soft text-primary border-primary/20",
  workflow: "bg-info/10 text-info border-info/20",
  analytics: "bg-[oklch(0.95_0.06_305)] text-[oklch(0.5_0.18_305)] border-[oklch(0.55_0.18_305)]/25",
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

const statusStyles = {
  Active: "bg-success/10 text-success border-success/25",
  Configured: "bg-info/10 text-info border-info/25",
  "Needs Setup": "bg-warning/15 text-warning-foreground border-warning/30",
};

function HubPage() {
  const tools = [
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

  return (
    <div className="min-h-screen bg-gradient-warm text-foreground">
      {/* HEADER — sticky, logo left + right, tool name */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">Virtual Supervisor</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workspace Hub</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs text-muted-foreground shadow-soft md:flex">
            <IconSearch className="h-4 w-4" />
            <span>Search modules, agents, tickets…</span>
            <kbd className="ml-2 rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-foreground/60">⌘K</kbd>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card shadow-soft hover:bg-secondary">
              <IconBell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-2 py-1.5 shadow-soft">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.7_0.22_18)] text-xs font-bold text-primary-foreground">
                AJ
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold">Alex Johnson</div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-success" /> Supervisor
                </div>
              </div>
            </div>
            <Logo size={32} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-6 py-12">
        {/* HERO — no card, clean editorial layout */}
        <section className="mb-12 grid items-end gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <IconSpark className="h-3.5 w-3.5 text-primary" />
              <span>{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="text-success">All systems green</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Welcome back,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(120deg, var(--primary), oklch(0.55 0.22 305))" }}
              >
                Alex Johnson
              </span>
              <span className="text-foreground">.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">
              Pick up where you left off — five engines are running quietly in the background.
              Choose a workspace below to drive the next decision.
            </p>
          </div>

          {/* right side — vertical accent meta */}
          <div className="hidden md:block">
            <div className="border-l-2 border-primary/40 pl-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Today at a glance</div>
              <div className="mt-3 space-y-2.5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground">Cases on your desk</span>
                  <span className="text-lg font-bold tracking-tight">12</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground">Coaching scheduled</span>
                  <span className="text-lg font-bold tracking-tight">4</span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-muted-foreground">Active personas</span>
                  <span className="text-lg font-bold tracking-tight">Supervisor</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TOOL CARDS — full width, no sidebar */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Operational Systems</h2>
            <p className="text-xs text-muted-foreground">Five integrated engines · click to enter the workspace</p>
          </div>
          <div className="hidden gap-1 rounded-lg border border-border bg-card p-1 text-xs shadow-soft md:flex">
            <button className="rounded-md bg-foreground px-3 py-1 font-medium text-background">All</button>
            <button className="rounded-md px-3 py-1 text-muted-foreground hover:text-foreground">Engines</button>
            <button className="rounded-md px-3 py-1 text-muted-foreground hover:text-foreground">Workflows</button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((t) => (
            <Link
              key={t.title}
              to={t.href}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${t.accent} p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated`}
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
      </div>
    </div>
  );
}
