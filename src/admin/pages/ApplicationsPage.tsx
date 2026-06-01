import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Application, ApplicationStatus, ApplicationType } from "../types";
import { getApplications, updateApplicationStatus, getApplicationTypes } from "../api/applications";
import AdminLayout from "../components/AdminLayout";
import StatusBadge from "../components/StatusBadge";
import { useLang, t } from "../context/LangContext";
import type { Lang } from "../context/LangContext";

type StatusOption = { value: ApplicationStatus; key: "stat_pending"|"stat_in_progress"|"stat_completed"|"stat_rejected" };

const STATUS_OPTIONS: StatusOption[] = [
  { value: 0, key: "stat_pending" },
  { value: 1, key: "stat_in_progress" },
  { value: 2, key: "stat_completed" },
  { value: 3, key: "stat_rejected" },
];

function getAppTypeName(type: ApplicationType, lang: Lang): string {
  if (lang === "ru") return type.name_ru;
  if (lang === "uz") return type.name_uz;
  return type.name_en ?? type.name_ru;
}

export default function ApplicationsPage() {
  const { lang } = useLang();
  const [applications, setApplications] = useState<Application[]>([]);
  const [appTypes, setAppTypes] = useState<ApplicationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  function getTypeName(id: number): string {
    const found = appTypes.find(tp => tp.id === id);
    if (!found) return `#${id}`;
    return getAppTypeName(found, lang);
  }

  async function loadApplications() {
    try {
      setLoading(true);
      setError(null);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("err_loading", lang));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
    getApplicationTypes()
      .then(types => setAppTypes(types))
      .catch(err => console.error("getApplicationTypes failed:", err));
  }, []);

  async function handleStatusChange(id: number, status: ApplicationStatus) {
    try {
      setUpdatingId(id);
      const updated = await updateApplicationStatus(id, status);
      setApplications(prev => prev.map(a => a.id === id ? updated : a));
      if (selectedApp?.id === id) setSelectedApp(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : t("err_update_status", lang));
    } finally {
      setUpdatingId(null);
    }
  }

  function closeModal() {
    setSelectedApp(null);
    setIsEditing(false);
  }

  const filtered = filter === "all"
    ? applications
    : applications.filter(a => a.status === filter);

  const stats = {
    total:       applications.length,
    pending:     applications.filter(a => a.status === 0).length,
    in_progress: applications.filter(a => a.status === 1).length,
    completed:   applications.filter(a => a.status === 2).length,
    rejected:    applications.filter(a => a.status === 3).length,
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.75rem", color: "#1B5E20", marginBottom: 4 }}>
          {t("apps_title", lang)}
        </h1>
        <div style={{ fontSize: "0.9rem", color: "#8A7E6E" }}>
          {t("apps_subtitle", lang)}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: t("stat_total",       lang), value: stats.total,       color: "#1E1A14", bg: "#fff"    },
          { label: t("stat_pending",     lang), value: stats.pending,     color: "#E65100", bg: "#FFF3E0" },
          { label: t("stat_in_progress", lang), value: stats.in_progress, color: "#1565C0", bg: "#E3F2FD" },
          { label: t("stat_completed",   lang), value: stats.completed,   color: "#1B5E20", bg: "#E8F5E9" },
          { label: t("stat_rejected",    lang), value: stats.rejected,    color: "#C62828", bg: "#FFEBEE" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, border: "1px solid #DDD0B8", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#8A7E6E", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Merriweather',serif", fontSize: "1.75rem", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {[{ value: "all" as const, label: t("filter_all", lang) },
          ...STATUS_OPTIONS.map(o => ({ value: o.value, label: t(o.key, lang) }))
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              padding: "8px 16px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600,
              border: "1px solid",
              borderColor: filter === opt.value ? "#1B5E20" : "#DDD0B8",
              background: filter === opt.value ? "#1B5E20" : "#fff",
              color: filter === opt.value ? "#fff" : "#4A4438",
              cursor: "pointer",
            }}
          >
            {opt.label}
          </button>
        ))}
        <button
          onClick={loadApplications}
          style={{
            padding: "8px 16px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600,
            border: "1px solid #DDD0B8", background: "#fff", color: "#4A4438",
            cursor: "pointer", marginLeft: "auto",
          }}
        >
          {t("btn_refresh", lang)}
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #DDD0B8", borderRadius: 12, overflow: "hidden" }}>
        {loading && <div style={{ padding: "40px", textAlign: "center", color: "#8A7E6E" }}>{t("loading", lang)}</div>}
        {error && <div style={{ padding: "20px", color: "#C62828", background: "#FFEBEE" }}>⚠️ {error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#8A7E6E" }}>{t("no_apps", lang)}</div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5EDD6", textAlign: "left" }}>
                <th style={thStyle}>{t("th_id",      lang)}</th>
                <th style={thStyle}>{t("th_name",    lang)}</th>
                <th style={thStyle}>{t("th_phone",   lang)}</th>
                <th style={thStyle}>{t("th_subject", lang)}</th>
                <th style={thStyle}>{t("th_date",    lang)}</th>
                <th style={thStyle}>{t("th_status",  lang)}</th>
                <th style={thStyle}>{t("th_actions", lang)}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id} style={{ borderTop: "1px solid #F0E6CC" }}>
                  <td style={tdStyle}>#{app.id}</td>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{app.full_name}</td>
                  <td style={tdStyle}>
                    <a href={`tel:${app.phone_number}`} style={{ color: "#1B5E20", textDecoration: "none" }}>
                      {app.phone_number}
                    </a>
                  </td>
                  <td style={tdStyle}>{getTypeName(app.application_type_id)}</td>
                  <td style={{ ...tdStyle, fontSize: "0.82rem", color: "#8A7E6E" }}>{formatDate(app.created_at, lang)}</td>
                  <td style={tdStyle}><StatusBadge status={app.status} /></td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => { setSelectedApp(app); setIsEditing(false); }}
                      style={{
                        padding: "6px 12px", borderRadius: 6, fontSize: "0.82rem",
                        fontWeight: 600, background: "#1B5E20", color: "#fff",
                        border: "none", cursor: "pointer",
                      }}
                    >
                      {t("btn_view", lang)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selectedApp && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 16, padding: "28px 32px",
              maxWidth: 600, width: "100%", maxHeight: "90vh", overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: "0.78rem", color: "#8A7E6E", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                  {t("modal_app_label", lang)} #{selectedApp.id}
                </div>
                <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.4rem", color: "#1B5E20" }}>
                  {selectedApp.full_name}
                </h2>
              </div>
              <button onClick={closeModal} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#8A7E6E" }}>
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <DetailRow label={t("modal_phone", lang)}>
                <a href={`tel:${selectedApp.phone_number}`} style={{ color: "#1B5E20", fontWeight: 600 }}>
                  {selectedApp.phone_number}
                </a>
              </DetailRow>
              <DetailRow label={t("modal_subject", lang)}>
                {getTypeName(selectedApp.application_type_id)}
              </DetailRow>
              <DetailRow label={t("modal_date", lang)}>{formatDate(selectedApp.created_at, lang)}</DetailRow>
              <DetailRow label={t("modal_status", lang)}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <StatusBadge status={selectedApp.status} />
                  <button
                    onClick={() => setIsEditing(v => !v)}
                    style={{
                      padding: "4px 12px", borderRadius: 20, fontSize: "0.78rem",
                      fontWeight: 600, border: "1px solid #DDD0B8",
                      background: isEditing ? "#1B5E20" : "#fff",
                      color: isEditing ? "#fff" : "#4A4438",
                      cursor: "pointer",
                    }}
                  >
                    {isEditing ? t("modal_cancel", lang) : t("modal_edit", lang)}
                  </button>
                </div>
              </DetailRow>

              {isEditing && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {STATUS_OPTIONS.map(o => {
                    const isActive = selectedApp.status === o.value;
                    const colors: Record<number, { activeBg: string; color: string; border: string }> = {
                      0: { activeBg: "#FFF3E0", color: "#E65100", border: "#FFB74D" },
                      1: { activeBg: "#E3F2FD", color: "#1565C0", border: "#64B5F6" },
                      2: { activeBg: "#E8F5E9", color: "#1B5E20", border: "#81C784" },
                      3: { activeBg: "#FFEBEE", color: "#C62828", border: "#EF9A9A" },
                    };
                    const c = colors[o.value];
                    return (
                      <button
                        key={o.value}
                        onClick={() => { handleStatusChange(selectedApp.id, o.value); setIsEditing(false); }}
                        disabled={updatingId === selectedApp.id || isActive}
                        style={{
                          padding: "8px 18px", borderRadius: 20, fontSize: "0.85rem",
                          fontWeight: 700, cursor: isActive ? "default" : "pointer",
                          border: `2px solid ${isActive ? c.border : "#DDD0B8"}`,
                          background: isActive ? c.activeBg : "#fff",
                          color: isActive ? c.color : "#4A4438",
                          opacity: updatingId === selectedApp.id && !isActive ? 0.5 : 1,
                          transition: "all 0.15s ease",
                        }}
                      >
                        {isActive && "✓ "}{t(o.key, lang)}
                      </button>
                    );
                  })}
                </div>
              )}

              <DetailRow label={t("modal_msg", lang)}>
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                  {selectedApp.description || <span style={{ color: "#8A7E6E", fontStyle: "italic" }}>{t("modal_empty", lang)}</span>}
                </div>
              </DetailRow>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: "0.75rem", color: "#8A7E6E", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: "0.95rem", color: "#1E1A14" }}>{children}</div>
    </div>
  );
}

function formatDate(iso: string, lang: string): string {
  try {
    const d = new Date(iso);
    const locale = lang === "uz" ? "uz-UZ" : lang === "en" ? "en-US" : "ru-RU";
    return d.toLocaleString(locale, {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

const thStyle: CSSProperties = {
  padding: "12px 16px", fontSize: "0.78rem", fontWeight: 700,
  color: "#4A4438", textTransform: "uppercase", letterSpacing: "0.06em",
};

const tdStyle: CSSProperties = {
  padding: "14px 16px", fontSize: "0.9rem", color: "#1E1A14",
};
