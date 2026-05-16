import { cn } from "@/lib/utils";

const tone = {
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary-soft text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/15 text-warning-foreground border-warning/30",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info border-info/20",
};

export function StatusBadge({ children, variant = "neutral", className, dot = true }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-tight",
        tone[variant],
        className,
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", `bg-current opacity-80`)} />}
      {children}
    </span>
  );
}

const pipMap = {
  candidate: { label: "Candidate", variant: "warning" },
  active: { label: "Active", variant: "primary" },
  extended: { label: "Extended", variant: "info" },
  "closed-success": { label: "Closed — Success", variant: "success" },
  "closed-failed": { label: "Closed — Failed", variant: "danger" },
  "pending-approval": { label: "Pending Approval", variant: "warning" },
};

export function PIPStatusBadge({ status }) {
  const m = pipMap[status];
  return <StatusBadge variant={m.variant}>{m.label}</StatusBadge>;
}

const capStatusMap = {
  logged: { label: "Logged", variant: "info" },
  accepted: { label: "Accepted", variant: "primary" },
  disputed: { label: "Disputed", variant: "warning" },
  "exception-pending": { label: "Exception Pending", variant: "warning" },
  closed: { label: "Closed", variant: "success" },
  "hr-escalation": { label: "HR Escalation", variant: "danger" },
};

export function CAPStatusBadge({ status }) {
  const m = capStatusMap[status];
  return <StatusBadge variant={m.variant}>{m.label}</StatusBadge>;
}

const capLevelMap = {
  "CAP 1": "warning",
  "CAP 2": "primary",
  "CAP 3": "danger",
};

export function CAPLevelBadge({ level }) {
  return (
    <StatusBadge variant={capLevelMap[level]} dot={false} className="font-semibold">
      {level}
    </StatusBadge>
  );
}

export function ReviewStatusBadge({ status }) {
  const map = {
    pending: { label: "Pending", variant: "neutral" },
    met: { label: "Target Met", variant: "success" },
    "not-met": { label: "Not Met", variant: "danger" },
    scheduled: { label: "Scheduled", variant: "info" },
  };
  return <StatusBadge variant={map[status].variant}>{map[status].label}</StatusBadge>;
}
