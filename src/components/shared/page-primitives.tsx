import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  tone = "default",
}: {
  label: string;
  value: string | number;
  delta?: string;
  hint?: string;
  icon?: any;
  tone?: "default" | "primary" | "success" | "warning" | "danger";
}) {
  const tones = {
    default: "bg-card",
    primary: "bg-gradient-to-br from-primary-soft to-card",
    success: "bg-gradient-to-br from-success/10 to-card",
    warning: "bg-gradient-to-br from-warning/15 to-card",
    danger: "bg-gradient-to-br from-destructive/10 to-card",
  };
  return (
    <div className={cn("relative rounded-2xl border border-border p-5 shadow-soft", tones[tone])}>
      <div className="flex items-start justify-between">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/60">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {delta && (
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
            <ArrowUpRight className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card shadow-soft", className)}>
      {(title || actions) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="text-base font-semibold tracking-tight">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
