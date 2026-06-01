import { useState } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang, t } from "../context/LangContext";
import type { Lang } from "../context/LangContext";

const LANGS: { code: Lang; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { lang, setLang } = useLang();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) {
      setError(t("login_err_empty", lang));
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await login(username, password);
      navigate("/admin/applications", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : t("login_err_wrong", lang));
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle: CSSProperties = {
    width: "100%", border: "2px solid #DDD0B8", borderRadius: 8,
    padding: "14px 16px", fontSize: "1rem", color: "#1E1A14",
    background: "#fff", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(145deg,#1A3E18 0%,#2D5E2A 55%,#3a6e36 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
    }}>
      {/* Lang switcher */}
      <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 6 }}>
        {LANGS.map(l => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            style={{
              padding: "5px 13px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.4)",
              background: lang === l.code ? "#C8900A" : "rgba(255,255,255,0.12)",
              color: "#fff", cursor: "pointer",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{
        background: "#fff", borderRadius: 16, padding: "40px 36px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 64, height: 64, background: "#1B5E20", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", marginBottom: 12 }}>🍋</div>
          <h1 style={{ fontFamily: "'Merriweather',serif", fontSize: "1.6rem", color: "#1B5E20", marginBottom: 4 }}>UzLimon Admin</h1>
          <div style={{ fontSize: "0.85rem", color: "#8A7E6E" }}>{t("login_subtitle", lang)}</div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#4A4438", marginBottom: 5, display: "block" }}>
            {t("login_label", lang)}
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="admin"
            style={inputStyle}
            autoFocus
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#4A4438", marginBottom: 5, display: "block" }}>
            {t("login_pass_label", lang)}
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        {error && (
          <div style={{
            background: "#FFEBEE", color: "#C62828",
            border: "1px solid #ef9a9a", borderRadius: 8,
            padding: "10px 14px", fontSize: "0.88rem", marginBottom: 14,
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            background: submitting ? "#5a8c5e" : "#1B5E20",
            color: "#fff", fontWeight: 700, fontSize: "1rem",
            padding: "14px", borderRadius: 10, border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
          }}
        >
          {submitting ? t("login_loading", lang) : t("login_btn", lang)}
        </button>
      </form>
    </div>
  );
}
