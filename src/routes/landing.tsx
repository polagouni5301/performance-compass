import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Intelligent Workforce Optimization Suite" },
      {
        name: "description",
        content:
          "Unified platform combining allocation engines, KPI intelligence, coaching automation, and compliance governance.",
      },
    ],
  }),
  component: LandingPage,
});

/* ── tiny inline icon helpers (no deps) ─────────────────────────── */
const I = ({ d, className = "h-5 w-5" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d={d} />
  </svg>
);
const IconBolt = (p: any) => <I {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;
const IconDb = (p: any) => <I {...p} d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />;
const IconCog = (p: any) => <I {...p} d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z" />;
const IconChart = (p: any) => <I {...p} d="M3 3v18h18M7 14v4M12 9v9M17 5v13" />;
const IconShield = (p: any) => <I {...p} d="M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Z" />;
const IconLayers = (p: any) => <I {...p} d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" />;
const IconApi = (p: any) => <I {...p} d="M4 7h4v10H4Zm12 0h4v10h-4ZM8 12h8M9 4l1 3M14 4l1 3M9 20l1-3M14 20l1-3" />;
const IconFlow = (p: any) => <I {...p} d="M5 6h6v4H5Zm8 8h6v4h-6ZM8 10v4h8" />;
const IconLock = (p: any) => <I {...p} d="M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5Z" />;
const IconArrow = (p: any) => <I {...p} d="M5 12h14m-5-5 5 5-5 5" />;

/* ── module deep-dive block ─────────────────────────────────────── */
const ModuleBlock = ({
  index,
  title,
  desc,
  highlights,
  apis,
  icon: Icon,
}: {
  index: string;
  title: string;
  desc: string;
  highlights: string[];
  apis?: string[];
  icon: any;
}) => (
  <div className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[1.2fr_1fr] md:p-10">
    <div>
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-lg bg-primary-soft px-2 py-1 font-mono text-[11px] font-semibold text-primary">
          MODULE {index}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Production-grade</span>
      </div>
      <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-secondary text-primary">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="space-y-5">
      <div>
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">
          Technical Highlights
        </div>
        <ul className="space-y-2">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-foreground/80">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
      {apis && (
        <div className="rounded-2xl border border-border bg-secondary/60 p-4">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/70">
            Core APIs
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {apis.map((a) => {
              const [m, ...rest] = a.split(" ");
              return (
                <div key={a} className="flex items-center gap-2">
                  <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                    {m}
                  </span>
                  <span className="text-foreground/80">{rest.join(" ")}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  </div>
);

function LandingPage() {
  const modules = [
    {
      index: "01",
      title: "Target Allocation System",
      desc: "A constraint-aware allocation engine that distributes revenue targets using historical NRPC, tenure segmentation, and operational rules.",
      icon: IconChart,
      highlights: [
        "Weighted NRPC baseline computation (3–4 month historical data)",
        "Rule engine for uplift %, non-peak adjustments, and PIP constraints",
        "Rebalancing algorithm ensuring total revenue == client target",
        "Manual override with real-time recomputation",
        "Simulation engine for what-if scenarios",
      ],
      apis: ["POST /nrpc/base/upload", "POST /allocation/run", "POST /allocation/override", "GET /simulation"],
    },
    {
      index: "02",
      title: "Leave & Shrinkage Manager (LSM)",
      desc: "A quota-aware leave planning system ensuring operational coverage across teams.",
      icon: IconLayers,
      highlights: [
        "Leave quota validation engine",
        "Real-time approval workflow system",
        "Swap request state machine",
        "Role-based access (Agent / Supervisor / Manager / Admin)",
        "Conflict detection for scheduling overlaps",
      ],
    },
    {
      index: "03",
      title: "1-on-1 Auto Scheduler",
      desc: "A KPI-triggered coaching automation system with calendar-aware scheduling.",
      icon: IconCog,
      highlights: [
        "KPI breach detection engine (threshold-based)",
        "Auto scheduling system with Microsoft Teams integration",
        "Constraint solver (no overlaps, availability-aware)",
        "Escalation engine with multi-level reminders",
        "Feedback capture + acknowledgment tracking",
      ],
      apis: ["POST /session/create", "PUT /session/reschedule", "POST /feedback"],
    },
    {
      index: "04",
      title: "AES & Promotion Readiness Tracker",
      desc: "A performance evaluation and incentive computation engine with promotion forecasting.",
      icon: IconBolt,
      highlights: [
        "KPI scoring engine with weighted metrics",
        "Stack ranking algorithm (percentile-based rating buckets)",
        "Incentive calculation system (weekly + monthly)",
        "Qualification validation engine",
        "Promotion prediction model (12-month rolling analysis)",
      ],
      apis: ["POST /aes/calculate", "GET /bonus", "GET /promotion"],
    },
    {
      index: "05",
      title: "CAP & PIP Management System",
      desc: "A governance system for performance and compliance actions with full audit traceability.",
      icon: IconShield,
      highlights: [
        "Rule-based trigger engine (warnings + ratings logic)",
        "Document generation engine (dynamic Word docs)",
        "Review cycle automation (15-day intervals)",
        "Approval workflows (multi-level)",
        "Audit logging system",
      ],
      apis: ["POST /pip/create", "POST /cap/create", "POST /approve", "GET /document"],
    },
  ];

  const flow = [
    { label: "Data Ingestion", sub: "CSV / XLSX / SQL", icon: IconDb },
    { label: "Processing Engines", sub: "Rule + Allocation", icon: IconCog },
    { label: "Decision Systems", sub: "Scoring · Triggers", icon: IconBolt },
    { label: "Output & Governance", sub: "Dashboards · Audit", icon: IconShield },
  ];

  const capabilities = [
    { icon: IconBolt, t: "Real-time Processing", d: "<5s allocation engines on 10K+ records" },
    { icon: IconDb, t: "File Ingestion", d: "CSV/XLSX validation + preview pipeline" },
    { icon: IconChart, t: "Simulation & Forecasting", d: "What-if engines and rolling models" },
    { icon: IconLock, t: "Secure Role-Based Access", d: "Agent → Manager → Admin RBAC" },
    { icon: IconLayers, t: "BI Dashboards", d: "Agent · Team · Department views" },
    { icon: IconFlow, t: "Workflow Automation", d: "Notifications, approvals, escalations" },
    { icon: IconCog, t: "Rule Configuration Layer", d: "Editable thresholds, weights, policies" },
    { icon: IconApi, t: "API-First Architecture", d: "REST endpoints for every engine" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.7_0.22_18)] text-primary-foreground shadow-glow">
              <IconLayers className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight">IWO Suite</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Intelligent Workforce
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#architecture" className="hover:text-foreground">Architecture</a>
            <a href="#modules" className="hover:text-foreground">Modules</a>
            <a href="#capabilities" className="hover:text-foreground">Capabilities</a>
            <a href="#scale" className="hover:text-foreground">Scale</a>
          </nav>
          <Link
            to="/hub"
            className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition hover:opacity-90"
          >
            Open Workspace <IconArrow className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 80% 0%, oklch(0.95 0.04 22 / 0.9) 0%, transparent 60%), radial-gradient(50% 40% at 0% 30%, oklch(0.96 0.012 60) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Enterprise platform · v2.4 · 99.98% uptime
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Transform Workforce Operations with{" "}
              <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.18_305)] bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A unified platform that combines allocation engines, KPI intelligence, coaching automation, and
              compliance governance into one scalable system.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#architecture"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                Explore Platform <IconArrow className="h-4 w-4" />
              </a>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:bg-secondary"
              >
                View Modules
              </a>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Agents managed</div>
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Core engines</div>
              </div>
              <div>
                <div className="text-2xl font-bold">&lt;5s</div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Allocation runtime</div>
              </div>
            </div>
          </div>

          {/* Hero diagram */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-primary-soft via-secondary to-card opacity-80 blur-2xl" />
            <div className="rounded-3xl border border-border bg-card/70 p-6 shadow-elevated backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  system.architecture
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { l: "Sources", v: "CSV · XLSX · SQL · BI", i: IconDb, c: "from-info/15 to-card" },
                  { l: "Engines", v: "Allocation · Rule · KPI", i: IconCog, c: "from-primary-soft to-card" },
                  { l: "Outputs", v: "Decisions · Triggers", i: IconBolt, c: "from-warning/20 to-card" },
                  { l: "Dashboards", v: "Audit · Governance", i: IconShield, c: "from-success/15 to-card" },
                ].map((row) => (
                  <div key={row.l} className={`flex items-center justify-between rounded-2xl border border-border bg-gradient-to-r ${row.c} px-4 py-3`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-card text-primary shadow-soft">
                        <row.i className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{row.l}</div>
                        <div className="text-sm font-semibold">{row.v}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span className="h-1 w-6 rounded-full bg-primary/40" />
                      <span className="h-1 w-1 rounded-full bg-primary" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">
                {["api.run", "engine.exec", "audit.log"].map((k) => (
                  <div key={k} className="rounded-lg bg-secondary/70 px-2 py-1.5 text-center font-mono text-[10px] text-foreground/70">
                    {k}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHITECTURE FLOW */}
      <section id="architecture" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-10 max-w-2xl">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Platform Overview
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">System Architecture</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              From ingestion to governance — every layer is observable, configurable, and API-first.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {flow.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                  </div>
                  <div className="text-base font-semibold">{s.label}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
                </div>
                {i < flow.length - 1 && (
                  <div className="hidden md:absolute md:right-[-14px] md:top-1/2 md:block md:-translate-y-1/2 text-muted-foreground">
                    <IconArrow className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {[
              { i: IconDb, t: "File Upload APIs" },
              { i: IconChart, t: "KPI Pipelines" },
              { i: IconCog, t: "Rule Engines" },
              { i: IconBolt, t: "Allocation & Scoring" },
              { i: IconFlow, t: "Notifications & Workflows" },
              { i: IconApi, t: "Export & Reporting APIs" },
            ].map((c) => (
              <div key={c.t} className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 text-xs shadow-soft">
                <c.i className="h-4 w-4 text-primary" />
                <span className="font-medium">{c.t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Core Modules
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Five engines. One platform.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every module ships with a configurable rule layer, a REST API, and a full audit trail.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] text-muted-foreground shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live · v2.4 · API stable
          </div>
        </div>

        <div className="space-y-6">
          {modules.map((m) => (
            <ModuleBlock key={m.index} {...m} />
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="border-y border-border bg-gradient-to-b from-secondary/40 to-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-10 max-w-2xl">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Platform Capabilities
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for operational scale.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.t} className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{c.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCALE */}
      <section id="scale" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center">
          <div>
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Data & Scalability
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Engineered for 10K+ agents and growing.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Modular microservices, stateless processing, and async pipelines keep every engine fast under load.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Handles 10K+ agents across departments",
                "Modular microservice-ready APIs",
                "Stateless processing engines",
                "Async job handling for file processing",
                "High-performance computation pipelines",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5">
                  <span className="mt-1.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                cluster.metrics
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> healthy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Throughput", v: "12.4K req/min", h: "+18%" },
                { l: "Allocation P95", v: "4.6s", h: "-22%" },
                { l: "Async Jobs", v: "318 queued", h: "stable" },
                { l: "Audit Events", v: "1.2M / day", h: "+9%" },
              ].map((m) => (
                <div key={m.l} className="rounded-2xl border border-border bg-secondary/50 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
                  <div className="mt-1 text-xl font-bold">{m.v}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{m.h}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-border bg-background/60 p-4 font-mono text-[11px] leading-relaxed text-foreground/70">
              <div className="text-success">$ POST /allocation/run</div>
              <div>→ ingesting nrpc_baseline.xlsx ✓</div>
              <div>→ engine.rule.apply (uplift, non-peak, pip) ✓</div>
              <div>→ rebalancing 8,412 agents across 14 depts ✓</div>
              <div className="text-primary">✓ committed in 4.71s · audit_id=ax_91a2</div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-border">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              "radial-gradient(50% 60% at 50% 0%, oklch(0.95 0.04 22 / 0.8) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            Move from manual operations to{" "}
            <span className="bg-gradient-to-r from-primary to-[oklch(0.55_0.18_305)] bg-clip-text text-transparent">
              intelligent systems
            </span>
            .
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Replace spreadsheets, ad-hoc reports, and manual approvals with deterministic engines and auditable workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/hub"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
            >
              Start Using Platform <IconArrow className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground shadow-soft transition hover:bg-secondary"
            >
              Request Demo
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} IWO Suite · Intelligent Workforce Optimization</div>
          <div className="flex gap-5">
            <span>SOC 2 · ISO 27001</span>
            <span>API v2.4</span>
            <span>Status: operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
