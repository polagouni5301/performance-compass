import { Link } from "react-router-dom";

/* ── inline icons ─────────────────────────────────────────────── */
const I = ({ d, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);
const IconBolt = (p) => <I {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;
const IconChart = (p) => <I {...p} d="M3 3v18h18M7 14v4M12 9v9M17 5v13" />;
const IconShield = (p) => <I {...p} d="M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Z" />;
const IconLayers = (p) => <I {...p} d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" />;
const IconCog = (p) => (
  <I
    {...p}
    d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.9a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.5a7 7 0 0 0-2 1.2l-2.4-.9-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.4-.9c.6.5 1.3.9 2 1.2L10 21h4l.5-2.5c.7-.3 1.4-.7 2-1.2l2.4.9 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"
  />
);
const IconArrow = (p) => <I {...p} d="M5 12h14m-5-5 5 5-5 5" />;
const IconCheck = (p) => <I {...p} d="M5 12l5 5L20 7" />;
const IconFlow = (p) => <I {...p} d="M5 6h6v4H5Zm8 8h6v4h-6ZM8 10v4h8" />;
const IconApi = (p) => <I {...p} d="M4 7h4v10H4Zm12 0h4v10h-4ZM8 12h8" />;
const IconLock = (p) => <I {...p} d="M6 11V8a6 6 0 1 1 12 0v3M5 11h14v10H5Z" />;
const IconKey = (p) => <I {...p} d="M15 7a4 4 0 1 1-3.9 5H8v3H5v3H2v-3l7.1-7.1A4 4 0 0 1 15 7Z" />;
const IconUsers = (p) => (
  <I
    {...p}
    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 9v-2a4 4 0 0 0-3-3.9"
  />
);
const IconSpark = (p) => (
  <I
    {...p}
    d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"
  />
);
const IconStar = (p) => (
  <I {...p} d="m12 3 2.5 6 6.5.5-5 4.5 1.5 6.5L12 17l-5.5 3.5L8 14 3 9.5l6.5-.5L12 3Z" />
);

/* Logo */
const Logo = ({ size = 36 }) => (
  <div
    className="relative flex items-center justify-center rounded-xl text-primary-foreground shadow-glow"
    style={{
      width: size,
      height: size,
      background: "linear-gradient(135deg, var(--primary), oklch(0.7 0.22 18))",
    }}
  >
    <svg
      viewBox="0 0 32 32"
      width={size * 0.55}
      height={size * 0.55}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 6l8 16M21 22l6-16M11 18h8" />
    </svg>
  </div>
);

/* small "Okta" wordmark badge */
const OktaBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/75 shadow-soft">
    <span
      className="flex h-3.5 w-3.5 items-center justify-center rounded-full"
      style={{ background: "oklch(0.55 0.18 250)" }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-background" />
    </span>
    Okta SSO
  </span>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* ── top nav ───────────────────────────────────────── */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">Virtual Supervisor</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Workforce OS
              </div>
            </div>
          </div>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#platform" className="hover:text-foreground">
              Platform
            </a>
            <a href="#modules" className="hover:text-foreground">
              Modules
            </a>
            <a href="#architecture" className="hover:text-foreground">
              Architecture
            </a>
            <a href="#security" className="hover:text-foreground">
              Security
            </a>
            <a href="#trust" className="hover:text-foreground">
              Governance
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/hub"
              className="hidden rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-soft hover:bg-secondary md:inline-flex"
            >
              Open Workspace
            </Link>
            <Link
              to="/hub"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3.5 py-1.5 text-xs font-semibold text-background hover:bg-primary hover:text-primary-foreground"
            >
              Launch <IconArrow className="h-3.5 w-3.5" />
            </Link>
            <Logo size={32} />
          </div>
        </div>
      </header>

      {/* ── hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* soft glows */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 15% 0%, var(--primary-soft), transparent 60%), radial-gradient(ellipse 55% 45% at 95% 25%, oklch(0.95 0.06 305), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 110%, oklch(0.95 0.08 200 / 0.5), transparent 60%)",
          }}
        />
        {/* grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* floating dots */}
        <div
          className="pointer-events-none absolute -z-10 h-2 w-2 animate-pulse rounded-full bg-primary/40 blur-[1px]"
          style={{ top: "18%", left: "8%" }}
        />
        <div
          className="pointer-events-none absolute -z-10 h-1.5 w-1.5 animate-pulse rounded-full bg-info/40"
          style={{ top: "62%", left: "20%" }}
        />
        <div
          className="pointer-events-none absolute -z-10 h-2 w-2 animate-pulse rounded-full bg-success/40"
          style={{ top: "30%", right: "12%" }}
        />

        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px] font-medium text-foreground/80 shadow-soft backdrop-blur">
              <span className="flex h-1.5 w-1.5 rounded-full bg-success" />
              v4.2 — Adaptive PIP cycles · AES v3 scoring · Okta-first SSO
            </div>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              The operating system for{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(120deg, var(--primary), oklch(0.55 0.22 305))",
                }}
              >
                modern contact center operations.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              <span className="font-semibold text-foreground">Virtual Supervisor</span> unifies five
              intelligent engines — Allocation, LSM, Auto Scheduler, AES, and CAP/PIP — under one
              governed control plane, secured with{" "}
              <span className="font-semibold text-foreground">Okta SSO</span> and{" "}
              <span className="font-semibold text-foreground">role-based access</span> for every
              persona in your operation.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/hub"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:brightness-110"
              >
                Open Workspace
                <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-soft hover:bg-secondary"
              >
                Explore modules
              </a>
              <OktaBadge />
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-4 gap-3">
              {[
                { v: "10k+", l: "Agents managed" },
                { v: "5", l: "Engines" },
                { v: "6", l: "Persona roles" },
                { v: "99.98%", l: "Uptime" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-border bg-card/70 p-3 backdrop-blur"
                >
                  <div className="text-xl font-bold tracking-tight">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* dashboard preview card */}
          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60 blur-2xl"
              style={{
                background: "linear-gradient(135deg, var(--primary-soft), oklch(0.95 0.06 305))",
              }}
            />
            <div className="rotate-[-1.5deg] rounded-2xl border border-border bg-card/90 p-4 shadow-elevated backdrop-blur-xl transition hover:rotate-0">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                  <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  virtualsupervisor.app/hub
                </div>
              </div>

              <div className="rounded-xl border border-border bg-gradient-to-br from-primary-soft/60 to-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      Live KPI signal
                    </div>
                    <div className="text-lg font-bold tracking-tight">Voice — Sales · 14:32</div>
                  </div>
                  <span className="rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    streaming
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: "Conversion", v: "31.4%", t: "+2.1" },
                    { l: "AHT", v: "5:12", t: "−0:08" },
                    { l: "QA", v: "92", t: "+1" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-lg border border-border bg-card p-2.5">
                      <div className="text-[10px] text-muted-foreground">{m.l}</div>
                      <div className="text-base font-bold">{m.v}</div>
                      <div className="text-[10px] text-success">{m.t}</div>
                    </div>
                  ))}
                </div>

                <svg viewBox="0 0 300 80" className="mt-3 h-20 w-full">
                  <defs>
                    <linearGradient id="lg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 60 L30 50 L60 55 L90 40 L120 45 L150 30 L180 35 L210 22 L240 28 L270 18 L300 24 L300 80 L0 80Z"
                    fill="url(#lg)"
                  />
                  <path
                    d="M0 60 L30 50 L60 55 L90 40 L120 45 L150 30 L180 35 L210 22 L240 28 L270 18 L300 24"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  { l: "PIP cycles open", v: "37", icon: IconShield, tone: "text-destructive" },
                  { l: "Coaching today", v: "124", icon: IconCog, tone: "text-info" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <s.icon className={`h-4 w-4 ${s.tone}`} />
                      <span className="text-xs text-muted-foreground">{s.l}</span>
                    </div>
                    <span className="text-sm font-bold">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* floating chips */}
            <div className="absolute -left-6 top-12 hidden rotate-[3deg] rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-elevated md:block">
              <div className="flex items-center gap-2">
                <IconBolt className="h-4 w-4 text-warning" />
                <span className="font-semibold">Auto-Scheduler</span>
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                created 14 sessions · 12s ago
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 hidden rotate-[-2deg] rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-elevated md:block">
              <div className="flex items-center gap-2">
                <IconShield className="h-4 w-4 text-destructive" />
                <span className="font-semibold">CAP triggered</span>
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                Agent #A2148 · QA breach
              </div>
            </div>
            <div className="absolute -right-8 top-6 hidden rotate-[4deg] rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-elevated lg:block">
              <div className="flex items-center gap-2">
                <IconKey className="h-4 w-4 text-info" />
                <span className="font-semibold">SSO via Okta</span>
              </div>
              <div className="mt-0.5 text-[10px] text-muted-foreground">
                SAML · 6 role groups synced
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── trust strip ───────────────────────────────────── */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Trusted across</span>
          <span className="font-semibold text-foreground">Voice · Messaging · CDT</span>
          <span>· 14 departments</span>
          <span>· SOC2 ready</span>
          <span>· SAML / Okta SSO</span>
          <span>· RBAC enforced</span>
          <span>· 99.98% uptime</span>
        </div>
      </section>

      {/* ── platform pillars ──────────────────────────────── */}
      <section id="platform" className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Platform
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            One control plane for every workforce decision.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Virtual Supervisor sits between your data warehouse and your operations team — turning
            raw KPIs into governed, auditable actions across allocation, scheduling, performance and
            compliance.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: IconFlow,
              t: "Unified data plane",
              d: "Stream KPIs from telephony, QA, AES and HRIS into one normalized model — no exports, no batch lags.",
            },
            {
              icon: IconSpark,
              t: "Decision engines",
              d: "Five domain-specific engines apply rules, ML scoring and constraints to recommend the right operational move.",
            },
            {
              icon: IconLock,
              t: "Governed actions",
              d: "Every action is templated, approved, logged and reversible — built for HR-grade auditability and dispute defense.",
            },
          ].map((p) => (
            <div
              key={p.t}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-0 blur-2xl transition group-hover:opacity-50"
                style={{ background: "var(--primary)" }}
              />
              <div className="relative">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight">{p.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── modules grid ──────────────────────────────────── */}
      <section id="modules" className="border-y border-border/60 bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-6 py-20">
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                Modules
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Five engines. One workspace.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Each module ships with its own rules, dashboards and APIs — fully composable, never
                siloed.
              </p>
            </div>
            <Link
              to="/hub"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background hover:bg-primary hover:text-primary-foreground"
            >
              Enter workspace <IconArrow className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                n: "01",
                t: "Target Allocation",
                d: "NRPC baselining, constraint-aware distribution and what-if simulation for revenue targets.",
                icon: IconChart,
                tags: ["Engine", "Simulation"],
              },
              {
                n: "02",
                t: "Leave & Shrinkage Manager",
                d: "Quota validation, swap workflows and conflict-aware approvals with role-scoped visibility.",
                icon: IconLayers,
                tags: ["Workflow", "Validation"],
              },
              {
                n: "03",
                t: "1-on-1 Auto Scheduler",
                d: "KPI-breach detection, calendar integration and escalation logic for guaranteed coaching cadence.",
                icon: IconCog,
                tags: ["Automation", "Calendar"],
              },
              {
                n: "04",
                t: "AES & Promotion Tracker",
                d: "Stack-ranked scoring, incentive computation and promotion forecasting across cohorts.",
                icon: IconBolt,
                tags: ["Analytics", "Scoring"],
              },
              {
                n: "05",
                t: "CAP & PIP Management",
                d: "Trigger engine, document generation, 15-day review cycles and full audit lifecycle.",
                icon: IconShield,
                tags: ["Governance", "Audit"],
              },
              {
                n: "+",
                t: "API & Webhooks",
                d: "Programmatic access to every engine — push events, pull metrics, embed widgets.",
                icon: IconApi,
                tags: ["API", "Webhooks"],
              },
            ].map((m) => (
              <div
                key={m.t}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition group-hover:opacity-50"
                  style={{ background: "var(--primary)" }}
                />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <m.icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                      {m.n}
                    </span>
                  </div>
                  <h3 className="text-base font-bold tracking-tight">{m.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {m.tags.map((tg) => (
                      <span
                        key={tg}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground/80"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── architecture pipeline ─────────────────────────── */}
      <section id="architecture" className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Architecture
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            From raw signal to governed action.
          </h2>
          <p className="mt-3 text-muted-foreground">
            A four-layer pipeline turns telemetry into compliant, reversible operational decisions.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              n: "01",
              t: "Ingestion",
              d: "Telephony · QA · HRIS · AES · Schedulers",
              tone: "from-info/15",
            },
            {
              n: "02",
              t: "Normalization",
              d: "Unified KPI model · agent · department · cycle",
              tone: "from-primary-soft",
            },
            {
              n: "03",
              t: "Engines",
              d: "Allocation · LSM · Scheduler · AES · CAP/PIP",
              tone: "from-warning/20",
            },
            {
              n: "04",
              t: "Governance",
              d: "Approvals · audit log · documents · disputes",
              tone: "from-destructive/10",
            },
          ].map((s, i) => (
            <div
              key={s.t}
              className={`relative rounded-2xl border border-border bg-gradient-to-br ${s.tone} to-card p-5 shadow-soft`}
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                layer {s.n}
              </div>
              <div className="mt-1.5 text-base font-bold tracking-tight">{s.t}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.d}</div>
              {i < 3 && (
                <IconArrow className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── SECURITY: Okta + RBAC ─────────────────────────── */}
      <section id="security" className="relative overflow-hidden border-y border-border/60">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 100% 0%, oklch(0.95 0.08 250 / 0.55), transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, var(--primary-soft), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-[1fr_1.05fr] md:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Identity & Access
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Okta-secured. Role-aware. Persona-scoped.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every login flows through your Okta tenant via SAML SSO. Group claims map directly to
              persona roles inside Virtual Supervisor — Supervisor, Agent, QA / Compliance, Manager,
              Admin and Auditor — so the right person sees only the right screens, queues and
              actions.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "SAML 2.0 SSO with Okta · SCIM-style group sync",
                "6 built-in personas with granular module-level RBAC",
                "Per-action permissions — view, raise, approve, close, dispute",
                "Department & queue scoping (Voice, Messaging, CDT)",
                "Just-in-time provisioning · session policies via Okta",
              ].map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/85">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SSO + RBAC visualization */}
          <div className="grid gap-4">
            {/* SSO flow card */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconKey className="h-4 w-4 text-info" />
                  <span className="text-sm font-bold tracking-tight">SSO flow</span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  SAML 2.0
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 text-center text-[11px]">
                {[
                  { l: "User", icon: IconUsers, tone: "bg-card" },
                  { l: "Okta", icon: IconKey, tone: "bg-info/10 text-info" },
                  {
                    l: "Virtual Supervisor",
                    icon: IconShield,
                    tone: "bg-primary-soft text-primary",
                  },
                ].map((step, i, arr) => (
                  <div key={step.l} className="flex flex-1 items-center gap-2">
                    <div
                      className={`flex flex-1 flex-col items-center gap-1.5 rounded-xl border border-border ${step.tone} px-2 py-3`}
                    >
                      <step.icon className="h-4 w-4" />
                      <span className="font-semibold text-foreground/90">{step.l}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <IconArrow className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>1. Auth request</span>
                <span>2. Group claim</span>
                <span>3. Persona scope</span>
              </div>
            </div>

            {/* RBAC matrix */}
            <div className="rounded-2xl border border-border bg-card p-5 shadow-elevated">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconLock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold tracking-tight">Role-based access matrix</span>
                </div>
                <span className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold">
                  6 roles
                </span>
              </div>
              <div className="grid grid-cols-[1.1fr_repeat(4,minmax(0,1fr))] gap-y-1 text-[11px]">
                <div></div>
                {["PIP", "CAP", "Approve", "Audit"].map((c) => (
                  <div
                    key={c}
                    className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {c}
                  </div>
                ))}
                {[
                  { r: "Supervisor", v: [1, 1, 0, 0] },
                  { r: "Agent", v: [0.5, 0.5, 0, 0] },
                  { r: "QA / Compliance", v: [0, 1, 0, 1] },
                  { r: "Manager", v: [1, 1, 1, 0] },
                  { r: "Admin", v: [1, 1, 1, 1] },
                  { r: "Auditor", v: [0.5, 0.5, 0, 1] },
                ].map((row) => (
                  <div key={row.r} className="contents">
                    <div className="border-t border-border py-2 text-foreground/85">{row.r}</div>
                    {row.v.map((v, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center border-t border-border py-2"
                      >
                        {v === 1 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                            <IconCheck className="h-3 w-3" />
                          </span>
                        )}
                        {v === 0.5 && (
                          <span className="rounded-md border border-info/30 bg-info/10 px-1.5 py-0.5 text-[9px] font-semibold text-info">
                            view
                          </span>
                        )}
                        {v === 0 && <span className="text-muted-foreground/50">—</span>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── built for every persona ───────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="mb-10 max-w-3xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            Personas
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            A workspace tuned to every role.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Six dedicated experiences. Same data plane. No accidental cross-team visibility.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {[
            { r: "Supervisor", d: "Run candidate review, raise CAP/PIP, drive review cycles." },
            { r: "Agent", d: "Track personal cases, acknowledge documents, capture proof." },
            { r: "QA / Compliance", d: "Intake breaches, recommend actions, resolve disputes." },
            { r: "Manager", d: "Approve extensions, oversee departments, exception triage." },
            { r: "Admin", d: "Configure rules, templates, role matrix and integrations." },
            { r: "Auditor", d: "Read-only, full-lifecycle visibility across every register." },
          ].map((p, i) => (
            <div
              key={p.r}
              className="rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                0{i + 1}
              </div>
              <div className="mt-1 text-sm font-bold tracking-tight">{p.r}</div>
              <div className="mt-1 text-xs text-muted-foreground">{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── governance ────────────────────────────────────── */}
      <section id="trust" className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Governance
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Auditable by design. Defensible by default.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Every PIP, CAP, target change, leave approval and coaching session is captured with
              actor, timestamp, source rule and proof — exportable for HR, legal and regulatory
              review.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Immutable audit trail across all five engines",
                "Email proof capture (.eml) on every formal acknowledgement",
                "Configurable trigger rules without engineering work",
                "Exception & dispute workflows with reason codes",
              ].map((l) => (
                <li key={l} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/85">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm font-bold tracking-tight">Audit log · live</div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                streaming
              </span>
            </div>
            <div className="divide-y divide-border">
              {[
                { a: "Sup. R. Khan", e: "approved PIP cycle 2 closure", t: "12s" },
                { a: "QA. M. Patel", e: "raised CAP for Agent A2148", t: "1m" },
                { a: "system", e: "auto-scheduled 14 coaching sessions", t: "3m" },
                { a: "Mgr. A. Rao", e: "approved leave swap · Voice — Sales", t: "8m" },
                { a: "system", e: "AES weekly bonus computed · 8412 agents", t: "21m" },
                { a: "Okta", e: "synced 38 group changes · 6 roles", t: "1h" },
              ].map((row) => (
                <div key={row.e} className="flex items-center justify-between py-2.5 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="font-semibold">{row.a}</span>
                    <span className="text-muted-foreground">{row.e}</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">{row.t} ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── testimonial ───────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              q: "We cut PIP cycle time from 9 weeks to 6 — and zero disputes survived audit review.",
              a: "Head of Operations · Voice",
              s: 5,
            },
            {
              q: "Okta + role scoping finally killed the spreadsheet sprawl. Supervisors only see their teams.",
              a: "IT Security Lead",
              s: 5,
            },
            {
              q: "Auto-Scheduler alone gave each supervisor back two hours a day.",
              a: "Senior Manager · Messaging",
              s: 5,
            },
          ].map((t) => (
            <div key={t.q} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: t.s }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm text-foreground/85">"{t.q}"</p>
              <div className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground">
                {t.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 pb-20">
        <div
          className="relative overflow-hidden rounded-3xl border border-border p-10 shadow-elevated md:p-14"
          style={{
            background:
              "linear-gradient(135deg, var(--primary-soft), var(--card) 60%, oklch(0.95 0.06 305))",
          }}
        >
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
            style={{ background: "var(--primary)" }}
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{ background: "oklch(0.7 0.18 305)" }}
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Step into your Virtual Supervisor workspace.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Five engines. One Okta login. Six personas. Zero spreadsheets.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/hub"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:brightness-110"
              >
                Open Workspace <IconArrow className="h-4 w-4" />
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-secondary"
              >
                Browse modules
              </a>
              <OktaBadge />
            </div>
          </div>
        </div>
      </section>

      {/* ── footer ────────────────────────────────────────── */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-8">
          <div className="flex items-center gap-3">
            <Logo size={32} />
            <div className="text-xs">
              <div className="font-bold">Virtual Supervisor</div>
              <div className="text-muted-foreground">
                © {new Date().getFullYear()} — All rights reserved
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Security
            </a>
            <a href="#" className="hover:text-foreground">
              Status
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
