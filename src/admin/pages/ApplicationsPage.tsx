import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import type { Application, ApplicationStatus } from "../types";
import { getApplications, updateApplicationStatus } from "../api/applications";
import AdminLayout from "../components/AdminLayout";
import StatusBadge from "../components/StatusBadge";

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: "pending", label: "В ожидании" },
  { value: "in_progress", label: "В работе" },
  { value: "completed", label: "Завершено" },
  { value: "rejected", label: "Отклонено" },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  async function loadApplications() {
    try {
      setLoading(true);
      setError(null);
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadApplications();
  }, []);

  async function handleStatusChange(id: number, status: ApplicationStatus) {
    try {
      setUpdatingId(id);
      const updated = await updateApplicationStatus(id, status);
      setApplications(prev => prev.map(a => a.id === id ? updated : a));
      if (selectedApp?.id === id) setSelectedApp(updated);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Не удалось обновить статус");
    } finally {
      setUpdatingId(null);
    }
  }

  const filtered = filter === "all"
    ? applications
    : applications.filter(a => a.status === filter);

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    in_progress: applications.filter(a => a.status === "in_progress").length,
    completed: applications.filter(a => a.status === "completed").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  return (
    <AdminLayout>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.75rem", color: "#1B5E20", marginBottom: 4 }}>
          Заявки
        </h1>
        <div style={{ fontSize: "0.9rem", color: "#8A7E6E" }}>
          Управление обращениями от посетителей сайта
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Всего", value: stats.total, color: "#1E1A14", bg: "#fff" },
          { label: "В ожидании", value: stats.pending, color: "#E65100", bg: "#FFF3E0" },
          { label: "В работе", value: stats.in_progress, color: "#1565C0", bg: "#E3F2FD" },
          { label: "Завершено", value: stats.completed, color: "#1B5E20", bg: "#E8F5E9" },
          { label: "Отклонено", value: stats.rejected, color: "#C62828", bg: "#FFEBEE" },
        ].map((s, i) => (
          <div key={i} style={{ background: s.bg, border: "1px solid #DDD0B8", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "#8A7E6E", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: "'Merriweather',serif", fontSize: "1.75rem", fontWeight: 700, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { value: "all" as const, label: "Все" },
          ...STATUS_OPTIONS,
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              fontSize: "0.85rem",
              fontWeight: 600,
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
          🔄 Обновить
        </button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #DDD0B8", borderRadius: 12, overflow: "hidden" }}>
        {loading && (
          <div style={{ padding: "40px", textAlign: "center", color: "#8A7E6E" }}>Загрузка...</div>
        )}

        {error && (
          <div style={{ padding: "20px", color: "#C62828", background: "#FFEBEE" }}>
            ⚠️ {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ padding: "40px", textAlign: "center", color: "#8A7E6E" }}>
            Заявок нет
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5EDD6", textAlign: "left" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Имя</th>
                <th style={thStyle}>Телефон</th>
                <th style={thStyle}>Тема</th>
                <th style={thStyle}>Дата</th>
                <th style={thStyle}>Статус</th>
                <th style={thStyle}>Действия</th>
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
                  <td style={tdStyle}>{app.application_type?.name_ru ?? `#${app.application_type_id}`}</td>
                  <td style={{ ...tdStyle, fontSize: "0.82rem", color: "#8A7E6E" }}>
                    {formatDate(app.created_at)}
                  </td>
                  <td style={tdStyle}><StatusBadge status={app.status} /></td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <select
                        value={app.status}
                        onChange={e => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                        disabled={updatingId === app.id}
                        style={{
                          padding: "6px 10px", borderRadius: 6, fontSize: "0.82rem",
                          border: "1px solid #DDD0B8", background: "#fff", cursor: "pointer",
                        }}
                      >
                        {STATUS_OPTIONS.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setSelectedApp(app)}
                        style={{
                          padding: "6px 12px", borderRadius: 6, fontSize: "0.82rem",
                          fontWeight: 600, background: "#1B5E20", color: "#fff",
                          border: "none", cursor: "pointer",
                        }}
                      >
                        👁 Просмотр
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal — detail */}
      {selectedApp && (
        <div
          onClick={() => setSelectedApp(null)}
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
                  Заявка #{selectedApp.id}
                </div>
                <h2 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.4rem", color: "#1B5E20" }}>
                  {selectedApp.full_name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#8A7E6E" }}
              >✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <DetailRow label="Телефон">
                <a href={`tel:${selectedApp.phone_number}`} style={{ color: "#1B5E20", fontWeight: 600 }}>
                  {selectedApp.phone_number}
                </a>
              </DetailRow>
              <DetailRow label="Тема">
                {selectedApp.application_type?.name_ru ?? `#${selectedApp.application_type_id}`}
              </DetailRow>
              <DetailRow label="Дата">{formatDate(selectedApp.created_at)}</DetailRow>
              <DetailRow label="Статус">
                <StatusBadge status={selectedApp.status} />
              </DetailRow>
              <DetailRow label="Сообщение">
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                  {selectedApp.description || <span style={{ color: "#8A7E6E", fontStyle: "italic" }}>(пусто)</span>}
                </div>
              </DetailRow>
            </div>

            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #F0E6CC" }}>
              <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "#4A4438", marginBottom: 8 }}>
                Изменить статус
              </div>
              <select
                value={selectedApp.status}
                onChange={e => handleStatusChange(selectedApp.id, e.target.value as ApplicationStatus)}
                disabled={updatingId === selectedApp.id}
                style={{
                  width: "100%", padding: "12px", borderRadius: 8,
                  border: "2px solid #DDD0B8", background: "#fff", fontSize: "0.95rem",
                }}
              >
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
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

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("ru-RU", {
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