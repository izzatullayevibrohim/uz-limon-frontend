import { useLang } from "../context/LangContext";
import { t } from "../context/LangContext";

const STATUS_CONFIG: Record<number, { key: "stat_pending"|"stat_in_progress"|"stat_completed"|"stat_rejected"; bg: string; color: string }> = {
  0: { key: "stat_pending",     bg: "#FFF3E0", color: "#E65100" },
  1: { key: "stat_in_progress", bg: "#E3F2FD", color: "#1565C0" },
  2: { key: "stat_completed",   bg: "#E8F5E9", color: "#1B5E20" },
  3: { key: "stat_rejected",    bg: "#FFEBEE", color: "#C62828" },
};

export default function StatusBadge({ status }: { status: number }) {
  const { lang } = useLang();
  const cfg = STATUS_CONFIG[Number(status)];

  if (!cfg) {
    return (
      <span style={{
        display: "inline-block", padding: "4px 12px", borderRadius: 12,
        fontSize: "0.78rem", fontWeight: 700, background: "#F5F5F5", color: "#9E9E9E",
      }}>
        #{status}
      </span>
    );
  }

  return (
    <span style={{
      display: "inline-block", padding: "4px 12px", borderRadius: 12,
      fontSize: "0.78rem", fontWeight: 700,
      background: cfg.bg, color: cfg.color, whiteSpace: "nowrap",
    }}>
      {t(cfg.key, lang)}
    </span>
  );
}
