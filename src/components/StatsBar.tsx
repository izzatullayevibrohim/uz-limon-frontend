import { useLang, t } from "../context/LangContext";
import type { LocalizedText } from "../context/LangContext";
import { STATS } from "../data/content";

interface Stat extends LocalizedText {
  n: string;
}

export default function StatsBar() {
  const { lang } = useLang();
  const stats = STATS as Stat[];
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #DDD0B8" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "0 24px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "28px 16px", textAlign: "center",
            borderRight: i < stats.length - 1 ? "1px solid #DDD0B8" : "none",
          }}>
            <div style={{ fontFamily: "'Merriweather',serif", fontSize: "2rem", fontWeight: 700, color: "#1B5E20", lineHeight: 1, marginBottom: 6 }}>
              {s.n}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#8A7E6E", lineHeight: 1.4, whiteSpace: "pre-line" }}>
              {t(s, lang)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}