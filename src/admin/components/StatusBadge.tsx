import type { ApplicationStatus } from "../types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; bg: string; color: string }> = {
  pending: { label: "В ожидании", bg: "#FFF3E0", color: "#E65100" },
  in_progress: { label: "В работе", bg: "#E3F2FD", color: "#1565C0" },
  completed: { label: "Завершено", bg: "#E8F5E9", color: "#1B5E20" },
  rejected: { label: "Отклонено", bg: "#FFEBEE", color: "#C62828" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: 12,
      fontSize: "0.78rem",
      fontWeight: 700,
      background: cfg.bg,
      color: cfg.color,
      whiteSpace: "nowrap",
    }}>
      {cfg.label}
    </span>
  );
}