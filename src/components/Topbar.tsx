import { useLang } from "../context/LangContext";
import type { Lang } from "../context/LangContext";

export default function Topbar() {
  const { lang, setLang } = useLang();
  const langs: Lang[] = ["ru", "uz", "en"];

  return (
    <div style={{
      background: "#1B5E20", color: "rgba(255,255,255,0.85)",
      fontSize: "0.82rem", padding: "8px 20px",
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: "8px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        📍 Toshkent, Abay 4A &nbsp;|&nbsp;
        <a href="tel:+998712020101" style={{ color: "#F5D780", fontWeight: 600, fontSize: "0.9rem" }}>
          📞 +998 71 202-01-01
        </a> &nbsp;|&nbsp;
        <a href="mailto:info@uzblimon.uz" style={{ color: "#F5D780", fontWeight: 600, fontSize: "0.9rem" }}>
          ✉️ info@uzblimon.uz
        </a>
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            style={{
              background: lang === l ? "#C8900A" : "rgba(255,255,255,0.12)",
              border: `1px solid ${lang === l ? "#C8900A" : "rgba(255,255,255,0.3)"}`,
              color: "#fff", padding: "4px 12px", borderRadius: "20px",
              fontSize: "0.78rem", fontWeight: 600, cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}