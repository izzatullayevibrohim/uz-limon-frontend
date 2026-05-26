import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();

  async function handleLogout() {
    if (confirm("Вы уверены, что хотите выйти?")) {
      await logout();
    }
  }

  const menuItems = [
    { path: "/admin/applications", label: "📋 Заявки", icon: "📋" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F5EDD6" }}>
      {/* Sidebar */}
      <aside style={{
        width: 260,
        background: "#111810",
        color: "#fff",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ padding: "0 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, background: "#1B5E20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🍋</div>
            <div>
              <div style={{ fontFamily: "'Merriweather',serif", fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>UzLimon</div>
              <div style={{ fontSize: "0.7rem", color: "#F5D780", letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {menuItems.map(item => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "block",
                  padding: "12px 16px",
                  borderRadius: 8,
                  marginBottom: 4,
                  color: active ? "#fff" : "rgba(255,255,255,0.65)",
                  background: active ? "#1B5E20" : "transparent",
                  textDecoration: "none",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  transition: "0.18s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Вошли как</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
            {user?.name || user?.username || "Admin"}
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8,
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🚪 Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}